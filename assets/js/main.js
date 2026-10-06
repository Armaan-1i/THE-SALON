/**
 * THE SALON — Minimalist Editorial Script & Interactive Booking
 * Architecture: Clean Multi-Page Navigation
 * Official Staff Contacts:
 * 1. Suraj Thakur — 8252681657
 * 2. Karan Thakur — 7481933120
 */

// Official Staff Definitions (Equal Importance)
const STAFF_SURAJ = {
  name: 'Suraj Thakur',
  phone: '8252681657',
  waNumber: '918252681657'
};

const STAFF_KARAN = {
  name: 'Karan Thakur',
  phone: '7481933120',
  waNumber: '917481933120'
};

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initAppointmentSystem();
  setActiveNav();
});

/* ==========================================================================
   1. STICKY COMPACT HEADER
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. MOBILE DRAWER NAVIGATION (Real Multi-Page Navigation)
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileToggle');
  const drawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!toggleBtn || !drawer) return;

  const toggleMenu = () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      toggleBtn.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      drawer.classList.add('open');
      toggleBtn.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  };

  toggleBtn.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (drawer.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      toggleMenu();
    }
  });
}

/* ==========================================================================
   3. ACTIVE NAV ITEM DETECTION (Multi-Page Route Highlighter)
   ========================================================================== */
function setActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link, .mobile-nav .mobile-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ==========================================================================
   4. APPOINTMENT SYSTEM & EQUAL STAFF WHATSAPP GENERATOR
   ========================================================================== */
