// ============================================================
// Navigo Nepal — Full-Page Blog Reader Engine (js/blog.js)
// Orchestrates reading progress, TOC scrollspy, font size controls,
// and social sharing for the full-page blog post.
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.getElementById("blogReadingProgress");
  const percentageText = document.getElementById("readingPercentageText");
  const tocLinks = document.querySelectorAll(".slidebar-toc-link");
  const prose = document.getElementById("articleProse");
  const blogToast = document.getElementById("blogToast");
  const toastText = document.getElementById("blogToastText");

  // 1. Reading Progress & Scrollspy
  const sections = [
    document.getElementById("sec-intro"),
    document.getElementById("sec-concepts"),
    document.getElementById("sec-topics"),
    document.getElementById("sec-numericals"),
    document.getElementById("sec-apply"),
    document.getElementById("sec-practice"),
    document.getElementById("sec-conclusion"),
    document.getElementById("sec-download"),
    document.getElementById("sec-author")
  ].filter(Boolean);

  function updateScrollState() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = window.scrollY;

    if (docHeight > 0) {
      const pct = Math.min(100, Math.max(0, Math.round((scrollTop / docHeight) * 100)));
      if (progressBar) progressBar.style.width = `${pct}%`;
      if (percentageText) percentageText.textContent = `${pct}%`;
    }

    // Scrollspy active section detection
    const scrollPos = window.scrollY + 180;
    let currentId = "";

    for (let i = 0; i < sections.length; i++) {
      const sec = sections[i];
      if (sec && sec.offsetTop <= scrollPos) {
        currentId = sec.getAttribute("id");
      }
    }

    if (currentId) {
      tocLinks.forEach(link => {
        if (link.getAttribute("data-target") === currentId) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }
  }

  window.addEventListener("scroll", updateScrollState, { passive: true });
  updateScrollState();

  // 2. Smooth TOC Click Navigation
  tocLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("data-target");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const targetTop = targetEl.getBoundingClientRect().top + window.scrollY - 85;
        window.scrollTo({
          top: targetTop,
          behavior: "smooth"
        });
      }
    });
  });

  // 3. Font Size Controls
  const btnFontDec = document.getElementById("btnFontDecrease");
  const btnFontReset = document.getElementById("btnFontReset");
  const btnFontInc = document.getElementById("btnFontIncrease");

  const fontSizes = ["0.95rem", "1.1rem", "1.25rem"];
  let currentFontIdx = 1; // Default is index 1 ("1.1rem")

  function applyFontSize() {
    if (prose) {
      prose.style.fontSize = fontSizes[currentFontIdx];
    }
  }

  if (btnFontDec) {
    btnFontDec.addEventListener("click", () => {
      if (currentFontIdx > 0) {
        currentFontIdx--;
        applyFontSize();
      }
    });
  }

  if (btnFontReset) {
    btnFontReset.addEventListener("click", () => {
      currentFontIdx = 1;
      applyFontSize();
    });
  }

  if (btnFontInc) {
    btnFontInc.addEventListener("click", () => {
      if (currentFontIdx < fontSizes.length - 1) {
        currentFontIdx++;
        applyFontSize();
      }
    });
  }

  // 4. Copy Page URL Helper
  window.copyCurrentArticleLink = function() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      showBlogToast("Article link copied to clipboard!");
    }).catch(() => {
      showBlogToast("Link copied!");
    });
  };

  function showBlogToast(msg) {
    if (!blogToast) return;
    if (toastText) toastText.textContent = msg;
    blogToast.classList.add("show");
    setTimeout(() => {
      blogToast.classList.remove("show");
    }, 3000);
  }
});
