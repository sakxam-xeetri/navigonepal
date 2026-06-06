with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

img_tag = '<img src="nepal.png" class="map-image-bg" alt="Nepal Map Background" onerror="this.style.display=\'none\'">'
html = html.replace(img_tag, '')
html = html.replace('          \n', '') # Cleanup empty line

old_svg = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 666 374" preserveAspectRatio="xMidYMid meet" id="nepalMap">\n<g transform="translate(65, 2) scale(0.906325, 1.142502) translate(-3.15, -89)">'
new_svg = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="3.15 89 634.43 322.10" id="nepalMap">'
html = html.replace(old_svg, new_svg)

html = html.replace('</g>\n</svg>', '</svg>')

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
