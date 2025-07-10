// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Special handling for home section - scroll to absolute top
            if (this.getAttribute('href') === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } 
            else if (this.getAttribute('href') === '#contact') {
                const targetPosition = target.offsetTop - 20; // Smaller offset = scroll down more
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            else {
                // Calculate navbar height dynamically
                const navbar = document.querySelector('.navbar') || document.querySelector('nav') || document.querySelector('header');
                const navbarHeight = navbar ? navbar.offsetHeight : 80; // fallback to 80px
                const targetPosition = target.offsetTop - navbarHeight - 20; // navbar height + small buffer
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== HEADER BACKGROUND CHANGE ON SCROLL =====
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.85)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.5)';
        header.style.boxShadow = 'none';
    }
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// ===== SERVICE CARDS HOVER EFFECTS =====
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== SERVICE CARDS SELECTION =====
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        const checkbox = this.querySelector('input[type="checkbox"]');
        checkbox.checked = !checkbox.checked;
        
        if (checkbox.checked) {
            this.classList.add('selected');
        } else {
            this.classList.remove('selected');
        }
    });
});

// ===== FORM SUBMISSION HANDLER =====
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get selected services (desktop checkboxes)
    const selectedServices = [];
    document.querySelectorAll('input[name="service[]"]:checked').forEach(checkbox => {
        selectedServices.push(checkbox.value);
    });
    
    // Get mobile service selection
    const mobileService = document.getElementById('mobile-service');
    if (mobileService && mobileService.value && mobileService.value !== '') {
        if (mobileService.value === 'multiple') {
            selectedServices.push('Multiple Services');
        } else {
            selectedServices.push(mobileService.value);
        }
    }
    
    // Form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        company: document.getElementById('company').value,
        phone: document.getElementById('phone').value,
        services: selectedServices,
        message: document.getElementById('message').value
    };
    
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
});

// ===== MOBILE NAVIGATION =====
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.getElementById('mobileNav');
const mobileNavOverlay = document.getElementById('mobileNavOverlay');

function toggleMobileNav() {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
    mobileNavOverlay.classList.toggle('active');
    
    if (mobileNav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMobileNav() {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('active');
    mobileNavOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (hamburger && mobileNav) {
    hamburger.addEventListener('click', toggleMobileNav);
    
    // Close menu on nav link click
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });
    
    // Close menu on overlay click
    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', closeMobileNav);
    }
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            closeMobileNav();
        }
    });
}

// ===== HAMBURGER DISPLAY HANDLER =====
function handleHamburgerDisplay() {
    if (window.innerWidth <= 768) {
        hamburger.style.display = 'flex';
    } else {
        hamburger.style.display = 'none';
        closeMobileNav();
    }
}

window.addEventListener('resize', handleHamburgerDisplay);
window.addEventListener('DOMContentLoaded', handleHamburgerDisplay); 