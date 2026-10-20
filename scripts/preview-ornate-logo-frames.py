"""Ornate vector concept boards only. Existing website branding stays untouched."""
from pathlib import Path
from xml.etree import ElementTree as ET

ET.register_namespace('', 'http://www.w3.org/2000/svg')
source = ET.parse('public/brand/giansy-logo-burgundy.svg').getroot()
letters = ''.join(ET.tostring(source[i], encoding='unicode') for i in [4, 5])
out = Path('assets/logo-concepts')

def p(d, **kw):
    attrs = ' '.join(f'{k.replace("_", "-")}="{v}"' for k,v in kw.items())
    return f'<path d="{d}" {attrs}/>'

def mirrored(art):
    return art + f'<g transform="translate(620 0) scale(-1 1)">{art}</g>'

def top_bottom(art):
    return art + f'<g transform="translate(0 388) scale(1 -1)">{art}</g>'

# Carved acanthus, with a lobed silhouette, rolled tip and fine engraved ribs.
leaf = p('M310 54C300 49 299 39 288 33C275 25 263 31 252 30C241 29 236 22 227 29C237 28 239 39 250 44C258 47 264 44 266 40C271 49 280 50 284 45C291 51 296 49 299 56C303 66 297 77 290 76C284 75 283 69 287 66C290 64 293 66 292 69C297 67 294 61 289 62C280 63 279 74 286 80C299 91 315 73 310 54Z', fill='__PAPER__', stroke_width='1.7')
leaf += p('M232 30C247 34 249 41 259 41M249 32C254 34 257 38 260 40M259 33C265 34 269 40 271 44M269 33C277 35 280 40 281 46M281 36C287 39 290 43 291 48M294 45C305 57 305 70 296 78M288 78C293 80 298 77 301 73', stroke_width='.7')
leaf += p('M310 50C306 41 306 34 310 26C314 34 314 41 310 50ZM307 51Q310 56 313 51', fill='__PAPER__', stroke_width='1.25')
crest = mirrored(leaf)

side = p('M59 154C70 155 83 166 78 177C74 186 64 184 63 178C61 171 69 168 72 173C76 162 62 161 59 154ZM58 176C54 184 61 194 73 196C83 198 84 207 80 213C82 204 76 204 70 204C60 204 58 211 62 217C53 214 51 201 57 194C48 188 48 180 58 176ZM60 218C71 218 79 228 73 235C68 240 62 236 64 231C67 235 72 232 70 228C69 224 64 223 60 218Z', fill='__PAPER__', stroke_width='1.35')
side += p('M61 159C66 162 74 164 76 170M58 181C55 188 64 194 71 195M57 199C59 204 62 201 67 201M62 221L68 225', stroke_width='.6')

frame1 = 'M310 47C270 19 204 39 163 75C140 95 117 94 94 115C64 141 57 169 57 194C57 229 71 257 98 276C126 295 143 296 163 314C205 350 271 365 310 339C349 365 415 350 457 314C477 296 494 295 522 276C549 257 563 229 563 194C563 169 556 141 526 115C503 94 480 95 457 75C416 39 350 19 310 47Z'

def borders(d):
    return (p(d, stroke_width='2.1')
            + p(d, transform='translate(310 194) scale(.982 .971) translate(-310 -194)', stroke_width='.7')
            + p(d, transform='translate(310 194) scale(.944 .899) translate(-310 -194)', stroke_width='1.7', stroke_dasharray='.1 4.3'))

a = borders(frame1) + top_bottom(crest) + mirrored(side)

frame2 = 'M310 35C265 12 224 33 192 50C165 63 141 59 120 59C112 81 97 94 74 98C70 118 57 130 38 138C27 157 26 177 23 194C26 211 27 231 38 250C57 258 70 270 74 290C97 294 112 307 120 329C141 329 165 325 192 338C224 355 265 376 310 353C355 376 396 355 428 338C455 325 479 329 500 329C508 307 523 294 546 290C550 270 563 258 582 250C593 231 594 211 597 194C594 177 593 157 582 138C563 130 550 118 546 98C523 94 508 81 500 59C479 59 455 63 428 50C396 33 355 12 310 35Z'
b = borders(frame2)
b += top_bottom(f'<g transform="translate(310 40) scale(1.16 1.12) translate(-310 -54)">{crest}</g>')
corner = p('M119 62C117 79 112 91 100 99C92 104 82 101 81 94C80 87 87 83 92 87C88 85 85 90 88 92C94 98 101 87 102 81C95 88 86 82 88 75C96 80 103 72 105 64C108 73 115 69 119 62ZM96 109C81 117 70 127 69 139C69 150 79 154 84 147C88 141 83 136 80 138C82 140 81 145 77 143C70 138 81 128 87 125C79 134 84 140 91 140C86 132 95 121 96 109Z', fill='__PAPER__', stroke_width='1.4')
corner += p('M111 68C109 83 101 97 89 98M88 116C77 126 69 138 73 146M105 81L111 77M100 88L106 85M77 128L80 131M74 135L77 137', stroke_width='.65')
corners = mirrored(corner)
b += corners + f'<g transform="translate(0 388) scale(1 -1)">{corners}</g>'
b += '<g transform="translate(-29 0)">' + side + '</g>'
b += '<g transform="translate(649 0) scale(-1 1)">' + side + '</g>'

options = [
    ('04-incisione', '01 — L’incisione d’epoca', 'La più vicina al riferimento: volute intagliate e bordo puntinato.', a),
    ('05-barocco', '02 — Il cartiglio barocco', 'Più ricco: acanto inciso anche negli angoli e profilo sagomato.', b),
]
for slug, title, desc, frame in options:
    art = '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">' + frame + '</g>' + letters
    def graphic(ground): return art.replace('__PAPER__', ground)
    (out / f'{slug}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 390" color="#400102">{graphic("#faf7f0")}</svg>')
    board = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="660" viewBox="0 0 1200 660">
    <rect width="1200" height="660" fill="#faf7f0"/>
    <text x="55" y="62" font-family="Georgia,serif" font-size="31" fill="#400102">{title}</text>
    <text x="55" y="95" font-family="Georgia,serif" font-size="18" fill="#817468">{desc}</text>
    <svg x="45" y="126" width="720" height="453" viewBox="0 0 620 390" color="#400102">{graphic('#faf7f0')}</svg>
    <rect x="825" y="133" width="320" height="433" rx="2" fill="#400102"/>
    <svg x="845" y="255" width="280" height="176" viewBox="0 0 620 390" color="#f3e6cc">{graphic('#400102')}</svg>
    <text x="985" y="535" text-anchor="middle" font-family="Georgia,serif" font-size="14" letter-spacing="1" fill="#f3e6cc">AVORIO SU BORGOGNA</text>
    <path d="M55 607H1145" stroke="#dfd5c6"/>
    <text x="55" y="637" font-family="Georgia,serif" font-size="16" fill="#817468">Studi della cornice — scritta invariata, nessuna modifica al sito.</text></svg>'''
    (out / f'{slug}-preview.svg').write_text(board)
print('Saved two ornate vector studies.')
