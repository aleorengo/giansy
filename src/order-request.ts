export type RequestLine = {
  kind: "custom" | "timeless" | "bundle" | "preserve";
  title: string;
  detail: string;
  quantity: number;
  pieceCount: number;
  unitPrice: number;
  contents: { name: string; quantity: number }[];
  bulkPackaging: boolean;
};
export type OrderRequest = {
  name: string;
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
    date: "Data desiderata", customer: "Nome", notes: "Messaggio", none: "Nessuna nota.",
    selection: "Ordine", custom: "Assortimento personalizzato", timeless: "Biscotti senza tempo", mixed: "Confezioni miste", preserves: "Confetture",
    cookies: "biscotti totali", identical: "confezioni uguali", each: "biscotti ciascuna", total: "Totale ordine",
  } : {
    date: "Requested date", customer: "Name", notes: "Message", none: "No notes.",
    selection: "Order", custom: "Personalised assortment", timeless: "Timeless biscuits", mixed: "Mixed gift packages", preserves: "Preserves",
    cookies: "cookies in total", identical: "identical packages", each: "cookies each", total: "Order total",
  };
}
export const requestMoney = (value: number, language: OrderRequest["language"]) =>
  new Intl.NumberFormat(language === "it" ? "it-IT" : "en-GB", { style: "currency", currency: "EUR" }).format(value);
export const requestDate = (order: OrderRequest) =>
  new Intl.DateTimeFormat(order.language === "it" ? "it-IT" : "en-GB", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(`${order.date}T12:00:00`));
export function requestText(order: OrderRequest) {
  const l = requestLabels(order.language);
  const price = (line: RequestLine) => requestMoney(line.unitPrice * line.quantity, order.language);
  const custom = order.lines.filter(line => line.kind === "custom");
  const timeless = order.lines.filter(line => line.kind === "timeless");
  const bundles = order.lines.filter(line => line.kind === "bundle");
  const preserves = order.lines.filter(line => line.kind === "preserve");
  return [
    `${l.customer}: ${order.name.trim()}`,
    `${l.date}: ${requestDate(order)}`,
    `${l.notes}: ${order.message.trim() || l.none}`,
    "", l.selection,
    ...custom.flatMap(line => [
      "", `${l.custom} — ${price(line)}`,
      `${line.pieceCount * line.quantity} ${l.cookies}`,
      line.quantity > 1 ? `${line.quantity} ${l.identical} · ${line.pieceCount} ${l.each} · ${line.detail}` : line.detail,
      ...line.contents.map(content => `• ${content.quantity * line.quantity} × ${content.name}`),
    ]),
    ...(timeless.length ? ["", l.timeless, ...timeless.map(line => `• ${line.pieceCount * line.quantity} × ${line.title} — ${price(line)}`)] : []),
    ...(bundles.length ? ["", l.mixed, ...bundles.map(line => `• ${line.quantity} × ${(line.detail || line.title).replace(/[.!?]+$/, "")} — ${price(line)}`)] : []),
    ...(preserves.length ? ["", l.preserves, ...preserves.map(line => `• ${line.quantity} × ${line.title}${line.detail ? ` (${line.detail})` : ""} — ${price(line)}`)] : []),
    "",
    `${l.total}: ${requestMoney(order.total, order.language)}`,
  ].join("\n");
}
export function whatsappUrl(phone: string, text: string) {
  const digits = phone.replace(/[\s()+.-]/g, "");
  if (!/^[1-9]\d{7,14}$/.test(digits)) throw new Error("Invalid WhatsApp recipient");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
