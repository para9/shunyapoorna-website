// Shunyapoorna Website JavaScript
let currentSection = 'home';
let isMenuOpen = false;
let isLoading = true;

document.addEventListener('DOMContentLoaded', function() {
    initializeLoadingScreen();
    
    setTimeout(() => {
        initializeNavigation();
        initializeMobileMenu();
        initializeContactForm();
        initializeSmoothScrolling();
        updateActiveSection('home');
        hideLoadingScreen();
    }, 3000);
});

function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '1';
        loadingScreen.style.visibility = 'visible';
    }

    const completionFill = document.querySelector('.completion-fill');
    if (completionFill) {
        setTimeout(() => {
            completionFill.style.animation = 'fillUp 2s ease-out forwards';
        }, 500);
    }

    const completionText = document.querySelector('.completion-text');
    if (completionText) {
        setTimeout(() => {
            completionText.style.opacity = '1';
        }, 2000);
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
    isLoading = false;
}

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            if (targetSection && !isLoading) {
                navigateToSection(targetSection);
                closeMobileMenu();
            }
        });
    });

    const heroButtons = document.querySelectorAll('.hero-actions .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            if (targetSection && !isLoading) {
                navigateToSection(targetSection);
            }
        });
    });
}

function navigateToSection(sectionId) {
    if (isLoading) return;

    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.opacity = '0';
        targetSection.style.transform = 'translateY(30px)';
        targetSection.classList.add('active');
        
        setTimeout(() => {
            targetSection.style.transition = 'all 0.5s ease-out';
            targetSection.style.opacity = '1';
            targetSection.style.transform = 'translateY(0)';
        }, 50);
    }

    updateActiveSection(sectionId);
    currentSection = sectionId;

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function updateActiveSection(sectionId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
}

function initializeMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            toggleMobileMenu();
        });
    }
}

function toggleMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            navToggle.classList.add('active');
            navMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
}

function closeMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu && isMenuOpen) {
        isMenuOpen = false;
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    }
}

function handleFormSubmission(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        alert('Thank you! Your message has been sent successfully.');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function initializeSmoothScrolling() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                if (targetId) {
                    navigateToSection(targetId);
                }
            }
        });
    });
}

console.log('🌟 Welcome to Shunyapoorna! Website loaded successfully with animated zero logo!');
