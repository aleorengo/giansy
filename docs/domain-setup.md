# Dominio: lecreazionidigiansy.it

GitHub Pages è configurato per il dominio principale `lecreazionidigiansy.it`.
Il workflow legge automaticamente il percorso di base da GitHub Pages: con il dominio personalizzato il sito viene pubblicato alla radice `/`.

In GoDaddy → dominio → DNS, configurare:

| Tipo | Nome | Valore |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | aleorengo.github.io |

Sostituire gli eventuali record di parcheggio per `@` e `www`. Conservare MX, TXT e gli altri record che servono alla posta o ad altri servizi. Il CNAME non deve contenere `https://` né `/giansy/`.

Dopo la propagazione DNS verificare il controllo del dominio in GitHub → repository → Settings → Pages. Quando il certificato è pronto, attivare **Enforce HTTPS**. GitHub può richiedere fino a 24 ore prima di rendere disponibile l'opzione. Non occorre acquistare hosting o certificati separati per GitHub Pages.

Il sito include metadati Open Graph e Twitter con URL assoluti del dominio e `images/whatsapp-tray-preview-large.jpg` (1200 × 630). Il mockup sorgente della composizione è in `assets/social-preview/whatsapp-card.html`; il JPG deriva da uno screenshot del mockup con gli asset originali del sito. Le anteprime già memorizzate dalle app possono richiedere tempo per aggiornarsi.

Fonti:
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- https://www.godaddy.com/help/manage-dns-records-680
