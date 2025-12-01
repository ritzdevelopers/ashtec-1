// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// // Wait for DOM to be fully loaded
// document.addEventListener('DOMContentLoaded', () => {
//     // Hero section animation
//     gsap.from('.hero-title', {
//         duration: 1,
//         y: 50,
//         opacity: 0,
//         ease: 'power3.out'
//     });

//     gsap.from('.hero-subtitle', {
//         duration: 1,
//         y: 30,
//         opacity: 0,
//         delay: 0.3,
//         ease: 'power3.out'
//     });

//     // Content cards animation with ScrollTrigger
//     gsap.utils.toArray('.card').forEach((card, index) => {
//         gsap.from(card, {
//             scrollTrigger: {
//                 trigger: card,
//                 start: 'top 80%',
//                 end: 'top 50%',
//                 toggleActions: 'play none none reverse'
//             },
//             duration: 0.8,
//             y: 50,
//             opacity: 0,
//             ease: 'power2.out',
//             delay: index * 0.1
//         });
//     });

//     // Content title animation
//     gsap.from('.content-title', {
//         scrollTrigger: {
//             trigger: '.content-title',
//             start: 'top 80%',
//             toggleActions: 'play none none reverse'
//         },
//         duration: 1,
//         scale: 0.8,
//         opacity: 0,
//         ease: 'back.out(1.7)'
//     });

//     // Footer animation
//     gsap.from('.footer-title', {
//         scrollTrigger: {
//             trigger: '.footer-section',
//             start: 'top 80%',
//             toggleActions: 'play none none reverse'
//         },
//         duration: 1,
//         y: 50,
//         opacity: 0,
//         ease: 'power3.out'
//     });
// });

