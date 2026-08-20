// ============================================================
// Navigo Nepal — Blog & Knowledge Hub Engine (js/blog.js)
// Dynamic search, category filtering, interactive reader modal,
// deep-linking, reading progress, and social sharing.
// ============================================================

const NAVIGO_BLOG_POSTS = [
  {
    id: "passing-in-physics-exam",
    title: "Passing in Physics Exam: Turning Miracles into Strategy",
    category: "Academic Strategy",
    categoryClass: "tag-academic",
    author: "Prithivi Raj Poudel",
    authorRole: "Research & Presentation Head, Navigo Nepal",
    authorAvatar: "assets/members/prithivi.png",
    date: "August 18, 2024",
    readTime: "5 min read",
    image: "assets/blog_physics.jpg",
    featured: true,
    excerpt: "Passing in physics sounds like a miracle for a huge number of students. But to obtain passing marks, you don't need magic—you just need to focus on the right things and study strategically.",
    tags: ["Physics", "Exam Prep", "SEE / +2 Science", "Study Smart", "Formulas"],
    pdfFile: "blogs/phy.docx.pdf",
    pdfSize: "54 KB",
    content: `
      <p class="lead" style="font-size: 1.15rem; font-weight: 500; color: var(--text-main); line-height: 1.8;">
        Passing in physics sounds like a miracle for a huge number of students. Physics can be difficult as it involves many formulas, concepts, derivations, and numerical questions. But just to obtain the passing marks, you don't need some magic or miracle. All you need to do is focus on the right things and study strategically.
      </p>

      <p>
        Whether you are preparing for your Class 10 SEE exams or navigating the rigorous syllabi of +2 Science and engineering entrances, here is how you can turn the so-called "miracle" into reality.
      </p>

      <div class="strategy-box">
        <div class="strategy-box-header">
          <div class="strategy-number">1</div>
          <h3 class="strategy-title">Understand the Concepts</h3>
        </div>
        <p>
          Do not start by memorizing formulas. Understand what they mean and how they work. For example, instead of only memorizing <code>F = ma</code>, understand what force, mass, and acceleration actually represent in the physical world. This conceptual anchor makes the formula much easier to remember, derive, and correctly apply under examination pressure.
        </p>
      </div>

      <div class="strategy-box">
        <div class="strategy-box-header">
          <div class="strategy-number">2</div>
          <h3 class="strategy-title">Prioritize Important Topics</h3>
        </div>
        <p>
          You probably do not have enough time to master every single topic in the syllabus before the exam. First and foremost, our objective is to secure the marks. Look at past question papers (Old is Gold / Model Sets) and identify the high-frequency topics that appear repeatedly. Focus on those first.
        </p>
        <p>
          <em>It is significantly better to master the important 60% of high-weightage topics thoroughly than to know 100% of the syllabus only on a fragile surface level.</em>
        </p>
      </div>

      <div class="strategy-box">
        <div class="strategy-box-header">
          <div class="strategy-number">3</div>
          <h3 class="strategy-title">Break Down Numerical Questions</h3>
        </div>
        <p>
          Many numerical questions are only one or two steps once you systematically dismantle them into structured components. When you encounter a numerical problem:
        </p>
        <ul>
          <li><strong>Step 1:</strong> Write down the given variables with their standard SI units.</li>
          <li><strong>Step 2:</strong> Explicitly state what variable you need to calculate.</li>
          <li><strong>Step 3:</strong> Identify the governing formula that directly connects what you have with what you need.</li>
        </ul>

        <div class="formula-box">
          <div style="margin-bottom: 0.5rem; color: var(--accent-light); font-weight: 600;">Example Breakdown:</div>
          <div><strong>Given:</strong> Initial velocity (u), Final velocity (v), Time (t)</div>
          <div><strong>Find:</strong> Acceleration (a)</div>
          <div><strong>Governing Equation:</strong> <span class="formula-highlight">v = u + at &nbsp;&rarr;&nbsp; a = (v - u) / t</span></div>
        </div>

        <p>A long, intimidating word problem becomes simple, transparent arithmetic once organized this way.</p>
      </div>

      <div class="strategy-box">
        <div class="strategy-box-header">
          <div class="strategy-number">4</div>
          <h3 class="strategy-title">Learn by Applying</h3>
        </div>
        <p>
          Whenever possible, learn by using the concepts instead of just staring at textbooks. Solve actual numerical questions immediately after learning a formula, and think about how the concept operates in everyday life—like why you lean backward when a bus accelerates or how hydraulic brakes multiply pressure. You will remember a principle indefinitely when you physically apply it.
        </p>
      </div>

      <div class="strategy-box">
        <div class="strategy-box-header">
          <div class="strategy-number">5</div>
          <h3 class="strategy-title">Practice Meaningfully & Learn from Mistakes</h3>
        </div>
        <p>
          Do not just blindly solve hundreds of repetitive questions. Tackle diverse question archetypes and solve them <strong>without immediately peeking at the answer key</strong>.
        </p>
        <p>
          When you make a calculation or conceptual error, do not simply glance at the solution and move on. Dissect <em>why</em> you made that error—was it unit conversion, algebra, or a flawed assumption? Maintaining an "Error Log" is one of the single most potent methods to guarantee continuous score improvement.
        </p>
      </div>

      <div class="callout-takeaway">
        <h4>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          Key Takeaway for Exam Success
        </h4>
        <p style="margin-bottom: 0;">
          Passing physics is not a miracle—it is the direct outcome of knowing what to study, understanding what you study, and practicing systematically. Focus on high-yield chapters, master the foundational concepts, organize numerical data, and extract lessons from every mistake.
        </p>
      </div>

      <blockquote>
        "Laziness won't help you pass, and blindly memorizing everything won't either. Study smart, stay consistent, and give your efforts a real chance to pay off."
        <br><br>
        <strong style="color: var(--accent-color); font-style: normal;">— Prithivi Raj Poudel</strong>
      </blockquote>

      <div class="article-pdf-banner">
        <div class="article-pdf-info">
          <div class="article-pdf-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </div>
          <div>
            <div class="article-pdf-title">Download Official Physics Exam Strategy Guide</div>
            <div class="article-pdf-sub">Original PDF Document (54 KB) &bull; Navigo Academic Series</div>
          </div>
        </div>
        <a href="blogs/phy.docx.pdf" class="btn btn-primary" download style="padding: 0.6rem 1.2rem; font-size: 0.82rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download PDF
        </a>
      </div>
    `
  },
  {
    id: "bridging-post-see-transition",
    title: "Bridging the Post-SEE Transition: The Story Behind 'What's Next?'",
    category: "Career Guidance",
    categoryClass: "tag-career",
    author: "Anupam Nyaupane",
    authorRole: "Co-Founder, Navigo Nepal",
    authorAvatar: "assets/advisory/neupane.png",
    date: "May 28, 2024",
    readTime: "6 min read",
    image: "assets/vblog_stream.jpg",
    featured: false,
    excerpt: "We reflected on the academic pressure and lack of exposure we faced after SEE. Here is why stream counseling and personalized guidance are critical for every student in Nepal.",
    tags: ["SEE", "Career Counseling", "What's Next", "Higher Education", "Nepal"],
    pdfFile: null,
    content: `
      <p class="lead" style="font-size: 1.15rem; font-weight: 500; color: var(--text-main); line-height: 1.8;">
        Every year, over 450,000 students in Nepal finish their Secondary Education Examination (SEE). The silence that follows the celebration is often filled with profound confusion: <em>Which stream should I choose? Science, Management, Humanities, or CTEVT technical diplomas?</em>
      </p>

      <p>
        In most schools across Nepal, career counseling is either absent or limited to generic advice from relatives. Students are pushed toward Science if they scored high GPA, or Management as a default fallback, without assessing their individual aptitude, genuine interests, or future industry landscapes.
      </p>

      <h2>The Genesis of the 'What's Next?' Campaign</h2>
      <p>
        Having experienced this vacuum firsthand during our own secondary school years, we founded Navigo Nepal to provide the structured guidance we never had. We designed the <strong>What's Next?</strong> workshop series—an interactive, evidence-based orientation that takes students beyond GPA stereotypes.
      </p>

      <div class="strategy-box">
        <h3 class="strategy-title" style="margin-bottom: 0.75rem;">Core Pillars of Navigo Stream Counseling</h3>
        <ul>
          <li><strong>Aptitude Self-Assessment:</strong> Helping students evaluate their cognitive strengths, analytical comfort, and personal drive rather than peer pressure.</li>
          <li><strong>Curriculum & Workload Realism:</strong> Transparently explaining the real weekly study commitment required in Science vs Management vs Humanities.</li>
          <li><strong>Career Pathways Mapping:</strong> Connecting stream choices with 21st-century careers—including emerging fields in data science, modern agriculture, public policy, and entrepreneurship.</li>
          <li><strong>Scholarship Navigation:</strong> Demystifying college entrance exams, municipal quotas, and merit-based financial aid.</li>
        </ul>
      </div>

      <p>
        Over our initial tours across 24+ districts, from Nuwakot and Dhading to Kathmandu Valley, we witnessed how a single structured session transforms students from anxious test-takers into purposeful planners of their own futures.
      </p>

      <div class="callout-takeaway">
        <h4>Our Ongoing Mission</h4>
        <p style="margin-bottom: 0;">
          Navigo Nepal is committed to making stream orientation accessible in every community school in Nepal through downloadable print kits, trained collegiate ambassadors ('Navigers'), and district-level workshops.
        </p>
      </div>
    `
  },
  {
    id: "veda-and-tech",
    title: "Veda and Tech: Computing at Brahmeshwor Gurukul",
    category: "Tech & Innovation",
    categoryClass: "tag-tech",
    author: "Biyog Man Dangol",
    authorRole: "Co-Founder & Tech Head, Navigo Nepal",
    authorAvatar: "assets/advisory/biyog-man-dangol.png",
    date: "June 10, 2024",
    readTime: "7 min read",
    image: "assets/program.jpg",
    featured: false,
    excerpt: "Bridging centuries-old spiritual heritage with Artificial Intelligence and computer literacy. An insight into our pilot research connecting Vedic studies with technology.",
    tags: ["Veda & Tech", "Digital Literacy", "Gurukul Education", "AI", "Culture"],
    pdfFile: null,
    content: `
      <p class="lead" style="font-size: 1.15rem; font-weight: 500; color: var(--text-main); line-height: 1.8;">
        Can traditional Sanskrit scholarship and modern computational logic coexist? At Brahmeshwor Gurukul, Navigo Nepal launched a pioneering initiative to bridge centuries of philosophical heritage with 21st-century digital literacy.
      </p>

      <p>
        Traditional Gurukul education excels in memorization, linguistic precision, debate, and discipline. However, students in religious and Vedic institutions are frequently isolated from modern digital tools, software fundamentals, and AI literacy.
      </p>

      <h2>The Sanskrit-Computing Connection</h2>
      <p>
        Remarkably, Panini's ancient Sanskrit grammar (Ashtadhyayi) is widely recognized by computer scientists as one of the earliest formal algorithmic rule systems—closely paralleling modern context-free grammars used in compilers and natural language processing.
      </p>

      <div class="strategy-box">
        <h3 class="strategy-title" style="margin-bottom: 0.75rem;">What We Taught at Brahmeshwor Gurukul</h3>
        <ul>
          <li><strong>Foundational Computer Literacy:</strong> Operating systems, touch typing in Devanagari and English, and digital information management.</li>
          <li><strong>Algorithmic Thinking:</strong> Deconstructing mathematical and logical puzzles into sequential step-by-step instructions.</li>
          <li><strong>Digital Archiving:</strong> Preserving ancient scriptures and manuscripts into searchable digital formats.</li>
          <li><strong>Introduction to AI & Large Language Models:</strong> How computers process language, translate texts, and generate code.</li>
        </ul>
      </div>

      <p>
        Seeing Gurukul scholars type their first lines of code and connect ancient mnemonic systems with modern algorithmic structures proved that tradition and innovation are not adversaries—they are powerful multipliers when combined with vision.
      </p>
    `
  },
  {
    id: "empowering-student-leaders",
    title: "Empowering Student Leaders: How School Clubs Drive Real Change",
    category: "Youth Leadership",
    categoryClass: "tag-leadership",
    author: "Prajwal Dhungana",
    authorRole: "Co-Founder, Navigo Nepal",
    authorAvatar: "assets/advisory/prajal.png",
    date: "July 15, 2024",
    readTime: "5 min read",
    image: "assets/how-we-are-unique/group-photo-shree-kalika.jpg",
    featured: false,
    excerpt: "Extracurricular clubs are the true incubators of youth agency. Here is how Navigo's student club incubation toolkit empowers students to lead in their schools.",
    tags: ["Leadership", "Student Clubs", "ECA", "Youth Agency", "Public Speaking"],
    pdfFile: null,
    content: `
      <p class="lead" style="font-size: 1.15rem; font-weight: 500; color: var(--text-main); line-height: 1.8;">
        Classrooms teach students how to pass exams, but school clubs teach them how to lead, collaborate, resolve conflicts, and solve real-world problems.
      </p>

      <p>
        In many Nepali schools, extracurricular activities (ECAs) are treated as one-off annual sports days or formal speech contests where only a handful of confident students participate. The vast majority of quiet, curious students remain spectators.
      </p>

      <h2>The Navigo Club Incubation Model</h2>
      <p>
        To democratize leadership development, Navigo Nepal introduced a scalable <strong>Student Club Framework</strong>. We assist schools in chartering active, student-run circles:
      </p>

      <div class="strategy-box">
        <h3 class="strategy-title" style="margin-bottom: 0.75rem;">Key Principles of Active Clubs</h3>
        <ul>
          <li><strong>Democratic Governance:</strong> Rotating executive roles (President, Secretary, Outreach Lead) so multiple students gain real organizational experience.</li>
          <li><strong>Action-Oriented Agendas:</strong> Running weekly peer debates, community cleanups, science demonstration corners, and coding workshops.</li>
          <li><strong>Mentorship Support:</strong> Connecting student club heads directly with collegiate mentors across Nepal for guidance on event organizing and public speaking.</li>
        </ul>
      </div>

      <p>
        When you give young students ownership of a project and hold them accountable for outcomes, their confidence and communication skills skyrocket.
      </p>
    `
  },
  {
    id: "climate-action-classroom",
    title: "Climate Action in the Classroom: How Nepali Youth Are Tackling SDG 13",
    category: "Climate & Environment",
    categoryClass: "tag-climate",
    author: "Ayushi Bhandari",
    authorRole: "Gyanodaya Scout Lead & Navigo Green Ambassador",
    authorAvatar: "assets/11.png",
    date: "July 28, 2024",
    readTime: "4 min read",
    image: "assets/33.png",
    featured: false,
    excerpt: "Moving beyond textbook definitions of pollution into tangible, school-based climate solutions: bottle gardening, waste audits, and youth eco-rallies.",
    tags: ["SDG 13", "Climate Action", "Eco Clubs", "Sustainability", "Kathmandu"],
    pdfFile: null,
    content: `
      <p class="lead" style="font-size: 1.15rem; font-weight: 500; color: var(--text-main); line-height: 1.8;">
        Environmental education in textbooks is often reduced to memorizing definitions of air, water, and soil pollution. But climate change is not a theoretical abstraction—it is a lived crisis across the Himalayas and urban valleys of Nepal.
      </p>

      <p>
        Through Navigo Nepal's SDG 13 Environmental Stewardship workshops at Gyanodaya and partner schools, we replaced passive lectures with tactile, engaging community projects.
      </p>

      <h2>Practical School-Based Climate Initiatives</h2>
      <div class="strategy-box">
        <h3 class="strategy-title" style="margin-bottom: 0.75rem;">Hands-on Projects Completed:</h3>
        <ul>
          <li><strong>Upcycled Bottle Gardening:</strong> Converting hundreds of discarded plastic bottles into vertical herb and flower planters on school perimeter walls.</li>
          <li><strong>School Waste Audits:</strong> Measuring and categorizing daily school canteen plastic waste to introduce source-segregation bins.</li>
          <li><strong>SDG 13 Creative Campaigns:</strong> Student-led poster rallies, environmental debates, and neighborhood awareness drives.</li>
        </ul>
      </div>

      <p>
        These simple, high-impact activities prove that environmental responsibility starts with small, consistent daily habits in school corridors and home kitchens.
      </p>
    `
  }
];

