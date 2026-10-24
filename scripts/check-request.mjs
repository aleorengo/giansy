import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { requestText, whatsappUrl } from '../src/order-request.ts';
const contact = JSON.parse(readFileSync(new URL('../src/data/contact.json', import.meta.url)));
const order = {
  name: 'Chloé D’Amico', date: '2026-12-20', message: 'Verde & bordeaux, una dedica: “Per te”. Caffè e bontà!',
  language: 'it', total: 72, pieces: 54, packages: 8,
  lines: [
    { kind: 'bundle', title: 'Un piccolo pensiero', detail: 'Bustina con 3 biscotti piccoli misti.', quantity: 4, pieceCount: 3, unitPrice: 4.5, contents: [], bulkPackaging: false },
    { kind: 'custom', title: 'Il tuo assortimento personalizzato', detail: 'Scatola', quantity: 2, pieceCount: 6, unitPrice: 12, contents: [{ name: 'Omino', quantity: 3 }, { name: 'Cuore', quantity: 3 }], bulkPackaging: false },
    { kind: 'timeless', title: 'Arancia e cioccolato', detail: 'Long description that must not appear.', quantity: 2, pieceCount: 15, unitPrice: 15, contents: [], bulkPackaging: true },
  ],
};
const text = requestText(order);
assert.ok(text.startsWith(`Nome: Chloé D’Amico\nData desiderata: 20 dicembre 2026\nMessaggio: ${order.message}\n\nOrdine`));
assert.ok(text.includes('Assortimento personalizzato — 24,00'));
assert.ok(text.includes('12 biscotti totali\n2 confezioni uguali · 6 biscotti ciascuna · Scatola\n- 6 × Omino\n- 6 × Cuore'), 'Repeat quantities produce a total cookie list and preserve the per-package allocation');
assert.ok(text.includes('Biscotti senza tempo\n30 × Arancia e cioccolato — 30,00'));
assert.ok(text.includes('Confezioni miste\n4 × Bustina con 3 biscotti piccoli misti — 18,00'));
assert.ok(text.includes('Totale ordine: 72,00'));
for (const amount of ['24,00', '30,00', '18,00']) assert.equal(text.split(amount).length - 1, 1, 'Each line price appears once');
assert.ok(!text.includes('Long description'));
assert.ok(!text.includes('15,00'), 'No repeated unit price for timeless batches');
assert.ok(!text.includes('Un piccolo pensiero'), 'Mixed packages use their contents rather than the decorative title');
assert.ok(!text.includes('Email:'));
const url = new URL(whatsappUrl(contact.whatsapp, text));
assert.equal(url.origin, 'https://wa.me');
assert.equal(url.pathname, '/393338240489');
assert.equal(url.searchParams.get('text'), text, 'Notes, accents, ampersands and line breaks survive URL encoding');
assert.throws(() => whatsappUrl('not-a-number', text));
assert.ok(requestText({ ...order, language: 'en' }).includes('20 December 2026'));
assert.ok(requestText({ ...order, message: '  ' }).includes('Messaggio: Nessuna nota.'));
const single = requestText({ ...order, lines: [{ ...order.lines[1], quantity: 1 }], total: 12 });
assert.ok(single.includes('6 biscotti totali\nScatola\n- 3 × Omino\n- 3 × Cuore'));
assert.ok(!single.includes('confezioni uguali'));
for (const batches of [1, 2, 3]) {
  const batch = requestText({ ...order, lines: [{ ...order.lines[2], quantity: batches }] });
  assert.ok(batch.includes(`${15 * batches} × Arancia e cioccolato`));
}
console.log('Request checks passed: name/date/notes first, concise category-specific order lines, repeated quantities, one price per item and correct WhatsApp recipient.');
