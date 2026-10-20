// Team past-due review (hidden page /team-past-due.html). Every call needs the team passkey; the tables have
// row level security with no policies, so only this function (service role) can read or write them.
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { getServiceClient } from '../_shared/telegram.ts';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

const sha256 = async (v: string) => {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(v));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
};
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') return json({ error: 'Invalid body' }, 400);
    const sb = getServiceClient();

    const passkey = str(body.passkey, 200).toLowerCase();
    const { data: cfg } = await sb.from('pastdue_config').select('passkey_sha256').eq('id', 1).maybeSingle();
    if (!cfg || !passkey || (await sha256(passkey)) !== cfg.passkey_sha256) {
      await sleep(1200); // slows down guessing
      return json({ error: 'Wrong passkey' }, 401);
    }

    const readMarks = async () => {
      const { data, error } = await sb.from('pastdue_marks').select('key,status,other,note,by_name,updated_at');
      if (error) throw error;
      const out: Record<string, unknown> = {};
      for (const m of data ?? []) out[m.key] = { status: m.status, other: m.other, note: m.note, by: m.by_name, at: m.updated_at };
      return out;
    };

    if (body.action === 'list') {
      const { data, error } = await sb.from('pastdue_accounts').select('data').order('sort');
      if (error) throw error;
      return json({ accounts: (data ?? []).map((r) => r.data), marks: await readMarks() });
    }
    if (body.action === 'marks') return json({ marks: await readMarks() });
    if (body.action === 'mark') {
      const key = str(body.key, 80);
      const status = body.status === 'sent' || body.status === 'not' ? body.status : '';
      const other = body.other === true;
      const note = other ? str(body.note, 500) : '';
      const by = str(body.by, 40);
      const { data: acct } = await sb.from('pastdue_accounts').select('key').eq('key', key).maybeSingle();
      if (!acct) return json({ error: 'Unknown account' }, 404);
      const { error } = await sb.from('pastdue_marks').upsert(
        { key, status, other, note, by_name: by, updated_at: new Date().toISOString() },
        { onConflict: 'key' },
      );
      if (error) throw error;
      return json({ ok: true });
    }
    return json({ error: 'Unknown action' }, 400);
  } catch (_e) {
    console.error('pastdue error');
    return json({ error: 'Unexpected error' }, 500);
  }
});
