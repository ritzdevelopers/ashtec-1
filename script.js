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
    body.style.overflow = "hidden"; // Prevent body scroll when menu is open
    
    // Stop Lenis smooth scroll when menu is open
    if (typeof lenis !== 'undefined' && lenis) {
      lenis.stop();
    }

    // Add animation classes to menu items with delay (including logo)
    menuItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("menu-item-visible");
      }, 150 + index * 100); // Stagger animation starting from 150ms
    });
  }

  // Close menu function
  function closeMenu() {
    // Remove animation classes from menu items
    menuItems.forEach((item) => {
      item.classList.remove("menu-item-visible");
    });

    // Close menu overlay
    mobileMenu.classList.remove("menu-open");

    // Wait for animation to complete before hiding
    setTimeout(() => {
      mobileMenu.classList.add("hidden");
      body.style.overflow = ""; // Restore body scroll
      
      // Resume Lenis smooth scroll when menu is closed
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
  const crcleBtn = document.querySelector(".crcleBtn");
  const crclLinks = document.querySelector(".crclLinks");
  let isOpen = false;

  crcleBtn.addEventListener("click", () => {
    if (!isOpen) {
      // Opening animation
      crclLinks.classList.remove("hidden");
      // Trigger reflow to ensure element is rendered
      void crclLinks.offsetWidth;

      // Remove any previous animation classes
      crcleBtn.classList.remove("crclAnimReverse");
      crclLinks.classList.remove("crclLinksHide");

      // Apply opening animations
      crcleBtn.classList.add("crclAnim");
      crclLinks.classList.add("crclLinks");

      isOpen = true;
    } else {
      // Closing animation
      // Remove opening animation classes
      crcleBtn.classList.remove("crclAnim");
      crclLinks.classList.remove("crclLinks");

      // Apply closing animations
      crcleBtn.classList.add("crclAnimReverse");
      crclLinks.classList.add("crclLinksHide");

      // Wait for animation to complete before hiding
      setTimeout(() => {
        crclLinks.classList.add("hidden");
        crcleBtn.classList.remove("crclAnimReverse");
        crclLinks.classList.remove("crclLinksHide");
        isOpen = false;
      }, 1000); // Match animation duration
    }
  });
});

// Slider Animation Controllers ::
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
        para: "Rudra Fracture Hospital & Diagnostics",
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
        para: "Nix Multi-Speciality Hospital",
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
      {
        para: "Greater Noida Podar Learn School",
      },
      {
        para: "Jaipuria International School",
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

let sliderIndex = 0;
let sliderImgActive;
let sliderImgNext;
let sliderTitleActive;
let sliderTitleNext;
let sliderListActive;
let sliderListNext;
let sliderLeftBtn;
let sliderRightBtn;
let isTransitioning = false;

// Initialize slider when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  sliderImgActive = document.querySelector(".sliderImg .slider-img-active");
  sliderImgNext = document.querySelector(".sliderImg .slider-img-next");
  sliderTitleActive = document.querySelector(".slider-title-active");
  sliderTitleNext = document.querySelector(".slider-title-next");
  sliderListActive = document.querySelector(".slider-list-active");
  sliderListNext = document.querySelector(".slider-list-next");
  sliderLeftBtn = document.querySelector(".sliderLeftBtn");
  sliderRightBtn = document.querySelector(".sliderRightBtn");

  // Set initial state based on index 0 (even)
  const isOdd = sliderIndex % 2 !== 0;
  if (!isOdd && sliderTitleActive && sliderListActive) {
    sliderTitleActive.classList.add("slide-up");
    sliderListActive.classList.add("slide-up");
  }

  // Add event listeners
  if (sliderLeftBtn) {
    sliderLeftBtn.addEventListener("click", () => {
      updateSlider(-1);
    });
  }

  if (sliderRightBtn) {
    sliderRightBtn.addEventListener("click", () => {
      updateSlider(1);
    });
  }
});

