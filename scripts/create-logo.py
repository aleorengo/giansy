"""Create the original outlined SVG identity. Run with the Pinyon Script TTF path.
The lettering is converted to paths; the finished marks need no installed fonts.
"""
from pathlib import Path
import sys
from xml.etree import ElementTree as ET

ET.register_namespace("", "http://www.w3.org/2000/svg")
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

font = TTFont(sys.argv[1] if len(sys.argv) > 1 else "assets/fonts/PinyonScript-Regular.ttf")
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
units = font['head'].unitsPerEm

def lettering(text, size, baseline):
    scale = size / units
    width = sum(font['hmtx'][cmap[ord(c)]][0] for c in text) * scale
    x = (620 - width) / 2
    paths = []
    for c in text:
        name = cmap[ord(c)]
        pen = SVGPathPen(glyphs)
        glyphs[name].draw(TransformPen(pen, (scale, 0, 0, -scale, x, baseline)))
        paths.append(f'<path d="{pen.getCommands()}"/>')
        x += font['hmtx'][name][0] * scale
    return '<g fill="currentColor" stroke="none">' + ''.join(paths) + '</g>'

frame_source = ET.parse("assets/brand/engraved-frame.svg").getroot()
frame_art = ''.join(ET.tostring(node, encoding="unicode") for node in frame_source)
art = frame_art + lettering("Le creazioni", 73, 178) + lettering("di Giansy", 88, 253)
output = Path('public/brand')
output.mkdir(parents=True, exist_ok=True)
for name, color in [('burgundy', '#400102'), ('ivory', '#f3e6cc')]:
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 390" fill="none" color="{color}" role="img" aria-labelledby="title desc"><title id="title">Le creazioni di Giansy</title><desc id="desc">An engraved vintage cartouche with acanthus scrolls and a dotted inner border. Outlined Pinyon Script lettering.</desc>{art}</svg>'
    (output / f'giansy-logo-{name}.svg').write_text(svg)
    wordmark = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="90 83 440 200" color="{color}"><title>Le creazioni di Giansy</title>{lettering("Le creazioni", 73, 178)}{lettering("di Giansy", 88, 253)}</svg>'
    (output / f'giansy-wordmark-{name}.svg').write_text(wordmark)
monogram = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><title>Giansy monogram</title><rect width="100" height="100" rx="50" fill="#400102"/><g fill="none" stroke="#faf7f0"><ellipse cx="50" cy="50" rx="38" ry="43"/><ellipse cx="50" cy="50" rx="35" ry="40" stroke-width=".5"/><path d="M45 15Q28 0 26 14Q25 24 45 18M55 15Q72 0 74 14Q75 24 55 18M45 15Q50 11 55 15V20H45Z"/></g><g transform="translate(-186 -92) scale(.76)" color="#faf7f0">{lettering("G", 92, 228)}</g></svg>'
(output / 'giansy-monogram.svg').write_text(monogram)
Path('public/favicon.svg').write_text(monogram)
print('Created five outlined SVG brand assets and the favicon.')
