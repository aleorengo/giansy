export type RequestLine = {
  title: string;
  detail: string;
  quantity: number;
  pieceCount: number;
  unitPrice: number;
  contents: string[];
  bulkPackaging: boolean;
};
export type OrderRequest = {
  name: string;
  email: string;
  date: string;
  message: string;
  lines: RequestLine[];
  total: number;
  pieces: number;
  packages: number;
  language: "it" | "en";
};

export function requestLabels(language: OrderRequest["language"]) {
  return language === "it" ? {
    title: "Richiesta biscotti", date: "Data desiderata", customer: "Cliente", email: "Email",
    selection: "La tua dolce selezione", notes: "Note e personalizzazioni", none: "Nessuna preferenza particolare.",
    packages: "confezioni", cookies: "biscotti", perPackage: "per confezione", total: "Totale indicativo",
    bulk: "Confezionamento dei biscotti senza tempo da concordare.",
    confirmation: "Richiesta da confermare con Giansy: disponibilità, data e dettagli finali. Nessun pagamento effettuato.",
    page: "Pagina",
  } : {
    title: "Cookie request", date: "Requested date", customer: "Customer", email: "Email",
    selection: "Your sweet selection", notes: "Notes and personalisation", none: "No particular preferences.",
    packages: "packages", cookies: "cookies", perPackage: "per package", total: "Estimated total",
    bulk: "Packaging for timeless biscuits will be agreed separately.",
    confirmation: "Request subject to confirmation with Giansy: availability, date and final details. No payment has been made.",
    page: "Page",
  };
}
export const requestMoney = (value: number, language: OrderRequest["language"]) =>
  new Intl.NumberFormat(language === "it" ? "it-IT" : "en-GB", { style: "currency", currency: "EUR" }).format(value);
export const requestDate = (order: OrderRequest) =>
  new Intl.DateTimeFormat(order.language === "it" ? "it-IT" : "en-GB", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(`${order.date}T12:00:00`));
export function requestText(order: OrderRequest) {
  const l = requestLabels(order.language);
  return [
    `Le Creazioni di Giansy — ${l.title}`,
    `${l.customer}: ${order.name.trim()}`,
    `${l.email}: ${order.email.trim()}`,
    `${l.date}: ${requestDate(order)}`,
    "", l.selection,
    ...order.lines.flatMap(line => [
      `${line.quantity} × ${line.title} — ${requestMoney(line.unitPrice * line.quantity, order.language)}`,
      line.detail,
      `${line.pieceCount} ${l.cookies} ${l.perPackage} · ${requestMoney(line.unitPrice, order.language)} ${l.perPackage}`,
      ...line.contents.map(content => `  ${content}`),
      ...(line.bulkPackaging ? [l.bulk] : []), "",
    ]),
    `${order.packages} ${l.packages} · ${order.pieces} ${l.cookies}`,
    `${l.total}: ${requestMoney(order.total, order.language)}`,
    "", `${l.notes}:`, order.message.trim() || l.none,
    "", l.confirmation,
  ].join("\n");
}
export function whatsappUrl(phone: string, text: string) {
  const digits = phone.replace(/[\s()+.-]/g, "");
  if (!/^[1-9]\d{7,14}$/.test(digits)) throw new Error("Invalid WhatsApp recipient");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
