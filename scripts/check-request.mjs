import assert from 'node:assert/strict';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { requestText, whatsappUrl } from '../src/order-request.ts';
import { createOrderPdf } from '../src/order-pdf.ts';
const font = readFileSync(new URL('../public/fonts/NotoSans-Regular.ttf', import.meta.url)).toString('base64');
const contact = JSON.parse(readFileSync(new URL('../src/data/contact.json', import.meta.url)));
const order = {
  name: 'Chloé D’Amico', email: 'qa@example.com', date: '2026-12-20', message: 'Verde & bordeaux, una dedica: “Per te”. Caffè e bontà!',
  language: 'it', total: 66, pieces: 47, packages: 6,
  lines: [
    { title: 'Un piccolo pensiero', detail: 'Bustina con 3 biscotti piccoli misti.', quantity: 4, pieceCount: 3, unitPrice: 4.5, contents: [], bulkPackaging: false },
    { title: 'Assortimento personalizzato', detail: 'Scatola', quantity: 1, pieceCount: 5, unitPrice: 12, contents: ['3 × Omino', '2 × Cuore'], bulkPackaging: false },
    { title: 'Biscotti senza tempo', detail: 'Confezionamento da concordare', quantity: 1, pieceCount: 30, unitPrice: 36, contents: ['30 × Vin Santo, uvetta e pinoli'], bulkPackaging: true },
  ],
};
const text = requestText(order);
assert.ok(text.includes('4 × Un piccolo pensiero — 18,00'));
assert.ok(text.includes('3 × Omino'));
assert.ok(text.includes('30 × Vin Santo, uvetta e pinoli'));
assert.ok(text.includes('20 dicembre 2026'));
assert.ok(text.includes(order.message));
assert.ok(text.includes('66,00'));
assert.ok(text.includes('da concordare'));
const url = new URL(whatsappUrl(contact.whatsapp, text));
assert.equal(url.origin, 'https://wa.me');
assert.equal(url.pathname, '/393338240489');
assert.equal(url.searchParams.get('text'), text, 'Notes, accents, ampersands and line breaks survive URL encoding');
assert.throws(() => whatsappUrl('not-a-number', text));
const normal = createOrderPdf(order, font);
assert.equal(normal.getNumberOfPages(), 1);
const long = createOrderPdf({ ...order, message: (order.message + '\n').repeat(70) }, font);
assert.ok(long.getNumberOfPages() > 1, 'Long notes continue over multiple pages');
assert.ok(requestText({ ...order, language: 'en' }).includes('20 December 2026'));
assert.ok(requestText({ ...order, message: '  ' }).includes('Nessuna preferenza particolare.'));
if (process.argv[2]) {
  mkdirSync(process.argv[2], { recursive: true });
  for (const [name, pdf] of [['request', normal], ['long-request', long]]) writeFileSync(`${process.argv[2]}/${name}.pdf`, Buffer.from(pdf.output('arraybuffer')));
}
console.log('Request checks passed: complete mixed orders, recipient, encoded notes/date, accented PDF text and multipage notes.');
