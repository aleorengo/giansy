"""Preview-only vector studies; does not change the site's brand assets."""
from pathlib import Path
from xml.etree import ElementTree as ET

ET.register_namespace('', 'http://www.w3.org/2000/svg')
source = ET.parse('public/brand/giansy-logo-burgundy.svg').getroot()
lettering = ''.join(ET.tostring(source[i], encoding='unicode') for i in [4, 5])
bow = ET.tostring(source[3], encoding='unicode')
output = Path('assets/logo-concepts')
output.mkdir(parents=True, exist_ok=True)

def path(d, **attrs):
    return '<path d="' + d + '" ' + ' '.join(f'{k.replace("_", "-")}="{v}"' for k, v in attrs.items()) + '/>'

def outline(d, scales):
    return path(d, stroke_width='1.9') + ''.join(
        path(d, transform=f'translate(310 190) scale({x} {y}) translate(-310 -190)', stroke_width=w)
        for x, y, w in scales
    )

oval = 'M310 44C463 44 585 101 585 194C585 286 463 344 310 344C157 344 35 286 35 194C35 101 157 44 310 44Z'
option1 = outline(oval, [('.976', '.952', '.8'), ('1.014', '1.026', '.55')])
option1 += path('M256 319H285M335 319H364M310 311L315 319L310 327L305 319Z', stroke_width='1')
option1 += bow

cartouche = 'M176 60C226 60 257 32 310 32C363 32 394 60 444 60H507C510 80 525 93 549 96C551 120 567 136 588 141V239C567 244 551 260 549 284C525 287 510 300 507 320H444C394 320 363 348 310 348C257 348 226 320 176 320H113C110 300 95 287 71 284C69 260 53 244 32 239V141C53 136 69 120 71 96C95 93 110 80 113 60Z'
option2 = outline(cartouche, [('.974', '.948', '.8'), ('.989', '.979', '.45')])
for mirror in ['', 'translate(620 0) scale(-1 1)']:
    option2 += f'<g transform="{mirror}">'
    option2 += path('M110 82C110 105 95 113 78 114M113 86C118 102 111 117 94 120M119 93C124 107 119 119 109 124M77 263C94 264 109 273 110 296M93 258C110 263 118 278 114 293M108 254C119 261 125 274 120 285', stroke_width='.9')
    option2 += '</g>'
option2 += path('M285 57H300M320 57H335M310 50L314 57L310 64L306 57ZM280 324H299M321 324H340M310 316L315 324L310 332L305 324Z', stroke_width='1')

oval3 = 'M310 44C452 44 564 102 564 194C564 286 452 344 310 344C168 344 56 286 56 194C56 102 168 44 310 44Z'
option3 = outline(oval3, [('.975', '.949', '.8'), ('1.02', '1.032', '.65')])
crest = 'M310 12C305 25 307 35 310 44C313 35 315 25 310 12ZM305 43C291 12 273 18 279 31C282 38 291 40 297 35M315 43C329 12 347 18 341 31C338 38 329 40 323 35M295 48C276 37 255 35 246 47C237 60 249 71 261 65C267 62 267 54 260 54M325 48C344 37 365 35 374 47C383 60 371 71 359 65C353 62 353 54 360 54M281 47C268 43 254 43 250 51M339 47C352 43 366 43 370 51M285 50C269 50 267 69 250 73M335 50C351 50 353 69 370 73M303 47Q310 53 317 47M305 51Q310 57 315 51'
option3 += path(crest, stroke_width='1.35')
option3 += '<g transform="translate(0 388) scale(1 -1)">' + path(crest, stroke_width='1.25') + '</g>'
side = 'M58 159C44 158 33 169 38 180C42 190 53 189 55 183C57 176 48 173 46 179M55 180C38 194 41 212 53 218M57 217C43 227 44 239 56 241M46 200C41 204 42 212 46 215M39 168C33 177 35 185 41 189'
option3 += path(side, stroke_width='1.1')
option3 += '<g transform="translate(620 0) scale(-1 1)">' + path(side, stroke_width='1.1') + '</g>'

options = [
    ('01-sigillo-ovale', '01 — Il sigillo ovale', 'Un classico da antica confetteria.', option1),
    ('02-cartiglio', '02 — Il cartiglio', 'Un bordo sagomato, delicato e senza fiori.', option2),
    ('03-rococo', '03 — Il medaglione', 'Un ovale con piccole volute d’ispirazione rococò.', option3),
]
for slug, title, subtitle, frame in options:
    art = '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">' + frame + '</g>' + lettering
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 390" fill="none" color="#400102"><title>{title}</title>{art}</svg>'
    (output / f'{slug}.svg').write_text(svg)
    board = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="660" viewBox="0 0 1200 660">
      <rect width="1200" height="660" fill="#faf7f0"/>
      <text x="55" y="62" font-family="Georgia,serif" font-size="31" fill="#400102">{title}</text>
      <text x="55" y="95" font-family="Georgia,serif" font-size="18" fill="#817468">{subtitle}</text>
      <svg x="45" y="126" width="720" height="453" viewBox="0 0 620 390" color="#400102">{art}</svg>
      <rect x="825" y="133" width="320" height="433" rx="2" fill="#400102"/>
      <svg x="850" y="258" width="270" height="170" viewBox="0 0 620 390" color="#f3e6cc">{art}</svg>
      <text x="985" y="535" text-anchor="middle" font-family="Georgia,serif" font-size="14" letter-spacing="1" fill="#f3e6cc">AVORIO SU BORGOGNA</text>
      <path d="M55 607H1145" stroke="#dfd5c6"/>
      <text x="55" y="637" font-family="Georgia,serif" font-size="16" fill="#817468">Stessa scritta, tre cornici. Studio visivo — il sito non è stato modificato.</text>
    </svg>'''
    (output / f'{slug}-preview.svg').write_text(board)
print('Saved three preview-only SVG frame studies in', output)
