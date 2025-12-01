// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Mobile Menu Functionality with CSS Animations
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIconBtn = document.getElementById('menuIconBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const menuItems = document.querySelectorAll('.mobile-menu-item');
    const body = document.body;

    // Open menu function
    function openMenu() {
        mobileMenu.classList.remove('hidden');
        // Trigger reflow to ensure the element is rendered
        void mobileMenu.offsetWidth;
        mobileMenu.classList.add('menu-open');
        body.style.overflow = 'hidden'; // Prevent body scroll when menu is open
        
        // Add animation classes to menu items with delay (including logo)
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('menu-item-visible');
            }, 150 + (index * 100)); // Stagger animation starting from 150ms
        });
    }

    // Close menu function
    function closeMenu() {
        // Remove animation classes from menu items
        menuItems.forEach(item => {
            item.classList.remove('menu-item-visible');
        });
        
        // Close menu overlay
        mobileMenu.classList.remove('menu-open');
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
            body.style.overflow = ''; // Restore body scroll
        }, 300);
    }

    // Event listeners
    if (menuIconBtn) {
        menuIconBtn.addEventListener('click', openMenu);
    }
    
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMenu);
    }

    // Close menu when clicking on overlay (outside menu content)
    if (mobileMenu) {
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                closeMenu();
            }
        });
    }

    // Close menu when clicking on menu links
    menuItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    closeMenu();
                    // Smooth scroll to section
                    setTimeout(() => {
                        const targetId = href.substring(1);
                        const targetElement = document.getElementById(targetId);
                        if (targetElement) {
                            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 300);
                }
            });
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
            closeMenu();
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const crcleBtn = document.querySelector('.crcleBtn');
    const crclLinks = document.querySelector('.crclLinks');
    let isOpen = false;

    crcleBtn.addEventListener('click', () => {
        if (!isOpen) {
            // Opening animation
            crclLinks.classList.remove('hidden');
            // Trigger reflow to ensure element is rendered
            void crclLinks.offsetWidth;
            
            // Remove any previous animation classes
            crcleBtn.classList.remove('crclAnimReverse');
            crclLinks.classList.remove('crclLinksHide');
            
            // Apply opening animations
            crcleBtn.classList.add('crclAnim');
            crclLinks.classList.add('crclLinks');
            
            isOpen = true;
        } else {
            // Closing animation
            // Remove opening animation classes
            crcleBtn.classList.remove('crclAnim');
            crclLinks.classList.remove('crclLinks');
            
            // Apply closing animations
            crcleBtn.classList.add('crclAnimReverse');
            crclLinks.classList.add('crclLinksHide');
            
            // Wait for animation to complete before hiding
            setTimeout(() => {
                crclLinks.classList.add('hidden');
                crcleBtn.classList.remove('crclAnimReverse');
                crclLinks.classList.remove('crclLinksHide');
                isOpen = false;
            }, 1000); // Match animation duration
        }
    });
});

