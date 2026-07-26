/* ============================================================
   Navigo Nepal — Official Member ID Card Generator Logic
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
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 1rem; opacity: 0.5;">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <p style="font-size: 1.1rem; font-weight: 600;">No member cards found matching "${searchQuery}"</p>
          <p style="font-size: 0.85rem; opacity: 0.8; margin-top: 0.25rem;">Try adjusting your search terms or filter criteria.</p>
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

    // QR Code URL (using Google Charts API QR generator for high clarity)
    const qrText = encodeURIComponent(`https://navigonepal.org/verify?id=${member.id}&name=${encodeURIComponent(member.name)}`);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrText}&color=0A2342`;

    wrapper.innerHTML = `
      <div class="card-wrapper" id="card-${member.id}">
        <div class="card-inner">
          
          <!-- FRONT FACE -->
          <div class="card-face card-front">
            <div class="card-header-bg">
              <div class="card-top-row">
                <img src="../assets/navigo logo.png" alt="Navigo Nepal" class="card-org-logo" onerror="this.src='../assets/png_new_logo.png'">
                <span class="card-badge-type">${member.category || 'MEMBER'}</span>
              </div>
            </div>

            <div class="card-photo-container">
              <div class="card-photo-frame">
                <img src="${member.photo || '../assets/members/placeholder.svg'}" alt="${member.name}" onerror="this.src='../assets/members/placeholder.svg'">
              </div>
            </div>

            <div class="card-body-content">
              <h2 class="card-member-name">${member.name}</h2>
              <span class="card-member-post">${member.post}</span>

              <div class="card-info-grid">
                <div class="card-info-item">
                  <span class="card-info-label">MEMBER ID</span>
                  <span class="card-info-val">${member.id}</span>
                </div>
                <div class="card-info-item">
                  <span class="card-info-label">BLOOD GROUP</span>
                  <span class="card-info-val">${member.bloodGroup || 'N/A'}</span>
                </div>
                <div class="card-info-item">
                  <span class="card-info-label">PHONE</span>
                  <span class="card-info-val" title="${member.phone || ''}">${member.phone || 'N/A'}</span>
                </div>
                <div class="card-info-item">
                  <span class="card-info-label">VALID TILL</span>
                  <span class="card-info-val">${member.validTill || '2028-01-15'}</span>
                </div>
                <div class="card-info-item" style="grid-column: span 2;">
                  <span class="card-info-label">EMAIL</span>
                  <span class="card-info-val" title="${member.email || ''}">${member.email || 'info@navigonepal.org'}</span>
                </div>
              </div>
            </div>

            <div class="card-footer-strip">
              <span>NAVIGO NEPAL</span>
              <div class="hologram-seal" title="Official Verified Badge">NVG</div>
              <span>OFFICIAL ID</span>
            </div>
          </div>

          <!-- BACK FACE -->
          <div class="card-face card-back">
            <div class="card-back-header"></div>
            
            <div class="card-back-body">
              <div class="card-terms">
                <strong>PROPERTY OF NAVIGO NEPAL</strong><br>
                This card is non-transferable and remains the official property of Navigo Nepal. If found, please return to: Navigo Nepal HQ, Kathmandu, Nepal.
              </div>

              <div class="card-qr-section">
                <div class="card-qr-code">
                  <img src="${qrUrl}" alt="Verification QR Code">
                </div>
                <div class="card-sign-box">
                  <span class="card-signature">Navigo Nepal</span>
                  <div class="card-sign-line"></div>
                  <span class="card-sign-title">AUTHORIZED SIGNATURE</span>
                </div>
              </div>

              <div>
                <div style="font-size: 0.65rem; color: #64748B; font-weight: 600;">EMERGENCY CONTACT</div>
                <div style="font-size: 0.75rem; font-weight: 700; color: #0A2342;">${member.emergencyContact || member.phone || '+977 980-0000000'}</div>
                <div class="card-barcode">*${member.id}*</div>
              </div>
            </div>

            <div class="card-footer-strip">
              <span>WWW.NAVIGONEPAL.ORG</span>
              <span>EST. 2026</span>
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
    const qrText = encodeURIComponent(`https://navigonepal.org/verify?id=${member.id}&name=${encodeURIComponent(member.name)}`);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrText}&color=0A2342`;

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
            <div class="card-header-bg">
              <div class="card-top-row">
                <img src="../assets/navigo logo.png" class="card-org-logo">
                <span class="card-badge-type">${member.category || 'MEMBER'}</span>
              </div>
            </div>
            <div class="card-photo-container">
              <div class="card-photo-frame">
                <img src="${member.photo || '../assets/members/placeholder.svg'}">
              </div>
            </div>
            <div class="card-body-content">
              <h2 class="card-member-name">${member.name}</h2>
              <span class="card-member-post">${member.post}</span>
              <div class="card-info-grid">
                <div class="card-info-item"><span class="card-info-label">MEMBER ID</span><span class="card-info-val">${member.id}</span></div>
                <div class="card-info-item"><span class="card-info-label">BLOOD GROUP</span><span class="card-info-val">${member.bloodGroup || 'N/A'}</span></div>
                <div class="card-info-item"><span class="card-info-label">PHONE</span><span class="card-info-val">${member.phone || 'N/A'}</span></div>
                <div class="card-info-item"><span class="card-info-label">VALID TILL</span><span class="card-info-val">${member.validTill || '2028-01-15'}</span></div>
                <div class="card-info-item" style="grid-column: span 2;"><span class="card-info-label">EMAIL</span><span class="card-info-val">${member.email || ''}</span></div>
              </div>
            </div>
            <div class="card-footer-strip"><span>NAVIGO NEPAL</span><div class="hologram-seal">NVG</div><span>OFFICIAL ID</span></div>
          </div>
        </div>

        <div class="card-wrapper">
          <div class="card-face card-back" style="position:relative; transform:none;">
            <div class="card-back-header"></div>
            <div class="card-back-body">
              <div class="card-terms">
                <strong>PROPERTY OF NAVIGO NEPAL</strong><br>
                This card is non-transferable and remains the official property of Navigo Nepal. Return to: Navigo Nepal HQ, Kathmandu, Nepal.
              </div>
              <div class="card-qr-section">
                <div class="card-qr-code"><img src="${qrUrl}"></div>
                <div class="card-sign-box">
                  <span class="card-signature">Navigo Nepal</span>
                  <div class="card-sign-line"></div>
                  <span class="card-sign-title">AUTHORIZED SIGNATURE</span>
                </div>
              </div>
              <div>
                <div style="font-size: 0.65rem; color: #64748B; font-weight: 600;">EMERGENCY CONTACT</div>
                <div style="font-size: 0.75rem; font-weight: 700; color: #0A2342;">${member.emergencyContact || member.phone || ''}</div>
                <div class="card-barcode">*${member.id}*</div>
              </div>
            </div>
            <div class="card-footer-strip"><span>WWW.NAVIGONEPAL.ORG</span><span>EST. 2026</span></div>
          </div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 500);
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
  if (addCardBtn) {
    addCardBtn.addEventListener('click', () => addCardModal.classList.add('active'));
  }
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => addCardModal.classList.remove('active'));
  }
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
        bloodGroup: document.getElementById('memberBlood').value || 'O+',
        photo: document.getElementById('memberPhoto').value || '../assets/members/placeholder.svg',
        issueDate: new Date().toISOString().split('T')[0],
        validTill: '2028-01-15',
        emergencyContact: document.getElementById('memberPhone').value
      };

      membersData.unshift(newMember);
      renderCards();
      newCardForm.reset();
      addCardModal.classList.remove('active');
      alert(`Member ID Card generated successfully for ${newMember.name} (ID: ${newMember.id})!`);
    });
  }

  // Print All Cards
  if (printAllBtn) {
    printAllBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Fallback Embedded Data if JSON fetch fails in local file system without http server
  function getFallbackMembersData() {
    return [
      {
        "id": "NVG-2026-001",
        "name": "Anupam Neupane",
        "post": "Co-Founder & Executive Director",
        "category": "Co-Founders",
        "phone": "+977 980-1234567",
        "email": "anupam.neupane@navigonepal.org",
        "bloodGroup": "O+",
        "photo": "../assets/169567052.jpg",
        "validTill": "2028-01-15"
      },
      {
        "id": "NVG-2026-004",
        "name": "Prasoon Bhatta",
        "post": "Operations/HR Head",
        "category": "Core Team",
        "phone": "+977 976-8422422",
        "email": "prasoon.bhatta@navigonepal.org",
        "bloodGroup": "O+",
        "photo": "../assets/members/prasoon bhataa.jpeg",
        "validTill": "2027-01-15"
      },
      {
        "id": "NVG-2026-005",
        "name": "Sakshyam Bastakoti",
        "post": "IT/Media Head",
        "category": "Core Team",
        "phone": "+977 976-3374079",
        "email": "sakshyamxeetri@gmail.com",
        "bloodGroup": "AB+",
        "photo": "../assets/members/sakshyambastakoti.PNG",
        "validTill": "2027-01-15"
      },
      {
        "id": "NVG-2026-006",
        "name": "Usnish Bajracharya",
        "post": "Design & Editing Head",
        "category": "Core Team",
        "phone": "+977 981-3123920",
        "email": "ushnish2022@gmail.com",
        "bloodGroup": "O+",
        "photo": "../assets/members/usinshish.jpeg",
        "validTill": "2027-01-15"
      },
      {
        "id": "NVG-2026-007",
        "name": "Shalin Dahal (Sahil)",
        "post": "Communication Head",
        "category": "Core Team",
        "phone": "+977 981-8277423",
        "email": "samriddhidahal713@gmail.com",
        "bloodGroup": "A+",
        "photo": "../assets/members/shalin dahal.png",
        "validTill": "2027-01-15"
      },
      {
        "id": "NVG-2026-008",
        "name": "Ansu Adhikari",
        "post": "Executive Member",
        "category": "Core Team",
        "phone": "+977 976-2565335",
        "email": "adhikariansu05@gmail.com",
        "bloodGroup": "B+",
        "photo": "../assets/members/anshu Adhkari.jpeg",
        "validTill": "2027-01-15"
      },
      {
        "id": "NVG-2026-009",
        "name": "Abhi KC",
        "post": "Documentation Head",
        "category": "Core Team",
        "phone": "+977 976-4320750",
        "email": "acedabhi.17@gmail.com",
        "bloodGroup": "O+",
        "photo": "../assets/members/avidaya kc.jpeg",
        "validTill": "2027-01-15"
      },
      {
        "id": "NVG-2026-010",
        "name": "Prithivi Raj Poudel",
        "post": "Research & Presentation Head",
        "category": "Core Team",
        "phone": "+977 981-8354090",
        "email": "prithivi.poudel@navigonepal.org",
        "bloodGroup": "A+",
        "photo": "../assets/members/prithivi.png",
        "validTill": "2027-01-15"
      },
      {
        "id": "NVG-2026-011",
        "name": "Sakshyam Bista",
        "post": "Outreach Head",
        "category": "Core Team",
        "phone": "+977 976-3374079",
        "email": "sakshyam.bista12@gmail.com",
        "bloodGroup": "B+",
        "photo": "../assets/members/sakshyam bisra.jpeg",
        "validTill": "2027-01-15"
      },
      {
        "id": "NVG-2026-012",
        "name": "Gaurav Acharya",
        "post": "Logistics Head",
        "category": "Core Team",
        "phone": "+977 976-8422422",
        "email": "thegauravacharya1@gmail.com",
        "bloodGroup": "O+",
        "photo": "../assets/members/Gaurav_Acharya.png",
        "validTill": "2027-01-15"
      }
    ];
  }
});
