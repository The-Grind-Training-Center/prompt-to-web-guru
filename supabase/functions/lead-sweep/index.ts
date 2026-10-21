import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { getServiceClient, resolveChatId, sendMessage } from '../_shared/telegram.ts';
import { leadSource, telegramDetails } from '../_shared/leadSource.ts';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

type Lead = {
  id: string;
  created_at: string;
  offer?: string;
  parent_name: string;
  phone: string;
  email: string;
  athlete_age: number | null;
  details?: Record<string, unknown>;
  utm_source?: string;
  utm_campaign?: string;
  referrer?: string;
  landing_page?: string;
};
type Table = 'leads' | 'backstop_leads';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const url = new URL(req.url);
  const dryParam = url.searchParams.get('dry');
  if (dryParam !== null && dryParam !== '1') return json({ error: 'Invalid dry parameter' }, 400);
  const dry = dryParam === '1';
  if (req.method !== 'POST' && !(dry && req.method === 'GET')) {
    return json({ error: 'Method not allowed' }, 405);
  }

  try {
    const admin = getServiceClient();
    const now = Date.now();
    const oldest = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString();
    const newest = new Date(now - 5 * 60 * 1000).toISOString();
    const candidates: { table: Table; row: Lead }[] = [];
    for (const table of ['leads', 'backstop_leads'] as const) {
      const columns = table === 'leads'
        ? 'id,created_at,offer,parent_name,phone,email,athlete_age,details,utm_source,utm_campaign,referrer,landing_page'
        : 'id,created_at,parent_name,phone,email,athlete_age,utm_source,utm_campaign,referrer,landing_page';
      const { data, error } = await admin.from(table).select(columns)
        .is('notified_at', null).gte('created_at', oldest).lte('created_at', newest)
        .order('created_at', { ascending: true }).limit(20);
      if (error) {
        console.error('lead sweep check failed');
        return json({ error: 'Lead check failed' }, 500);
      }
      for (const row of (data ?? []) as Lead[]) candidates.push({ table, row });
    }
    const missed = candidates.sort((a, b) => a.row.created_at.localeCompare(b.row.created_at)).slice(0, 20);
    if (dry) {
      return json({ dry: true, missed: missed.map(({ table, row }) => ({
        table, id: row.id, offer: table === 'backstop_leads' ? 'Backstop' : row.offer || 'Backstop',
        created_at: row.created_at,
      })) });
    }

    let sent = 0;
    let failed = 0;
    const token = Deno.env.get('TELEGRAM_BOT_TOKEN');
    for (const { table, row } of missed) {
      const { data: claimed, error: claimError } = await admin.from(table)
        .update({ notified_at: new Date().toISOString() })
        .eq('id', row.id).is('notified_at', null).select('*');
      if (claimError) { console.error('lead sweep claim failed'); failed++; continue; }
      const lead = claimed?.[0] as Lead | undefined;
      if (!lead) continue;
      try {
        if (!token) throw new Error('Telegram not configured');
        const chat = await resolveChatId(token);
        if (!chat.ok) throw new Error('Telegram chat not resolved');
        const str = (v: unknown, max = 200) => typeof v === 'string' ? v.trim().slice(0, max) : '';
        const offer = table === 'backstop_leads' ? 'Backstop' : str(lead.offer, 80) || 'Backstop';
        const age = lead.athlete_age == null ? null : Math.trunc(lead.athlete_age);
        const ageLine = age === null ? [] : [table === 'backstop_leads'
          ? `Athlete age: ${age}  (${age < 13 ? 'JV' : 'Varsity'})` : `Athlete age: ${age}`];
        const details: [string, string][] = lead.details && typeof lead.details === 'object' && !Array.isArray(lead.details)
          ? Object.entries(lead.details).slice(0, 20)
            .map(([k, v]) => [String(k).slice(0, 60), String(v ?? '').slice(0, 200)]) : [];
        const source = leadSource({
          utm_source: str(lead.utm_source, 100), utm_campaign: str(lead.utm_campaign, 100),
          referrer: str(lead.referrer, 2000), landing_page: str(lead.landing_page, 2000),
        });
        const text = [
          `NEW ${offer.toUpperCase()} LEAD (backup alert)`, '',
          `Name: ${str(lead.parent_name)}`, `Phone: ${str(lead.phone, 40)}`, `Email: ${str(lead.email)}`,
          ...ageLine, ...telegramDetails(details).map(([k, v]) => `${k}: ${v}`),
          `Source: ${source}`, '', 'Call them today.',
        ].join('\n');
        const result = await sendMessage(token, chat.chatId, text);
        if (!result.ok) throw new Error('Telegram send failed');
        sent++;
      } catch {
        failed++;
        const { error } = await admin.from(table).update({ notified_at: null }).eq('id', lead.id);
        if (error) console.error('lead sweep release failed');
      }
    }
    return json({ sent, failed });
  } catch {
    console.error('lead sweep error');
    return json({ error: 'Unexpected error' }, 500);
  }
});