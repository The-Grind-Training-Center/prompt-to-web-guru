import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const token = Deno.env.get('TELEGRAM_BOT_TOKEN');
    const chatId = Deno.env.get('TELEGRAM_CHAT_ID');
    if (!token || !chatId) {
      return new Response(JSON.stringify({ error: 'Telegram not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return new Response(JSON.stringify({ error: 'Invalid body' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
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
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
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

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
    });

    if (!res.ok) {
      console.error('Telegram sendMessage failed', res.status);
      return new Response(JSON.stringify({ error: 'Telegram send failed' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (_e) {
    console.error('notify-lead error');
    return new Response(JSON.stringify({ error: 'Unexpected error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
