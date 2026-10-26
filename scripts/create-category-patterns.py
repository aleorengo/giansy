"""Themed button motifs and colour variants of the approved cookie repeat."""
from pathlib import Path
from copy import deepcopy
import xml.etree.ElementTree as E
NS='http://www.w3.org/2000/svg';E.register_namespace('',NS)
out=Path('public/images/category-patterns');out.mkdir(parents=True,exist_ok=True)
palette={
 'christmas':('#260002','#58121b'),
 'halloween':('#7c351c','#9b4f2b'),
 'occasions':('#bd8589','#9d6469'),
 'timeless':('#080f22','#1b2943'),
 'mixed':('#172d18','#345337'),
 'jams':('#d6b89a','#a27e5e')}

def recolor(root, colors):
 for element in root.iter():
  for attr in ('fill','stroke','color'):
   if element.get(attr) in colors:
    element.set(attr,colors[element.get(attr)])
shapes={
 'tree':'<path d="M12 1 6 8h3L3 15h4l-6 7h9v3h4v-3h9l-6-7h4l-6-7h3Z" fill="currentColor"/>',
 'snow':'<g fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"><path d="M12 1v22M2.5 6.5l19 11M2.5 17.5l19-11M9 3l3 3 3-3M9 21l3-3 3 3M3 10l4-1-1-4M21 14l-4 1 1 4M6 19l1-4-4-1M18 5l-1 4 4 1"/></g>',
 'bat':'<path d="M1 6q4-1 7 2L10 3l2 2 2-2 2 5q3-3 7-2-2 3-2 7-3-2-5 0l-4 5-4-5q-2-2-5 0 0-4-2-7Z" fill="currentColor"/>',
 'flower':'<g fill="currentColor"><ellipse cx="12" cy="6" rx="3" ry="5"/><ellipse cx="12" cy="18" rx="3" ry="5"/><ellipse cx="6" cy="12" rx="5" ry="3"/><ellipse cx="18" cy="12" rx="5" ry="3"/><circle cx="12" cy="12" r="3" fill="#260002"/></g>',
 'sprig':'<g fill="currentColor" stroke="currentColor" stroke-width=".8"><path d="M12 23Q8 11 16 1" fill="none"/><path d="M12 18Q2 17 4 10q8 0 8 8ZM12 13q9 0 9-7-8 0-9 7ZM14 7Q7 7 9 1q7 0 5 6Z"/></g>',
 'cookie':'<g fill="currentColor"><path d="M22 12q0 2-2 3 1 2-1 4t-4 1q-1 2-3 2t-3-2q-2 1-4-1t-1-4q-2-1-2-3t2-3Q3 7 5 5t4-1q1-2 3-2t3 2q2-1 4 1t1 4q2 1 2 3Z"/><g fill="#260002"><circle cx="8" cy="8" r="1.2"/><circle cx="15" cy="7" r="1.1"/><circle cx="12" cy="12" r="1.1"/><circle cx="7" cy="15" r="1"/><circle cx="16" cy="16" r="1.3"/></g></g>',
 'gift':'<g fill="currentColor"><path d="M3 9h18v4H3ZM4 14h7v9H4ZM13 14h7v9h-7Z"/><path d="M12 9C3 9 3 0 7 2q4 0 5 7ZM12 9c9 0 9-9 5-7q-4 0-5 7Z" fill="none" stroke="currentColor" stroke-width="1.8"/></g>',
 'jar':'<g fill="none" stroke="currentColor" stroke-width="1.4"><path d="M5 4h14v3H5ZM6 8v3q-2 1-2 4v6q0 3 3 3h10q3 0 3-3v-6q0-3-2-4V8M4 8q2 3 4 0 2 3 4 0 2 3 4 0 2 3 4 0"/><path d="M9 2h6M8 18q1-5 4-2 3-3 4 2 0 3-4 4-4-1-4-4ZM12 16v-3m0 1q3-3 4-1-1 2-4 1Z"/></g>',
 'spark':'<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z" fill="currentColor"/>'
}
patterns={
 'christmas':['tree','snow','snow','tree'],
 'halloween':['bat','bat','bat','bat'],
 'occasions':['flower','sprig','sprig','flower'],
 'timeless':['cookie','cookie','cookie','cookie'],
 'mixed':['gift','gift','gift','gift'],
 'jams':['jar','jar','jar','jar']}
