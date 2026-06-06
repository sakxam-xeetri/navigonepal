import re

id_map = {
    'province01': 'path-koshi',
    'province02': 'path-madhesh',
    'province03': 'path-bagmati',
    'province04': 'path-gandaki',
    'province05': 'path-lumbini',
    'province06': 'path-karnali',
    'province07': 'path-sudurpashchim'
}

with open('extracted_map.svg', 'r', encoding='utf-8') as f:
    svg = f.read()

for old_id, new_id in id_map.items():
    svg = svg.replace('id="' + old_id + '"', 'id="' + new_id + '"')
    svg = svg.replace("id='" + old_id + "'", 'id="' + new_id + '"')

svg = re.sub(r'class="[^"]*"', 'class="province-path"', svg)
svg = re.sub(r'<defs>.*?</defs>', '', svg, flags=re.DOTALL)
svg = re.sub(r'<style>.*?</style>', '', svg, flags=re.DOTALL)

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

old_svg_match = re.search(r'<svg viewBox="0 0 800 400" id="nepalMap">.*?</svg>', html, re.DOTALL)

if not old_svg_match:
    print("Could not find old SVG")
    exit(1)

new_svg_content = re.search(r'(<svg.*?>)(.*?)</svg>', svg, re.DOTALL)
new_svg_tag = new_svg_content.group(1).replace('id="nepal-map"', 'id="nepalMap"')
new_svg_body = new_svg_content.group(2)

dots = '''
            <!-- Hub dots -->
            <circle cx="410" cy="180" r="4" fill="#2563EB" stroke="var(--bg-secondary)" stroke-width="1.5" />
            <text x="418" y="184" font-size="8" font-family="Inter" font-weight="600" fill="var(--accent-color)" letter-spacing="1">KTM</text>

            <circle cx="285" cy="175" r="4" fill="#2563EB" stroke="var(--bg-secondary)" stroke-width="1.5" />
            <text x="293" y="179" font-size="8" font-family="Inter" font-weight="600" fill="var(--accent-color)" letter-spacing="1">POKHARA</text>

            <circle cx="585" cy="245" r="4" fill="#10B981" stroke="var(--bg-secondary)" stroke-width="1.5" />
            <text x="593" y="249" font-size="8" font-family="Inter" font-weight="600" fill="var(--accent-emerald)" letter-spacing="1">BIRATNAGAR</text>
'''

replacement = new_svg_tag + new_svg_body + dots + '</svg>'
html = html.replace(old_svg_match.group(0), replacement)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Success')
