import re
import os

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find the Our Story section
start_marker = '<!-- OUR STORY & STORYTELLING -->'
end_marker = '</section>'
start_idx = html.find(start_marker)

# Find the end of the section by looking for the next </section> after the start
end_idx = html.find(end_marker, start_idx) + len(end_marker)

# Extract the header/nav (everything before the story section)
# But wait, there are other sections before it!
# The sections in index.html:
# - <header ... id="hero">
# - <section id="impact">
# - <section id="story">
# - <section id="programs">
# - <section id="impact-map">
# We want the new pages to have the nav, hero (maybe?), and then the specific story section, and then the footer (or whatever is at the bottom).
# Actually, usually subpages don't have the huge hero and impact sections. But the user didn't specify. To be safe, we can just replace the main <main> content or replace the other sections with just the story section.
# It's safest to include the nav and the footer scripts, and just the story section.

# Let's extract the very top up to <header ... id="hero"> or maybe just before <section id="story">?
# If we keep the hero, the subpages will have the giant hero. 
# Let's keep the nav and the bottom scripts/modals.

nav_end = html.find('<!-- HERO SECTION')
nav_html = html[:nav_end]

bottom_start = html.find('<!-- Volunteer Application Modal -->') # let's find the modals and scripts
if bottom_start == -1:
    bottom_start = html.find('<!-- Contact/Partnership Form Modal -->')

# Let's extract the exact blocks for the 4 pages from within the story section
story_section = html[start_idx:end_idx]

def create_page(filename, title, content_html):
    # Adjust title
    page_html = nav_html.replace("<title>Navigo Nepal | Empowering Nepal's Future Leaders, Innovators, and Changemakers</title>", f"<title>{title} | Navigo Nepal</title>")
    
    # Update navigation links from # anchors to html files
    page_html = page_html.replace('href="#story"', 'href="our-vision.html"')
    page_html = page_html.replace('href="#foundingStoryBlock"', 'href="founding-story.html"')
    page_html = page_html.replace('href="#leadershipQuoteBlock"', 'href="leadership-message.html"')
    page_html = page_html.replace('href="#goalsGrid"', 'href="future-goals.html"')
    
    # Add a spacer for nav
    page_html += '\n  <div style="height: 100px;"></div>\n'
    
    page_html += f'\n  <!-- {title.upper()} SECTION -->\n  <section class="section section-alt" id="story">\n    <div class="container">\n'
    page_html += content_html
    page_html += '\n    </div>\n  </section>\n'
    
    # Add the bottom modals and scripts
    # Find the end of the sections to get the bottom part
    # Actually, we can just grab from '<hr class="section-divider">' after the last section, but let's just grab from <!-- Contact/Partnership Form Modal -->
    contact_modal_idx = html.find('<!-- Contact/Partnership Form Modal -->')
    if contact_modal_idx != -1:
        bottom_html = html[contact_modal_idx:]
    else:
        # fallback
        script_idx = html.find('<!-- Javascript -->')
        bottom_html = html[script_idx:]
        
    page_html += '\n' + bottom_html
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(page_html)

# Extract sub-blocks using regex or find
# 1. Vision & Core Mandate
v_start = story_section.find('<div class="story-header reveal">')
v_end = story_section.find('<!-- Leadership Quote -->')
vision_content = story_section[v_start:v_end]

# 2. Founding Story
# It has <div class="founding-story-block"> and <div class="reveal" style="margin-bottom: 3rem;"> (Timeline Title) and <div class="timeline-wrapper">
fs_start1 = story_section.find('<div class="founding-story-block')
fs_end1 = story_section.find('<!-- Mission & Vision Grid -->')
fs_start2 = story_section.find('<!-- Timeline Title -->')
fs_end2 = story_section.find('<!-- Future Goals Section -->')
founding_content = story_section[fs_start1:fs_end1] + '\n\n' + story_section[fs_start2:fs_end2]

# 3. Leadership Message
l_start = story_section.find('<!-- Leadership Quote -->')
l_end = story_section.find('<!-- Timeline Title -->')
leadership_content = story_section[l_start:l_end]

# 4. Future Goals
fg_start = story_section.find('<!-- Future Goals Section -->')
fg_end = story_section.find('</div>\n  </section>')
future_goals_content = story_section[fg_start:fg_end]

# Create the 4 pages
create_page('our-vision.html', 'Our Vision', vision_content)
create_page('founding-story.html', 'Founding Story', founding_content)
create_page('leadership-message.html', 'Leadership Message', leadership_content)
create_page('future-goals.html', 'Future Goals', future_goals_content)

# Now update index.html
# Remove the story section
new_index_html = html[:start_idx] + html[end_idx:]
# Also remove the adjacent divider? Let's remove the divider right before it
div_before = '<!-- Section Divider -->\n  <hr class="section-divider">\n\n  '
new_index_html = new_index_html.replace(div_before + '<!-- OUR STORY & STORYTELLING -->', '<!-- OUR STORY & STORYTELLING -->')

# Update links in index.html
new_index_html = new_index_html.replace('href="#story"', 'href="our-vision.html"')
new_index_html = new_index_html.replace('href="#foundingStoryBlock"', 'href="founding-story.html"')
new_index_html = new_index_html.replace('href="#leadershipQuoteBlock"', 'href="leadership-message.html"')
new_index_html = new_index_html.replace('href="#goalsGrid"', 'href="future-goals.html"')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_index_html)

print("Pages created and index.html updated successfully.")
