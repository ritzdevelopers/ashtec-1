// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Mobile Menu Functionality with CSS Animations
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenu = document.getElementById("mobileMenu");
  const menuIconBtn = document.getElementById("menuIconBtn");
  const closeMenuBtn = document.getElementById("closeMenuBtn");
  const menuItems = document.querySelectorAll(".mobile-menu-item");
  const body = document.body;

  // Open menu function
  function openMenu() {
    mobileMenu.classList.remove("hidden");
    // Trigger reflow to ensure the element is rendered
    void mobileMenu.offsetWidth;
    mobileMenu.classList.add("menu-open");
    body.style.overflow = "hidden"; 

    if (typeof lenis !== 'undefined' && lenis) {
      lenis.stop();
    }

    menuItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("menu-item-visible");
      }, 150 + index * 100); 
    });
  }

  // Close menu function
  function closeMenu() {
    // Remove animation classes from menu items
    menuItems.forEach((item) => {
      item.classList.remove("menu-item-visible");
    });

    mobileMenu.classList.remove("menu-open");

    setTimeout(() => {
      mobileMenu.classList.add("hidden");
      body.style.overflow = ""; 
      if (typeof lenis !== 'undefined' && lenis) {
        lenis.start();
      }
    }, 300);
  }

  // Event listeners
  if (menuIconBtn) {
    menuIconBtn.addEventListener("click", openMenu);
  }

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener("click", closeMenu);
  }

  // Close menu when clicking on overlay (outside menu content)
  if (mobileMenu) {
    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) {
        closeMenu();
      }
    });
  }

  // Close menu when clicking on menu links
  menuItems.forEach((item) => {
    const link = item.querySelector("a");
    if (link) {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
          closeMenu();
          // Smooth scroll to section using Lenis (if available) or native scroll
          setTimeout(() => {
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              // Check if lenis is available (it's a global variable)
              if (typeof lenis !== 'undefined' && lenis) {
                lenis.scrollTo(targetElement, {
                  offset: -80,
                  duration: 1.5,
                  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                });
              } else {
                targetElement.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }
          }, 300);
        }
      });
    }
  });

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      mobileMenu &&
      !mobileMenu.classList.contains("hidden")
    ) {
      closeMenu();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const circleBtnContainer = document.getElementById("circleBtnContainer");
  const circleToggleBtn = document.getElementById("circleToggleBtn");
  const circleIcon = document.getElementById("circleIcon");
  const circleIconCross = document.getElementById("circleIconCross");
  const crclLinks = document.querySelector(".crclLinks");
  let isOpen = false;

  // Use the button or container for click event
  const clickTarget = circleToggleBtn || circleBtnContainer;
  
  if (clickTarget && crclLinks) {
    clickTarget.addEventListener("click", (e) => {
      e.stopPropagation();
      
      if (!isOpen) {
        // Opening animation
        crclLinks.classList.remove("hidden");
        // Trigger reflow to ensure element is rendered
        void crclLinks.offsetWidth;

        // Remove any previous animation classes
        circleBtnContainer.classList.remove("crclAnimReverse");
        crclLinks.classList.remove("crclLinksHide");

        // Apply opening animations
        circleBtnContainer.classList.add("crclAnim");
        crclLinks.classList.add("crclLinks");

        // Toggle icons - hide plus, show cross
        if (circleIcon) circleIcon.classList.add("hidden");
        if (circleIconCross) circleIconCross.classList.remove("hidden");

        isOpen = true;
      } else {
        // Closing animation
        // Remove opening animation classes
        circleBtnContainer.classList.remove("crclAnim");
        crclLinks.classList.remove("crclLinks");

        // Apply closing animations
        circleBtnContainer.classList.add("crclAnimReverse");
        crclLinks.classList.add("crclLinksHide");

        // Toggle icons - show plus, hide cross
        if (circleIcon) circleIcon.classList.remove("hidden");
        if (circleIconCross) circleIconCross.classList.add("hidden");

        // Wait for animation to complete before hiding
        setTimeout(() => {
          crclLinks.classList.add("hidden");
          circleBtnContainer.classList.remove("crclAnimReverse");
          crclLinks.classList.remove("crclLinksHide");
          isOpen = false;
        }, 1000); // Match animation duration
      }
    });
  }
});

