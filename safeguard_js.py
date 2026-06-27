import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Hero
js = js.replace('document.getElementById("heroTitle").textContent = CMS.hero.title;', 'if(document.getElementById("heroTitle")) document.getElementById("heroTitle").textContent = CMS.hero.title;')
js = js.replace('document.getElementById("heroSubtitle").textContent = CMS.hero.subtitle;', 'if(document.getElementById("heroSubtitle")) document.getElementById("heroSubtitle").textContent = CMS.hero.subtitle;')
js = js.replace('document.getElementById("heroCtaPrimary").textContent = CMS.hero.ctaPrimary;', 'if(document.getElementById("heroCtaPrimary")) document.getElementById("heroCtaPrimary").textContent = CMS.hero.ctaPrimary;')
js = js.replace('document.getElementById("heroCtaSecondary").textContent = CMS.hero.ctaSecondary;', 'if(document.getElementById("heroCtaSecondary")) document.getElementById("heroCtaSecondary").textContent = CMS.hero.ctaSecondary;')

# 2. Mission & Vision
js = js.replace('document.getElementById("storyMission").textContent = CMS.story.mission;', 'if(document.getElementById("storyMission")) document.getElementById("storyMission").textContent = CMS.story.mission;')
js = js.replace('document.getElementById("storyVision").textContent = CMS.story.vision;', 'if(document.getElementById("storyVision")) document.getElementById("storyVision").textContent = CMS.story.vision;')

# 3. Values List
js = js.replace('const coreValuesList = document.getElementById("coreValuesList");\n  coreValuesList.innerHTML =', 'const coreValuesList = document.getElementById("coreValuesList");\n  if (coreValuesList) coreValuesList.innerHTML =')

# 4. Timeline Container
js = js.replace('const timelineContainer = document.getElementById("timelineContainer");\n  timelineContainer.innerHTML =', 'const timelineContainer = document.getElementById("timelineContainer");\n  if (timelineContainer) timelineContainer.innerHTML =')

# 5. Carousel
js = js.replace('const carouselContainer = document.getElementById("carouselContainer");\n  carouselContainer.innerHTML =', 'const carouselContainer = document.getElementById("carouselContainer");\n  if (carouselContainer) carouselContainer.innerHTML =')

# 6. Team Grid
js = js.replace('const teamGrid = document.getElementById("teamGrid");\n  teamGrid.innerHTML =', 'const teamGrid = document.getElementById("teamGrid");\n  if (teamGrid) teamGrid.innerHTML =')

# 7. Blog Grid
js = js.replace('const blogGrid = document.getElementById("blogGrid");\n  blogGrid.innerHTML =', 'const blogGrid = document.getElementById("blogGrid");\n  if (blogGrid) blogGrid.innerHTML =')

# 8. Resources
js = js.replace('const resourcesList = document.getElementById("resourcesList");\n  resourcesList.innerHTML =', 'const resourcesList = document.getElementById("resourcesList");\n  if (resourcesList) resourcesList.innerHTML =')

# 9. Volunteer
js = js.replace('const volunteerGrid = document.getElementById("volunteerGrid");\n  volunteerGrid.innerHTML =', 'const volunteerGrid = document.getElementById("volunteerGrid");\n  if (volunteerGrid) volunteerGrid.innerHTML =')

# 10. Donation
js = js.replace('const donationGrid = document.getElementById("donationGrid");\n  donationGrid.innerHTML =', 'const donationGrid = document.getElementById("donationGrid");\n  if (donationGrid) donationGrid.innerHTML =')

# 11. Theme toggle
# The themeToggle might not be on subpages if I removed nav? But I kept nav, so themeToggle should exist.
# However, if it's missing:
js = js.replace('sunIcon.style.display', 'if(sunIcon) sunIcon.style.display')
js = js.replace('moonIcon.style.display', 'if(moonIcon) moonIcon.style.display')
js = js.replace('themeToggle.addEventListener', 'if(themeToggle) themeToggle.addEventListener')

# 12. Hamburger
js = js.replace('hamburger.addEventListener', 'if(hamburger) hamburger.addEventListener')

# 13. Scroll Progress
js = js.replace('scrollProgress.style.width', 'if(scrollProgress) scrollProgress.style.width')

# 14. Navbar scroll
js = js.replace('navbar.classList.add', 'if(navbar) navbar.classList.add')
js = js.replace('navbar.classList.remove', 'if(navbar) navbar.classList.remove')

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("Safeguarded js/app.js successfully.")
