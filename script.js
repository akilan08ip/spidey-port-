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
function createRandomWebShot() {
    const web = document.createElement('div');
    web.className = 'random-web-shot';
    web.style.cssText = `
        position: fixed;
        width: 150px;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255, 0, 0, 0.6), transparent);
        pointer-events: none;
        z-index: 1;
    `;
    
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    const angle = Math.random() * 360;
    
    web.style.left = startX + 'px';
    web.style.top = startY + 'px';
    web.style.transform = `rotate(${angle}deg)`;
    
    document.body.appendChild(web);
    
    // Animate and remove
    setTimeout(() => {
        web.style.opacity = '0';
        web.style.transition = 'opacity 1s ease-out';
        setTimeout(() => web.remove(), 1000);
    }, 2000);
}

// Skills interaction
function initSkillsInteraction() {
    const skillNodes = document.querySelectorAll('.skill-node');
    
    skillNodes.forEach(node => {
        node.addEventListener('mouseenter', function() {
            const skill = this.dataset.skill;
            const level = this.dataset.level;
            showSkillTooltip(this, skill, level);
            createSkillWeb(this);
        });
        
        node.addEventListener('mouseleave', function() {
            hideSkillTooltip();
            removeSkillWeb();
        });
    });
}

// Show skill tooltip
function showSkillTooltip(node, skill, level) {
    const tooltip = document.createElement('div');
    tooltip.className = 'skill-tooltip';
    tooltip.innerHTML = `
        <div class="tooltip-content">
            <strong>${skill}</strong>
            <div class="skill-bar">
                <div class="skill-progress" style="width: ${level}%"></div>
            </div>
            <span>${level}%</span>
        </div>
    `;
    
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 1rem;
        border-radius: 10px;
        border: 1px solid #ff0000;
        z-index: 1000;
        pointer-events: none;
        transform: translateY(-120px);
    `;
