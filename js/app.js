// Navigo Nepal - Core Application Logic
// Orchestrates theme switching, count-up meters, SVG map states, carousels, validation, and confetti events.

document.addEventListener("DOMContentLoaded", () => {
  const CMS = window.NAVIGO_CMS;
  if (!CMS) {
    console.error("Navigo CMS data layer not detected.");
    return;
  }

  // ==================== 1. CORE LAYOUT & INTERACTIVE SHELL ====================
  
  // Theme Toggle (Dark / Light Mode)
  const themeToggle = document.getElementById("themeToggle");
  const htmlElement = document.documentElement;
  const sunIcon = themeToggle.querySelector(".sun-icon");
  const moonIcon = themeToggle.querySelector(".moon-icon");

  // Load saved preference or default to dark
  const savedTheme = localStorage.getItem("navigo-theme") || "dark";
  htmlElement.setAttribute("data-theme", savedTheme);
  updateThemeIcons(savedTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    htmlElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("navigo-theme", newTheme);
    updateThemeIcons(newTheme);
  });

  function updateThemeIcons(theme) {
    if (theme === "dark") {
      sunIcon.style.display = "block";
      moonIcon.style.display = "none";
    } else {
      sunIcon.style.display = "none";
      moonIcon.style.display = "block";
    }
  }

  // Hamburger Menu
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");
  
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mobileNav.classList.toggle("open");
  });

  // Close mobile nav when clicking a link
  document.querySelectorAll(".mobile-nav-link").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      mobileNav.classList.remove("open");
    });
  });

  // Scroll Progress Bar & Sticky Header
  const scrollProgress = document.getElementById("scrollProgress");
  window.addEventListener("scroll", () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const percentage = (window.scrollY / totalHeight) * 100;
      scrollProgress.style.width = `${percentage}%`;
    }
  });

  // Active Link Observer
  const sections = document.querySelectorAll("header.section, section.section, footer.section");
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  const observerOptions = {
    root: null,
    rootMargin: "-25% 0px -55% 0px", // focused in middle of viewport
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        updateActiveLink(id);
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  function updateActiveLink(id) {
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${id}`) {
        link.classList.add("active");
      }
    });
    mobileNavLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${id}`) {
        link.classList.add("active");
      }
    });
  }


  // ==================== 2. CMS CONTENT RENDERING ====================
  
  // Render Hero
  document.getElementById("heroTitle").textContent = CMS.hero.title;
  document.getElementById("heroSubtitle").textContent = CMS.hero.subtitle;
  document.getElementById("heroCtaPrimary").textContent = CMS.hero.ctaPrimary;
  document.getElementById("heroCtaSecondary").textContent = CMS.hero.ctaSecondary;

  // Render Mission & Vision
  document.getElementById("storyMission").textContent = CMS.story.mission;
  document.getElementById("storyVision").textContent = CMS.story.vision;

  // Render Values List
  const coreValuesList = document.getElementById("coreValuesList");
  coreValuesList.innerHTML = CMS.story.values.map(val => `
    <div class="glass-panel glass-panel-hover" style="padding: 1.5rem 2rem;">
      <h4 style="font-size: 1.2rem; color: var(--accent-color); margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.5rem;">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        ${val.title}
      </h4>
      <p style="color: var(--text-muted); font-size: 0.95rem;">${val.desc}</p>
    </div>
  `).join("");

  // Render Impact Metrics grid
  const metricsGrid = document.getElementById("metricsGrid");
  metricsGrid.innerHTML = CMS.impactMetrics.map(metric => `
    <div class="glass-panel glass-panel-hover metric-card" data-target="${metric.value}" data-suffix="${metric.suffix}">
      <div class="metric-number">0</div>
      <div class="metric-label">${metric.label}</div>
      <div class="metric-icon-bg">${metric.id[0].toUpperCase()}</div>
    </div>
  `).join("");

  // Render Milestones Timeline
  const timelineContainer = document.getElementById("timelineContainer");
  timelineContainer.innerHTML = CMS.story.timeline.map((mile, idx) => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-year">${mile.year}</div>
      <div class="glass-panel timeline-content">
        <h4 style="font-size: 1.25rem; color: var(--text-main); margin-bottom: 0.5rem;">${mile.title}</h4>
        <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">${mile.desc}</p>
      </div>
    </div>
  `).join("");

  // Render Programs
  const programsGrid = document.getElementById("programsGrid");
  programsGrid.innerHTML = CMS.programs.map(prog => `
    <div class="glass-panel glass-panel-hover program-card">
      <div class="program-icon icon-${prog.color}">
        ${getProgramIcon(prog.id)}
      </div>
      <h3>${prog.title}</h3>
      <p>${prog.shortDesc}</p>
      <div class="program-learn-more" data-id="${prog.id}">
        Learn More 
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </div>
    </div>
  `).join("");

  function getProgramIcon(id) {
    // Custom SVGs corresponding to program area
    if (id === 'stem') return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/></svg>`;
    if (id === 'olympiad') return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4.5V12h7.5"/><circle cx="12" cy="12" r="10"/></svg>`;
    if (id === 'leadership') return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`;
    if (id === 'career') return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>`;
    if (id === 'clubs') return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 2.7-2 3.5h19c0-.8-.5-2.24-2-3.5"/><path d="M22 10a10 10 0 0 0-20 0"/></svg>`;
    if (id === 'mentorship') return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
    if (id === 'entrepreneurship') return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .3 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01 M18 12h.01"/></svg>`; // finance/default wallet
  }

  // Render Testimonials Carousel Slides
  const carouselContainer = document.getElementById("carouselContainer");
  carouselContainer.innerHTML = CMS.successStories.map(story => `
    <div class="carousel-slide">
      <div class="testimonial-card">
        <div class="testimonial-img-wrapper">
          <div style="width: 100%; height: 100%; background: linear-gradient(135deg, var(--accent-color) 0%, var(--success-color) 100%); color: white; display: flex; align-items: center; justify-content: center; font-family: 'Outfit'; font-size: 2rem; font-weight: 800;">
            ${story.name[0]}
          </div>
        </div>
        <div class="testimonial-content">
          <span class="gradient-accent" style="font-weight: 700; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; display: inline-block; margin-bottom: 0.5rem;">${story.highlight}</span>
          <div class="quote-icon">“</div>
          <p class="testimonial-quote">${story.quote}</p>
          <div class="testimonial-author">${story.name}</div>
          <div class="testimonial-meta">${story.role} &bull; ${story.location}</div>
        </div>
      </div>
    </div>
  `).join("");

  // Render Team Grid
  const teamGrid = document.getElementById("teamGrid");
  teamGrid.innerHTML = CMS.team.map(member => `
    <div class="glass-panel team-card">
      <div class="team-img-box">
        <!-- Custom premium styled gradient fallback representing youth leader avatar -->
        <div style="width: 100%; height: 100%; background: linear-gradient(135deg, rgba(10,35,66,0.8) 0%, rgba(37,99,235,0.7) 100%); display: flex; align-items: center; justify-content: center; color: white;">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </div>
        <div class="team-bio-overlay">
          <p>${member.bio}</p>
        </div>
      </div>
      <div class="team-info">
        <h3>${member.name}</h3>
        <div class="team-role">${member.role}</div>
        <a href="${member.linkedin}" target="_blank" class="team-linkedin" aria-label="${member.name} LinkedIn Profile" rel="noopener">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
      </div>
    </div>
  `).join("");

  // Render Partners Dynamic Ticker (Duplicated to allow endless horizontal rolling)
  const partnersTicker = document.getElementById("partnersTicker");
  const fullPartnerList = [...CMS.partners, ...CMS.partners]; // duplicate
  partnersTicker.innerHTML = fullPartnerList.map(part => `
    <div class="partner-logo-item">
      <div class="partner-avatar">${part.logoText}</div>
      <span>${part.name}</span>
    </div>
  `).join("");

  // Render Blog Grid
  const blogGrid = document.getElementById("blogGrid");
  blogGrid.innerHTML = CMS.blog.map(post => `
    <div class="glass-panel glass-panel-hover blog-post-card">
      <div class="blog-post-img">
        <div style="width: 100%; height: 100%; background: linear-gradient(135deg, rgba(37,99,235,0.2) 0%, rgba(16,185,129,0.2) 100%); display: flex; align-items: center; justify-content: center;">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-color); opacity: 0.6;"><path d="M4 22V4c0-.5.2-1 .6-1.4C5 2.2 5.5 2 6 2h12c.5 0 1 .2 1.4.6.4.4.6.9.6 1.4v18l-8-4-8 4z"/></svg>
        </div>
      </div>
      <div class="blog-post-content">
        <div class="blog-post-meta">By ${post.author} &bull; ${post.date}</div>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <span class="blog-read-more">Read Full Article &rarr;</span>
      </div>
    </div>
  `).join("");

  // Render Academic Resource Downloads
  const resourcesList = document.getElementById("resourcesList");
  resourcesList.innerHTML = CMS.resources.map(res => `
    <div class="resource-item" style="border-bottom: 1px solid var(--border-color); padding-bottom: 1.25rem; margin-bottom: 1.25rem;">
      <div class="resource-header">
        <span class="resource-tag">${res.category}</span>
        <span class="resource-download-btn" data-title="${res.title}">
          ${res.format} (${res.fileSize})
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        </span>
      </div>
      <h3>${res.title}</h3>
      <p>${res.desc}</p>
    </div>
  `).join("");

  // Render Volunteer Opportunities
  const volunteerGrid = document.getElementById("volunteerGrid");
  volunteerGrid.innerHTML = CMS.volunteerPositions.map(pos => `
    <div class="glass-panel glass-panel-hover position-card">
      <div class="position-meta">
        <span class="meta-tag">${pos.type}</span>
        <span class="meta-tag meta-tag-highlight">${pos.commitment}</span>
      </div>
      <h3>${pos.title}</h3>
      <p>${pos.desc}</p>
      <button class="btn btn-secondary apply-position-btn" data-id="${pos.id}" data-title="${pos.title}" style="margin-top: auto;">
        Apply Now
      </button>
    </div>
  `).join("");

  // Render Donations Sponsorship
  const donationGrid = document.getElementById("donationGrid");
  donationGrid.innerHTML = CMS.donations.map((tier, idx) => `
    <div class="glass-panel glass-panel-hover donation-card" style="border-color: ${idx === 1 ? 'rgba(16, 185, 129, 0.25)' : 'var(--border-glass)'};">
      <div class="donation-tier-header">
        <span class="gradient-accent" style="font-weight: 800; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em;">${idx === 1 ? 'CLUB LEVEL SUPPORT' : 'INDIVIDUAL EMPOWERMENT'}</span>
        <h3 style="font-size: 1.5rem; margin-top: 0.25rem;">${tier.title}</h3>
        <div class="donation-amount-wrapper">
          <span class="donation-currency">₨</span>
          <span class="donation-val">${tier.amount}</span>
          <span class="donation-period">/ ${tier.period}</span>
        </div>
        <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; margin-top: 0.5rem;">${tier.desc}</p>
      </div>
      
      <ul class="donation-features">
        ${tier.features.map(feat => `
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            ${feat}
          </li>
        `).join("")}
      </ul>

      <button class="btn ${idx === 1 ? 'btn-primary' : 'btn-secondary'} sponsor-checkout-btn" data-amount="${tier.amount}" data-title="${tier.title}" data-period="${tier.period}" data-id="tier-${idx}">
        Secure Sponsorship
      </button>
    </div>
  `).join("");


  // ==================== 3. ANIMATED STATISTICS COUNTERS ====================
  
  const metricCards = document.querySelectorAll(".metric-card");
  
  const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        if (!card.classList.contains("animated")) {
          card.classList.add("animated");
          animateCounter(card);
        }
      }
    });
  }, { threshold: 0.2 });

  metricCards.forEach(card => metricObserver.observe(card));

  function animateCounter(card) {
    const numEl = card.querySelector(".metric-number");
    const targetValue = parseInt(card.getAttribute("data-target"));
    const suffix = card.getAttribute("data-suffix");
    
    let current = 0;
    const duration = 1500; // ms
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      current = Math.floor(easeProgress * targetValue);
      
      if (targetValue >= 1000) {
        numEl.textContent = formatMetricNumber(current) + suffix;
      } else {
        numEl.textContent = current + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        if (targetValue >= 1000) {
          numEl.textContent = formatMetricNumber(targetValue) + suffix;
        } else {
          numEl.textContent = targetValue + suffix;
        }
      }
    }

    requestAnimationFrame(update);
  }

  function formatMetricNumber(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + ",000";
    }
    return num.toString();
  }


  // ==================== 4. INTERACTIVE NEPAL SVG MAP ====================
  
  const provincePaths = document.querySelectorAll(".province-path");
  const mapStatsPanel = document.getElementById("mapStatsPanel");

  provincePaths.forEach(path => {
    path.addEventListener("click", () => {
      // Toggle active states
      provincePaths.forEach(p => p.classList.remove("active"));
      path.classList.add("active");
      
      const provinceId = path.getAttribute("id").replace("path-", "");
      const provData = CMS.provinces.find(p => p.id === provinceId);
      
      if (provData) {
        updateMapPanel(provData);
      }
    });

    path.addEventListener("mouseover", () => {
      if (!path.classList.contains("active")) {
        path.style.fill = "rgba(37, 99, 235, 0.15)";
      }
    });

    path.addEventListener("mouseout", () => {
      if (!path.classList.contains("active")) {
        path.style.fill = "";
      }
    });
  });

  function updateMapPanel(data) {
    // Elegant details panel loading with metrics and percentages
    const maxStudents = 10000;
    const maxSchools = 50;
    const studentPercent = Math.min((data.students / maxStudents) * 100, 100);
    const schoolPercent = Math.min((data.schools / maxSchools) * 100, 100);

    mapStatsPanel.innerHTML = `
      <div>
        <span class="gradient-accent" style="font-weight: 700; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em;">PROVINCIAL FOOTPRINT</span>
        <h3 style="font-size: 1.6rem; font-weight: 800; margin-top: 0.15rem; color: var(--text-main);">${data.name}</h3>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 1.25rem; border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); padding: 1.5rem 0;">
        <!-- Schools bar -->
        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.35rem;">
            <span>Schools Connected</span>
            <span style="color: var(--accent-color);">${data.schools} Hubs</span>
          </div>
          <div style="width: 100%; height: 6px; background: var(--border-color); border-radius: 3px; overflow: hidden;">
            <div style="width: ${schoolPercent}%; height: 100%; background: var(--accent-color); border-radius: 3px; transition: width 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);"></div>
          </div>
        </div>

        <!-- Students bar -->
        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.35rem;">
            <span>Students Reached</span>
            <span style="color: var(--success-color);">${data.students.toLocaleString()} Students</span>
          </div>
          <div style="width: 100%; height: 6px; background: var(--border-color); border-radius: 3px; overflow: hidden;">
            <div style="width: ${studentPercent}%; height: 100%; background: var(--success-color); border-radius: 3px; transition: width 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);"></div>
          </div>
        </div>

        <!-- Clubs Tag -->
        <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem; font-weight: 600;">
          <span>Active Navigo Clubs</span>
          <span style="padding: 0.25rem 0.75rem; border-radius: 9999px; background: rgba(16, 185, 129, 0.08); color: var(--success-color);">${data.clubs} Clubs</span>
        </div>
      </div>

      <div>
        <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.25rem; color: var(--text-main);">Primary Focus:</h4>
        <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5;">${data.leadProgram}</p>
        
        <h4 style="font-size: 0.95rem; font-weight: 700; margin-top: 1rem; margin-bottom: 0.25rem; color: var(--text-main);">Recent Milestone:</h4>
        <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; font-style: italic;">"${data.milestone}"</p>
      </div>
    `;
  }

  // Pre-load default state (Bagmati Province)
  const defaultPath = document.getElementById("path-bagmati");
  if (defaultPath) {
    defaultPath.classList.add("active");
    const bagmatiData = CMS.provinces.find(p => p.id === "bagmati");
    if (bagmatiData) updateMapPanel(bagmatiData);
  }


  // ==================== 5. TESTIMONIALS SLIDER CAROUSEL ====================
  
  const carousel = document.getElementById("carouselContainer");
  const slides = document.querySelectorAll(".carousel-slide");
  const navDotsWrapper = document.getElementById("carouselNav");
  let activeIndex = 0;
  const slideCount = slides.length;
  let autoplayInterval;

  // Build Pagination navigation dots
  navDotsWrapper.innerHTML = CMS.successStories.map((_, idx) => `
    <button class="carousel-dot ${idx === 0 ? 'active' : ''}" aria-label="View Story ${idx+1}"></button>
  `).join("");

  const dots = navDotsWrapper.querySelectorAll(".carousel-dot");
  
  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      goToSlide(idx);
      resetAutoplay();
    });
  });

  function goToSlide(index) {
    if (index < 0) index = slideCount - 1;
    if (index >= slideCount) index = 0;
    
    activeIndex = index;
    carousel.style.transform = `translateX(-${activeIndex * 100}%)`;
    
    dots.forEach((dot, idx) => {
      if (idx === activeIndex) dot.classList.add("active");
      else dot.classList.remove("active");
    });
  }

  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      goToSlide(activeIndex + 1);
    }, 6000);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  // Start sliding loop
  startAutoplay();


  // ==================== 6. PREMIUM INTERACTIVE MODAL DIALOGUES ====================
  
  // A. Program description modal
  const programModal = document.getElementById("programModal");
  const closeProgramModal = document.getElementById("closeProgramModal");
  
  document.querySelectorAll(".program-learn-more").forEach(btn => {
    btn.addEventListener("click", () => {
      const progId = btn.getAttribute("data-id");
      const prog = CMS.programs.find(p => p.id === progId);
      
      if (prog) {
        document.getElementById("modalProgramTag").textContent = prog.title.toUpperCase();
        document.getElementById("modalProgramTitle").textContent = prog.title;
        document.getElementById("modalProgramBody").innerHTML = `
          <p style="margin-bottom: 1.5rem; font-size: 1.1rem; font-weight: 500; color: var(--text-main);">${prog.shortDesc}</p>
          <p style="color: var(--text-muted); line-height: 1.8;">${prog.fullDesc}</p>
          
          <div style="margin-top: 2rem; padding: 1.5rem; border-radius: 16px; background: rgba(37,99,235,0.05); border: 1px dashed rgba(37,99,235,0.2); display: flex; align-items: center; gap: 1rem;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-color);"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">Want this program in your local school? Reach out via our <a href="#contact" onclick="document.getElementById('programModal').classList.remove('active');" style="color: var(--accent-color); font-weight: 600;">Contact Form</a> to establish a new School Club hub.</p>
          </div>
        `;
        programModal.classList.add("active");
      }
    });
  });

  closeProgramModal.addEventListener("click", () => programModal.classList.remove("active"));
  
  // B. Volunteer Application modal
  const volunteerModal = document.getElementById("volunteerModal");
  const closeVolunteerModal = document.getElementById("closeVolunteerModal");
  const volPositionInput = document.getElementById("volunteerPositionId");
  const volTitleEl = document.getElementById("modalVolunteerTitle");

  document.querySelectorAll(".apply-position-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const posId = btn.getAttribute("data-id");
      const posTitle = btn.getAttribute("data-title");
      
      volPositionInput.value = posId;
      volTitleEl.textContent = `Apply as ${posTitle}`;
      volunteerModal.classList.add("active");
    });
  });

  closeVolunteerModal.addEventListener("click", () => volunteerModal.classList.remove("active"));

  // C. Donation Checkout modal
  const donationModal = document.getElementById("donationModal");
  const closeDonationModal = document.getElementById("closeDonationModal");
  
  document.querySelectorAll(".sponsor-checkout-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const title = btn.getAttribute("data-title");
      const amount = btn.getAttribute("data-amount");
      const period = btn.getAttribute("data-period");

      document.getElementById("donationTierId").value = id;
      document.getElementById("modalDonationTitle").textContent = title;
      document.getElementById("checkoutTierLabel").textContent = title;
      document.getElementById("checkoutTierAmount").textContent = `₨ ${amount}`;
      document.getElementById("checkoutTierPeriod").textContent = `/ ${period}`;
      
      donationModal.classList.add("active");
    });
  });

  closeDonationModal.addEventListener("click", () => donationModal.classList.remove("active"));

  // Close modals when clicking outside content card
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      e.target.classList.remove("active");
    }
  });


  // ==================== 7. FORM VALIDATIONS & CELEBRATION EVENTS ====================
  
  // Confetti Physics engine inside pure HTML canvas
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  let confettiActive = false;
  let particles = [];
  const colors = ["#2563EB", "#10B981", "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#EC4899"];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  class ConfettiParticle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * -canvas.height - 20;
      this.size = Math.random() * 8 + 6;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.speedY = Math.random() * 3 + 2;
      this.speedX = Math.random() * 2 - 1;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = Math.random() * 2 - 1;
    }
    
    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.rotation += this.rotationSpeed;
      if (this.y > canvas.height) {
        this.y = -20;
        this.x = Math.random() * canvas.width;
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x + this.size/2, this.y + this.size/2);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
      ctx.restore();
    }
  }

  function launchConfettiShower() {
    particles = [];
    for (let i = 0; i < 150; i++) {
      particles.push(new ConfettiParticle());
    }
    
    confettiActive = true;
    let frameCount = 0;
    
    function loop() {
      if (!confettiActive) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      frameCount++;
      if (frameCount < 240) { // shower for ~4 seconds
        requestAnimationFrame(loop);
      } else {
        confettiActive = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    
    requestAnimationFrame(loop);
  }

  // A. Contact Form validation
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please provide a valid email address.");
      return;
    }

    // Success flow
    launchConfettiShower();
    alert(`Thank you, ${name}! Your request has been dispatched. Our team will contact you shortly.`);
    contactForm.reset();
  });

  // B. Volunteer Form validation
  const volunteerForm = document.getElementById("volunteerForm");
  volunteerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = document.getElementById("volName").value.trim();
    const email = document.getElementById("volEmail").value.trim();
    const phone = document.getElementById("volPhone").value.trim();
    const district = document.getElementById("volDistrict").value.trim();
    const bio = document.getElementById("volBio").value.trim();

    if (!name || !email || !phone || !district || !bio) {
      alert("Please fill in all registration fields.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please provide a valid email.");
      return;
    }

    // Success flow
    volunteerModal.classList.remove("active");
    launchConfettiShower();
    alert(`Registration Successful! Thank you ${name} for stepping forward to lead student empowerment in ${district}. Check your inbox for confirmation guides.`);
    volunteerForm.reset();
  });

  // C. Donation checkout Form validation
  const donationForm = document.getElementById("donationForm");
  donationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = document.getElementById("donorName").value.trim();
    const email = document.getElementById("donorEmail").value.trim();
    const phone = document.getElementById("donorPhone").value.trim();
    const payment = document.getElementById("paymentMethod").value;
    const tier = document.getElementById("checkoutTierLabel").textContent;
    const amount = document.getElementById("checkoutTierAmount").textContent;

    if (!name || !email || !phone) {
      alert("Please complete billing information details.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please provide a valid email.");
      return;
    }

    donationModal.classList.remove("active");
    launchConfettiShower();
    
    let gatewayText = "eSewa Portal";
    if (payment === 'khalti') gatewayText = "Khalti Wallet";
    if (payment === 'bank') gatewayText = "Himalayan Bank Gateway";

    alert(`Redirecting to Secure ${gatewayText}... \n\nThank you for choosing to ${tier} at ${amount}. Your support empowers public education networks across Nepal!`);
    donationForm.reset();
  });

  // D. Newsletter form validation
  const newsletterForm = document.getElementById("newsletterForm");
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("newsletterEmail").value.trim();

    if (!email || !validateEmail(email)) {
      alert("Please provide a valid email address.");
      return;
    }

    launchConfettiShower();
    alert("Subscribed! Thank you for joining the Navigo Nepal resource dispatches.");
    newsletterForm.reset();
  });

  // E. Resource click triggers
  document.querySelectorAll(".resource-download-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const title = btn.getAttribute("data-title");
      launchConfettiShower();
      alert(`Preparing Download for Navigo Guide: \n"${title}" \n\nThank you for utilizing our open academic library!`);
    });
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});
