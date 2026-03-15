/*
 * ============================================
 * JASMINE'S PORTFOLIO - JAVASCRIPT
 * ============================================
 * 
 * WHAT THIS FILE DOES:
 * Handles all interactive behaviors:
 * - Mobile menu toggle (hamburger)
 * - Case study modal open/close
 * - Keyboard navigation (ESC to close)
 * - Click handlers and event listeners
 * 
 * WHY VANILLA JAVASCRIPT?
 * No frameworks or dependencies = faster loading
 * Easier to understand and modify
 * Professional quality interactions
 * 
 * ============================================
 */

// ============================================
// MOBILE MENU TOGGLE
// ============================================
/*
 * WHAT THIS DOES:
 * When user clicks hamburger menu button,
 * the navigation menu slides down.
 * Clicking a link closes the menu.
 * 
 * WHY IT MATTERS:
 * Mobile users need easy navigation
 * Without taking up space on small screens
 */

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

// Get all navigation links
const navLinks = document.querySelectorAll('.nav-link');

// HAMBURGER TOGGLE: Click button to open/close menu
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        // classList.toggle adds/removes 'active' class
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// CLOSE MENU: When user clicks a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Remove 'active' class to close menu
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// CLOSE MENU: When user clicks outside navigation
document.addEventListener('click', (e) => {
    // If click is NOT inside navbar, close menu
    if (!e.target.closest('.navbar')) {
        menuToggle?.classList.remove('active');
        navMenu?.classList.remove('active');
    }
});

// ============================================
// CASE STUDY MODAL FUNCTIONALITY
// ============================================
/*
 * WHAT THIS DOES:
 * When user clicks "Read Case Study", a modal pops up
 * with detailed project information.
 * Can close with X button, ESC key, or clicking overlay.
 * 
 * WHY MODALS:
 * - Keep user on same page (context not lost)
 * - Feels professional and responsive
 * - Works on desktop and mobile
 */

const modalOverlay = document.getElementById('modalOverlay');
const modals = document.querySelectorAll('.case-study-modal');
const closeButtons = document.querySelectorAll('.modal-close');
const projectLinks = document.querySelectorAll('.project-link');

/*
 * OPEN MODAL: When user clicks "Read Case Study"
 */
projectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // preventDefault = "don't go to a new page"
        
        // Get which modal to open from data-modal attribute
        const modalId = link.getAttribute('data-modal');
        // getAttribute = "read the data-modal value from HTML"
        
        const modal = document.getElementById(modalId);
        // getElementById = "find element with this ID"
        
        if (modal) {
            openModal(modal);
        }
    });
});

/*
 * FUNCTION: OPEN MODAL
 * Shows the modal with smooth fade-in
 */
function openModal(modal) {
    // Show dark overlay behind modal
    modalOverlay.classList.add('active');
    
    // Show the modal itself (CSS makes it fade in)
    modal.classList.add('active');
    
    // Prevent body from scrolling while modal is open
    // (better UX - focus on modal content)
    document.body.style.overflow = 'hidden';
    
    // Move focus to close button (accessibility)
    // Screen reader users will be here next
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.focus();
    }
}

/*
 * FUNCTION: CLOSE MODAL
 * Hides the modal
 */
function closeModal(modal) {
    modal.classList.remove('active');
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    // restore scrolling
}

/*
 * CLOSE WITH X BUTTON: Click handler
 */
closeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Find the modal that contains this button
        const modal = e.target.closest('.case-study-modal');
        if (modal) {
            closeModal(modal);
        }
    });
});

/*
 * CLOSE WITH OVERLAY: Click outside modal
 */
if (modalOverlay) {
    modalOverlay.addEventListener('click', () => {
        // Close all open modals
        modals.forEach(modal => {
            closeModal(modal);
        });
    });
}

/*
 * CLOSE WITH ESC KEY: Keyboard shortcut
 * (Power users appreciate this!)
 */
document.addEventListener('keydown', (e) => {
    // If user pressed ESC key...
    if (e.key === 'Escape') {
        modals.forEach(modal => {
            // Close any open modal
            if (modal.classList.contains('active')) {
                closeModal(modal);
            }
        });
    }
});