function initAppointmentSystem() {
  const customizerGrid = document.getElementById('customizerGrid');
  const totalAmountEl = document.getElementById('totalAmount');
  const selectedCountEl = document.getElementById('selectedCount');
  
  // Inputs
  const nameInput = document.getElementById('custName');
  const serviceSelect = document.getElementById('serviceSelect');
  const dateInput = document.getElementById('prefDate');
  const timeSelect = document.getElementById('prefTime');
  const messageInput = document.getElementById('custMessage');

  // Staff Buttons
  const surajWaBtn = document.getElementById('surajWaBtn');
  const karanWaBtn = document.getElementById('karanWaBtn');
  const surajCallBtn = document.getElementById('surajCallBtn');
  const karanCallBtn = document.getElementById('karanCallBtn');

  // Set default date to today if empty
  if (dateInput && !dateInput.value) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.value = `${yyyy}-${mm}-${dd}`;
  }

  // Exact salon services data (All verified prices)
  const servicesList = [
    { id: 'cut', name: 'Hair Cut', price: 70, category: 'Hair' },
    { id: 'shave', name: 'Shaving', price: 70, category: 'Hair' },
    { id: 'beard', name: 'Beard Set / Shaping', price: 70, category: 'Hair' },
    { id: 'head_massage', name: 'Head Massage', price: 100, category: 'Spa' },
    { id: 'oxy_spa', name: 'Oxy Hair Spa', price: 500, category: 'Spa' },
    { id: 'natures_spa', name: "Nature's Hair Spa", price: 600, category: 'Spa' },
    { id: 'nisha_col', name: 'Nisha Hair Colour', price: 150, category: 'Colour' },
    { id: 'garnier_col', name: 'Garnier Hair Colour', price: 200, category: 'Colour' },
    { id: 'loreal_col', name: "L'Oréal Hair Colour", price: 700, category: 'Colour' },
    { id: 'norm_scrub', name: 'Normal Scrub', price: 100, category: 'Scrub' },
    { id: 'lotus_scrub', name: 'Lotus Scrub', price: 200, category: 'Scrub' },
    { id: 'gold_bleach', name: 'Gold Bleach', price: 200, category: 'Scrub' },
    { id: 'body_massage', name: 'Full Body Massage', price: 800, category: 'Massage' },
    { id: 'cipla_dtan', name: 'Cipla D-Tan', price: 500, category: 'D-Tan' },
    { id: 'vlcc_dtan', name: 'VLCC D-Tan', price: 500, category: 'D-Tan' },
    { id: 'ozone_dtan', name: 'Ozone D-Tan', price: 600, category: 'D-Tan' },
    { id: 'o3_dtan', name: 'O3+ D-Tan', price: 600, category: 'D-Tan' },
    { id: 'raaga_dtan', name: 'Raaga D-Tan', price: 700, category: 'D-Tan' },
    { id: 'opal_massage', name: 'Opal Massage', price: 200, category: 'Facial' },
    { id: 'natures_facial', name: "Nature's Facial", price: 1200, category: 'Facial' },
    { id: 'gold_facial', name: 'Gold Facial', price: 1400, category: 'Facial' },
    { id: 'vlcc_facial', name: 'VLCC Facial', price: 1400, category: 'Facial' },
    { id: 'lotus_facial', name: 'Lotus Facial', price: 1600, category: 'Facial' }
  ];

  const selectedServices = new Set();

  if (customizerGrid) {
    // Render selectable labels
    customizerGrid.innerHTML = servicesList.map(srv => `
      <label class="clean-select-label" data-id="${srv.id}">
        <span class="clean-item-name">${srv.name}</span>
        <span class="clean-item-price">₹${srv.price.toLocaleString('en-IN')}</span>
      </label>
    `).join('');

    const labels = customizerGrid.querySelectorAll('.clean-select-label');
    labels.forEach(label => {
      label.addEventListener('click', () => {
        const srvId = label.getAttribute('data-id');
        const service = servicesList.find(s => s.id === srvId);
        if (!service) return;

        if (selectedServices.has(service)) {
          selectedServices.delete(service);
          label.classList.remove('checked');
        } else {
          selectedServices.add(service);
          label.classList.add('checked');
        }

        updateAppointmentDetails();
      });
    });

    // Default select Hair Cut
    const defaultCut = servicesList.find(s => s.id === 'cut');
    if (defaultCut) {
      selectedServices.add(defaultCut);
      const cutLabel = customizerGrid.querySelector('[data-id="cut"]');
      if (cutLabel) cutLabel.classList.add('checked');
    }
  }

  // Bind input listeners
  [nameInput, serviceSelect, dateInput, timeSelect, messageInput].forEach(elem => {
    if (elem) {
      elem.addEventListener('input', updateAppointmentDetails);
      elem.addEventListener('change', updateAppointmentDetails);
    }
  });

  function updateAppointmentDetails() {
    let total = 0;
    const itemsArray = Array.from(selectedServices);

    itemsArray.forEach(item => {
      total += item.price;
    });

    if (totalAmountEl) {
      totalAmountEl.textContent = `₹${total.toLocaleString('en-IN')}`;
    }
    if (selectedCountEl) {
      selectedCountEl.textContent = `${itemsArray.length} service${itemsArray.length === 1 ? '' : 's'} selected`;
    }

    // Determine service string
    let serviceStr = '';
    if (itemsArray.length > 0) {
      serviceStr = itemsArray.map(item => item.name).join(', ') + ` (₹${total.toLocaleString('en-IN')})`;
    } else if (serviceSelect && serviceSelect.value) {
      serviceStr = serviceSelect.value;
    } else {
      serviceStr = 'Hair Cut & Styling';
    }

    // Collect field values
    const custName = (nameInput?.value.trim()) || '[Customer Name]';
    const prefDate = (dateInput?.value) || '[Preferred Date]';
    const prefTime = (timeSelect?.value) || '[Preferred Time]';
    const custMsg = (messageInput?.value.trim()) || '';

    // Construct Official WhatsApp Message Format
    let waMessage = `Hello THE SALON 👋\n\nI would like to book an appointment.\n\nName: ${custName}\nService: ${serviceStr}\nPreferred Date: ${prefDate}\nPreferred Time: ${prefTime}`;
    
    if (custMsg) {
      waMessage += `\nMessage: ${custMsg}`;
    }

    waMessage += `\n\nPlease confirm my appointment. Thank you!`;

    const encodedMsg = encodeURIComponent(waMessage);

    // Update Suraj Thakur buttons
    if (surajWaBtn) {
      surajWaBtn.href = `https://wa.me/${STAFF_SURAJ.waNumber}?text=${encodedMsg}`;
    }
    if (surajCallBtn) {
      surajCallBtn.href = `tel:${STAFF_SURAJ.phone}`;
    }

    // Update Karan Thakur buttons
    if (karanWaBtn) {
      karanWaBtn.href = `https://wa.me/${STAFF_KARAN.waNumber}?text=${encodedMsg}`;
    }
    if (karanCallBtn) {
      karanCallBtn.href = `tel:${STAFF_KARAN.phone}`;
    }
  }

  // Initial calculation
  updateAppointmentDetails();
}

