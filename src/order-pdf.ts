import { jsPDF } from "jspdf";
import { requestDate, requestLabels, requestMoney } from "./order-request.ts";
import type { OrderRequest } from "./order-request.ts";

export function createOrderPdf(order: OrderRequest, font: string) {
  const doc = new jsPDF({ compress: true, putOnlyUsedFonts: true });
  doc.addFileToVFS("NotoSans-Regular.ttf", font);
  doc.addFont("NotoSans-Regular.ttf", "NotoSans", "normal");
  doc.setFont("NotoSans");
  doc.setProperties({ title: `Giansy — ${requestLabels(order.language).title}`, author: "Le Creazioni di Giansy" });
  const l = requestLabels(order.language);
  let y = 25;
  function nextPage() {
    doc.addPage();
    y = 25;
  }
  function text(value: string, size = 10, colour: [number, number, number] = [53, 37, 32]) {
    doc.setFontSize(size);
    doc.setTextColor(...colour);
    // Plain text only; preserve customer line breaks and wrap long notes across pages.
    const lines: string[] = doc.splitTextToSize(value.replace(/[\u0000-\u0008\u000B-\u001F]/g, ""), 170);
    for (const line of lines) {
      if (y > 270) nextPage();
      doc.text(line, 20, y);
      y += size * 0.47;
    }
  }
  function heading(value: string) {
    if (y > 248) nextPage();
    y += 5;
    text(value, 13, [80, 10, 15]);
    y += 3;
  }
  text("Le Creazioni di Giansy", 22, [80, 10, 15]);
  text(l.title, 11);
  y += 7;
  text(`${l.date}: ${requestDate(order)}`, 12, [80, 10, 15]);
  y += 3;
  text(`${l.customer}: ${order.name.trim()}`);
  text(`${l.email}: ${order.email.trim()}`);
  heading(l.selection);
  for (const line of order.lines) {
    if (y > 235) nextPage();
    text(`${line.quantity} × ${line.title} — ${requestMoney(line.unitPrice * line.quantity, order.language)}`, 11, [80, 10, 15]);
    text(line.detail);
    text(`${line.pieceCount} ${l.cookies} ${l.perPackage} · ${requestMoney(line.unitPrice, order.language)} ${l.perPackage}`, 9);
    for (const content of line.contents) text(`  ${content}`, 9);
    if (line.bulkPackaging) text(l.bulk, 9);
    y += 5;
  }
  heading(`${l.total}: ${requestMoney(order.total, order.language)}`);
  text(`${order.packages} ${l.packages} · ${order.pieces} ${l.cookies}`);
  heading(l.notes);
  text(order.message.trim() || l.none);
  y += 7;
  text(l.confirmation, 9);
  const pages = doc.getNumberOfPages();
  for (let page = 1; page <= pages; page++) {
    doc.setPage(page);
    doc.setDrawColor(202, 179, 151);
    doc.line(20, 280, 190, 280);
    doc.setFontSize(8);
    doc.setTextColor(95, 82, 72);
    doc.text(`Giansy · ${l.page} ${page} / ${pages}`, 20, 287);
  }
  return doc;
}

let fontPromise: Promise<string> | undefined;
export async function downloadOrderPdf(order: OrderRequest, fontUrl: string) {
  fontPromise ??= fetch(fontUrl).then(async response => {
    if (!response.ok) throw new Error("PDF font unavailable");
    const bytes = new Uint8Array(await response.arrayBuffer());
    let binary = "";
    for (let i = 0; i < bytes.length; i += 8192) binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
    return btoa(binary);
  }).catch(error => { fontPromise = undefined; throw error; });
  const doc = createOrderPdf(order, await fontPromise);
  doc.save(`giansy-richiesta-${order.date}.pdf`);
}
