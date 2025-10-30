// ============================================
// INITIALIZE ON DOM LOAD
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ============================================
// MAIN INITIALIZATION FUNCTION
// ============================================
function initializeApp() {
    // Get DOM elements
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    const overlayLeft = document.getElementById('overlayLeft');
    const overlayRight = document.getElementById('overlayRight');
    const signUpForm = document.getElementById('signUpForm');
    const signInForm = document.getElementById('signInForm');
    const loadingOverlay = document.getElementById('loadingOverlay');

    // Initialize features
    createParticles();
    initializeFormToggle(signUpButton, signInButton, container, overlayLeft, overlayRight);
    initializePasswordToggle();
    initializeFormSubmission(signUpForm, signInForm, loadingOverlay);
    initializeInputAnimations();
    initializeSocialButtons();
    initializeRippleEffect();
    
    // Set initial state
    overlayLeft.style.display = 'none';
    overlayRight.style.display = 'flex';
}

// ============================================
// FORM TOGGLE ANIMATION
// ============================================
function initializeFormToggle(signUpBtn, signInBtn, container, overlayLeft, overlayRight) {
    // Switch to Sign Up
    signUpBtn.addEventListener('click', function() {
        container.classList.add('active');
        overlayRight.style.display = 'none';
        overlayLeft.style.display = 'flex';
        
        // Add animation class
        this.classList.add('clicked');
        setTimeout(() => this.classList.remove('clicked'), 600);
        
        // Play sound effect (optional)
        playTransitionSound();
    });

    // Switch to Sign In
    signInBtn.addEventListener('click', function() {
        container.classList.remove('active');
        overlayRight.style.display = 'flex';
        overlayLeft.style.display = 'none';
        
        // Add animation class
        this.classList.add('clicked');
        setTimeout(() => this.classList.remove('clicked'), 600);
        
        // Play sound effect (optional)
        playTransitionSound();
    });
}

// ============================================
// CREATE ANIMATED PARTICLES
// ============================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.bottom = '-10px';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// ============================================
// PASSWORD TOGGLE VISIBILITY
// ============================================
function initializePasswordToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            
            if (input.type === 'password') {
                input.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
            
            // Add animation
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

// ============================================
// FORM SUBMISSION HANDLING
// ============================================
function initializeFormSubmission(signUpForm, signInForm, loadingOverlay) {
    
    // Sign Up Form
    signUpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            password: this.querySelector('input[type="password"]').value
        };
        
        // Validate form
        if (validateSignUpForm(formData)) {
            showLoading(loadingOverlay);
            
            // Simulate API call
            setTimeout(() => {
                hideLoading(loadingOverlay);
                showNotification('Account created successfully! 🎉', 'success');
                this.reset();
            }, 2000);
        }
    });
    
    // Sign In Form
    signInForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            email: this.querySelector('input[type="email"]').value,
            password: this.querySelector('input[type="password"]').value
        };
        
        // Validate form
        if (validateSignInForm(formData)) {
            showLoading(loadingOverlay);
            
            // Simulate API call
            setTimeout(() => {
                hideLoading(loadingOverlay);
                showNotification('Welcome back! 👋', 'success');
                this.reset();
            }, 2000);
        }
    });
}

// ============================================
// FORM VALIDATION
// ============================================
function validateSignUpForm(data) {
    if (!data.name || data.name.trim().length < 3) {
        showNotification('Please enter a valid name (minimum 3 characters)', 'error');
        return false;
    }
    
    if (!validateEmail(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    if (!data.password || data.password.length < 6) {
        showNotification('Password must be at least 6 characters', 'error');
        return false;
    }
    
    return true;
}

function validateSignInForm(data) {
    if (!validateEmail(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    if (!data.password) {
        showNotification('Please enter your password', 'error');
        return false;
    }
    
    return true;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ============================================
// LOADING OVERLAY
// ============================================
function showLoading(overlay) {
    overlay.classList.add('active');
}

function hideLoading(overlay) {
    overlay.classList.remove('active');
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        color: 'white',
        padding: '15px 25px',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        zIndex: '10000',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '0.95rem',
        fontWeight: '500',
        animation: 'slideInRight 0.5s ease-out',
        fontFamily: 'Poppins, sans-serif'
    });
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// INPUT ANIMATIONS
// ============================================
function initializeInputAnimations() {
    const inputs = document.querySelectorAll('.input-group input');
    
    inputs.forEach(input => {
        // Focus animation
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        // Blur animation
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
        
        // Typing animation
        input.addEventListener('input', function() {
            const icon = this.previousElementSibling;
            if (icon && icon.tagName === 'I') {
                icon.style.transform = 'scale(1.2) translateY(-50%)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1) translateY(-50%)';
                }, 200);
            }
        });
    });
}

// ============================================
// SOCIAL BUTTON INTERACTIONS
// ============================================
function initializeSocialButtons() {
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.classList.contains('google') ? 'Google' :
                           this.classList.contains('facebook') ? 'Facebook' :
                           this.classList.contains('github') ? 'GitHub' :
                           this.classList.contains('linkedin') ? 'LinkedIn' : 'Social';
            
            showNotification(`${platform} login coming soon! 🚀`, 'info');
            
            // Add pulse animation
            this.style.animation = 'pulse 0.5s ease-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });
}

// ============================================
// RIPPLE EFFECT ON BUTTONS
// ============================================
function initializeRippleEffect() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ============================================
// SOUND EFFECTS (Optional)
// ============================================
function playTransitionSound() {
    // You can add audio if needed
    // const audio = new Audio('path/to/sound.mp3');
    // audio.volume = 0.2;
    // audio.play();
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', function(e) {
    // Press 'Escape' to close loading overlay
    if (e.key === 'Escape') {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay.classList.contains('active')) {
            hideLoading(loadingOverlay);
        }
    }
    
    // Press 'Enter' on overlay to toggle
    if (e.key === 'Enter' && e.target.classList.contains('ghost-btn')) {
        e.target.click();
    }
});

// ============================================
// SMOOTH SCROLL (if needed for future pages)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// PREVENT DOUBLE SUBMISSION
// ============================================
let isSubmitting = false;

document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        if (isSubmitting) {
            e.preventDefault();
            return false;
        }
        isSubmitting = true;
        
        setTimeout(() => {
            isSubmitting = false;
        }, 3000);
    });
});

// ============================================
// AUTO-HIDE LOADING ON PAGE LOAD
// ============================================
window.addEventListener('load', function() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        setTimeout(() => {
            hideLoading(loadingOverlay);
        }, 500);
    }
});

// ============================================
// CONSOLE EASTER EGG
// ============================================
console.log('%c🚀 BRANDLY Login System', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cWelcome to our amazing login experience!', 'color: #764ba2; font-size: 14px;');
console.log('%cBuilt with ❤️ and lots of animations', 'color: #f093fb; font-size: 12px;');

// ============================================
// EXPORT FUNCTIONS (if using modules)
// ============================================
// export { showNotification, showLoading, hideLoading };