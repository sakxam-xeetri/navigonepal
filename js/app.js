// Navigo Nepal - Premium International-Grade Application Logic
// Orchestrates theme variables, scroll animations, metric counters, map interactions, carousels, and confetti.

document.addEventListener("DOMContentLoaded", () => {
  const CMS = window.NAVIGO_CMS;
  if (!CMS) {
    console.error("Navigo CMS data layer not detected.");
    return;
  }

  // Page load animation
  requestAnimationFrame(() => {
    document.body.classList.remove('loading');
    document.body.classList.add('loaded');
  });

  // ==================== 1. LAYOUT & THEME TOGGLE ====================
  
  const themeToggle = document.getElementById("themeToggle");
  const htmlElement = document.documentElement;
  const sunIcon = themeToggle.querySelector(".sun-icon");
  const moonIcon = themeToggle.querySelector(".moon-icon");

  const savedTheme = localStorage.getItem("navigo-theme") || "light";
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

  document.querySelectorAll(".mobile-nav-link").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      mobileNav.classList.remove("open");
    });
  });

  // Scroll Progress Bar
  const scrollProgress = document.getElementById("scrollProgress");
  window.addEventListener("scroll", () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const percentage = (window.scrollY / totalHeight) * 100;
      scrollProgress.style.width = `${percentage}%`;
    }
  });

  // Navbar scroll effect
  const navbar = document.getElementById("mainNav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Active Link Observer
  const sections = document.querySelectorAll("header.section, section.section, footer.section");
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  const observerOptions = {
    root: null,
    rootMargin: "-25% 0px -55% 0px",
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


  // ==================== 2. SCROLL REVEAL ANIMATIONS ====================
  
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ==================== 3. CMS CONTENT RENDERING ====================
  
  // Render Hero
  document.getElementById("heroTitle").textContent = CMS.hero.title;
  document.getElementById("heroSubtitle").textContent = CMS.hero.subtitle;
  document.getElementById("heroCtaPrimary").textContent = CMS.hero.ctaPrimary;
  document.getElementById("heroCtaSecondary").textContent = CMS.hero.ctaSecondary;

  // Render Founding Story
  const foundingStoryText = document.getElementById("foundingStoryText");
  if (foundingStoryText && CMS.story.foundingStory) {
    foundingStoryText.textContent = CMS.story.foundingStory;
  }

  // Render Leadership Quote
  if (CMS.story.leadershipMessage) {
    const quoteText = document.getElementById("leadershipQuoteText");
    const quoteAuthor = document.getElementById("leadershipQuoteAuthor");
    const quoteRole = document.getElementById("leadershipQuoteRole");
    const quoteAvatar = document.getElementById("leadershipQuoteAvatar");
    
    if (quoteText) quoteText.textContent = CMS.story.leadershipMessage.quote;
    if (quoteAuthor) quoteAuthor.textContent = CMS.story.leadershipMessage.author;
    if (quoteRole) quoteRole.textContent = CMS.story.leadershipMessage.role;
    if (quoteAvatar) quoteAvatar.textContent = CMS.story.leadershipMessage.author[0];
  }

  // Render Mission & Vision
  document.getElementById("storyMission").textContent = CMS.story.mission;
  document.getElementById("storyVision").textContent = CMS.story.vision;

  // Render Values List
  const coreValuesList = document.getElementById("coreValuesList");
  coreValuesList.innerHTML = CMS.story.values.map((val, idx) => `
    <div class="glass-panel glass-panel-hover" style="padding: 1.75rem 2rem;">
      <h4 style="font-size: 1.15rem; color: var(--accent-color); margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.75rem; font-weight: 700;">
        <div style="width: 32px; height: 32px; background: linear-gradient(135deg, rgba(37,99,235,0.1), rgba(16,185,129,0.08)); border-radius: 0px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        ${val.title}
      </h4>
      <p style="color: var(--text-muted); font-size: 0.9rem; font-weight: 400; padding-left: 2.9rem; line-height: 1.7;">${val.desc}</p>
    </div>
  `).join("");

  // Render Impact Metrics Bento Grid
  const impactBentoGrid = document.getElementById("impactBentoGrid");
  if (impactBentoGrid) {
    let html = `
      <!-- Bento Hero Card (Spans 2 rows, 1 col on desktop) -->
      <div class="bento-card bento-hero-card reveal-left">
        <div class="bento-hero-glow"></div>
        <div class="bento-hero-content">
          <span class="gradient-accent section-label" style="margin-bottom: 0.75rem;">Measurable Footprints</span>
          <h2 class="heading-lg" style="margin-bottom: 1rem;">Our National Impact</h2>
          <p class="bento-hero-desc">
            Transparent statistics indicating our structural educational outreach, high-school clubs, and academic preparations deployed across community schools.
          </p>
          <div class="bento-hero-badge">
            <span class="pulse-dot"></span> Live Metrics Hub
          </div>
        </div>
      </div>
    `;

    html += CMS.impactMetrics.map((metric, idx) => {
      // Determine columns and styles for each metric
      let gridClass = "bento-card reveal";
      if (metric.id === "schools") {
        gridClass += " bento-card-wide reveal-right";
      } else {
        gridClass += ` stagger-${(idx % 3) + 1}`;
      }

      // Generate custom visual based on card ID
      let customVisual = "";
      if (metric.id === "schools") {
        customVisual = `
          <div class="bento-visual schools-visual">
            <div class="school-nodes">
              <span class="node hub"></span>
              <span class="node node-1"></span>
              <span class="node node-2"></span>
              <span class="node node-3"></span>
              <span class="node node-4"></span>
              <div class="node-line node-line-1"></div>
              <div class="node-line node-line-2"></div>
              <div class="node-line node-line-3"></div>
              <div class="node-line node-line-4"></div>
            </div>
            <div class="schools-progress-track">
              <div class="schools-progress-bar" style="background: ${metric.gradient};"></div>
            </div>
          </div>
        `;
      } else if (metric.id === "students") {
        customVisual = `
          <div class="bento-visual students-visual">
            <div class="avatar-stack">
              <div class="avatar av-1"><span>S1</span></div>
              <div class="avatar av-2"><span>S2</span></div>
              <div class="avatar av-3"><span>S3</span></div>
              <div class="avatar av-more"><span>+</span></div>
            </div>
            <div class="growth-pill">+12% MoM</div>
          </div>
        `;
      } else if (metric.id === "districts") {
        customVisual = `
          <div class="bento-visual districts-visual">
            <div class="radar-container">
              <div class="radar-circle rc-1"></div>
              <div class="radar-circle rc-2"></div>
              <div class="radar-circle rc-3"></div>
              <div class="radar-sweep"></div>
              <div class="radar-ping"></div>
            </div>
          </div>
        `;
      } else if (metric.id === "clubs") {
        customVisual = `
          <div class="bento-visual clubs-visual">
            <div class="gear-badge">
              <div class="gear-inner">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
              </div>
            </div>
          </div>
        `;
      } else if (metric.id === "workshops") {
        customVisual = `
          <div class="bento-visual workshops-visual">
            <svg class="sparkline" viewBox="0 0 100 30">
              <path d="M0,25 Q15,5 30,20 T60,10 T90,5 L100,5" fill="none" stroke="${metric.color}" stroke-width="2" stroke-linecap="round"></path>
              <circle cx="90" cy="5" r="3" fill="${metric.color}"></circle>
            </svg>
          </div>
        `;
      } else if (metric.id === "volunteers") {
        customVisual = `
          <div class="bento-visual volunteers-visual">
            <div class="mesh-network">
              <span class="mesh-dot md-1"></span>
              <span class="mesh-dot md-2"></span>
              <span class="mesh-dot md-3"></span>
              <span class="mesh-dot md-4"></span>
              <span class="mesh-dot md-5"></span>
            </div>
          </div>
        `;
      }

      return `
        <div class="${gridClass} metric-card" data-target="${metric.value}" data-suffix="${metric.suffix}" style="--card-color: ${metric.color};">
          <div class="bento-card-header">
            <div class="bento-icon-box" style="color: ${metric.color}; background-color: ${metric.color}12;">
              ${getMetricIcon(metric.icon)}
            </div>
            <span class="bento-label">${metric.label}</span>
          </div>
          
          <div class="bento-card-body">
            <div class="bento-number-wrapper">
              <span class="metric-number" style="background: ${metric.gradient}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">0</span>
            </div>
            <p class="bento-desc">${metric.desc || ''}</p>
          </div>
          
          ${customVisual}
        </div>
      `;
    }).join("");

    impactBentoGrid.innerHTML = html;
  }

  function getMetricIcon(icon) {
    const icons = {
      school: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 10 3 12 0v-5"/></svg>',
      users: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
      map: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>',
      award: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>',
      activity: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
      globe: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>'
    };
    return icons[icon] || icons.globe;
  }

  // Render Milestones Timeline
  const timelineContainer = document.getElementById("timelineContainer");
  timelineContainer.innerHTML = CMS.story.timeline.map((mile, idx) => `
    <div class="timeline-item reveal stagger-${(idx % 3) + 1}">
      <div class="timeline-dot"></div>
      <div class="timeline-year">${mile.year}</div>
      <div class="timeline-content">
        <h4 style="font-size: 1.2rem; color: var(--text-main); margin-bottom: 0.5rem; font-weight: 700;">${mile.title}</h4>
        <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.7;">${mile.desc}</p>
      </div>
    </div>
  `).join("");

  // Render Future Goals
  const goalsGrid = document.getElementById("goalsGrid");
  if (goalsGrid && CMS.story.futureGoals) {
    goalsGrid.innerHTML = CMS.story.futureGoals.map((goal, idx) => `
      <div class="goal-card reveal stagger-${(idx % 2) + 1}">
        <div class="goal-icon">
          ${getGoalIcon(goal.icon)}
        </div>
        <h3>${goal.title}</h3>
        <p>${goal.desc}</p>
        <div class="goal-progress-bar">
          <div class="goal-progress-fill" style="width: 0%;" data-progress="${goal.progress}"></div>
        </div>
        <div class="goal-progress-label">
          <span>Progress</span>
          <span>${goal.progress}%</span>
        </div>
      </div>
    `).join("");
  }

  function getGoalIcon(icon) {
    const icons = {
      target: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
      flask: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16.5h10"/></svg>',
      trophy: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
      monitor: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>'
    };
    return icons[icon] || icons.target;
  }

  // Render Programs - Helper Function to allow dynamic filtering
  function getProgramIcon(id) {
    if (id === 'stem') return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/></svg>`;
    if (id === 'olympiad') return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`;
    if (id === 'leadership') return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`;
    if (id === 'career') return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>`;
    if (id === 'clubs') return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;
    if (id === 'mentorship') return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
    if (id === 'entrepreneurship') return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .3 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01 M18 12h.01"/></svg>`;
  }

  const programsGrid = document.getElementById("programsGrid");

  function renderProgramsList(list, highlightedId = '') {
    if (!programsGrid) return;
    
    if (list.length === 0) {
      programsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; background: var(--bg-card); border: 1px dashed var(--border-color); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1.5rem; width: 100%;">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--text-muted); opacity: 0.6;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <div>
            <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--text-main);">No programs match your search</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; max-width: 400px; margin: 0 auto;">Try checking for different keywords like 'STEM', 'Math', 'Mentorship', or select another province.</p>
          </div>
          <button type="button" class="btn btn-secondary" id="resetSearchBtn" style="padding: 0.6rem 1.5rem; font-size: 0.8rem;">Show All Programs</button>
        </div>
      `;
      
      const resetBtn = document.getElementById("resetSearchBtn");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          document.getElementById("programSearchInput").value = "";
          document.getElementById("provinceSearchSelect").value = "";
          renderProgramsList(CMS.programs);
        });
      }
      return;
    }
    
    programsGrid.innerHTML = list.map((prog, idx) => {
      const isMatch = highlightedId && (prog.id === highlightedId || prog.title.toLowerCase().includes(highlightedId.toLowerCase()));
      const highlightClass = isMatch ? 'highlight-match' : '';
      return `
        <div class="program-card reveal stagger-${(idx % 3) + 1} ${highlightClass}" data-program-id="${prog.id}">
          <div class="program-icon">
            ${getProgramIcon(prog.id)}
          </div>
          <h3>${prog.title}</h3>
          <p>${prog.shortDesc}</p>
          <div class="program-learn-more" data-id="${prog.id}">
            Explore Details 
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </div>
        </div>
      `;
    }).join("");

    if (highlightedId) {
      setTimeout(() => {
        document.querySelectorAll('.program-card.highlight-match').forEach(card => {
          card.classList.remove('highlight-match');
        });
      }, 3000);
    }
    
    // Re-observe reveal elements since we replaced innerHTML
    if (revealObserver) {
      programsGrid.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
      });
    }
  }

  // Initial Render of All Programs
  renderProgramsList(CMS.programs);

  // ==================== 3b. SEARCH CONSOLE LOGIC ====================
  const searchInput = document.getElementById("programSearchInput");
  const suggestionsDropdown = document.getElementById("searchSuggestions");
  const provinceSelect = document.getElementById("provinceSearchSelect");
  const searchBtn = document.getElementById("searchSubmitBtn");

  if (searchInput && suggestionsDropdown) {
    searchInput.addEventListener("input", (e) => {
      const val = e.target.value.toLowerCase().trim();
      suggestionsDropdown.innerHTML = '';
      
      if (!val) {
        suggestionsDropdown.classList.remove("active");
        return;
      }
      
      const matches = CMS.programs.filter(p => 
        p.title.toLowerCase().includes(val) || 
        p.shortDesc.toLowerCase().includes(val)
      );
      
      if (matches.length > 0) {
        suggestionsDropdown.innerHTML = matches.slice(0, 5).map(m => `
          <div class="suggestion-item" data-id="${m.id}" data-title="${m.title}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="suggestion-icon"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <div style="display:flex; flex-direction:column;">
              <span style="font-weight:600; font-size:0.95rem; color:var(--color-deep-navy);">${m.title}</span>
              <span style="font-size:0.8rem; color:#666;">${m.shortDesc.substring(0, 45)}...</span>
            </div>
          </div>
        `).join('');
        suggestionsDropdown.classList.add("active");
      } else {
        suggestionsDropdown.classList.remove("active");
      }
    });

    suggestionsDropdown.addEventListener("click", (e) => {
      const item = e.target.closest(".suggestion-item");
      if (item) {
        searchInput.value = item.getAttribute("data-title");
        suggestionsDropdown.classList.remove("active");
        executeSearch(item.getAttribute("data-id"));
      }
    });

    document.addEventListener("click", (e) => {
      if (!searchInput.contains(e.target) && !suggestionsDropdown.contains(e.target)) {
        suggestionsDropdown.classList.remove("active");
      }
    });
  }

  function executeSearch(highlightId = '') {
    const kw = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const prov = provinceSelect ? provinceSelect.value : '';
    
    let filtered = CMS.programs;
    if (kw) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(kw) || 
        p.shortDesc.toLowerCase().includes(kw) ||
        p.fullDesc.toLowerCase().includes(kw)
      );
    }
    
    renderProgramsList(filtered, highlightId || kw);
    
    const progSec = document.getElementById("programs");
    if (progSec) {
      // Offset by header height
      const y = progSec.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    
    if (prov) {
      const mapPaths = document.querySelectorAll(".province-path");
      mapPaths.forEach(p => p.classList.remove("active"));
      
      const targetPath = document.getElementById("path-" + prov);
      if (targetPath) {
        targetPath.classList.add("active");
        
        const provData = CMS.provinces.find(p => p.id === prov);
        if (provData && typeof updateMapPanel === 'function') {
           updateMapPanel(provData);
        }
      }
    }
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", () => executeSearch());
  }
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if(suggestionsDropdown) suggestionsDropdown.classList.remove("active");
        executeSearch();
      }
    });
  }

  // Render Testimonials with images
  const carouselContainer = document.getElementById("carouselContainer");
  carouselContainer.innerHTML = CMS.successStories.map(story => `
    <div class="carousel-slide">
      <div class="testimonial-card">
        <div class="testimonial-img-wrapper">
          <img src="${story.image}" alt="${story.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'width:100%;height:100%;background:linear-gradient(135deg,rgba(37,99,235,0.15),rgba(16,185,129,0.1));display:flex;align-items:center;justify-content:center;color:var(--accent-color);font-family:Plus Jakarta Sans;font-size:2.5rem;font-weight:800;\\'>${story.name[0]}</div>'">
        </div>
        <div class="testimonial-content">
          <span class="gradient-accent" style="font-weight: 600; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; display: inline-block; margin-bottom: 0.75rem;">${story.highlight}</span>
          <p class="testimonial-quote">${story.quote}</p>
          <div class="testimonial-author">${story.name}</div>
          <div class="testimonial-meta">${story.role} &bull; ${story.location}</div>
        </div>
      </div>
    </div>
  `).join("");

  // Render Team Grid
  const teamGrid = document.getElementById("teamGrid");
  teamGrid.innerHTML = CMS.team.map((member, idx) => `
    <div class="team-card reveal stagger-${(idx % 4) + 1}">
      <div class="team-img-box">
        <div style="width: 100%; height: 100%; background: linear-gradient(135deg, rgba(10,35,66,0.9) 0%, rgba(37,99,235,0.3) 100%); display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.6);">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </div>
        <div class="team-bio-overlay">
          <p>${member.bio}</p>
        </div>
      </div>
      <div class="team-info">
        <h3>${member.name}</h3>
        <div class="team-role">${member.role}</div>
        <a href="${member.linkedin}" target="_blank" class="team-linkedin" aria-label="${member.name} LinkedIn Profile" rel="noopener">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
      </div>
    </div>
  `).join("");

  // Render Partners Ticker with actual school images
  const partnersTicker = document.getElementById("partnersTicker");
  if (partnersTicker) {
    const partnerImages = [
      "photo1.png", "photo3.png", "photo4.png", "photo5.png", 
      "photo6.png", "photo7.png", "photo8.png", "photo9.png", 
      "photo10.png", "photo11.png", "photo12.png", "photo13.png"
    ];
    // Duplicate list twice for seamless infinite scrolling loop
    const fullPartnerImagesList = [...partnerImages, ...partnerImages, ...partnerImages];
    partnersTicker.innerHTML = fullPartnerImagesList.map(imgName => `
      <div class="partner-logo-item">
        <img src="assets/partner/${imgName}" alt="Navigo Nepal Partner School" class="partner-logo-img" onerror="this.style.display='none'">
      </div>
    `).join("");
  }

  // Render Blog Grid with images
  const blogGrid = document.getElementById("blogGrid");
  blogGrid.innerHTML = CMS.blog.map(post => `
    <div class="blog-post-card reveal">
      <div class="blog-post-img">
        <img src="${post.image}" alt="${post.title}" onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'width:100%;height:100%;background:linear-gradient(135deg,rgba(37,99,235,0.08),rgba(16,185,129,0.05));display:flex;align-items:center;justify-content:center;\\'><svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'30\\' height=\\'30\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'1\\' style=\\'color:var(--accent-color);opacity:0.5\\'><path d=\\'M4 22V4c0-.5.2-1 .6-1.4C5 2.2 5.5 2 6 2h12c.5 0 1 .2 1.4.6.4.4.6.9.6 1.4v18l-8-4-8 4z\\'/></svg></div>'">
      </div>
      <div class="blog-post-content">
        <div class="blog-post-meta">By ${post.author} &bull; ${post.date}</div>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <span class="blog-read-more">Read More &rarr;</span>
      </div>
    </div>
  `).join("");

  // Render Resources
  const resourcesList = document.getElementById("resourcesList");
  resourcesList.innerHTML = CMS.resources.map(res => `
    <div class="resource-item">
      <div class="resource-header">
        <span class="resource-tag">${res.category}</span>
        <span class="resource-download-btn" data-title="${res.title}">
          ${res.format} &bull; ${res.fileSize}
        </span>
      </div>
      <h3>${res.title}</h3>
      <p>${res.desc}</p>
    </div>
  `).join("");

  // Render Volunteer Opportunities
  const volunteerGrid = document.getElementById("volunteerGrid");
  volunteerGrid.innerHTML = CMS.volunteerPositions.map((pos, idx) => `
    <div class="position-card reveal stagger-${(idx % 3) + 1}">
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

  // Render Donations
  const donationGrid = document.getElementById("donationGrid");
  donationGrid.innerHTML = CMS.donations.map((tier, idx) => `
    <div class="donation-card ${idx === 1 ? 'featured' : ''} reveal stagger-${idx + 1}">
      <div class="donation-tier-header">
        <span class="gradient-accent" style="font-weight: 600; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em;">${idx === 1 ? 'INSTITUTIONAL PARTNERSHIP' : 'INDIVIDUAL SPONSORSHIP'}</span>
        <h3 style="font-size: 1.5rem; font-weight: 700; margin-top: 0.5rem;">${tier.title}</h3>
        <div class="donation-amount-wrapper">
          <span class="donation-currency">₨</span>
          <span class="donation-val">${tier.amount}</span>
          <span class="donation-period">/ ${tier.period}</span>
        </div>
        <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.7; margin-top: 0.5rem;">${tier.desc}</p>
      </div>
      
      <ul class="donation-features">
        ${tier.features.map(feat => `
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            ${feat}
          </li>
        `).join("")}
      </ul>

      <button class="btn ${idx === 1 ? 'btn-primary' : 'btn-secondary'} sponsor-checkout-btn" data-amount="${tier.amount}" data-title="${tier.title}" data-period="${tier.period}" data-id="tier-${idx}">
        Secure Sponsorship
      </button>
    </div>
  `).join("");

  // Re-observe newly created reveal elements
  document.querySelectorAll('.reveal:not(.revealed), .reveal-left:not(.revealed), .reveal-right:not(.revealed), .reveal-scale:not(.revealed)').forEach(el => {
    revealObserver.observe(el);
  });


  // ==================== 4. SCROLL METRIC COUNTERS ====================
  
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
  }, { threshold: 0.1 });

  metricCards.forEach(card => metricObserver.observe(card));

  function animateCounter(card) {
    const numEl = card.querySelector(".metric-number");
    const targetValue = parseInt(card.getAttribute("data-target"));
    const suffix = card.getAttribute("data-suffix");
    
    let current = 0;
    const duration = 2000;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      current = Math.floor(easeProgress * targetValue);
      
      numEl.textContent = formatMetricNumber(current) + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        numEl.textContent = formatMetricNumber(targetValue) + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  function formatMetricNumber(num) {
    if (num >= 1000) {
      return num.toLocaleString();
    }
    return num.toString();
  }


  // ==================== 4b. GOAL PROGRESS BAR ANIMATION ====================
  
  const goalCards = document.querySelectorAll(".goal-progress-fill");
  
  const goalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const progress = fill.getAttribute("data-progress");
        setTimeout(() => {
          fill.style.width = progress + "%";
        }, 300);
        goalObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.1 });

  goalCards.forEach(fill => goalObserver.observe(fill));


  // ==================== 5. NEPAL SVG MAP INTERACTIONS ====================
  
  const provincePaths = document.querySelectorAll(".province-path");
  const mapStatsPanel = document.getElementById("mapStatsPanel");

  provincePaths.forEach(path => {
    path.addEventListener("click", () => {
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
        path.style.fill = "rgba(37, 99, 235, 0.08)";
      }
    });

    path.addEventListener("mouseout", () => {
      if (!path.classList.contains("active")) {
        path.style.fill = "";
      }
    });
  });

  function updateMapPanel(data) {
    const maxStudents = 10000;
    const maxSchools = 50;
    const studentPercent = Math.min((data.students / maxStudents) * 100, 100);
    const schoolPercent = Math.min((data.schools / maxSchools) * 100, 100);

    mapStatsPanel.innerHTML = `
      <div>
        <span class="gradient-accent" style="font-weight: 600; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em;">PROVINCIAL FOOTPRINT</span>
        <h3 style="font-size: 1.5rem; font-weight: 700; margin-top: 0.25rem; color: var(--text-main);">${data.name}</h3>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 1.25rem; border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); padding: 1.25rem 0;">
        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 500; margin-bottom: 0.5rem;">
            <span>Schools Connected</span>
            <span style="color: var(--accent-color); font-weight: 700;">${data.schools} Hubs</span>
          </div>
          <div style="width: 100%; height: 4px; background: var(--border-color); overflow: hidden;">
            <div style="width: ${schoolPercent}%; height: 100%; background: var(--gradient-primary); transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);"></div>
          </div>
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 500; margin-bottom: 0.5rem;">
            <span>Students Reached</span>
            <span style="color: var(--accent-color); font-weight: 700;">${data.students.toLocaleString()} Students</span>
          </div>
          <div style="width: 100%; height: 4px; background: var(--border-color); overflow: hidden;">
            <div style="width: ${studentPercent}%; height: 100%; background: linear-gradient(90deg, #2563EB, #10B981); transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);"></div>
          </div>
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.8rem; font-weight: 500;">
          <span>Active Navigo Clubs</span>
          <span style="background: linear-gradient(135deg, rgba(37,99,235,0.1), rgba(16,185,129,0.1)); padding: 0.25rem 0.75rem; color: var(--accent-color); font-weight: 700; font-size: 0.78rem;">${data.clubs} Clubs</span>
        </div>
      </div>

      <div>
        <h4 style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.25rem; color: var(--text-main); font-weight: 600;">Primary Focus:</h4>
        <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6;">${data.leadProgram}</p>
        
        <h4 style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 1rem; margin-bottom: 0.25rem; color: var(--text-main); font-weight: 600;">Recent Milestone:</h4>
        <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; font-style: italic;">"${data.milestone}"</p>
      </div>
    `;
  }

  const defaultPath = document.getElementById("path-bagmati");
  if (defaultPath) {
    defaultPath.classList.add("active");
    const bagmatiData = CMS.provinces.find(p => p.id === "bagmati");
    if (bagmatiData) updateMapPanel(bagmatiData);
  }


  // ==================== 6. SUCCESS STORIES CAROUSEL ====================
  
  const carousel = document.getElementById("carouselContainer");
  const slides = document.querySelectorAll(".carousel-slide");
  const navDotsWrapper = document.getElementById("carouselNav");
  let activeIndex = 0;
  const slideCount = slides.length;
  let autoplayInterval;

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
    }, 7000);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  startAutoplay();


  // ==================== 7. MODAL SYSTEM ====================
  
  // A. Program details
  const programModal = document.getElementById("programModal");
  const closeProgramModal = document.getElementById("closeProgramModal");
  
  if (programsGrid) {
    programsGrid.addEventListener("click", (e) => {
      const btn = e.target.closest(".program-learn-more");
      if (!btn) return;
      
      const progId = btn.getAttribute("data-id");
      const prog = CMS.programs.find(p => p.id === progId);
      
      if (prog) {
        document.getElementById("modalProgramTag").textContent = prog.title.toUpperCase();
        document.getElementById("modalProgramTitle").textContent = prog.title;
        document.getElementById("modalProgramBody").innerHTML = `
          <p style="margin-bottom: 1.5rem; font-size: 1.1rem; font-weight: 600; color: var(--text-main);">${prog.shortDesc}</p>
          <p style="color: var(--text-muted); line-height: 1.8; margin-bottom: 2rem;">${prog.fullDesc}</p>
          
          <div style="padding: 1.5rem; background: linear-gradient(135deg, rgba(37,99,235,0.05), rgba(16,185,129,0.03)); border: 1px solid var(--border-color); display: flex; align-items: center; gap: 1.25rem;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-color); flex-shrink: 0;"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin: 0;">Want this program in your local school? Reach out via our <a href="#contact" onclick="document.getElementById('programModal').classList.remove('active');" style="color: var(--accent-color); font-weight: 600;">Contact Form</a> to establish a new School Club hub.</p>
          </div>
        `;
        programModal.classList.add("active");
      }
    });
  }

  closeProgramModal.addEventListener("click", () => programModal.classList.remove("active"));
  
  // B. Volunteer enrollment
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

  // C. Donation Secure Gateways
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

  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      e.target.classList.remove("active");
    }
  });


  // ==================== 8. FORM SUBMISSIONS & PREMIUM CONFETTI ====================
  
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  let confettiActive = false;
  let particles = [];
  // Premium navy/blue/emerald confetti palette
  const premiumColors = ["#2563EB", "#4F9CF9", "#10B981", "#34D399", "#DCEEFF", "#0A2342", "#FFFFFF"];

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
      this.size = Math.random() * 8 + 4;
      this.color = premiumColors[Math.floor(Math.random() * premiumColors.length)];
      this.speedY = Math.random() * 2.5 + 1.5;
      this.speedX = Math.random() * 1.5 - 0.75;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = Math.random() * 2 - 1;
      this.opacity = Math.random() * 0.5 + 0.5;
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
      ctx.globalAlpha = this.opacity;
      ctx.translate(this.x + this.size/2, this.y + this.size/2);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.fillStyle = this.color;
      // Mix of circles and rectangles
      if (Math.random() > 0.5) {
        ctx.fillRect(-this.size/2, -this.size/4, this.size, this.size/2);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, this.size/2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function launchConfettiShower() {
    particles = [];
    for (let i = 0; i < 200; i++) {
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
      if (frameCount < 300) {
        requestAnimationFrame(loop);
      } else {
        confettiActive = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    
    requestAnimationFrame(loop);
  }

  // A. Contact Form
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

    launchConfettiShower();
    alert(`Thank you, ${name}! Your message has been sent. Our team will contact you shortly.`);
    contactForm.reset();
  });

  // B. Volunteer Form
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

    volunteerModal.classList.remove("active");
    launchConfettiShower();
    alert(`Registration Successful! Thank you ${name} for stepping forward to lead student empowerment in ${district}. Check your inbox for confirmation.`);
    volunteerForm.reset();
  });

  // C. Donation Form
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

    alert(`Redirecting to Secure ${gatewayText}...\n\nThank you for choosing to support ${tier} at ${amount}. Your support empowers public education networks across Nepal!`);
    donationForm.reset();
  });

  // D. Newsletter Form
  const newsletterForm = document.getElementById("newsletterForm");
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("newsletterEmail").value.trim();

    if (!email || !validateEmail(email)) {
      alert("Please provide a valid email address.");
      return;
    }

    launchConfettiShower();
    alert("Subscribed! Thank you for joining the Navigo Nepal community.");
    newsletterForm.reset();
  });

  // E. Resource downloads
  document.querySelectorAll(".resource-download-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const title = btn.getAttribute("data-title");
      launchConfettiShower();
      alert(`Preparing Download:\n"${title}"\n\nThank you for utilizing our open academic library!`);
    });
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }


  // ==================== 8b. HERO SEARCH & SUGGESTIONS CONSOLE ====================
  const programSearchInput = document.getElementById("programSearchInput");
  const searchSuggestions = document.getElementById("searchSuggestions");
  const provinceSearchSelect = document.getElementById("provinceSearchSelect");
  const searchSubmitBtn = document.getElementById("searchSubmitBtn");

  if (programSearchInput && searchSuggestions) {
    // Autocomplete Input Handler
    programSearchInput.addEventListener("input", () => {
      const query = programSearchInput.value.trim().toLowerCase();
      if (!query) {
        searchSuggestions.style.display = "none";
        searchSuggestions.innerHTML = "";
        return;
      }

      // Filter titles from CMS.programs
      const matches = CMS.programs.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.shortDesc.toLowerCase().includes(query)
      );

      if (matches.length > 0) {
        searchSuggestions.innerHTML = matches.map(match => `
          <div class="suggestion-item" data-id="${match.id}">${match.title}</div>
        `).join("");
        searchSuggestions.style.display = "block";
      } else {
        searchSuggestions.style.display = "none";
        searchSuggestions.innerHTML = "";
      }
    });

    // Suggestions Click Handler
    searchSuggestions.addEventListener("click", (e) => {
      const item = e.target.closest(".suggestion-item");
      if (!item) return;

      programSearchInput.value = item.textContent;
      searchSuggestions.style.display = "none";
      searchSuggestions.innerHTML = "";
      
      // Automatically trigger search when click suggestions
      executeHeroSearch();
    });

    // Close suggestions dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!programSearchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
        searchSuggestions.style.display = "none";
      }
    });

    // Handle Enter key on input
    programSearchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        executeHeroSearch();
      }
    });
  }

  if (searchSubmitBtn) {
    searchSubmitBtn.addEventListener("click", executeHeroSearch);
  }

  function executeHeroSearch() {
    const query = programSearchInput ? programSearchInput.value.trim() : "";
    const provinceId = provinceSearchSelect ? provinceSearchSelect.value : "";

    if (!query && !provinceId) {
      // If nothing selected/typed, reset to show all programs and scroll to programs
      renderProgramsList(CMS.programs);
      const progSection = document.getElementById("programs");
      if (progSection) {
        progSection.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    // 1. Process Program Search Filtering
    let filteredPrograms = CMS.programs;
    
    if (query) {
      const q = query.toLowerCase();
      filteredPrograms = CMS.programs.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.shortDesc.toLowerCase().includes(q) ||
        p.fullDesc.toLowerCase().includes(q)
      );
    }

    // 2. Process Province Select (Map Synchronizing)
    if (provinceId) {
      const path = document.getElementById(`path-${provinceId}`);
      if (path) {
        // Trigger click event on province path to select it on map
        path.click();
      }
    }

    // 3. Navigation Strategy
    // If user searched for a query, scroll to programs section to view matching cards
    if (query) {
      renderProgramsList(filteredPrograms, query);
      const progSection = document.getElementById("programs");
      if (progSection) {
        progSection.scrollIntoView({ behavior: "smooth" });
      }
      
      // If a province was also selected, update map, but prioritize scrolling to programs
      // The map will be updated in the background so when they scroll down further they see it selected!
    } else if (provinceId) {
      // If ONLY province is selected, navigate directly to map section!
      const mapSection = document.getElementById("impact-map");
      if (mapSection) {
        mapSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }


  // ==================== 8c. NAVIGATION DROPDOWN INTERACTION ====================
  // Mobile accordion sub-menu toggles
  const mobileDropdowns = document.querySelectorAll(".mobile-has-dropdown");
  mobileDropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector(".mobile-dropdown-toggle");
    if (toggle) {
      toggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Close other dropdowns first (accordion behavior)
        mobileDropdowns.forEach(other => {
          if (other !== dropdown) {
            other.classList.remove("open");
          }
        });
        
        dropdown.classList.toggle("open");
      });
    }
  });

  // Close mobile navigation sidebar when clicking sub-menu items
  document.querySelectorAll(".mobile-subnav-link").forEach(link => {
    link.addEventListener("click", () => {
      const hamburger = document.getElementById("hamburger");
      const mobileNav = document.getElementById("mobileNav");
      if (hamburger) hamburger.classList.remove("open");
      if (mobileNav) mobileNav.classList.remove("open");
    });
  });

  // Link subprogram links in both desktop and mobile dropdowns to the search console
  document.querySelectorAll(".subprogram-link").forEach(link => {
    link.addEventListener("click", (e) => {
      const kw = link.getAttribute("data-search-kw");
      if (kw) {
        if (programSearchInput) {
          programSearchInput.value = kw;
        }
        executeHeroSearch();
      }
    });
  });


  // ==================== 9. PARALLAX HERO BACKGROUND ====================
  
  const heroBg = document.querySelector('.hero-bg-image');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px) scale(1.1)`;
      }
    }, { passive: true });
  }
});
