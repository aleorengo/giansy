import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { requestText, whatsappUrl } from '../src/order-request.ts';
const contact = JSON.parse(readFileSync(new URL('../src/data/contact.json', import.meta.url)));
const order = {
  name: 'Chloé D’Amico', date: '2026-12-20', message: 'Verde & bordeaux, una dedica: “Per te”. Caffè e bontà!',
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
assert.ok(text.startsWith('Nome: Chloé D’Amico\nData desiderata: 20 dicembre 2026'), 'Name and requested date lead the request');
assert.ok(!text.includes('Email:'), 'Checkout no longer asks for email');
assert.ok(requestText({ ...order, language: 'en' }).includes('20 December 2026'));
assert.ok(requestText({ ...order, message: '  ' }).includes('Nessuna preferenza particolare.'));
console.log('Request checks passed: complete mixed orders, name and date first, WhatsApp recipient and encoded notes.');
