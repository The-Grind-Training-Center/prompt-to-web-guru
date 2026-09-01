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
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  try {
    const token = Deno.env.get('TELEGRAM_BOT_TOKEN');
    if (!token) {
      return json({ error: 'Telegram not configured' }, 500);
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return json({ error: 'Invalid body' }, 400);
    }

    const str = (v: unknown, max = 200) =>
      typeof v === 'string' ? v.trim().slice(0, max) : '';
    const parentName = str(body.parent_name);
    const phone = str(body.phone, 40);
    const email = str(body.email, 200);
    const ageNum = Number(body.athlete_age);
    const athleteAge = Number.isFinite(ageNum) ? Math.trunc(ageNum) : null;
    const utmSource = str(body.utm_source, 100) || 'direct';
    const utmCampaign = str(body.utm_campaign, 100) || 'none';

    if (!parentName || !phone || !email || athleteAge === null) {
      return json({ error: 'Missing required fields' }, 400);
    }

    const chat = await resolveChatId(token);
    if (!chat.ok) {
      return json({ error: chat.error }, chat.status);
    }

    const level = athleteAge < 13 ? 'JV' : 'Varsity';
    const text = [
      'NEW BACKSTOP LEAD',
      '',
      `Name: ${parentName}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Athlete age: ${athleteAge}  (${level})`,
      `Source: ${utmSource} / ${utmCampaign}`,
      '',
      'Call them today.',
    ].join('\n');

    const sent = await sendMessage(token, chat.chatId, text);
    if (!sent.ok) {
      return json({ error: 'Telegram send failed', status: sent.status, details: sent.details }, 502);
    }

    return json({ ok: true });
  } catch (_e) {
    console.error('notify-lead error');
    return json({ error: 'Unexpected error' }, 500);
  }
});
