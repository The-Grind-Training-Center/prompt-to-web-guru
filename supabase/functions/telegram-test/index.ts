import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { resolveChatId, sendMessage } from '../_shared/telegram.ts';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const token = Deno.env.get('TELEGRAM_BOT_TOKEN');
    if (!token) {
      return json({ ok: false, error: 'TELEGRAM_BOT_TOKEN is not configured' }, 500);
    }

    const chat = await resolveChatId(token);
    if (!chat.ok) {
      return json({ ok: false, error: chat.error }, chat.status);
    }

    const sent = await sendMessage(
      token,
      chat.chatId,
      'Connected. Backstop lead alerts will arrive here.',
    );
    if (!sent.ok) {
      return json(
        { ok: false, chat_id: chat.chatId, error: 'Telegram send failed', details: sent.details },
        502,
      );
    }

    return json({ ok: true, chat_id: chat.chatId, message: 'Test message sent.' });
  } catch (_e) {
    console.error('telegram-test error');
    return json({ ok: false, error: 'Unexpected error' }, 500);
  }
});
