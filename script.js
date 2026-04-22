/* ═══════════════════════════════════════════════════
   M.M Gyan Coaching — Master Script
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ───────────────────── AOS Init ───────────────────── */
  AOS.init({
    once: true,
    duration: 800
  });

  /* ───────────────────── Preloader ───────────────────── */
  window.addEventListener('load', function () {
    setTimeout(function () {
      var preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.classList.add('hidden');
      }
    }, 1500);
  });

  /* ───────────────────── Navbar Scroll Behavior ───────────────────── */
  var navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll);

  /* ───────────────────── Mobile Menu Toggle ───────────────────── */
  var menuToggle = document.getElementById('menuToggle');
  var navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function () {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when nav link clicked
    var navLinks = navMenu.querySelectorAll('.nav-link:not(.dropdown-toggle)');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  /* ───────────────────── Dropdown (Mobile) ───────────────────── */
  var dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        var dropdownMenu = this.nextElementSibling;
        if (dropdownMenu) {
          dropdownMenu.classList.toggle('show');
        }
      }
    });
  });

  /* ───────────────────── Hero Carousel ───────────────────── */
  var heroSlides = document.querySelectorAll('.hero-slide');
  var carouselDotsContainer = document.getElementById('carouselDots');
  var prevBtn = document.getElementById('heroPrev');
  var nextBtn = document.getElementById('heroNext');
  var currentSlide = 0;
  var slideInterval;

  // Set background images from data-bg attribute
  heroSlides.forEach(function (slide) {
    var bg = slide.getAttribute('data-bg');
    if (bg) {
      slide.style.backgroundImage = 'url(' + bg + ')';
    }
  });

  // Create dots
  if (carouselDotsContainer) {
    heroSlides.forEach(function (_, index) {
      var dot = document.createElement('div');
      dot.classList.add('carousel-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', function () {
        goToSlide(index);
      });
      carouselDotsContainer.appendChild(dot);
    });
  }

  function goToSlide(index) {
    heroSlides.forEach(function (slide) {
      slide.classList.remove('active');
    });
    var dots = document.querySelectorAll('.carousel-dot');
    dots.forEach(function (dot) {
      dot.classList.remove('active');
    });
    currentSlide = index;
    if (currentSlide >= heroSlides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = heroSlides.length - 1;
    heroSlides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlideFunc() {
    goToSlide(currentSlide - 1);
  }

  if (prevBtn) prevBtn.addEventListener('click', function () {
    prevSlideFunc();
    resetInterval();
  });

  if (nextBtn) nextBtn.addEventListener('click', function () {
    nextSlide();
    resetInterval();
  });

  function startInterval() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
  }

  startInterval();

  /* ───────────────────── Hero Particles ───────────────────── */
  var particlesContainer = document.getElementById('heroParticles');
  if (particlesContainer) {
    for (var i = 0; i < 30; i++) {
      var particle = document.createElement('div');
      particle.classList.add('particle');
      var size = Math.random() * 6 + 2;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
      particle.style.animationDelay = (Math.random() * 10) + 's';
      particlesContainer.appendChild(particle);
    }
  }

  /* ───────────────────── Stats Counter (IntersectionObserver) ───────────────────── */
  var statNumbers = document.querySelectorAll('.stat-number');
  var statsObserved = false;

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'));
    var duration = 2000;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var current = Math.floor(progress * target);
      el.textContent = current.toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !statsObserved) {
          statsObserved = true;
          statNumbers.forEach(function (num) {
            animateCounter(num);
          });
        }
      });
    }, { threshold: 0.3 });

    var statsSection = document.getElementById('stats');
    if (statsSection) {
      statsObserver.observe(statsSection);
    }
  }

  /* ───────────────────── Director Wrapper Animation ───────────────────── */
  var directorWrapper = document.getElementById('directorWrapper');
  if (directorWrapper && 'IntersectionObserver' in window) {
    var directorObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          directorWrapper.classList.add('show');
        }
      });
    }, { threshold: 0.2 });
    directorObserver.observe(directorWrapper);
  }

  /* ───────────────────── Smooth Anchor Scroll ───────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ───────────────────── Active Nav Link on Scroll ───────────────────── */
  var sections = document.querySelectorAll('section[id]');
  var allNavLinks = document.querySelectorAll('.nav-link');

  function setActiveNav() {
    var scrollY = window.scrollY + 100;
    sections.forEach(function (section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      var sectionId = section.getAttribute('id');
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        allNavLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveNav);

  /* ───────────────────── Wishlist Heart Toggle ───────────────────── */
  var wishlistBtns = document.querySelectorAll('.wishlist-btn');
  wishlistBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      this.classList.toggle('active');
      var icon = this.querySelector('i');
      if (this.classList.contains('active')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
      } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
      }
    });
  });

  /* ───────────────────── Course Filter ───────────────────── */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var courseCards = document.querySelectorAll('.course-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      var filter = this.getAttribute('data-filter');

      courseCards.forEach(function (card) {
        if (filter === 'all') {
          card.style.display = '';
        } else {
          var category = card.getAttribute('data-category');
          if (category && category.indexOf(filter) !== -1) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });

  /* ───────────────────── Go-To-Top Button ───────────────────── */
  var goToTopBtn = document.getElementById('goToTop');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 200) {
      goToTopBtn.classList.add('visible');
    } else {
      goToTopBtn.classList.remove('visible');
    }
  });

  if (goToTopBtn) {
    goToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ═══════════════════════════════════════════════════
     DEVELOPER BUTTON — BASE64 ENCODED (Light Protection)
     All developer-related details are stored as Base64.
     ═══════════════════════════════════════════════════ */

  // 🔒 Base64 encoded developer details — DO NOT edit directly
  // Decode at runtime; obfuscated variable names for dev-button logic only

  var _0xA1 = 'aHR0cHM6Ly9lcmFiaGkuaW4=';                           // Primary URL
  var _0xB2 = 'aHR0cHM6Ly9pLW0tZXItYWJoaS52ZXJjZWwuYXBwLw==';       // Fallback URL
  var _0xC3 = 'RGV2ZWxvcGVkIGJ5IEFiaGk=';                           // Tooltip text
  var _0xD4 = 'ZmEtc29saWQgZmEtY29kZQ==';                           // Icon class
  var _0xE5 = 'QWJoaQ==';                                             // Dev name

  function _0xF6(encoded) {
    try {
      return atob(encoded);
    } catch (e) {
      return '';
    }
  }

  // Decode values
  var _devPrimaryUrl = _0xF6(_0xA1);
  var _devFallbackUrl = _0xF6(_0xB2);
  var _devTooltipText = _0xF6(_0xC3);
  var _devIconClass = _0xF6(_0xD4);
  var _devName = _0xF6(_0xE5);

  // --- Developer floating button setup ---
  var devBtn = document.getElementById('floatingDev');
  if (devBtn) {
    // Set icon
    var iconEl = document.createElement('i');
    _devIconClass.split(' ').forEach(function (cls) {
      if (cls) iconEl.classList.add(cls);
    });
    devBtn.appendChild(iconEl);

    // Set tooltip
    var tooltipEl = document.createElement('span');
    tooltipEl.classList.add('dev-tooltip');
    tooltipEl.textContent = _devTooltipText;
    devBtn.appendChild(tooltipEl);

    // Click handler with fallback
    devBtn.addEventListener('click', function () {
      _0xG7(_devPrimaryUrl, _devFallbackUrl);
    });
  }

      // Results Tabs
    const resultTabs = document.querySelectorAll('.result-tab');
    const resultsContents = document.querySelectorAll('.results-content');

    resultTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            resultTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const year = this.dataset.year;
            resultsContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `results-${year}`) {
                    content.classList.add('active');
                }
            });
        });
    });

  // --- WhatsApp floating button setup (uses same dev URLs) ---
  var waBtn = document.getElementById('floatingWhatsapp');
  if (waBtn) {
    waBtn.addEventListener('click', function () {
      _0xG7(_devPrimaryUrl, _devFallbackUrl);
    });
  }
