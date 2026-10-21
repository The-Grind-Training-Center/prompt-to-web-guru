import { expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { leadSource, telegramDetails } from '../_shared/leadSource.ts';

const source = readFileSync(new URL('./index.ts', import.meta.url), 'utf8');
for (const [name, config, status] of [
  ['Telegram not configured', { token: null }, 500],
  ['chat not resolved', { token: 'mock', chat: { ok: false, status: 502, error: 'mock' } }, 502],
  ['send not ok', { token: 'mock', chat: { ok: true, chatId: 'mock' }, sent: { ok: false, status: 502, details: 'mock' } }, 502],
]) {
  for (const offer of ['Field Rental', 'Backstop']) {
    test(`${offer}: ${name} releases only the claimed row`, async () => {
      const writes = [];
      let handler;
      const admin = { from(table) {
        let patch;
        let id;
        const q = {
          select() { return q; }, eq(_, value) { id = value; return q; }, gte() { return q; },
          is() { return q; }, order() { return q; }, limit() { return q; },
          update(value) { patch = value; return q; },
          then(resolve) {
            if (patch) writes.push({ table, id, patch });
            return Promise.resolve(resolve({ data: [{ id: 'mock-lead' }], error: null }));
          },
        };
        return q;
      } };
      const code = new Bun.Transpiler({ loader: 'ts' }).transformSync(source.replace(/^import .*;\n/gm, ''));
      new Function('Deno', 'createClient', 'resolveChatId', 'sendMessage', 'leadSource', 'telegramDetails', 'corsHeaders', code)(
        { serve(fn) { handler = fn; }, env: { get(key) { return key === 'TELEGRAM_BOT_TOKEN' ? config.token : key === 'META_CAPI_TOKEN' ? null : 'mock'; } } },
        () => admin, async () => config.chat, async () => config.sent, leadSource, telegramDetails, {},
      );
      const response = await handler(new Request('https://example.test/notify-lead', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ parent_name: 'Mock', phone: 'mock', email: 'mock', athlete_age: 12, offer, event_id: 'mock-event' }),
      }));
      expect(response.status).toBe(status);
      expect(writes.at(-1)).toEqual({ table: offer === 'Backstop' ? 'backstop_leads' : 'leads', id: 'mock-lead', patch: { notified_at: null } });
      expect(writes).toHaveLength(2);
    });
  }
}