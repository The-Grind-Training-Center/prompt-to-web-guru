import { createClient } from 'npm:@supabase/supabase-js@2';

const SETTINGS_KEY = 'telegram_chat_id';

export function getServiceClient() {
  return createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    { auth: { persistSession: false } },
  );
}

export type ChatIdResult =
  | { ok: true; chatId: string }
  | { ok: false; status: number; error: string };

/**
 * Returns the stored Telegram chat id, discovering it via getUpdates when missing.
 * Prefers group/supergroup chats over private chats.
 */
export async function resolveChatId(token: string): Promise<ChatIdResult> {
  const supabase = getServiceClient();

  const { data: existing } = await supabase
    .from('app_settings')
    .select('value')
    .eq('key', SETTINGS_KEY)
    .maybeSingle();

  if (existing?.value) return { ok: true, chatId: existing.value };

  const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
  if (!res.ok) {
    const body = await res.text();
    console.error('getUpdates failed', res.status, body.slice(0, 200));
    return { ok: false, status: 502, error: 'Telegram getUpdates failed' };
  }

  const payload = await res.json().catch(() => null);
  const updates: unknown[] = Array.isArray(payload?.result) ? payload.result : [];
  if (updates.length === 0) {
    return {
      ok: false,
      status: 400,
      error:
        'No Telegram chat found yet. Send a message in your Telegram group (or to the bot) first, then try again.',
    };
  }

  let groupId: string | null = null;
  let anyId: string | null = null;

  // Most recent first.
  for (const u of [...updates].reverse()) {
    const msg = (u as Record<string, any>)?.message ??
      (u as Record<string, any>)?.channel_post ??
      (u as Record<string, any>)?.edited_message;
    const chat = msg?.chat;
    if (!chat?.id) continue;
    const id = String(chat.id);
    if (!anyId) anyId = id;
    if (!groupId && (chat.type === 'group' || chat.type === 'supergroup')) groupId = id;
  }

  const chatId = groupId ?? anyId;
  if (!chatId) {
    return {
      ok: false,
      status: 400,
      error:
        'No Telegram chat found yet. Send a message in your Telegram group (or to the bot) first, then try again.',
    };
  }

  const { error: upsertError } = await supabase
    .from('app_settings')
    .upsert({ key: SETTINGS_KEY, value: chatId }, { onConflict: 'key' });
  if (upsertError) console.error('Failed to persist chat id', upsertError.message);

  return { ok: true, chatId };
}

export async function sendMessage(token: string, chatId: string, text: string) {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
  });
  if (!res.ok) {
    const body = await res.text();
    console.error('sendMessage failed', res.status, body.slice(0, 200));
    return { ok: false as const, status: res.status, details: body.slice(0, 300) };
  }
  return { ok: true as const };
}