function updateSlider(direction) {
  // Check if elements exist
  if (!sliderImgActive || !sliderImgNext || !sliderTitleActive || !sliderTitleNext || !sliderListActive || !sliderListNext) {
    return;
  }

  // Prevent multiple rapid clicks during transition
  if (isTransitioning) {
    return;
  }

  isTransitioning = true;

  sliderIndex += direction;
  if (sliderIndex < 0) {
    sliderIndex = sliderData.length - 1;
  } else if (sliderIndex >= sliderData.length) {
    sliderIndex = 0;
  }

  // Determine if current index is odd or even
  const isOdd = sliderIndex % 2 !== 0;

  // Remove previous animation classes to reset state
  sliderTitleActive.classList.remove("slide-down", "slide-up", "fade-out");
  sliderTitleNext.classList.remove("slide-down", "slide-up", "fade-out");
  sliderListActive.classList.remove("slide-down", "slide-up", "fade-out");
  sliderListNext.classList.remove("slide-down", "slide-up", "fade-out");
  
  // Ensure next elements have the next class for initial transform state
  if (!sliderTitleNext.classList.contains("slider-title-next")) {
    sliderTitleNext.classList.add("slider-title-next");
  }
  if (!sliderListNext.classList.contains("slider-list-next")) {
    sliderListNext.classList.add("slider-list-next");
  }

  // STEP 1: Start translateY animation IMMEDIATELY on click
  // Apply translateY classes to both active (fade-out) and next (fade-in) elements
  if (isOdd) {
    // Odd index: next should end at slide-down (translateY(20px))
    // So it starts at translateY(0) via the .slider-title-next.slide-down rule
    sliderTitleNext.classList.add("slide-down");
    sliderListNext.classList.add("slide-down");
    // Active elements move to opposite position as they fade out
    sliderTitleActive.classList.add("slide-up");
    sliderListActive.classList.add("slide-up");
  } else {
    // Even index: next should end at slide-up (translateY(0))
    // So it starts at translateY(20px) via the .slider-title-next.slide-up rule
    sliderTitleNext.classList.add("slide-up");
    sliderListNext.classList.add("slide-up");
    // Active elements move to opposite position as they fade out
    sliderTitleActive.classList.add("slide-down");
    sliderListActive.classList.add("slide-down");
  }
  
  // STEP 2: Update content in next elements (while translateY is starting)
  sliderTitleNext.textContent = sliderData[sliderIndex].title;
  sliderListNext.innerHTML = sliderData[sliderIndex].list
    .map(
      (item, index) =>
        `<div class="flex gap-2 items-center "><img src="img/pointer.png" alt="check-circle" class="${index === 0 ? 'w-[50px] h-[50px]' : 'w-[40px] lg:w-[50px] h-[40px] lg:h-[50px]'}">
      <p class="font-[400] text-[20px] capitalize text-[#000000]" style="font-family: 'MonsterRegular'">${item.para}</p></div>`
    )
    .join("");
  
  // STEP 3: Preload image and setup for cross-fade
  sliderImgNext.src = sliderData[sliderIndex].img;
  
  // Set next elements z-index and initial opacity
  sliderImgNext.style.opacity = "0";
  sliderImgNext.style.zIndex = "2";
  sliderImgActive.style.zIndex = "1";
  
  sliderTitleNext.style.opacity = "0";
  sliderTitleNext.style.zIndex = "2";
  sliderTitleActive.style.zIndex = "1";
  
  sliderListNext.style.opacity = "0";
  sliderListNext.style.zIndex = "2";
  sliderListActive.style.zIndex = "1";
  
  // Start animation immediately without waiting for image load
  // Use requestAnimationFrame to ensure DOM is updated before animation
  requestAnimationFrame(() => {
    // Force reflow to ensure initial state is applied
    sliderImgNext.offsetHeight;
    sliderTitleNext.offsetHeight;
    sliderListNext.offsetHeight;
    
    // STEP 4: Start synchronized cross-fade and translateY animation together
    // Remove slider-title-next/slider-list-next classes to trigger transform animation
    // This makes the element transition from initial transform to final transform
    // during the fade-in, creating the merge effect
    sliderTitleNext.classList.remove("slider-title-next");
    sliderListNext.classList.remove("slider-list-next");
    
    // Force another reflow to ensure transform change is registered
    requestAnimationFrame(() => {
      // Start fade-out of active elements
      sliderImgActive.classList.add("fade-out");
      sliderTitleActive.classList.add("fade-out");
      sliderListActive.classList.add("fade-out");
      
      // Start fade-in of next elements (translateY is already animating)
      sliderImgNext.style.opacity = "1";
      sliderTitleNext.style.opacity = "1";
      sliderListNext.style.opacity = "1";
    });

    // After transition completes, swap all elements (reduced timeout for faster text transition)
    setTimeout(() => {
        // Swap image references
        const tempImg = sliderImgActive;
        sliderImgActive = sliderImgNext;
        sliderImgNext = tempImg;
        
        // Swap title references
        const tempTitle = sliderTitleActive;
        sliderTitleActive = sliderTitleNext;
        sliderTitleNext = tempTitle;
        
        // Swap list references
        const tempList = sliderListActive;
        sliderListActive = sliderListNext;
        sliderListNext = tempList;
        
        // Reset image states
        sliderImgActive.classList.remove("fade-out");
        sliderImgActive.style.opacity = "1";
        sliderImgActive.style.zIndex = "2";
        sliderImgNext.style.opacity = "0";
        sliderImgNext.style.zIndex = "1";
        sliderImgNext.classList.add("fade-out");
        
        // Reset title states
        sliderTitleActive.classList.remove("fade-out");
        sliderTitleActive.style.opacity = "1";
        sliderTitleActive.style.zIndex = "2";
        sliderTitleNext.style.opacity = "0";
        sliderTitleNext.style.zIndex = "1";
        sliderTitleNext.classList.add("fade-out");
        
        // Reset list states
        sliderListActive.classList.remove("fade-out");
        sliderListActive.style.opacity = "1";
        sliderListActive.style.zIndex = "2";
        sliderListNext.style.opacity = "0";
        sliderListNext.style.zIndex = "1";
        sliderListNext.classList.add("fade-out");
        
        // Swap class names for proper styling
        // Active element (which was next) already has slide-down/slide-up classes
        // and lost slider-title-next during animation, so just ensure it has active class
        if (!sliderTitleActive.classList.contains("slider-title-active")) {
          sliderTitleActive.classList.add("slider-title-active");
        }
        // Next element (which was active) needs to be reset
        sliderTitleNext.classList.remove("slider-title-active");
        sliderTitleNext.classList.add("slider-title-next");
        sliderTitleNext.classList.remove("slide-down", "slide-up");
        
        if (!sliderListActive.classList.contains("slider-list-active")) {
          sliderListActive.classList.add("slider-list-active");
        }
        sliderListNext.classList.remove("slider-list-active");
        sliderListNext.classList.add("slider-list-next");
        sliderListNext.classList.remove("slide-down", "slide-up");

      isTransitioning = false;
    }, 250); // Match opacity transition duration (0.2s) - very quick, light merge effect like shadow
  });
}

