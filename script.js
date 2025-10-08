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
 node.appendChild(tooltip);
    
    // Add skill bar styles
    const style = document.createElement('style');
    style.textContent = `
        .skill-bar {
            width: 100px;
            height: 4px;
            background: #333;
            border-radius: 2px;
            margin: 0.5rem 0;
            overflow: hidden;
        }
        .skill-progress {
            height: 100%;
            background: linear-gradient(90deg, #ff0000, #0066ff);
            border-radius: 2px;
            transition: width 0.5s ease;
        }
    `;
    document.head.appendChild(style);
}

// Hide skill tooltip
function hideSkillTooltip() {
    const tooltip = document.querySelector('.skill-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Create web connection between skills
function createSkillWeb(activeNode) {
    const skillsContainer = document.querySelector('.skills-web');
    const allNodes = document.querySelectorAll('.skill-node');
    
    allNodes.forEach(node => {
        if (node !== activeNode) {
            const line = document.createElement('div');
            line.className = 'skill-connection';
            
            const rect1 = activeNode.getBoundingClientRect();
            const rect2 = node.getBoundingClientRect();
            const containerRect = skillsContainer.getBoundingClientRect();
            
            const x1 = rect1.left + rect1.width / 2 - containerRect.left;
            const y1 = rect1.top + rect1.height / 2 - containerRect.top;
            const x2 = rect2.left + rect2.width / 2 - containerRect.left;
            const y2 = rect2.top + rect2.height / 2 - containerRect.top;
            
            const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
            const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
            
            line.style.cssText = `
                position: absolute;
                width: ${length}px;
                height: 1px;
                background: linear-gradient(90deg, transparent, rgba(255, 0, 0, 0.5), transparent);
                left: ${x1}px;
                top: ${y1}px;
                transform-origin: 0 0;
                transform: rotate(${angle}deg);
                pointer-events: none;
                animation: webGlow 1s ease-in-out;
            `;
            
            skillsContainer.appendChild(line);
        }
    });
    
    // Add glow animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes webGlow {
            0% { opacity: 0; transform: rotate(${0}deg) scaleX(0); }
            100% { opacity: 1; transform: rotate(${0}deg) scaleX(1); }
        }
    `;
    document.head.appendChild(style);
}

// Remove skill web connections
function removeSkillWeb() {
    const connections = document.querySelectorAll('.skill-connection');
    connections.forEach(connection => {
        connection.style.opacity = '0';
        connection.style.transition = 'opacity 0.3s ease';
        setTimeout(() => connection.remove(), 300);
    });
}
function animateSkillNode(node) {
    const level = node.dataset.level;
    node.style.animation = `skillPulse 1s ease-out`;
    
    // Add pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes skillPulse {
            0% { transform: scale(0.8); opacity: 0; }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Animate experience card
function animateExperienceCard(card) {
    card.style.animation = 'cardSlideIn 0.8s ease-out';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes cardSlideIn {
            0% { transform: translateX(-100px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Animate project card
function animateProjectCard(card) {
    card.style.animation = 'projectSwing 1s ease-out';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes projectSwing {
            0% { transform: translateY(50px) rotate(-5deg); opacity: 0; }
            50% { transform: translateY(-10px) rotate(2deg); }
            100% { transform: translateY(0) rotate(0deg); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Particle effects
function initParticleEffects() {
    createFloatingParticles();
    setInterval(createFloatingParticles, 10000);
}

// Create floating particles
function createFloatingParticles() {
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            createParticle();
        }, i * 200);
    }
}
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.style.cssText = `
        position: fixed;
        width: 3px;
        height: 3px;
        background: #ff0000;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        box-shadow: 0 0 6px #ff0000;
    `;
    
    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight + 10;
    
    particle.style.left = startX + 'px';
    particle.style.top = startY + 'px';
    
    document.body.appendChild(particle);
    
    // Animate particle
    const animation = particle.animate([
        { 
            transform: 'translateY(0px) translateX(0px) rotate(0deg)',
            opacity: 0
        },
        { 
            transform: `translateY(-${window.innerHeight + 100}px) translateX(${(Math.random() - 0.5) * 200}px) rotate(360deg)`,
            opacity: 1
        },
        { 
            transform: `translateY(-${window.innerHeight + 200}px) translateX(${(Math.random() - 0.5) * 400}px) rotate(720deg)`,
            opacity: 0
        }
    ], {
        duration: 8000 + Math.random() * 4000,
        easing: 'linear'
    });
    
    animation.onfinish = () => particle.remove();
}

// Spider effects
function initSpiderEffects() {
    // Add spider cursor trail
    document.addEventListener('mousemove', createSpiderTrail);
    
    // Add web shooting on click
    document.addEventListener('click', function(e) {
        if (!e.target.closest('button') && !e.target.closest('a')) {
            createClickWeb(e.clientX, e.clientY);
        }
    });
}

// Create spider trail effect
function createSpiderTrail(e) {
    if (Math.random() > 0.95) { // Only create trail occasionally
        const trail = document.createElement('div');
        trail.innerHTML = '🕷️';
        trail.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            font-size: 12px;
            pointer-events: none;
            z-index: 1000;
            animation: spiderTrail 2s ease-out forwards;
        `;
        
        document.body.appendChild(trail);
        
        // Add trail animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spiderTrail {
                0% { opacity: 0.8; transform: scale(1); }
                100% { opacity: 0; transform: scale(0.5) rotate(180deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => trail.remove(), 2000);
    }
}

// Create web on click
function createClickWeb(x, y) {
    const web = document.createElement('div');
    web.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 50px;
        height: 50px;
        border: 1px solid rgba(255, 0, 0, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: clickWeb 1s ease-out forwards;
    `;
    
    document.body.appendChild(web);
    
    // Add click web animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes clickWeb {
            0% { 
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% { 
                transform: translate(-50%, -50%) scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => web.remove(), 1000);
}

// Utility function for smooth scrolling (used by HTML onclick)
window.scrollToSection = scrollToSection;

