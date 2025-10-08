document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initWebAnimations();
    initSkillsInteraction();
    initParticleEffects();
    initSpiderEffects();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed nav
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Update active navigation based on scroll position
function updateActiveNav() {
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

// Scroll effects and animations
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animations for different elements
                if (entry.target.classList.contains('skill-node')) {
                    animateSkillNode(entry.target);
                }
                if (entry.target.classList.contains('experience-card')) {
                    animateExperienceCard(entry.target);
                }
                if (entry.target.classList.contains('project-card')) {
                    animateProjectCard(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(
        '.experience-card, .skill-node, .project-card, .achievement-card, .contact-node'
    );
    
    animatableElements.forEach(el => observer.observe(el));
}

// Web shooting animations
function initWebAnimations() {
    const webButton = document.querySelector('.web-button');
    
    if (webButton) {
        webButton.addEventListener('click', function() {
            createWebShot(this);
        });
    }
    
    // Create random web shots
    setInterval(createRandomWebShot, 5000);
}

// Create web shot effect
function createWebShot(button) {
    const web = document.createElement('div');
    web.className = 'web-shot';
    web.style.cssText = `
        position: absolute;
        width: 200px;
        height: 2px;
        background: linear-gradient(90deg, transparent, #ff0000, transparent);
        pointer-events: none;
        z-index: 1000;
    `;
    
    const rect = button.getBoundingClientRect();
    web.style.left = rect.right + 'px';
    web.style.top = (rect.top + rect.height / 2) + 'px';
    
    document.body.appendChild(web);
    
    // Animate web shot
    web.animate([
        { transform: 'translateX(0) rotate(0deg)', opacity: 0 },
        { transform: 'translateX(300px) rotate(15deg)', opacity: 1 },
        { transform: 'translateX(600px) rotate(30deg)', opacity: 0 }
    ], {
        duration: 1000,
        easing: 'ease-out'
    }).onfinish = () => web.remove();
}
