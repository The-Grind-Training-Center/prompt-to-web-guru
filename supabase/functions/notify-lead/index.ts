import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { resolveChatId, sendMessage } from '../_shared/telegram.ts';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

const sha256 = async (v: string) => {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(v));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
};

async function sendMetaLead(
  req: Request,
  body: Record<string, unknown>,
  f: { parentName: string; phone: string; email: string; testEventCode: string; offer: string },
): Promise<unknown> {
  try {
    const capiToken = Deno.env.get('META_CAPI_TOKEN');
    if (!capiToken) return { skipped: true };
    const s = (v: unknown, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

    let digits = f.phone.replace(/\D/g, '');
    if (digits.length === 10) digits = '1' + digits;
    const words = f.parentName.toLowerCase().split(/\s+/).filter(Boolean);

    const user_data: Record<string, unknown> = {
      em: [await sha256(f.email.trim().toLowerCase())],
      ph: [await sha256(digits)],
      fn: [await sha256(words[0] ?? '')],
    };
    if (words.length >= 2) user_data.ln = [await sha256(words[words.length - 1])];
    const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim();
    if (ip) user_data.client_ip_address = ip;
    const ua = req.headers.get('user-agent');
    if (ua) user_data.client_user_agent = ua;
    const fbp = s(body.fbp);
    if (fbp) user_data.fbp = fbp;
    const fbc = s(body.fbc);
    if (fbc) user_data.fbc = fbc;

    const event: Record<string, unknown> = {
      event_name: 'Lead',
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      event_source_url: s(body.page_url, 2000) || 'https://thegrindtrainingcenter.com/backstop',
      user_data,
      custom_data: { content_name: f.offer },
    };
    const eventId = s(body.event_id, 100);
    if (eventId) event.event_id = eventId;

    const payload: Record<string, unknown> = { access_token: capiToken, data: [event] };
    if (f.testEventCode) payload.test_event_code = f.testEventCode;

    const res = await fetch('https://graph.facebook.com/v21.0/1070881342328617/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const out = await res.json().catch(() => null);
    if (!res.ok) console.error('Meta CAPI error', res.status, out?.error?.message ?? '');
    return { status: res.status, events_received: out?.events_received, error: out?.error?.message };
  } catch (_e) {
    console.error('Meta CAPI request failed');
    return { error: 'request failed' };
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return json({ error: 'Invalid body' }, 400);
    }

    const str = (v: unknown, max = 200) =>
      typeof v === 'string' ? v.trim().slice(0, max) : '';
    const parentName = str(body.parent_name);
    const phone = str(body.phone, 40);
    const email = str(body.email, 200);
    const ageNum = body.athlete_age == null || body.athlete_age === "" ? NaN : Number(body.athlete_age);
    const athleteAge = Number.isFinite(ageNum) ? Math.trunc(ageNum) : null;
    const utmSource = str(body.utm_source, 100) || 'direct';
    const utmCampaign = str(body.utm_campaign, 100) || 'none';

    const offer = str(body.offer, 80) || 'Backstop';
    const isBackstop = offer.toLowerCase() === 'backstop';
    const details: [string, string][] =
      body.details && typeof body.details === 'object' && !Array.isArray(body.details)
        ? Object.entries(body.details as Record<string, unknown>)
            .slice(0, 20)
            .map(([k, v]) => [String(k).slice(0, 60), String(v ?? '').slice(0, 200)])
        : [];

    if (!parentName || !phone || !email || (isBackstop && athleteAge === null)) {
      return json({ error: 'Missing required fields' }, 400);
    }

    const testEventCode = str(body.test_event_code, 50);
    const sendMeta = () =>
      sendMetaLead(req, body, { parentName, phone, email, testEventCode, offer });

    if (testEventCode) {
      const meta = await sendMeta();
      return json({ ok: true, test: true, meta });
    }

    const token = Deno.env.get('TELEGRAM_BOT_TOKEN');
    if (!token) {
      await sendMeta();
      return json({ error: 'Telegram not configured' }, 500);
    }

    const chat = await resolveChatId(token);
    if (!chat.ok) {
      await sendMeta();
      return json({ error: chat.error }, chat.status);
    }

    const ageLine =
      athleteAge === null
        ? []
        : [isBackstop ? `Athlete age: ${athleteAge}  (${athleteAge < 13 ? 'JV' : 'Varsity'})` : `Athlete age: ${athleteAge}`];
    const text = [
      `NEW ${offer.toUpperCase()} LEAD`,
      '',
      `Name: ${parentName}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      ...ageLine,
      ...details.map(([k, v]) => `${k}: ${v}`),
      `Source: ${utmSource} / ${utmCampaign}`,
      '',
      'Call them today.',
    ].join('\n');

    const sent = await sendMessage(token, chat.chatId, text);
    await sendMeta();
    if (!sent.ok) {
      return json({ error: 'Telegram send failed', status: sent.status, details: sent.details }, 502);
    }

    return json({ ok: true });
  } catch (_e) {
    console.error('notify-lead error');
    return json({ error: 'Unexpected error' }, 500);
  }
});
