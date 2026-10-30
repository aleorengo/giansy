import content from "../data/legal.json";
import contact from "../data/contact.json";
import { t, getLanguage } from "../i18n";

export default function LegalInformation({ kind }: { kind: "privacy" | "terms" }) {
  return <div className="legal-information">
    <p>{t("Le Creazioni di Giansy manages this website and order enquiries. For information or requests concerning your personal data, contact Giansy:")} <a href={`tel:${contact.whatsapp.replace(/\s/g, "")}`}>{contact.whatsapp}</a>.</p>
    {content[kind].map(section => <section key={section.title}>
      <h3>{t(section.title)}</h3>
      {section.paragraphs.map(paragraph => <p key={paragraph}>{t(paragraph)}</p>)}
      {"links" in section && section.links?.map(link => <p key={link.url}><a href={link.url} target="_blank" rel="noreferrer">{t(link.label)}</a></p>)}
    </section>)}
    <p className="detail-note">{t("Last updated:")} {new Date(`${content.updated}T12:00:00`).toLocaleDateString(getLanguage() === "it" ? "it-IT" : "en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
  </div>;
}
