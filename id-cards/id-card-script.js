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

  // Create Individual Card DOM Node
  function createCardElement(member) {
    const wrapper = document.createElement('div');
    wrapper.className = 'card-wrapper-item';
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.alignItems = 'center';

    // Official Navigo Nepal Website QR Code
    const websiteQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https%3A%2F%2Fnavigonepal.org&color=0F172A`;
    // Member verification QR code for back side
    const memberQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`https://navigonepal.org/verify?id=${member.id}&name=${encodeURIComponent(member.name)}`)}&color=0F172A`;

    wrapper.innerHTML = `
      <div class="card-wrapper" id="card-${member.id}">
        <div class="card-inner">
          
          <!-- FRONT FACE -->
          <div class="card-face card-front">
            
            <!-- Top White Header (No Text Overlap) -->
            <div class="ref-header-top">
              <img src="../assets/navigo logo.png" alt="Navigo Nepal" class="ref-header-logo" onerror="this.src='../assets/png_new_logo.png'">
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

              <!-- Footer Website QR Code Box -->
              <div class="ref-qr-container">
                <div class="ref-qr-box">
                  <img src="${websiteQrUrl}" alt="Navigo Nepal Website QR">
                </div>
                <div class="ref-qr-text-wrap">
                  <span class="ref-qr-title">SCAN TO VISIT WEBSITE</span>
                  <span class="ref-qr-url">navigonepal.org</span>
                </div>
              </div>
            </div>

          </div>

          <!-- BACK FACE -->
          <div class="card-face card-back">
            <div class="ref-back-header">
              <img src="../assets/navigo logo.png" style="height: 32px;" onerror="this.src='../assets/png_new_logo.png'">
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
                <div style="font-size: 0.7rem; color: #94A3B8; font-weight: 600;">EMERGENCY CONTACT</div>
                <div style="font-size: 0.85rem; font-weight: 700; color: #F8FAFC;">${member.phone || '+977 980-0000000'}</div>
                <div style="font-size: 0.75rem; color: #D97706; font-weight: 700; margin-top: 0.25rem;">www.navigonepal.org</div>
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

  // Print Single Card
  function printSingleCard(member) {
    const printWindow = window.open('', '_blank');
    const websiteQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https%3A%2F%2Fnavigonepal.org&color=0F172A`;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Print ID Card - ${member.name}</title>
        <link rel="stylesheet" href="id-card-styles.css">
        <style>
          body { background: #fff !important; color: #000 !important; display: flex; justify-content: center; align-items: center; min-height: 100vh; gap: 20px; }
          .card-wrapper { box-shadow: none !important; margin: 0 auto; border: 1px solid #ccc; }
          .card-inner { transform-style: flat !important; }
        </style>
      </head>
      <body>
        <div class="card-wrapper">
          <div class="card-face card-front" style="position:relative;">
            <div class="ref-header-top">
              <img src="../assets/navigo logo.png" class="ref-header-logo">
              <div class="ref-header-brand">NAVIGO NEPAL<span>YOUTH EDUCATIONAL CATALYST</span></div>
            </div>
            <div class="ref-wings-container">
              <div class="ref-wing-left"></div>
              <div class="ref-wing-right"></div>
            </div>
            <div class="ref-avatar-container">
              <div class="ref-avatar-ring">
                <div class="ref-avatar-img-wrap"><img src="${member.photo || '../assets/members/placeholder.svg'}"></div>
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
              <div class="ref-qr-container">
                <div class="ref-qr-box"><img src="${websiteQrUrl}"></div>
                <div class="ref-qr-text-wrap"><span class="ref-qr-title">SCAN TO VISIT WEBSITE</span><span class="ref-qr-url">navigonepal.org</span></div>
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

  // Search Input Event
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      renderCards();
    });
  }

  // Filter Tabs Event
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.category;
      renderCards();
    });
  });

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
      newCardForm.reset();
      addCardModal.classList.remove('active');
      alert(`Member ID Card generated successfully for ${newMember.name}!`);
    });
  }

  // Print All Cards
  if (printAllBtn) {
    printAllBtn.addEventListener('click', () => {
      window.print();
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
        "photo": "../assets/members/sakshyambastakoti.PNG"
      }
    ];
  }
});
