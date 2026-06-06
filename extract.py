with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()
start = html.find('<svg version="1.1"')
end = html.find('</svg>', start) + 6
with open("test_svg.svg", "w", encoding="utf-8") as f:
    f.write(html[start:end])