// ============================================
// LENIS SMOOTH SCROLL & SCROLLTRIGGER ANIMATIONS
// ============================================

// Initialize Lenis Smooth Scroll (global variable for access across functions)
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
  // SECTION 2 - Hero Content Animation
  // ============================================
  const s2Content = document.querySelector('.s1-right-container');
  if (s2Content) {
    gsap.fromTo(
      s2Content,
      {
        scale: 1.1,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: s2Content,
          start: 'top 95%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }

  // ============================================
  // SECTION 2 - Pre-launch Text Animation
  // ============================================
  const s2Texts = document.querySelectorAll('#home ~ section p, #home ~ section h1, #home ~ section button');
  if (s2Texts.length > 0) {
    gsap.utils.toArray(s2Texts).forEach((text, index) => {
      gsap.fromTo(
        text,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }

  // ============================================
  // SECTION 3 - Highlights Section
  // ============================================
  const highlightsSection = document.querySelector('#highlights');
  if (highlightsSection) {
    const highlightsContent = highlightsSection.querySelectorAll('h2, p, button');
    gsap.utils.toArray(highlightsContent).forEach((el, index) => {
      gsap.fromTo(
        el,
        {
          y: 80,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay: index * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: highlightsSection,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Parallax effect for bottom image
    const highlightsImg = highlightsSection.querySelector('img');
    if (highlightsImg) {
      gsap.to(highlightsImg, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: highlightsImg,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }
  }

  // ============================================
  // SECTION 4 - Project Overview
  // ============================================
  const s4Section = document.querySelector('.s4');
  if (s4Section) {
    // Left side image animation
    const s4LeftImg = s4Section.querySelector('img[alt="ash-s4-i1"]');
    if (s4LeftImg) {
      gsap.fromTo(
        s4LeftImg,
        {
          scale: 1.15,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: s4LeftImg,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Check list items stagger animation
    const checkItems = s4Section.querySelectorAll('.flex.gap-2.items-center');
    if (checkItems.length > 0) {
      gsap.fromTo(
        checkItems,
        {
          x: -50,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: s4Section,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Right side image animation
    const s4RightImg = s4Section.querySelector('img[alt=""]');
    if (s4RightImg) {
      gsap.fromTo(
        s4RightImg,
        {
          scale: 1.1,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: s4RightImg,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }

  // ============================================
  // SECTION 5 - Connectivity Section
  // ============================================
  const connectivitySection = document.querySelector('#connectivity');
  if (connectivitySection) {
    const connectivityContent = connectivitySection.querySelectorAll('h2, p');
    gsap.utils.toArray(connectivityContent).forEach((el, index) => {
      gsap.fromTo(
        el,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: connectivitySection,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Slider image parallax
    const sliderImg = connectivitySection.querySelector('.sliderImg');
    if (sliderImg) {
      gsap.to(sliderImg, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sliderImg,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }
  }

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
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: floorPlanSection,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
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
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: floorPlanTitle,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }

  // ============================================
  // SECTION 7 - Amenities
  // ============================================
  const amenitiesSection = document.querySelector('#amenities');
  if (amenitiesSection) {
    // Title animation
    const amenitiesTitle = amenitiesSection.querySelector('h2');
    if (amenitiesTitle) {
      gsap.fromTo(
        amenitiesTitle,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: amenitiesTitle,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Amenities cards stagger animation
    const amenitiesCards = amenitiesSection.querySelectorAll('.shadow-\\[0_4px_16px_0_rgba\\(0\\,0\\,0\\,0\\.1\\)\\]');
    if (amenitiesCards.length > 0) {
      gsap.fromTo(
        amenitiesCards,
        {
          y: 80,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: {
            amount: 0.8,
            from: 'start',
          },
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: amenitiesSection,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }

  // ============================================
  // SECTION 8 - Contact Us
  // ============================================
  const contactSection = document.querySelector('#contactUs');
  if (contactSection) {
    // Title animation
    const contactTitle = contactSection.querySelector('h2');
    if (contactTitle) {
      gsap.fromTo(
        contactTitle,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contactTitle,
            start: 'top 100%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Form animation
    // const contactForm = contactSection.querySelector('form');
    // if (contactForm) {
    //   gsap.fromTo(
    //     contactForm,
    //     {
    //       x: -80,
    //       opacity: 0,
    //     },
    //     {
    //       x: 0,
    //       opacity: 1,
    //       duration: 1.2,
    //       ease: 'power3.out',
    //       scrollTrigger: {
    //         trigger: contactForm,
    //         start: 'top 100%',
    //         toggleActions: 'play none none reverse',
    //       },
    //     }
    //   );
    // }

    // Map/image animation
    const contactMap = contactSection.querySelector('img[alt="ash-map"]');
    if (contactMap) {
      gsap.fromTo(
        contactMap,
        {
          x: 80,
          opacity: 0,
          scale: 1.1,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contactMap,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }

  // ============================================
  // FOOTER - About Section
  // ============================================
  const footerSection = document.querySelector('.footer');
  if (footerSection) {
    const footerContent = footerSection.querySelectorAll('h2, p');
    gsap.utils.toArray(footerContent).forEach((el, index) => {
      gsap.fromTo(
        el,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: index * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerSection,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
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