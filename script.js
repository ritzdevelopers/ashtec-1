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
          // Smooth scroll to section
          setTimeout(() => {
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
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
  
  // Wait for image to load, then start synchronized cross-fade
  const newImg = new Image();
  newImg.onload = () => {
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
      }, 600); // Match text transition duration (0.6s for opacity, 0.5s for transform)
    });
  };
  newImg.src = sliderData[sliderIndex].img;
}