// Slider Data
const sliderData = [
  {
    img: "./img/slider/ash-s1.png",
    title: "Healthcare",
    list: [
      {
        para: "Yatharth Super Speciality Hospital",
      },
      {
        para: "Numed Super Speciality Hospital",
      },
      {
        para: "Nix Multi-Speciality Hospital",
      },
      {
        para: "Arogaya Hospital",
      },
    ],
  },
  {
    img: "./img/slider/ash-s2.png",
    title: "Connectivity",
    list: [
      {
        para: "Noida Sector 81 Metro Station",
      },
      {
        para: "NSEZ Metro Station",
      },
      {
        para: "Maripat Railway Station",
      },
      {
        para: "Dadri Railway Station",
      },
    ],
  },
  {
    img: "./img/slider/ash-s3.png",
    title: "Education",
    list: [
      {
        para: "Salvation Tree School",
      },
      {
        para: "Pacific World School",
      },
      {
        para: "Delhi World Public School",
      },
      {
        para: "Bloom International School ",
      },
    ],
  },
  {
    img: "./img/slider/ash-s4.png",
    title: "Shopping center",
    list: [
      {
        para: "Gaur City Mall",
      },
      {
        para: "Galaxy Diamond Plaza",
      },
      {
        para: "Omaxe Connaught Place Mall",
      },
      {
        para: "The Grand Venice Mall",
      },
    ],
  },
];