// Gallery Filter
    const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            galleryFilterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;

            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    let currentImageIndex = 0;
    let galleryImages = [];

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            galleryImages = Array.from(document.querySelectorAll('.gallery-item:not([style*="display: none"])'));
            currentImageIndex = galleryImages.indexOf(this);
            openLightbox(this);
        });
    });

    function openLightbox(item) {
        const img = item.querySelector('img');
        lightboxImage.src = img.src;
        lightboxCaption.textContent = item.dataset.caption || '';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    document.getElementById('lightboxPrev').addEventListener('click', function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        openLightbox(galleryImages[currentImageIndex]);
    });

    document.getElementById('lightboxNext').addEventListener('click', function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        openLightbox(galleryImages[currentImageIndex]);
    });

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') document.getElementById('lightboxPrev').click();
        if (e.key === 'ArrowRight') document.getElementById('lightboxNext').click();
    });

    // Add fadeIn animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
 // Redirect function with primary + fallback
// Redirect function with primary + fallback
function _0xG7() {

    var message = "👋 Namaste!%0A%0A" +
              "🎓 I am interested in your coaching classes.%0A" +
              "📚 Please share course details, fees & timing.%0A%0A" +
              "📞 Waiting for your response.%0A" +
              "🙏 Thank you!";

    var whatsappLink = "https://wa.me/917549852399?text=" + message;

    var win = window.open(whatsappLink, '_blank');

    if (!win || win.closed || typeof win.closed === 'undefined') {
        window.location.href = whatsappLink;
    }
}

})();