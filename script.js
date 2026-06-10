document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Sticky Header scroll effect
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinksMenu = document.getElementById('nav-links-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileMenuBtn.addEventListener('click', () => {
    navLinksMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('open');
  });

  // Close mobile menu when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinksMenu.classList.remove('active');
      mobileMenuBtn.classList.remove('open');
      
      // Update active state
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // 3. High Performance YouTube Lazy-Loading Video Modal
  const playVideoTrigger = document.getElementById('play-video-trigger');
  const videoModal = document.getElementById('video-player-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalVideoContainer = document.getElementById('modal-video-container');

  playVideoTrigger.addEventListener('click', () => {
    // Dynamic iframe creation to boost initial page speed score
    modalVideoContainer.innerHTML = `
      <iframe src="https://drive.google.com/file/d/11hlCvBWr05uaJynWoHHg8k-oZa1WJnqd/preview" 
              allow="autoplay" 
              allowfullscreen
              title="فيديو تعريفي أحلى مكان للاستقدام">
      </iframe>
    `;
    videoModal.classList.add('active');
    videoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // prevent background scrolling
  });

  const closeModal = () => {
    videoModal.classList.remove('active');
    videoModal.setAttribute('aria-hidden', 'true');
    modalVideoContainer.innerHTML = ''; // Destroy iframe to stop playback
    document.body.style.overflow = ''; // restore scrolling
  };

  closeModalBtn.addEventListener('click', closeModal);
  
  // Close modal when clicking outside the video container
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
      closeModal();
    }
  });

  // 4. Stats Counter Animation on Scroll Viewport Entry
  const stats = document.querySelectorAll('.stat-number');
  let animated = false;

  const startCounter = () => {
    stats.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const suffix = target === 99 ? '%' : '+';
      let current = 0;
      const duration = 2000; // 2 seconds animation duration
      const steps = 50;
      const stepValue = target / steps;
      const stepTime = duration / steps;

      const counterInterval = setInterval(() => {
        current += stepValue;
        if (current >= target) {
          stat.textContent = target + suffix;
          clearInterval(counterInterval);
        } else {
          stat.textContent = Math.floor(current) + suffix;
        }
      }, stepTime);
    });
  };

  // Intersection Observer for triggering counters
  const observerOptions = {
    root: null,
    threshold: 0.3
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        startCounter();
        animated = true;
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const statsSection = document.querySelector('.stats-strip');
  if (statsSection) {
    observer.observe(statsSection);
  }

  // 5. Gallery Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const workerCards = document.querySelectorAll('.worker-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      workerCards.forEach(card => {
        const nationality = card.getAttribute('data-nationality');
        
        if (filterValue === 'all' || nationality === filterValue) {
          // Show with animate
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          // Hide with fade out
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 6. WhatsApp Worker request messaging (Disabled - cards are now promotional only)
  const workerCtaBtns = document.querySelectorAll('.worker-cta');
  if (workerCtaBtns && workerCtaBtns.length > 0) {
    workerCtaBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const workerId = btn.getAttribute('data-worker-id');
        const country = btn.getAttribute('data-worker-country');
        const phoneNumber = '97470666105';
        
        const customMessage = `مرحباً أحلى مكان، أريد الاستفسار عن العاملة المنزلية من جنسية (${country}) ذات الرمز [${workerId}] المعروضة في موقعكم.`;
        const encodedMessage = encodeURIComponent(customMessage);
        const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        window.open(waUrl, '_blank');
      });
    });
  }

  // 7. Contact Form WhatsApp redirection (Disabled - form removed)
  const contactForm = document.getElementById('main-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('form-name').value.trim();
      const phone = document.getElementById('form-phone').value.trim();
      const nationality = document.getElementById('form-nationality').value;
      const message = document.getElementById('form-message').value.trim();
      const phoneNumber = '97470666105';

      const msgText = `*طلب استفسار جديد من الموقع الجغرافي*%0A` +
                      `*الاسم:* ${name}%0A` +
                      `*رقم الجوال:* ${phone}%0A` +
                      `*الجنسية المطلوبة:* ${nationality}%0A` +
                      `*تفاصيل الاستفسار:* ${message ? message : 'لا يوجد تفاصيل إضافية'}`;
                      
      const waUrl = `https://wa.me/${phoneNumber}?text=${msgText}`;
      window.open(waUrl, '_blank');
    });
  }

  // 8. Navigation active highlighting on scroll
  const navSections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    navSections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector(`.nav-links a[href*=${sectionId}]`)?.classList.add('active');
      } else {
        document.querySelector(`.nav-links a[href*=${sectionId}]`)?.classList.remove('active');
      }
    });
  });

  // 9. Google Ads Conversion / Event Tracking
  const trackConversion = (eventName, contactMethod) => {
    if (typeof gtag === 'function') {
      gtag('event', eventName, {
        'event_category': 'Contact',
        'event_label': contactMethod,
        'value': 1.0
      });
      // Standard conversion action trigger for Google Ads (uncomment and replace when conversion labels are set up)
      // gtag('event', 'conversion', {'send_to': 'AW-GOOGLE_AD_ID/CONVERSION_LABEL'});
    }
  };

  // Add click listeners to WhatsApp elements
  const whatsappElements = [
    'floating-whatsapp-widget',
    'hero-whatsapp-link',
    'header-whatsapp-btn',
    'contact-whatsapp-btn'
  ];
  whatsappElements.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', () => {
        trackConversion('contact_whatsapp', id);
      });
    }
  });

  // Add click listeners to Phone elements
  const phoneElements = [
    'hero-phone-link',
    'contact-phone-call'
  ];
  phoneElements.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', () => {
        trackConversion('contact_phone', id);
      });
    }
  });

});

