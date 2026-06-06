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

# Extract all paths
paths = re.findall(r'<path.*?</path>', svg, re.DOTALL)

modified_paths = []
for p in paths:
    for old_id, new_id in id_map.items():
        if 'id="' + old_id + '"' in p or "id='" + old_id + "'" in p:
            p = p.replace('id="' + old_id + '"', 'id="' + new_id + '"')
            p = p.replace("id='" + old_id + "'", 'id="' + new_id + '"')
            break
    # Add class
    p = re.sub(r'class="[^"]*"', '', p) # remove old class
    p = p.replace('<path', '<path class="province-path"')
    modified_paths.append(p)

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

old_svg_match = re.search(r'<svg[^>]*id="nepalMap"[^>]*>.*?</svg>', html, re.DOTALL)

if not old_svg_match:
    print("Could not find old SVG")
    exit(1)

svg_header = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="3.15 89 634.43 322.10" id="nepalMap">'
paths_str = '\n'.join(modified_paths)

dots = '''
            <!-- Hub dots -->
            <circle cx="328" cy="231" r="3" fill="#2563EB" stroke="var(--bg-secondary)" stroke-width="1.5" />
            <text x="336" y="235" font-size="8" font-family="Inter" font-weight="600" fill="var(--accent-color)" letter-spacing="1">KTM</text>

            <circle cx="228" cy="227" r="3" fill="#2563EB" stroke="var(--bg-secondary)" stroke-width="1.5" />
            <text x="236" y="231" font-size="8" font-family="Inter" font-weight="600" fill="var(--accent-color)" letter-spacing="1">POKHARA</text>

            <circle cx="466" cy="283" r=\"3\" fill="#10B981" stroke="var(--bg-secondary)" stroke-width="1.5" />
            <text x="474" y="287" font-size="8" font-family="Inter" font-weight="600" fill="var(--accent-emerald)" letter-spacing="1">BIRATNAGAR</text>
'''

replacement = svg_header + '\n' + paths_str + '\n' + dots + '\n</svg>'

html = html.replace(old_svg_match.group(0), replacement)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Success')