// ==================== CONTROLLER LOGIC ====================

document.addEventListener("DOMContentLoaded", () => {
  const blogCardsContainer = document.getElementById("blogCardsContainer");
  const blogEmptyState = document.getElementById("blogEmptyState");
  const blogSearchInput = document.getElementById("blogSearchInput");
  const blogSearchClear = document.getElementById("blogSearchClear");
  const categoryPills = document.querySelectorAll(".category-pill");
  const blogResultsMeta = document.getElementById("blogResultsMeta");

  // Modal elements
  const articleModal = document.getElementById("articleReaderModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalBackBtn = document.getElementById("modalBackBtn");
  const modalProgressBar = document.getElementById("modalProgressBar");
  const modalContentContainer = document.getElementById("articleReaderBody");
  const modalCopyLinkBtn = document.getElementById("modalCopyLinkBtn");
  const blogToast = document.getElementById("blogToast");

  let activeCategory = "all";
  let activeSearchQuery = "";

  // 1. Initial Render
  renderBlogGrid();
  updateCategoryCounts();

  // 2. Search Handler (Debounced)
  if (blogSearchInput) {
    blogSearchInput.addEventListener("input", (e) => {
      activeSearchQuery = e.target.value.trim().toLowerCase();
      if (blogSearchClear) {
        blogSearchClear.style.display = activeSearchQuery.length > 0 ? "flex" : "none";
      }
      renderBlogGrid();
    });
  }

  if (blogSearchClear) {
    blogSearchClear.addEventListener("click", () => {
      if (blogSearchInput) {
        blogSearchInput.value = "";
        activeSearchQuery = "";
        blogSearchClear.style.display = "none";
        blogSearchInput.focus();
        renderBlogGrid();
      }
    });
  }

  // 3. Category Filter Handler
  categoryPills.forEach(pill => {
    pill.addEventListener("click", () => {
      categoryPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      activeCategory = pill.getAttribute("data-category");
      renderBlogGrid();
    });
  });

  // 4. Update category badge counts
  function updateCategoryCounts() {
    categoryPills.forEach(pill => {
      const cat = pill.getAttribute("data-category");
      const countSpan = pill.querySelector(".pill-count");
      if (countSpan) {
        if (cat === "all") {
          countSpan.textContent = NAVIGO_BLOG_POSTS.length;
        } else {
          const matchCount = NAVIGO_BLOG_POSTS.filter(p => p.category.toLowerCase().includes(cat.toLowerCase())).length;
          countSpan.textContent = matchCount;
        }
      }
    });
  }

  // 5. Render Blog Grid
  function renderBlogGrid() {
    if (!blogCardsContainer) return;

    const filtered = NAVIGO_BLOG_POSTS.filter(post => {
      const matchesCat = (activeCategory === "all") || post.category.toLowerCase().includes(activeCategory.toLowerCase());
      const matchesSearch = !activeSearchQuery || 
        post.title.toLowerCase().includes(activeSearchQuery) ||
        post.excerpt.toLowerCase().includes(activeSearchQuery) ||
        post.author.toLowerCase().includes(activeSearchQuery) ||
        post.tags.some(t => t.toLowerCase().includes(activeSearchQuery));
      return matchesCat && matchesSearch;
    });

    if (blogResultsMeta) {
      blogResultsMeta.textContent = `Showing ${filtered.length} of ${NAVIGO_BLOG_POSTS.length} articles`;
    }

    if (filtered.length === 0) {
      blogCardsContainer.innerHTML = "";
      if (blogEmptyState) blogEmptyState.style.display = "block";
      return;
    }

    if (blogEmptyState) blogEmptyState.style.display = "none";

    blogCardsContainer.innerHTML = filtered.map(post => `
      <article class="blog-card" data-post-id="${post.id}">
        <div class="blog-card-thumb">
          <img src="${post.image}" alt="${post.title}" class="blog-card-img" loading="lazy" onerror="this.src='assets/blog_physics.jpg'">
          <div class="blog-card-tag">
            <span class="category-tag ${post.categoryClass}">${post.category}</span>
          </div>
        </div>
        <div class="blog-card-content">
          <div class="blog-card-meta">
            <span>${post.date}</span>
            <span class="post-read-time">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ${post.readTime}
            </span>
          </div>
          <h3 class="blog-card-title">${post.title}</h3>
          <p class="blog-card-excerpt">${post.excerpt}</p>
          <div class="blog-card-footer">
            <div class="blog-card-author">
              <img src="${post.authorAvatar}" alt="${post.author}" onerror="this.src='assets/members/placeholder.svg'">
              <span class="blog-card-author-name">${post.author}</span>
            </div>
            <span class="blog-card-link">
              Read Article &rarr;
            </span>
          </div>
        </div>
      </article>
    `).join("");

    // Bind click handlers to cards
    blogCardsContainer.querySelectorAll(".blog-card").forEach(card => {
      card.addEventListener("click", () => {
        const postId = card.getAttribute("data-post-id");
        openArticleReader(postId);
      });
    });
  }

  // 6. Reset Filters Button in Empty State
  const resetFiltersBtn = document.getElementById("resetFiltersBtn");
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", () => {
      activeCategory = "all";
      activeSearchQuery = "";
      if (blogSearchInput) blogSearchInput.value = "";
      if (blogSearchClear) blogSearchClear.style.display = "none";
      categoryPills.forEach(p => p.classList.remove("active"));
      const allPill = document.querySelector('.category-pill[data-category="all"]');
      if (allPill) allPill.classList.add("active");
      renderBlogGrid();
    });
  }

  // 7. Featured Spotlight Button Click
  const spotlightReadBtn = document.getElementById("spotlightReadBtn");
  if (spotlightReadBtn) {
    spotlightReadBtn.addEventListener("click", () => {
      const featuredId = spotlightReadBtn.getAttribute("data-post-id") || "passing-in-physics-exam";
      openArticleReader(featuredId);
    });
  }

  // 8. Open Article Reader Modal
  window.openArticleReader = function(postId) {
    const post = NAVIGO_BLOG_POSTS.find(p => p.id === postId);
    if (!post || !articleModal || !modalContentContainer) return;

    // Update URL hash/query parameter without reloading
    const newUrl = new URL(window.location);
    newUrl.searchParams.set("post", postId);
    window.history.pushState({ postId }, "", newUrl);

    // Find related articles (excluding current)
    const relatedPosts = NAVIGO_BLOG_POSTS.filter(p => p.id !== postId).slice(0, 2);

    modalContentContainer.innerHTML = `
      <div class="article-header-meta">
        <span class="category-tag ${post.categoryClass}">${post.category}</span>
        <span class="post-read-time">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          ${post.readTime}
        </span>
        <span style="color: var(--text-muted); font-size: 0.8rem;">&bull; Published on ${post.date}</span>
      </div>

      <h1 class="article-title-hero">${post.title}</h1>

      <div class="article-author-card">
        <div class="author-chip">
          <img src="${post.authorAvatar}" alt="${post.author}" class="author-avatar" onerror="this.src='assets/members/placeholder.svg'">
          <div class="author-info">
            <span class="author-name">${post.author}</span>
            <span class="author-role">${post.authorRole}</span>
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          ${post.tags.map(tag => `<span style="font-size: 0.72rem; padding: 0.2rem 0.6rem; background: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-muted); font-weight: 500;">#${tag}</span>`).join("")}
        </div>
      </div>

      <div class="article-banner-frame">
        <img src="${post.image}" alt="${post.title}" class="article-banner-img" onerror="this.src='assets/blog_physics.jpg'">
      </div>

      <div class="article-prose">
        ${post.content}
      </div>

      <!-- Social Sharing & Actions -->
      <div class="article-social-share">
        <div class="share-label">Share This Knowledge:</div>
        <div class="share-buttons">
          <button class="share-btn" onclick="copyArticleLink('${post.id}')" title="Copy Link" aria-label="Copy Link">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          </button>
          <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' ' + window.location.href)}" target="_blank" rel="noopener" class="share-btn" title="Share on WhatsApp" aria-label="Share on WhatsApp">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          </a>
          <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}" target="_blank" rel="noopener" class="share-btn" title="Share on LinkedIn" aria-label="Share on LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" rel="noopener" class="share-btn" title="Share on Facebook" aria-label="Share on Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
        </div>
      </div>

      <!-- Related Posts -->
      <div class="article-related-posts">
        <h3 class="article-related-title">Continue Reading Navigo Insights</h3>
        <div class="related-posts-grid">
          ${relatedPosts.map(rel => `
            <div class="blog-card" style="cursor: pointer;" onclick="openArticleReader('${rel.id}')">
              <div style="height: 140px; overflow: hidden; background: #06172F;">
                <img src="${rel.image}" alt="${rel.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='assets/blog_physics.jpg'">
              </div>
              <div style="padding: 1.25rem;">
                <span class="category-tag ${rel.categoryClass}" style="font-size: 0.65rem; margin-bottom: 0.5rem;">${rel.category}</span>
                <h4 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.4rem; line-height: 1.3;">${rel.title}</h4>
                <div style="font-size: 0.75rem; color: var(--text-muted);">By ${rel.author} &bull; ${rel.readTime}</div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    articleModal.classList.add("active");
    document.body.style.overflow = "hidden";

    // Reset scroll of dialog
    const dialog = articleModal.querySelector(".article-reader-dialog");
    if (dialog) {
      dialog.scrollTop = 0;
      if (modalProgressBar) modalProgressBar.style.width = "0%";
    }
  };

  // 9. Close Reader Modal
  window.closeArticleReader = function() {
    if (!articleModal) return;
    articleModal.classList.remove("active");
    document.body.style.overflow = "";

    // Clear URL query parameter
    const newUrl = new URL(window.location);
    newUrl.searchParams.delete("post");
    window.history.pushState({}, "", newUrl);
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeArticleReader);
  if (modalBackBtn) modalBackBtn.addEventListener("click", closeArticleReader);

  // Close when clicking modal backdrop
  if (articleModal) {
    articleModal.addEventListener("click", (e) => {
      if (e.target === articleModal) {
        closeArticleReader();
      }
    });
  }

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && articleModal && articleModal.classList.contains("active")) {
      closeArticleReader();
    }
  });

  // 10. Modal Reading Progress Tracking
  const modalDialog = articleModal ? articleModal.querySelector(".article-reader-dialog") : null;
  if (modalDialog && modalProgressBar) {
    modalDialog.addEventListener("scroll", () => {
      const scrollHeight = modalDialog.scrollHeight - modalDialog.clientHeight;
      if (scrollHeight > 0) {
        const progress = (modalDialog.scrollTop / scrollHeight) * 100;
        modalProgressBar.style.width = `${progress}%`;
      }
    });
  }

  // 11. Copy Article Link Helper
  window.copyArticleLink = function(postId) {
    const shareUrl = `${window.location.origin}${window.location.pathname}?post=${postId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      showBlogToast("Article link copied to clipboard!");
    }).catch(() => {
      showBlogToast("Link copied!");
    });
  };

  if (modalCopyLinkBtn) {
    modalCopyLinkBtn.addEventListener("click", () => {
      const currentUrl = window.location.href;
      navigator.clipboard.writeText(currentUrl).then(() => {
        showBlogToast("Article link copied to clipboard!");
      });
    });
  }

  function showBlogToast(msg) {
    if (!blogToast) return;
    const toastText = blogToast.querySelector(".toast-text") || blogToast;
    toastText.textContent = msg;
    blogToast.classList.add("show");
    setTimeout(() => {
      blogToast.classList.remove("show");
    }, 3000);
  }

  // 12. Check URL for direct deep-link to post on page load
  const urlParams = new URLSearchParams(window.location.search);
  const directPostId = urlParams.get("post");
  if (directPostId) {
    openArticleReader(directPostId);
  }

  // Handle browser back/forward buttons
  window.addEventListener("popstate", (e) => {
    const params = new URLSearchParams(window.location.search);
    const pId = params.get("post");
    if (pId) {
      openArticleReader(pId);
    } else {
      closeArticleReader();
    }
  });
});
