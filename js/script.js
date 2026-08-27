/**
 * ==========================================================================
 * APEX MOTOR WERKS - Interactive Static Website Engine
 * Dark Automotive Editorial Experience & WhatsApp Booking Flow
 * ==========================================================================
 */

/**
 * --------------------------------------------------------------------------
 * 1. CONFIGURATION
 * Replace WHATSAPP_NUMBER with the workshop's actual phone number.
 * Format with country code without spaces or dashes (e.g. "15551234567" or "919876543210")
 * --------------------------------------------------------------------------
 */
const WHATSAPP_NUMBER = "REPLACE_WITH_NUMBER";

/**
 * Helper to build the direct WhatsApp URL
 */
function getWhatsAppUrl(customMessage) {
  const cleanNumber = WHATSAPP_NUMBER.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(customMessage);
  
  // If no number configured yet, provide a fallback alert / placeholder link
  if (cleanNumber === "REPLACE_WITH_NUMBER" || !cleanNumber) {
    return `https://wa.me/?text=${encodedText}`;
  }
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}

/**
 * --------------------------------------------------------------------------
 * 2. DOM CONTENT LOADED INITIALIZATION
 * --------------------------------------------------------------------------
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Setup components
  initHeaderScroll();
  initMobileMenu();
  initDirectWhatsAppLinks();
  initServiceHoverInteraction();
  initBookingModal();
  initScrollAnimations();
  setDefaultBookingDate();
});

/**
 * --------------------------------------------------------------------------
 * 3. HEADER SCROLL & BACKDROP BEHAVIOR
 * --------------------------------------------------------------------------
 */
function initHeaderScroll() {
  const header = document.getElementById('main-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * --------------------------------------------------------------------------
 * 4. MOBILE NAVIGATION DRAWER
 * --------------------------------------------------------------------------
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (!toggleBtn || !mobileNav) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
}

function openMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (!mobileNav || !toggleBtn) return;

  mobileNav.classList.add('open');
  toggleBtn.classList.add('active');
  toggleBtn.setAttribute('aria-expanded', 'true');
  mobileNav.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (!mobileNav || !toggleBtn) return;

  mobileNav.classList.remove('open');
  toggleBtn.classList.remove('active');
  toggleBtn.setAttribute('aria-expanded', 'false');
  mobileNav.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Expose to window for inline onclick handlers
window.openMobileMenu = openMobileMenu;
window.closeMobileMenu = closeMobileMenu;


/**
 * --------------------------------------------------------------------------
 * 5. DIRECT WHATSAPP LINKS BINDING
 * --------------------------------------------------------------------------
 */
function initDirectWhatsAppLinks() {
  const directLinks = document.querySelectorAll('.direct-wa-link');
  const defaultInquiry = "Hi APEX Motor Werks, I would like to inquire about booking a motorcycle service slot.";
  
  directLinks.forEach(link => {
    const waUrl = getWhatsAppUrl(defaultInquiry);
    if (link.tagName.toLowerCase() === 'a') {
      link.href = waUrl;
    }
    
    link.addEventListener('click', (e) => {
      // If clicked and URL is placeholder or needs guaranteed execution
      const currentUrl = getWhatsAppUrl(defaultInquiry);
      if (link.getAttribute('href') === '#' || link.tagName.toLowerCase() === 'button') {
        e.preventDefault();
        window.open(currentUrl, '_blank', 'noopener,noreferrer');
      }
    });
  });
}


/**
 * --------------------------------------------------------------------------
 * 6. EDITORIAL SERVICE LIST HOVER INTERACTION (Desktop)
 * --------------------------------------------------------------------------
 */
function initServiceHoverInteraction() {
  const serviceRows = document.querySelectorAll('.service-item-row');
  const previewCard = document.getElementById('service-preview-float');
  const previewImg = document.getElementById('service-preview-img');
  
  if (!previewCard || !previewImg || window.innerWidth <= 1024) return;

  let currentTargetY = 0;
  let currentTargetX = 0;
  let animFrameId = null;

  serviceRows.forEach(row => {
    row.addEventListener('mouseenter', (e) => {
      const imgSrc = row.getAttribute('data-service-img');
      if (imgSrc) {
        previewImg.src = imgSrc;
        previewCard.classList.add('active');
      }
    });

    row.addEventListener('mousemove', (e) => {
      // Smooth position calculation offset to side of cursor
      currentTargetX = e.clientX + 40;
      currentTargetY = e.clientY;

      // Keep within viewport boundaries
      if (currentTargetX + 320 > window.innerWidth) {
        currentTargetX = e.clientX - 340;
      }

      previewCard.style.left = `${currentTargetX}px`;
      previewCard.style.top = `${currentTargetY}px`;
    });

    row.addEventListener('mouseleave', () => {
      previewCard.classList.remove('active');
    });

    // Clicking the row opens the booking modal for that service
    row.addEventListener('click', (e) => {
      // If clicking directly on a button inside, let the button handle it
      if (e.target.closest('button')) return;
      const serviceName = row.getAttribute('data-service-name');
      openBookingModalWithService(serviceName);
    });
  });
}

/**
 * --------------------------------------------------------------------------
 * 7. WHATSAPP BOOKING MODAL & DYNAMIC MESSAGE BUILDER
 * --------------------------------------------------------------------------
 */
function initBookingModal() {
  const modalBackdrop = document.getElementById('booking-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const openButtons = document.querySelectorAll('.open-booking-modal');
  const bookingForm = document.getElementById('booking-form');

  if (!modalBackdrop || !bookingForm) return;

  // Open triggers
  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const preselectedService = btn.getAttribute('data-service');
      openBookingModalWithService(preselectedService);
    });
  });

  // Close triggers
  if (closeBtn) {
    closeBtn.addEventListener('click', closeBookingModal);
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeBookingModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeBookingModal();
    }
  });

  // Live preview message update inputs
  const bikeInput = document.getElementById('bike-model');
  const serviceSelect = document.getElementById('service-select');
  const dateInput = document.getElementById('pref-date');
  const timeSelect = document.getElementById('pref-time');
  const notesInput = document.getElementById('custom-notes');

  const updatePreview = () => {
    const bikeVal = bikeInput.value.trim() || "[Your Bike Model]";
    const serviceVal = serviceSelect.value || "Big Bike Service";
    const dateVal = dateInput.value ? formatDateNice(dateInput.value) : "[Preferred Date]";
    const timeVal = timeSelect.value || "Morning";
    const notesVal = notesInput.value.trim();

    let msg = `Hi APEX Motor Werks, I'd like to book a service slot.\n\nMotorcycle: ${bikeVal}\nService required: ${serviceVal}\nPreferred date: ${dateVal}\nPreferred time: ${timeVal}`;
    
    if (notesVal) {
      msg += `\nNotes: ${notesVal}`;
    }

    const previewEl = document.getElementById('booking-preview-text');
    if (previewEl) {
      previewEl.textContent = msg;
    }
  };

  [bikeInput, serviceSelect, dateInput, timeSelect, notesInput].forEach(el => {
    if (el) {
      el.addEventListener('input', updatePreview);
      el.addEventListener('change', updatePreview);
    }
  });

  // Form submission -> launch WhatsApp
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const bikeVal = bikeInput.value.trim();
    if (!bikeVal) {
      bikeInput.focus();
      return;
    }

    const serviceVal = serviceSelect.value;
    const dateVal = dateInput.value ? formatDateNice(dateInput.value) : "Earliest Available Slot";
    const timeVal = timeSelect.value;
    const notesVal = notesInput.value.trim();

    let finalMessage = `Hi APEX Motor Werks, I'd like to book a service slot.\n\n` +
      `Motorcycle: ${bikeVal}\n` +
      `Service required: ${serviceVal}\n` +
      `Preferred date: ${dateVal}\n` +
      `Preferred time: ${timeVal}`;

    if (notesVal) {
      finalMessage += `\nNotes: ${notesVal}`;
    }

    const waUrl = getWhatsAppUrl(finalMessage);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    closeBookingModal();
  });
}

