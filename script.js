// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const feedbackBtn = document.getElementById('feedback-btn');
    const feedbackModal = document.getElementById('feedback-modal');
    const closeModal = document.getElementById('close-modal');

    // Mobile menu functionality
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // Feedback modal functionality
    feedbackBtn.addEventListener('click', function() {
        feedbackModal.classList.remove('hidden');
    });

    closeModal.addEventListener('click', function() {
        feedbackModal.classList.add('hidden');
    });

    // Close modal when clicking outside
    feedbackModal.addEventListener('click', function(e) {
        if (e.target === feedbackModal) {
            feedbackModal.classList.add('hidden');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    const sections = document.querySelectorAll('.animate-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Hero section animation
    const heroSection = document.querySelector('.animate-fade-in-up');
    if (heroSection) {
        heroSection.style.opacity = '0';
        heroSection.style.transform = 'translateY(30px)';
        heroSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            heroSection.style.opacity = '1';
            heroSection.style.transform = 'translateY(0)';
        }, 200);
    }

    // Card hover effects are now handled by CSS
    // No additional JavaScript needed for basic hover transforms

    // Navbar background on scroll
    const navbar = document.querySelector('nav');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.backgroundColor = 'rgba(245, 241, 232, 0.95)';
            } else {
                navbar.style.backgroundColor = 'rgba(245, 241, 232, 0.9)';
            }
        });
    }

    // Add pulse animation to icons on hover
    const icons = document.querySelectorAll('.animate-pulse-gentle');
    icons.forEach(icon => {
        const parent = icon.closest('.card-hover');
        if (parent) {
            parent.addEventListener('mouseenter', function() {
                icon.style.animation = 'pulse-gentle 1s infinite';
            });
            
            parent.addEventListener('mouseleave', function() {
                icon.style.animation = 'pulse-gentle 2s infinite';
            });
        }
    });

    // Form submission handler
    const form = feedbackModal.querySelector('form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message
        const formData = new FormData(form);
        alert('Спасибо за ваш вопрос! Мы свяжемся с вами в ближайшее время.');
        
        // Reset form and close modal
        form.reset();
        feedbackModal.classList.add('hidden');
    });

    // Add loading animation for images (if any are added later)
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('section');
        if (heroSection && scrolled < window.innerHeight) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add stagger animation to cards
    const cardSections = document.querySelectorAll('section');
    cardSections.forEach(section => {
        const cards = section.querySelectorAll('.card-hover');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (!feedbackModal.classList.contains('hidden')) {
                feedbackModal.classList.add('hidden');
            }
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });

    // Add focus styles for accessibility
    const focusableElements = document.querySelectorAll('a, button, input, textarea');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #7A4E1D';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // Add click animation to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });



    console.log('🧭 Памятка туриста: Актау загружена успешно!');
});

// Add custom cursor effect for interactive elements
document.addEventListener('mousemove', function(e) {
    const interactiveElements = document.querySelectorAll('.card-hover, button, a');
    interactiveElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isHovering = (
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom
        );
        
        if (isHovering) {
            document.body.style.cursor = 'pointer';
        }
    });
});

// Reset cursor when not hovering
document.addEventListener('mouseleave', function() {
    document.body.style.cursor = 'default';
});

// Add scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #7A4E1D, #A67C52);
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});