// ============================================
// SCROLL ANIMATIONS (Optional Enhancement)
// ============================================
/*
 * WHAT THIS DOES:
 * When you scroll to project cards, they fade in.
 * Adds visual interest without being annoying.
 * 
 * HOW IT WORKS:
 * IntersectionObserver = "tell me when element enters viewport"
 * When element becomes visible, we animate it in
 */

const observerOptions = {
    threshold: 0.1,
    // threshold = "trigger when 10% of element is visible"
    rootMargin: '0px 0px -100px 0px'
    // rootMargin = "start animation 100px before bottom of screen"
    // makes animation feel smoother
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Element is visible, show it
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

/*
 * APPLY ANIMATION: Start elements invisible
 * then animate them in as they scroll into view
 */
const elementsToAnimate = document.querySelectorAll(
    '.project-card, .about-content'
);

elementsToAnimate.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
    // observe = "watch this element"
});

// ============================================
// SKIP TO MAIN CONTENT (Accessibility)
// ============================================
/*
 * WHAT THIS DOES:
 * Adds a hidden link that appears on focus.
 * Keyboard-only users can skip navigation
 * and jump straight to main content.
 * 
 * WHY IT MATTERS:
 * Users with screen readers don't want to
 * listen to nav links every time they visit.
 */

const skipLink = document.createElement('a');
skipLink.href = '#work';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--color-accent);
    color: white;
    padding: 8px;
    z-index: 100;
`;

// Show on focus, hide on blur
skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});

skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});

// Add to page (before body content)
document.body.insertBefore(skipLink, document.body.firstChild);

// ============================================
// ANALYTICS TRACKING (Optional)
// ============================================
/*
 * WHAT THIS DOES:
 * Tracks which projects are being viewed.
 * Helps understand what work resonates most.
 * 
 * HOW IT WORKS:
 * If you add Google Analytics later,
 * this function sends data to it.
 * 
 * Currently just logs to console (optional)
 */

function trackProjectView(projectName) {
    // Send to Google Analytics if available
    if (window.gtag) {
        gtag('event', 'view_project', {
            project_name: projectName
        });
    }
    
    // Also log locally for debugging
    console.log('Project viewed:', projectName);
}

// Track when projects are clicked
projectLinks.forEach(link => {
    link.addEventListener('click', () => {
        const projectCard = link.closest('.project-card');
        const projectTitle = projectCard?.querySelector('.project-title')?.textContent;
        if (projectTitle) {
            trackProjectView(projectTitle);
        }
    });
});

// ============================================
// SMOOTH SCROLLING (Already in CSS)
// ============================================
/*
 * CSS has: scroll-behavior: smooth;
 * This makes anchor links scroll smoothly
 * No JavaScript needed for this.
 */

// ============================================
// DEBUG MODE (Development only)
// ============================================
/*
 * WHAT THIS DOES:
 * Logs useful info for debugging.
 * Set DEBUG to false for production.
 */

const DEBUG = false;

if (DEBUG) {
    console.log('=== Portfolio Debug Info ===');
    console.log('Modal count:', modals.length);
    console.log('Project links:', projectLinks.length);
    console.log('Navigation items:', navLinks.length);
    console.log('Close buttons:', closeButtons.length);
}

// ============================================
// INITIALIZATION
// ============================================
/*
 * Called when page fully loads.
 * You can add any startup code here.
 */

console.log('✓ Jasmine\'s portfolio loaded successfully');

// ============================================
// ADDITIONAL FEATURES (Optional enhancements)
// ============================================

/*
 * TO ADD LATER:
 * 
 * 1. SMOOTH PAGE TRANSITIONS
 *    When user clicks nav link, fade current content
 *    and fade in new section
 * 
 * 2. ANIMATED COUNTERS
 *    Count up metrics (0 → 45%) when visible
 *    import: <script src="countUp.js"></script>
 * 
 * 3. FORM SUBMISSION
 *    Add contact form with email integration
 *    Services: Formspree, Netlify Forms, etc.
 * 
 * 4. LIGHT/DARK MODE
 *    Toggle between themes
 *    Save preference to localStorage
 * 
 * 5. SCROLL-TRIGGERED ANIMATIONS
 *    More sophisticated entrance effects
 *    Library: AOS (Animate On Scroll)
 * 
 * These are optional - portfolio is great as is!
 */