for name,motifs in patterns.items():
 base,motif_color=palette[name]
 root=E.Element(f'{{{NS}}}svg',{'width':'160','height':'144','viewBox':'0 0 160 144'})
 E.SubElement(root,f'{{{NS}}}rect',{'width':'160','height':'144','fill':'#260002'})
 defs=E.SubElement(root,f'{{{NS}}}defs')
 for key in sorted(set(motifs)|{'spark'}):
  symbol=E.SubElement(defs,f'{{{NS}}}symbol',{'id':key,'viewBox':'0 0 24 26'})
  fragment=E.fromstring(f'<svg xmlns="{NS}">{shapes[key]}</svg>')
  symbol.extend(list(fragment))
 for row in range(-1,3):
  for col in range(-1,3):
   x=col*80+(40 if row%2 else 0)+15;y=row*72+9
   motif=motifs[(row%2)*2+col%2]
   E.SubElement(root,f'{{{NS}}}use',{'href':'#'+motif,'x':str(x),'y':str(y),'width':'34','height':'40','color':'#58121b','opacity':'.8'})
   E.SubElement(root,f'{{{NS}}}use',{'href':'#spark','x':str(x+48),'y':str(y+35),'width':'9','height':'10','color':'#58121b','opacity':'.65'})
   E.SubElement(root,f'{{{NS}}}circle',{'cx':str(x+9),'cy':str(y+57),'r':'1.3','fill':'#58121b','opacity':'.6'})
 # Every button follows the active collection's palette, keeping its own motif.
 for theme,(theme_base,theme_motif) in palette.items():
  if theme==name:
   continue
  themed=deepcopy(root)
  recolor(themed,{'#260002':theme_base,'#58121b':theme_motif})
  E.ElementTree(themed).write(out/(name+'-on-'+theme+'.svg'),encoding='unicode')
 recolor(root,{'#260002':base,'#58121b':motif_color})
 E.ElementTree(root).write(out/(name+'.svg'),encoding='unicode')
 # Keep the same seamless motif on the ivory selected button.
 selected=deepcopy(root)
 for element in selected.iter():
  for attr in ('fill','color'):
   if element.get(attr)==base:
    element.set(attr,'#f3e6cc')
   elif element.get(attr)==motif_color:
    element.set(attr,'#260002')
  if element.get('opacity'):
   element.set('opacity',str(round(float(element.get('opacity'))*.2,2)))
 E.ElementTree(selected).write(out/(name+'-selected.svg'),encoding='unicode')

# Reuse the approved logo repeat exactly, changing only its tonal palette.
product_out=Path('public/images/cookie-patterns')
product_out.mkdir(parents=True,exist_ok=True)
original=E.parse('public/images/cookie-logo-pattern.svg').getroot()
for name,(base,_) in palette.items():
 if name=='christmas':
  continue
 def tone(hex_color):
  source=tuple(int(hex_color[i:i+2],16) for i in (1,3,5))
  old_base=(38,0,2)
  new_base=tuple(int(base[i:i+2],16) for i in (1,3,5))
  if name in ('occasions','jams'):
   # Shade the warm palette uniformly; channel offsets introduce olive/purple.
   shade={'#260002':1,'#240003':.93,'#34070b':.94,'#2b0306':.98,'#300508':.96,'#39090e':.91,'#87594c':.55}[hex_color]
   return '#'+''.join(f'{round(n*shade):02x}' for n in new_base)
  return '#'+''.join(f'{max(0,min(255,n+s-o)):02x}' for n,s,o in zip(new_base,source,old_base))
 product=deepcopy(original)
 recolor(product,{color:tone(color) for color in ('#260002','#240003','#34070b','#2b0306','#300508','#39090e','#87594c')})
 E.ElementTree(product).write(product_out/(name+'.svg'),encoding='unicode')