function openBookingModalWithService(serviceName) {
  const modalBackdrop = document.getElementById('booking-modal');
  const serviceSelect = document.getElementById('service-select');
  const bikeInput = document.getElementById('bike-model');
  
  if (!modalBackdrop) return;

  if (serviceName && serviceSelect) {
    // Match service select options
    for (let i = 0; i < serviceSelect.options.length; i++) {
      const opt = serviceSelect.options[i];
      if (opt.value.toLowerCase().includes(serviceName.toLowerCase()) || 
          serviceName.toLowerCase().includes(opt.value.toLowerCase())) {
        serviceSelect.selectedIndex = i;
        break;
      }
    }
  }

  modalBackdrop.classList.add('open');
  modalBackdrop.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Trigger preview update and focus
  const event = new Event('input', { bubbles: true });
  if (serviceSelect) serviceSelect.dispatchEvent(event);
  if (bikeInput) {
    setTimeout(() => bikeInput.focus(), 150);
  }
}

function closeBookingModal() {
  const modalBackdrop = document.getElementById('booking-modal');
  if (!modalBackdrop) return;

  modalBackdrop.classList.remove('open');
  modalBackdrop.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function setDefaultBookingDate() {
  const dateInput = document.getElementById('pref-date');
  if (!dateInput) return;

  // Set minimum date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yyyy = tomorrow.getFullYear();
  const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const dd = String(tomorrow.getDate()).padStart(2, '0');
  
  dateInput.min = `${yyyy}-${mm}-${dd}`;
  dateInput.value = `${yyyy}-${mm}-${dd}`;
}

function formatDateNice(dateStr) {
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const d = new Date(parts[0], parts[1] - 1, parts[2]);
      return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    }
  } catch (e) {
    return dateStr;
  }
  return dateStr;
}

/**
 * --------------------------------------------------------------------------
 * 8. SCROLL REVEALS & GSAP ENHANCEMENTS
 * --------------------------------------------------------------------------
 */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  // Fallback / High-performance IntersectionObserver
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.12
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
  } else {
    // If no observer, reveal all immediately
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // GSAP ScrollTrigger for Kinetic Manifesto text if GSAP is loaded
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Subtle parallax on hero image
    gsap.to('.hero-backdrop-img', {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // Kinetic typography scaling on statement section
    gsap.fromTo('.statement-headline-2', 
      { opacity: 0.7, scale: 0.98 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: '.statement-section',
          start: 'top 75%',
          end: 'bottom 60%',
          scrub: 0.5
        }
      }
    );
  }
}
