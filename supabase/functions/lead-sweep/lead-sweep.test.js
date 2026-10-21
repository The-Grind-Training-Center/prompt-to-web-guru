import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { leadSource, telegramDetails } from '../_shared/leadSource.ts';

const NOW = Date.parse('2026-10-21T22:23:00Z');
const MINUTE = 60_000;
const DAY = 24 * 60 * MINUTE;
const source = readFileSync(new URL('./index.ts', import.meta.url), 'utf8');

function setup(rows, { token = 'mock-token', chatOk = true, sendOk = true, throws = false, lostClaim = false } = {}) {
  const messages = [];
  const writes = [];
  const queries = [];
  let handler;
  const admin = { from(table) {
    let patch;
    let id;
    let oldest;
    let newest;
    let limit = 20;
    const q = {
      select() { return q; }, is() { return q; }, order() { return q; },
      gte(_, value) { oldest = value; return q; }, lte(_, value) { newest = value; return q; },
      limit(value) { limit = value; return q; }, eq(_, value) { id = value; return q; },
      update(value) { patch = value; return q; },
      then(resolve) {
        if (patch) {
          writes.push({ table, id, patch });
          const row = rows[table].find(r => r.id === id);
          const eligible = row && (patch.notified_at === null || row.notified_at === null) && !lostClaim;
          if (eligible) Object.assign(row, patch);
          return Promise.resolve(resolve({ data: eligible ? [row] : [], error: null }));
        }
        queries.push({ oldest, newest, limit });
        return Promise.resolve(resolve({ data: rows[table].filter(r => r.notified_at === null && r.created_at >= oldest && r.created_at <= newest)
          .sort((a, b) => a.created_at.localeCompare(b.created_at)).slice(0, limit), error: null }));
      },
    };
    return q;
  } };
  const code = new Bun.Transpiler({ loader: 'ts' }).transformSync(source.replace(/^import .*;\n/gm, ''));
  new Function('Deno', 'getServiceClient', 'resolveChatId', 'sendMessage', 'leadSource', 'telegramDetails', 'corsHeaders', 'Date', code)(
    { serve(fn) { handler = fn; }, env: { get() { return token; } } }, () => admin,
    async () => ({ ok: chatOk, chatId: 'mock-chat' }),
    async (_, __, text) => { if (throws) throw new Error('mock failure'); messages.push(text); return { ok: sendOk }; },
    leadSource, telegramDetails, {}, class extends Date { static now() { return NOW; } },
  );
  return { messages, writes, queries, async run(dry = false) {
    const response = await handler(new Request(`https://example.test/lead-sweep${dry ? '?dry=1' : ''}`, { method: 'POST' }));
    return response.json();
  } };
}
function row(id, age = 6 * MINUTE) {
  return { id, created_at: new Date(NOW - age).toISOString(), notified_at: null, offer: 'Field Rental', parent_name: 'Mock',
    phone: 'mock', email: 'mock', athlete_age: 12, landing_page: '/rentals', details: { 'Which do you want?': 'Not sure yet' } };
}

describe('Backup alert rules, isolated mocks only', () => {
  test('dry mode makes no writes or sends and returns only requested fields', async () => {
    const s = setup({ leads: [row('lead')], backstop_leads: [row('backstop')] });
    const result = await s.run(true);
    expect(result).toEqual({ dry: true, missed: [
      { table: 'leads', id: 'lead', offer: 'Field Rental', created_at: row('lead').created_at },
      { table: 'backstop_leads', id: 'backstop', offer: 'Backstop', created_at: row('backstop').created_at },
    ] });
    expect(s.writes).toHaveLength(0); expect(s.messages).toHaveLength(0);
  });
  test('eligibility is from exactly 7 days to exactly 5 minutes ago', async () => {
    const s = setup({ leads: [row('old', 7 * DAY + 1), row('old-boundary', 7 * DAY), row('new-boundary', 5 * MINUTE), row('new', 5 * MINUTE - 1)], backstop_leads: [] });
    expect((await s.run(true)).missed.map(r => r.id)).toEqual(['old-boundary', 'new-boundary']);
    expect(s.queries[0]).toEqual({ oldest: new Date(NOW - 7 * DAY).toISOString(), newest: new Date(NOW - 5 * MINUTE).toISOString(), limit: 20 });
  });
  test('at most 20 total alerts across both tables', async () => {
    const s = setup({ leads: Array.from({ length: 15 }, (_, i) => row(`l${i}`)), backstop_leads: Array.from({ length: 15 }, (_, i) => row(`b${i}`)) });
    expect(await s.run()).toEqual({ sent: 20, failed: 0 }); expect(s.messages).toHaveLength(20);
  });
  test('conditional claim prevents repeated or competing sends', async () => {
    const s = setup({ leads: [row('lead')], backstop_leads: [] });
    expect(await s.run()).toEqual({ sent: 1, failed: 0 });
    expect(await s.run()).toEqual({ sent: 0, failed: 0 }); expect(s.messages).toHaveLength(1);
    const competing = setup({ leads: [row('lead')], backstop_leads: [] }, { lostClaim: true });
    expect(await competing.run()).toEqual({ sent: 0, failed: 0 }); expect(competing.messages).toHaveLength(0);
  });
  for (const [name, config] of [['missing token', { token: null }], ['unresolved chat', { chatOk: false }], ['failed send', { sendOk: false }], ['thrown send', { throws: true }]]) {
    test(`${name} releases the same claimed row`, async () => {
      const rows = { leads: [row('lead')], backstop_leads: [] };
      const s = setup(rows, config);
      expect(await s.run()).toEqual({ sent: 0, failed: 1 });
      expect(rows.leads[0].notified_at).toBeNull();
      expect(s.writes.at(-1)).toEqual({ table: 'leads', id: 'lead', patch: { notified_at: null } });
    });
  }
});