// Initialize Swiper when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Wait for Swiper library to be available
  if (typeof Swiper === 'undefined') {
    console.error('Swiper library not loaded');
    return;
  }

  const swiperWrapper = document.querySelector(".locationSwiper .swiper-wrapper");
  
  // Generate slides from sliderData
  if (swiperWrapper) {
    sliderData.forEach((slide, index) => {
      const slideHTML = `
        <div class="swiper-slide">
          <div class="flex flex-col lg:flex-row lg:justify-center gap-8 lg:gap-[50px] w-full rounded-[8px]">
            <div class="w-full lg:w-[687px] h-[391px] rounded-[20px] md:rounded-none  lg:h-[391px] overflow-hidden">
              <img
                src="${slide.img}"
                alt="${slide.title}"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="w-full h-auto lg:min-h-[359px] lg:w-[445px] relative">
              <h3
                class="uppercase font-[600] text-[20px] lg:text-[24px]"
                style="font-family: 'MonsterSemiBold'"
              >
                ${slide.title}
              </h3>
              <div class="flex flex-col gap-4 mt-4">
                ${slide.list.map((item, itemIndex) => `
                  <div class="flex gap-2 items-center">
                    <img
                      src="img/pointer.png"
                      alt="check-circle"
                      class="${itemIndex === 0 ? 'w-[50px] h-[50px]' : 'w-[40px] lg:w-[50px] h-[40px] lg:h-[50px]'}"
                    />
                    <p
                      class="font-[400] text-[20px] capitalize text-[#000000]"
                      style="font-family: 'MonsterRegular'"
                    >
                      ${item.para}
                    </p>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        </div>
      `;
      swiperWrapper.innerHTML += slideHTML;
    });
  }

  // Initialize Swiper
  const locationSwiper = new Swiper(".locationSwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next-custom",
      prevEl: ".swiper-button-prev-custom",
    },
    loop: true,
    effect: "slide",
    speed: 500,
  });
});


let lenis;

function initLenis() {
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Sync Lenis with ScrollTrigger
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Update ScrollTrigger on scroll
    lenis.on('scroll', ScrollTrigger.update);

    // ScrollTrigger should use Lenis scroll proxy
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.body.style.transform ? 'transform' : 'fixed',
    });

    // Refresh ScrollTrigger after Lenis is ready
    ScrollTrigger.addEventListener('refresh', () => {
      lenis.resize();
    });

    ScrollTrigger.refresh();
  }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Wait a bit for Lenis to load
  setTimeout(() => {
    initLenis();
    initScrollAnimations();
  }, 100);
});

// Luxury Scroll Animations
function initScrollAnimations() {
  // Set default animation properties for all scroll animations
  gsap.defaults({
    ease: 'power3.out',
    duration: 1.2,
  });

  // ============================================
  // SECTION 2 - Specific Element Animations
  // ============================================
  // Section 2 Image
  const s2Image = document.getElementById('s2-image-container');
  if (s2Image) {
    gsap.fromTo(
      s2Image,
      { scale: 1.1, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: s2Image,
          start: 'top 95%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }

  // Section 2 Text Elements
  const s2PreLaunch = document.getElementById('s2-pre-launch');
  const s2Signature = document.getElementById('s2-signature');
  const s2Title = document.getElementById('s2-title');
  const s2Residences = document.getElementById('s2-residences');
  const s2PriceBtn = document.getElementById('s2-price-btn');

  if (s2PreLaunch) {
    gsap.fromTo(s2PreLaunch, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.5, ease: 'power2.out',
      scrollTrigger: { trigger: s2PreLaunch, start: 'top 95%', toggleActions: 'play none none reverse' }
    });
  }
  if (s2Signature) {
    gsap.fromTo(s2Signature, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.5, delay: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: s2Signature, start: 'top 95%', toggleActions: 'play none none reverse' }
    });
  }
  if (s2Title) {
    gsap.fromTo(s2Title, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.5, delay: 0.2, ease: 'power2.out',
      scrollTrigger: { trigger: s2Title, start: 'top 95%', toggleActions: 'play none none reverse' }
    });
  }
  if (s2Residences) {
    gsap.fromTo(s2Residences, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.5, delay: 0.3, ease: 'power2.out',
      scrollTrigger: { trigger: s2Residences, start: 'top 95%', toggleActions: 'play none none reverse' }
    });
  }
  if (s2PriceBtn) {
    gsap.fromTo(s2PriceBtn, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.5, delay: 0.4, ease: 'power2.out',
      scrollTrigger: { trigger: s2PriceBtn, start: 'top 95%', toggleActions: 'play none none reverse' }
    });
  }

  // ============================================
  // SECTION 3 - Highlights Section
  // ============================================
  const s3Title = document.getElementById('s3-title');
  const s3Text1 = document.getElementById('s3-text-1');
  const s3Text2 = document.getElementById('s3-text-2');
  const s3BookBtn = document.getElementById('s3-book-btn');
  const s3Image = document.getElementById('s3-image-container');

  if (s3Title) {
    gsap.fromTo(s3Title, { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.5, ease: 'power2.out',
      scrollTrigger: { trigger: s3Title, start: 'top 95%', toggleActions: 'play none none reverse' }
    });
  }
  if (s3Text1) {
    gsap.fromTo(s3Text1, { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.5, delay: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: s3Text1, start: 'top 95%', toggleActions: 'play none none reverse' }
    });
  }
  if (s3Text2) {
    gsap.fromTo(s3Text2, { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.5, delay: 0.2, ease: 'power2.out',
      scrollTrigger: { trigger: s3Text2, start: 'top 95%', toggleActions: 'play none none reverse' }
    });
  }
  if (s3BookBtn) {
    gsap.fromTo(s3BookBtn, { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.5, delay: 0.3, ease: 'power2.out',
      scrollTrigger: { trigger: s3BookBtn, start: 'top 95%', toggleActions: 'play none none reverse' }
    });
  }
  if (s3Image) {
    gsap.to(s3Image, {
      y: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: s3Image,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }

  // ============================================
  // SECTION 4 - Project Overview
  // ============================================
  const s4LeftImage = document.getElementById('s4-left-image');
  const s4CheckList = document.getElementById('s4-check-list');
  const s4RightImage = document.getElementById('s4-right-image');

  if (s4LeftImage) {
    gsap.fromTo(s4LeftImage, { scale: 1.1, opacity: 0 }, {
      scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: s4LeftImage, start: 'top 95%', toggleActions: 'play none none reverse' }
    });
  }

  if (s4CheckList) {
    const checkItems = s4CheckList.querySelectorAll('.flex.gap-2.items-center');
    if (checkItems.length > 0) {
      gsap.fromTo(checkItems, { x: -40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out',
        scrollTrigger: { trigger: s4CheckList, start: 'top 95%', toggleActions: 'play none none reverse' }
      });
    }
  }

  if (s4RightImage) {
    gsap.fromTo(s4RightImage, { scale: 1.1, opacity: 0 }, {
      scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: s4RightImage, start: 'top 95%', toggleActions: 'play none none reverse' }
    });
  }

  // ============================================
  // SECTION 5 - Connectivity Section
  // ============================================
  // const s5Title = document.getElementById('s5-title');
  // const s5Subtitle = document.getElementById('s5-subtitle');
  // const sliderImg = document.querySelector('.sliderImg');

  // if (s5Title) {
  //   gsap.fromTo(s5Title, { y: 40, opacity: 0 }, {
  //     y: 0, opacity: 1, duration: 0.5, ease: 'power2.out',
  //     scrollTrigger: { trigger: s5Title, start: 'top 95%', toggleActions: 'play none none reverse' }
  //   });
  // }
  // if (s5Subtitle) {
  //   gsap.fromTo(s5Subtitle, { y: 40, opacity: 0 }, {
  //     y: 0, opacity: 1, duration: 0.5, delay: 0.1, ease: 'power2.out',
  //     scrollTrigger: { trigger: s5Subtitle, start: 'top 95%', toggleActions: 'play none none reverse' }
  //   });
  // }
  // if (sliderImg) {
  //   gsap.to(sliderImg, {
  //     y: -60,
  //     ease: 'none',
  //     scrollTrigger: {
  //       trigger: sliderImg,
  //       start: 'top bottom',
  //       end: 'bottom top',
  //       scrub: 1.5,
  //     },
  //   });
  // }

  // ============================================
  // SECTION 6 - Floor Plan
  // ============================================
  const floorPlanSection = document.querySelector('#floorPlan');
  if (floorPlanSection) {
    const floorPlanCards = floorPlanSection.querySelectorAll('.bg-white');
    if (floorPlanCards.length > 0) {
      gsap.fromTo(
        floorPlanCards,
        {
          y: 100,
          opacity: 0.5,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: floorPlanSection,
            start: 'top 110%',
           
          },
        }
      );
    }

    const floorPlanTitle = floorPlanSection.querySelector('h2');
    if (floorPlanTitle) {
      gsap.fromTo(
        floorPlanTitle,
        {
          y: 60,
          opacity: 0.5,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: floorPlanTitle,
            start: 'top 110%',
          
          },
        }
      );
    }
  }

  // ============================================
  // SECTION 7 - Amenities
  // ============================================
  const s7TitleDesktop = document.getElementById('s7-title-desktop');
  const s7TitleMobile = document.getElementById('s7-title-mobile');
  const s7AmenitiesGrid = document.getElementById('s7-amenities-grid');

  if (s7TitleDesktop) {
    gsap.fromTo(s7TitleDesktop, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.5, ease: 'power2.out',
      scrollTrigger: { trigger: s7TitleDesktop, start: 'top 95%', toggleActions: 'play none none reverse' }
    });
  }
  if (s7TitleMobile) {
    gsap.fromTo(s7TitleMobile, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.5, ease: 'power2.out',
      scrollTrigger: { trigger: s7TitleMobile, start: 'top 95%', toggleActions: 'play none none reverse' }
    });
  }
  if (s7AmenitiesGrid) {
    const amenitiesCards = s7AmenitiesGrid.querySelectorAll('.shadow-\\[0_4px_16px_0_rgba\\(0\\,0\\,0\\,0\\.1\\)\\]');
    if (amenitiesCards.length > 0) {
      gsap.fromTo(amenitiesCards, { y: 50, opacity: 0, scale: 0.9 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out',
        scrollTrigger: { trigger: s7AmenitiesGrid, start: 'top 95%', toggleActions: 'play none none reverse' }
      });
    }
  }

  // ============================================
  // SECTION 8 - Contact Us
  // ============================================
  const s8Title = document.getElementById('s8-title');
  const s8FormContainer = document.getElementById('s8-form-container');
  const s8MapContainer = document.getElementById('s8-map-container');

  if (s8Title) {
    gsap.fromTo(s8Title, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.5, ease: 'power2.out',
      scrollTrigger: { trigger: s8Title, start: 'top 95%', toggleActions: 'play none none reverse' }
    });
  }
  if (s8FormContainer) {
    gsap.fromTo(s8FormContainer, { x: -50, opacity: 0 }, {
      x: 0, opacity: 1, duration: 0.5, ease: 'power2.out',
      scrollTrigger: { trigger: s8FormContainer, start: 'top 95%', toggleActions: 'play none none reverse' }
    });
  }
  if (s8MapContainer) {
    gsap.fromTo(s8MapContainer, { x: 50, opacity: 0, scale: 1.05 }, {
      x: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out',
      scrollTrigger: { trigger: s8MapContainer, start: 'top 95%', toggleActions: 'play none none reverse' }
    });
  }

  // ============================================
  // FOOTER - About Section
  // ============================================
  const footerSection = document.querySelector('.footer');
  if (footerSection) {
    const footerContent = footerSection.querySelectorAll('h2, p');
    gsap.utils.toArray(footerContent).forEach((el, index) => {
      gsap.fromTo(el, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, delay: index * 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: footerSection, start: 'top 95%', toggleActions: 'play none none reverse' }
      });
    });
  }

  // ============================================
  // SMOOTH ANCHOR LINKS WITH LENIS
  // ============================================
  // Only apply to non-mobile menu links (mobile menu links are handled separately)
  document.querySelectorAll('nav a[href^="#"], .btn-hover[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href !== '#' && lenis) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          lenis.scrollTo(target, {
            offset: -80,
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    });
  });

  // Refresh ScrollTrigger after all animations are set
  ScrollTrigger.refresh();
}

// ============================================
// CONTACT MODAL FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('contactModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalForm = document.getElementById('contactModalForm');
  const body = document.body;

  // Function to open modal
  function openModal() {
    if (modal) {
      modal.classList.remove('hidden');
      body.style.overflow = 'hidden';
      
      // Pause Lenis when modal is open
      if (typeof lenis !== 'undefined' && lenis) {
        lenis.stop();
      }

      // Prevent scroll on modal container
      const modalContainer = modal.querySelector('.contact-modal-container');
      if (modalContainer) {
        modalContainer.style.maxHeight = '90vh';
      }
    }
  }

  // Function to close modal
  function closeModal() {
    if (modal) {
      modal.classList.add('hidden');
      body.style.overflow = '';
      
      // Resume Lenis when modal is closed
      if (typeof lenis !== 'undefined' && lenis) {
        lenis.start();
      }

      // Reset form
      if (modalForm) {
        modalForm.reset();
      }
    }
  }

  // Close button event
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  // Close on overlay click
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Form submission handler
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = {
        name: document.getElementById('modalName').value,
        email: document.getElementById('modalEmail').value,
        phone: document.getElementById('modalPhone').value,
        message: document.getElementById('modalMessage').value,
      };

      // Here you can add your form submission logic
      console.log('Form submitted:', formData);
      
      // Show success message (you can customize this)
      alert('Thank you for your inquiry! We will get back to you soon.');
      
      // Close modal after submission
      closeModal();
    });
  }

  // Add click event listeners to all trigger buttons
  // Better approach: use text content matching and specific selectors
  document.querySelectorAll('button, a').forEach((btn) => {
    const btnText = btn.textContent.trim().toUpperCase();
    
    // Contact Us buttons (navbar and other locations)
    if (
      btnText === 'CONTACT US' ||
      btnText === 'CONTACT US NOW!' ||
      (btn.classList.contains('btn-hover2') && btnText.includes('CONTACT')) ||
      btn.id === 'mobileContactBtn'
    ) {
      btn.addEventListener('click', (e) => {
        // Prevent default for anchor links to contact section
        if (btn.tagName === 'A' && btn.getAttribute('href') === '#contactUs') {
          e.preventDefault();
        }
        openModal();
      });
    }

    // Enquiry Now button
    if (btnText === 'ENQUIRY NOW' || btnText.includes('ENQUIRY')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    }

    // Book Site Visit button
    if (btnText === 'BOOK SITE VISIT' || btnText.includes('BOOK SITE')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    }

    // 2.51 CR* ONWards button (case insensitive)
    if (btnText.includes('2.51') || btnText.includes('CR') && btnText.includes('ONWARD')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    }
  });

  // Also handle the mobile contact button specifically
  const mobileContactBtn = document.getElementById('mobileContactBtn');
  if (mobileContactBtn) {
    mobileContactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Close mobile menu first if open
      const mobileMenu = document.getElementById('mobileMenu');
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        const closeMenuBtn = document.getElementById('closeMenuBtn');
        if (closeMenuBtn) {
          closeMenuBtn.click();
        }
      }
      setTimeout(() => {
        openModal();
      }, 300);
    });
  }

  // Load random luxury property image from Unsplash
  const modalImage = document.getElementById('modalImage');
  if (modalImage) {
    // You can change this URL to any Unsplash image you prefer
    // Current: luxury real estate
    modalImage.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=1000&fit=crop&q=80';
    modalImage.onerror = function() {
      // Fallback image if Unsplash fails
      this.src = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=1000&fit=crop&q=80';
    };
  }
});