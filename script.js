document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle ---
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }

    // --- Mobile Navigation Menu ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- Interactive Mouse-Following Glow ---
    const glow1 = document.querySelector('.glow-1');
    const glow2 = document.querySelector('.glow-2');

    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Soft parallax movement for ambient glows
        if (glow1) {
            glow1.style.transform = `translate(${mouseX * 0.05}px, ${mouseY * 0.05}px)`;
        }
        if (glow2) {
            glow2.style.transform = `translate(${-mouseX * 0.03}px, ${-mouseY * 0.03}px)`;
        }
    });

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.88;

        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;

            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };

    // Initial check
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // --- Navbar Style on Scroll ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.padding = '16px 0';
            navbar.style.boxShadow = 'none';
        }
    });

    // --- Contact Form Submission Handler ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Simulate form submission
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = '#10b981'; // Green color for success
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = ''; // Reset to original CSS
                }, 3000);
            }, 1500);
        });
    }

    // --- Language Switcher ---
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    const langCurrent = document.querySelector('.lang-current');

    if (langBtn && langDropdown) {
        // Toggle dropdown
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langBtn.parentElement.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            langBtn.parentElement.classList.remove('active');
        });

        // Language switching function
        function setLanguage(lang) {
            if (typeof translations === 'undefined' || !translations[lang]) return;

            // Update HTML attributes
            document.documentElement.setAttribute('lang', lang);
            if (lang === 'ar') {
                document.documentElement.setAttribute('dir', 'rtl');
            } else {
                document.documentElement.removeAttribute('dir');
            }

            // Update all elements with data-i18n
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations[lang][key]) {
                    el.innerHTML = translations[lang][key];
                }
            });

            // Update all elements with data-i18n-placeholder
            document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                const key = el.getAttribute('data-i18n-placeholder');
                if (translations[lang][key]) {
                    el.setAttribute('placeholder', translations[lang][key]);
                }
            });

            // Update active class in dropdown
            langOptions.forEach(opt => {
                if (opt.getAttribute('data-lang') === lang) {
                    opt.classList.add('active');
                } else {
                    opt.classList.remove('active');
                }
            });

            // Update current language text (EN, AR, DE)
            langCurrent.textContent = lang.toUpperCase();

            // Save preference
            localStorage.setItem('preferred-lang', lang);
        }

        // Set options click handlers
        langOptions.forEach(opt => {
            opt.addEventListener('click', () => {
                const lang = opt.getAttribute('data-lang');
                setLanguage(lang);
            });
        });

        // Load preferred language or default to English
        const preferredLang = localStorage.getItem('preferred-lang') || 'en';
        setLanguage(preferredLang);
    }
});

