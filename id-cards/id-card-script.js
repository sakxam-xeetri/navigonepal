/* ============================================================
   Navigo Nepal — Executive Member ID Card Generator Script
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  let membersData = [];
  let currentCategory = 'All';
  let searchQuery = '';

  const cardsContainer = document.getElementById('cardsContainer');
  const searchInput = document.getElementById('searchInput');
  const filterTabs = document.querySelectorAll('.filter-tab');
  const totalCountEl = document.getElementById('totalMembersCount');

  // Modal Elements
  const addCardBtn = document.getElementById('addCardBtn');
  const addCardModal = document.getElementById('addCardModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const newCardForm = document.getElementById('newCardForm');
  const printAllBtn = document.getElementById('printAllBtn');

  // Check for direct member lookup URL parameters (e.g., ?id=NVG-2026-005)
  const urlParams = new URLSearchParams(window.location.search);
  const paramId = urlParams.get('id') || urlParams.get('search') || urlParams.get('member');
  if (paramId) {
    searchQuery = paramId.trim().toLowerCase();
    if (searchInput) searchInput.value = paramId.trim();
  }

  // Fetch Member Data
  fetch('members.json')
    .then(response => {
      if (!response.ok) throw new Error('Failed to fetch JSON');
      return response.json();
    })
    .then(data => {
      membersData = data;
      renderCards();
    })
    .catch(err => {
      console.warn('Loading fallback embedded member data...', err);
      membersData = getFallbackMembersData();
      renderCards();
    });

  // Render ID Cards
  function renderCards() {
    cardsContainer.innerHTML = '';

    const filtered = membersData.filter(member => {
      const matchesCategory = (currentCategory === 'All') || (member.category === currentCategory);
      const matchesSearch = searchQuery === '' ||
        member.name.toLowerCase().includes(searchQuery) ||
        member.post.toLowerCase().includes(searchQuery) ||
        member.id.toLowerCase().includes(searchQuery) ||
        (member.phone && member.phone.toLowerCase().includes(searchQuery)) ||
        (member.email && member.email.toLowerCase().includes(searchQuery));

      return matchesCategory && matchesSearch;
    });

    if (totalCountEl) {
      totalCountEl.textContent = `${filtered.length} Member Card${filtered.length !== 1 ? 's' : ''}`;
    }

    if (filtered.length === 0) {
      cardsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: #94A3B8;">
          <p style="font-size: 1.1rem; font-weight: 600;">No member cards found matching "${searchQuery}"</p>
        </div>
      `;
      return;
    }

    filtered.forEach(member => {
      const cardWrap = createCardElement(member);
      cardsContainer.appendChild(cardWrap);
    });
  }

  // Helper to extract short numeric ID for QR URL (e.g., NVG-2026-001 -> 1)
  function getMemberShortId(member) {
    if (!member || !member.id) return '1';
    const digits = member.id.match(/\d+/g);
    if (digits && digits.length > 0) {
      const lastDigits = digits[digits.length - 1];
      return parseInt(lastDigits, 10).toString();
    }
    return member.id;
  }

  // Helper to build full profile URL with embedded parameters for instant QR scanner loading
  function getMemberProfileUrl(member) {
    const shortId = getMemberShortId(member);
    const params = new URLSearchParams();
    params.set('id', member.id || `NVG-2026-${shortId.padStart(3, '0')}`);
    if (member.name) params.set('name', member.name);
    if (member.post) params.set('post', member.post);
    if (member.email) params.set('email', member.email);
    if (member.phone) params.set('phone', member.phone);
    if (member.category) params.set('category', member.category);
    if (member.bloodGroup) params.set('bloodGroup', member.bloodGroup);
    if (member.emergencyContact) params.set('emergencyContact', member.emergencyContact);
    return `https://navigonepal.org/idcard/${shortId}?${params.toString()}`;
  }

  // Create Individual Card DOM Node
  function createCardElement(member) {
    const wrapper = document.createElement('div');
    wrapper.className = 'card-wrapper-item';
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.alignItems = 'center';
    wrapper.style.width = '100%';
    wrapper.style.maxWidth = '350px';

    // Official Member Profile Verification & Validity QR Code (Embedded Profile Data URL)
    const shortId = getMemberShortId(member);
    const verifyTargetUrl = getMemberProfileUrl(member);
    const profileQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(verifyTargetUrl)}&color=FFFFFF&bgcolor=121418`;
    // Member verification QR code for back side
    const memberQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(verifyTargetUrl)}&color=0F172A`;

    wrapper.innerHTML = `
      <div class="card-wrapper" id="card-${member.id}">
        <div class="card-inner">
          
          <!-- FRONT FACE -->
          <div class="card-face card-front">
            
            <!-- Top White Header (No Text Overlap) -->
            <div class="ref-header-top">
              <img src="../assets/navigo-logo.png" alt="Navigo Nepal" class="ref-header-logo" onerror="this.src='../assets/png_new_logo.png'">
              <div class="ref-header-brand">
                NAVIGO NEPAL
                <span>YOUTH EDUCATIONAL CATALYST</span>
              </div>
            </div>

            <!-- Geometric Wing Side Accents -->
            <div class="ref-wings-container">
              <div class="ref-wing-left"></div>
              <div class="ref-wing-right"></div>
            </div>

            <!-- Center Circular Avatar Frame -->
            <div class="ref-avatar-container">
              <div class="ref-avatar-ring">
                <div class="ref-avatar-img-wrap">
                  <img src="${member.photo || '../assets/members/placeholder.svg'}" alt="${member.name}" onerror="this.src='../assets/members/placeholder.svg'">
                </div>
              </div>
            </div>

            <!-- Dark Body Main Content -->
            <div class="ref-body-content">
              <h2 class="ref-member-name">${member.name}</h2>
              <div class="ref-designation-badge">${member.post}</div>

              <!-- Left-Aligned Key-Value Info List (Full Email, No Truncation) -->
              <div class="ref-info-table">
                <div class="ref-info-row">
                  <span class="ref-info-key">ID No</span>
                  <span class="ref-info-colon">:</span>
                  <span class="ref-info-val">${member.id}</span>
                </div>
                <div class="ref-info-row">
                  <span class="ref-info-key">Email</span>
                  <span class="ref-info-colon">:</span>
                  <span class="ref-info-val">${member.email || 'N/A'}</span>
                </div>
                <div class="ref-info-row">
                  <span class="ref-info-key">Social</span>
                  <span class="ref-info-colon">:</span>
                  <span class="ref-info-val">${member.social || '@navigonepal'}</span>
                </div>
                <div class="ref-info-row">
                  <span class="ref-info-key">Phone</span>
                  <span class="ref-info-colon">:</span>
                  <span class="ref-info-val">${member.phone || 'N/A'}</span>
                </div>
              </div>

              <!-- Middle Member Profile & Validity QR Code (Borderless QR + Subtext) -->
              <div class="ref-middle-qr-container">
                <div class="ref-middle-qr-box">
                  <img src="${profileQrUrl}" alt="${member.name} Profile Verification QR">
                </div>
                <span class="ref-qr-subtext">navigonepal.org/idcard/${shortId}</span>
              </div>

              <!-- Card Footer: Single-line Web & Mail -->
              <div class="ref-card-footer-box">
                <span class="ref-footer-inline">
                  <span class="ref-footer-label">web:</span> <a href="https://navigonepal.org" target="_blank" class="ref-footer-link-text">navigonepal.org</a> &nbsp;&bull;&nbsp; <span class="ref-footer-label">mail:</span> <a href="mailto:navigonepal@gmail.com" class="ref-footer-link-text">navigonepal@gmail.com</a>
                </span>
              </div>
            </div>

          </div>

          <!-- BACK FACE -->
          <div class="card-face card-back">
            <div class="ref-back-header">
              <img src="../assets/navigo-logo.png" style="height: 32px;" onerror="this.src='../assets/png_new_logo.png'">
              <span style="font-weight: 800; font-size: 0.85rem; color: #0F172A;">NAVIGO NEPAL</span>
            </div>

            <div class="ref-back-body">
              <div class="ref-back-terms">
                <strong>TERMS & CONDITIONS</strong><br>
                This card is non-transferable and remains official property of Navigo Nepal. If lost and found, please return to: Navigo Nepal HQ, Kathmandu, Nepal.
              </div>

              <div class="ref-back-qr-row">
                <div class="ref-back-qr">
                  <img src="${memberQrUrl}" alt="Member QR Code">
                </div>
                <div class="ref-back-sign">
                  <span class="ref-sign-text">Navigo Nepal</span>
                  <div class="ref-sign-line"></div>
                  <span class="ref-sign-title">AUTHORIZED SIGNATURE</span>
                </div>
              </div>

              <div>
                <div style="font-size: 0.7rem; color: #94A3B8; font-weight: 600;">EMERGENCY CONTACT & OFFICIAL CONTACTS</div>
                <div style="font-size: 0.85rem; font-weight: 700; color: #F8FAFC;">${member.phone || '+977 980-0000000'}</div>
                <div style="font-size: 0.75rem; color: #4F9CF9; font-weight: 600; margin-top: 0.2rem;">navigonepal@gmail.com</div>
                <div style="font-size: 0.75rem; color: #60A5FA; font-weight: 700; margin-top: 0.15rem;">www.navigonepal.org</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- CARD ACTIONS -->
      <div class="card-action-bar">
        <button class="btn-card-action flip-btn" data-id="${member.id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
          </svg> Flip Card
        </button>
        <button class="btn-card-action print-single-btn" data-id="${member.id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          </svg> Print Card
        </button>
      </div>
    `;

    // Event Listener for Flip
    const cardEl = wrapper.querySelector('.card-wrapper');
    const flipBtn = wrapper.querySelector('.flip-btn');

    flipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      cardEl.classList.toggle('flipped');
    });

    cardEl.addEventListener('click', () => {
      cardEl.classList.toggle('flipped');
    });

    // Event Listener for Single Print
    const printSingleBtn = wrapper.querySelector('.print-single-btn');
    printSingleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      printSingleCard(member);
    });

    return wrapper;
  }

  // Print Single Card (High Fidelity Landscape Mode with Matching Colors)
  function printSingleCard(member) {
    const printWindow = window.open('', '_blank');
    const shortId = getMemberShortId(member);
    const verifyTargetUrl = getMemberProfileUrl(member);
    const profileQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(verifyTargetUrl)}&color=FFFFFF&bgcolor=121418`;
    const memberQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(verifyTargetUrl)}&color=0F172A`;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Print ID Card — ${member.name}</title>
        <link rel="stylesheet" href="id-card-styles.css">
        <style>
          @page { size: A4 landscape; margin: 8mm; }
          *, *::before, *::after { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
          body { background: #0B0E14 !important; color: #FFFFFF !important; display: flex; justify-content: center; align-items: center; min-height: 100vh; gap: 30px; margin: 0; padding: 20px; font-family: 'Inter', sans-serif; }
          .single-print-wrapper { display: flex; gap: 35px; align-items: center; justify-content: center; }
          .card-wrapper { box-shadow: 0 15px 35px rgba(0,0,0,0.6) !important; margin: 0; width: 350px !important; height: 560px !important; }
          .card-inner { transform-style: flat !important; }
          .card-face { position: relative !important; backface-visibility: visible !important; }
        </style>
      </head>
      <body>
        <div class="single-print-wrapper">
          <!-- FRONT FACE -->
          <div class="card-wrapper">
            <div class="card-face card-front">
              <div class="ref-header-top">
                <img src="../assets/navigo-logo.png" class="ref-header-logo" onerror="this.src='../assets/png_new_logo.png'">
                <div class="ref-header-brand">NAVIGO NEPAL<span>YOUTH EDUCATIONAL CATALYST</span></div>
              </div>
              <div class="ref-wings-container">
                <div class="ref-wing-left"></div>
                <div class="ref-wing-right"></div>
              </div>
              <div class="ref-avatar-container">
                <div class="ref-avatar-ring">
                  <div class="ref-avatar-img-wrap"><img src="${member.photo || '../assets/members/placeholder.svg'}" onerror="this.src='../assets/members/placeholder.svg'"></div>
                </div>
              </div>
              <div class="ref-body-content">
                <h2 class="ref-member-name">${member.name}</h2>
                <div class="ref-designation-badge">${member.post}</div>
                <div class="ref-info-table">
                  <div class="ref-info-row"><span class="ref-info-key">ID No</span><span class="ref-info-colon">:</span><span class="ref-info-val">${member.id}</span></div>
                  <div class="ref-info-row"><span class="ref-info-key">Email</span><span class="ref-info-colon">:</span><span class="ref-info-val">${member.email || 'N/A'}</span></div>
                  <div class="ref-info-row"><span class="ref-info-key">Social</span><span class="ref-info-colon">:</span><span class="ref-info-val">${member.social || '@navigonepal'}</span></div>
                  <div class="ref-info-row"><span class="ref-info-key">Phone</span><span class="ref-info-colon">:</span><span class="ref-info-val">${member.phone || 'N/A'}</span></div>
                </div>
                <div class="ref-middle-qr-container">
                  <div class="ref-middle-qr-box"><img src="${profileQrUrl}"></div>
                  <span class="ref-qr-subtext">navigonepal.org/idcard/${shortId}</span>
                </div>
                <div class="ref-card-footer-box">
                  <span class="ref-footer-inline">
                    <span class="ref-footer-label">web:</span> <a href="https://navigonepal.org" target="_blank" class="ref-footer-link-text">navigonepal.org</a> &nbsp;&bull;&nbsp; <span class="ref-footer-label">mail:</span> <a href="mailto:navigonepal@gmail.com" class="ref-footer-link-text">navigonepal@gmail.com</a>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- BACK FACE -->
          <div class="card-wrapper">
            <div class="card-face card-back" style="transform: none;">
              <div class="ref-back-header">
                <img src="../assets/navigo-logo.png" style="height: 32px;" onerror="this.src='../assets/png_new_logo.png'">
                <span style="font-weight: 800; font-size: 0.85rem; color: #0F172A;">NAVIGO NEPAL</span>
              </div>
              <div class="ref-back-body">
                <div class="ref-back-terms">
                  <strong>TERMS & CONDITIONS</strong><br>
                  This card is non-transferable and remains official property of Navigo Nepal. If lost and found, please return to: Navigo Nepal HQ, Kathmandu, Nepal.
                </div>
                <div class="ref-back-qr-row">
                  <div class="ref-back-qr">
                    <img src="${memberQrUrl}" alt="Member QR Code">
                  </div>
                  <div class="ref-back-sign">
                    <span class="ref-sign-text">Navigo Nepal</span>
                    <div class="ref-sign-line"></div>
                    <span class="ref-sign-title">AUTHORIZED SIGNATURE</span>
                  </div>
                </div>
                <div>
                  <div style="font-size: 0.7rem; color: #94A3B8; font-weight: 600;">EMERGENCY CONTACT & OFFICIAL CONTACTS</div>
                  <div style="font-size: 0.85rem; font-weight: 700; color: #F8FAFC;">${member.phone || '+977 980-0000000'}</div>
                  <div style="font-size: 0.75rem; color: #4F9CF9; font-weight: 600; margin-top: 0.2rem;">navigonepal@gmail.com</div>
                  <div style="font-size: 0.75rem; color: #60A5FA; font-weight: 700; margin-top: 0.15rem;">www.navigonepal.org</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() { window.print(); }, 500);
          }
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  }

  // Helper to get members matching current active tab & search query
  function getFilteredMembers() {
    return membersData.filter(member => {
      const matchesCategory = (currentCategory === 'All') || (member.category === currentCategory);
      const matchesSearch = searchQuery === '' ||
        member.name.toLowerCase().includes(searchQuery) ||
        member.post.toLowerCase().includes(searchQuery) ||
        member.id.toLowerCase().includes(searchQuery) ||
        (member.phone && member.phone.toLowerCase().includes(searchQuery)) ||
        (member.email && member.email.toLowerCase().includes(searchQuery));

      return matchesCategory && matchesSearch;
    });
  }

  // Batch A4 Landscape Sheet Engine (10 Cards per A4 Page Grid)
  const a4PreviewWrapper = document.getElementById('a4PreviewWrapper');
  const togglePreviewBtn = document.getElementById('togglePreviewBtn');
  const triggerPrintSheetBtn = document.getElementById('triggerPrintSheetBtn');
  const printSideSelect = document.getElementById('printSideSelect');

  function renderA4LandscapeSheets(mode = 'front') {
    if (!a4PreviewWrapper) return;
    a4PreviewWrapper.innerHTML = '';

    const members = getFilteredMembers();
    if (members.length === 0) return;

    if (mode === 'pairs') {
      // 5 pairs (5 Fronts + 5 Backs) per A4 Landscape sheet = 10 card faces per sheet
      const chunkSize = 5;
      for (let i = 0; i < members.length; i += chunkSize) {
        const chunk = members.slice(i, i + chunkSize);
        const pageNum = Math.floor(i / chunkSize) + 1;
        const totalPages = Math.ceil(members.length / chunkSize);

        const pageEl = document.createElement('div');
        pageEl.className = 'a4-sheet-page';

        const headerLabel = document.createElement('div');
        headerLabel.className = 'a4-sheet-header-label';
        headerLabel.innerHTML = `
          <span>NAVIGO NEPAL — A4 LANDSCAPE PRINT SHEET (${pageNum} OF ${totalPages})</span>
          <span>MODE: 5 FRONT & BACK PAIRS (10 CARDS / SHEET)</span>
        `;
        pageEl.appendChild(headerLabel);

        const gridEl = document.createElement('div');
        gridEl.className = 'a4-landscape-grid';

        chunk.forEach(member => {
          gridEl.appendChild(createPrintCardCell(member, 'front'));
          gridEl.appendChild(createPrintCardCell(member, 'back'));
        });

        pageEl.appendChild(gridEl);
        a4PreviewWrapper.appendChild(pageEl);
      }
    } else if (mode === 'duplex') {
      // Page 1: 10 Fronts, Page 2: 10 Backs
      const chunkSize = 10;
      for (let i = 0; i < members.length; i += chunkSize) {
        const chunk = members.slice(i, i + chunkSize);
        const sheetNum = Math.floor(i / chunkSize) + 1;

        const frontPage = createSingleSideSheet(chunk, 'front', `SHEET ${sheetNum} — FRONT SIDES (10 CARDS)`);
        a4PreviewWrapper.appendChild(frontPage);

        const backPage = createSingleSideSheet(chunk, 'back', `SHEET ${sheetNum} — BACK SIDES (10 CARDS)`);
        a4PreviewWrapper.appendChild(backPage);
      }
    } else {
      // mode === 'front' or 'back'
      const chunkSize = 10;
      const targetSide = mode;
      for (let i = 0; i < members.length; i += chunkSize) {
        const chunk = members.slice(i, i + chunkSize);
        const pageNum = Math.floor(i / chunkSize) + 1;
        const totalPages = Math.ceil(members.length / chunkSize);
        const title = `A4 LANDSCAPE SHEET (${pageNum} OF ${totalPages}) — ${targetSide.toUpperCase()} SIDES (10 CARDS)`;

        const pageEl = createSingleSideSheet(chunk, targetSide, title);
        a4PreviewWrapper.appendChild(pageEl);
      }
    }
  }

  function createSingleSideSheet(chunkMembers, side, title) {
    const pageEl = document.createElement('div');
    pageEl.className = 'a4-sheet-page';

    const headerLabel = document.createElement('div');
    headerLabel.className = 'a4-sheet-header-label';
    headerLabel.innerHTML = `
      <span>NAVIGO NEPAL — OFFICIAL ID PRINT SHEET</span>
      <span>${title}</span>
    `;
    pageEl.appendChild(headerLabel);

    const gridEl = document.createElement('div');
    gridEl.className = 'a4-landscape-grid';

    chunkMembers.forEach(member => {
      gridEl.appendChild(createPrintCardCell(member, side));
    });

    pageEl.appendChild(gridEl);
    return pageEl;
  }

  function createPrintCardCell(member, side = 'front') {
    const cell = document.createElement('div');
    cell.className = `print-card-cell ${side === 'back' ? 'show-back' : ''}`;

    const wrapperNode = createCardElement(member);
    const cardWrapper = wrapperNode.querySelector('.card-wrapper');
    const clonedWrapper = cardWrapper.cloneNode(true);

    const cardFront = clonedWrapper.querySelector('.card-front');
    const cardBack = clonedWrapper.querySelector('.card-back');

    if (side === 'front') {
      if (cardBack) cardBack.remove();
      if (cardFront) {
        cardFront.style.transform = 'none';
        cardFront.style.display = 'flex';
      }
    } else {
      if (cardFront) cardFront.remove();
      if (cardBack) {
        cardBack.style.transform = 'none';
        cardBack.style.display = 'flex';
      }
    }

    cell.appendChild(clonedWrapper);
    return cell;
  }

  function triggerA4BatchPrint() {
    const selectedMode = printSideSelect ? printSideSelect.value : 'front';
    renderA4LandscapeSheets(selectedMode);

    document.body.classList.add('print-sheets-mode');
    if (a4PreviewWrapper) a4PreviewWrapper.classList.add('active');

    window.print();

    setTimeout(() => {
      document.body.classList.remove('print-sheets-mode');
    }, 1000);
  }

  // Search Input Event
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      renderCards();
      if (a4PreviewWrapper && a4PreviewWrapper.classList.contains('active')) {
        renderA4LandscapeSheets(printSideSelect ? printSideSelect.value : 'front');
      }
    });
  }

  // Filter Tabs Event
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.category;
      renderCards();
      if (a4PreviewWrapper && a4PreviewWrapper.classList.contains('active')) {
        renderA4LandscapeSheets(printSideSelect ? printSideSelect.value : 'front');
      }
    });
  });

  // Print Action Triggers
  if (triggerPrintSheetBtn) triggerPrintSheetBtn.addEventListener('click', triggerA4BatchPrint);
  if (printAllBtn) printAllBtn.addEventListener('click', triggerA4BatchPrint);

  // Toggle Live A4 Landscape Screen Preview
  if (togglePreviewBtn) {
    togglePreviewBtn.addEventListener('click', () => {
      const selectedMode = printSideSelect ? printSideSelect.value : 'front';
      renderA4LandscapeSheets(selectedMode);
      if (a4PreviewWrapper) {
        a4PreviewWrapper.classList.toggle('active');
        togglePreviewBtn.classList.toggle('btn-nvg-primary');
        if (a4PreviewWrapper.classList.contains('active')) {
          togglePreviewBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg> Hide A4 Preview
          `;
        } else {
          togglePreviewBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg> Preview A4 Sheets
          `;
        }
      }
    });
  }

  if (printSideSelect) {
    printSideSelect.addEventListener('change', () => {
      if (a4PreviewWrapper && a4PreviewWrapper.classList.contains('active')) {
        renderA4LandscapeSheets(printSideSelect.value);
      }
    });
  }

  // Modal Control
  if (addCardBtn) addCardBtn.addEventListener('click', () => addCardModal.classList.add('active'));
  if (closeModalBtn) closeModalBtn.addEventListener('click', () => addCardModal.classList.remove('active'));
  if (addCardModal) {
    addCardModal.addEventListener('click', (e) => {
      if (e.target === addCardModal) addCardModal.classList.remove('active');
    });
  }

  // New Card Form Submit
  if (newCardForm) {
    newCardForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const newIdNumber = (membersData.length + 1).toString().padStart(3, '0');
      const newMember = {
        id: `NVG-2026-${newIdNumber}`,
        name: document.getElementById('memberName').value,
        post: document.getElementById('memberPost').value,
        category: document.getElementById('memberCategory').value,
        phone: document.getElementById('memberPhone').value,
        email: document.getElementById('memberEmail').value,
        social: '@navigonepal',
        photo: document.getElementById('memberPhoto').value || '../assets/members/placeholder.svg'
      };

      membersData.unshift(newMember);
      renderCards();
      if (a4PreviewWrapper && a4PreviewWrapper.classList.contains('active')) {
        renderA4LandscapeSheets(printSideSelect ? printSideSelect.value : 'front');
      }
      newCardForm.reset();
      addCardModal.classList.remove('active');
      alert(`Member ID Card generated successfully for ${newMember.name}!`);
    });
  }

  // Fallback Embedded Data
  function getFallbackMembersData() {
    return [
      {
        "id": "NVG-2026-005",
        "name": "Sakshyam Bastakoti",
        "post": "IT/Media Head",
        "category": "Core Team",
        "phone": "+977 976-4320750",
        "email": "sakshyamxeetri@gmail.com",
        "social": "@sakshyam.bastakoti",
        "photo": "../assets/members/sakshyam-bastakoti.png"
      }
    ];
  }
});

