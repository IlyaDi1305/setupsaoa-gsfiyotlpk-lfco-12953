// ========================================
// Russian Restaurant Website - Interactive Features
// Pure Vanilla JavaScript - No Dependencies
// ========================================

(function() {
    'use strict';

    // ========================================
    // Mobile Navigation Toggle
    // ========================================
    
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ========================================
    // Header Scroll Effect
    // ========================================
    
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ========================================
    // Smooth Scroll for Navigation Links
    // ========================================
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ========================================
    // Scroll Reveal Animations
    // ========================================
    
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // ========================================
    // Menu Tabs Functionality
    // ========================================
    
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // ========================================
    // Accordion Functionality
    // ========================================
    
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });

    // ========================================
    // Gallery Interaction (Simple Click Effect)
    // ========================================
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Add a subtle click animation
            item.style.transform = 'scale(0.98)';
            setTimeout(() => {
                item.style.transform = '';
            }, 200);
        });
    });

    // ========================================
    // Form Validation & Submission
    // ========================================
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const formInputs = {
            name: document.getElementById('name'),
            phone: document.getElementById('phone'),
            email: document.getElementById('email'),
            date: document.getElementById('date'),
            guests: document.getElementById('guests'),
            message: document.getElementById('message')
        };
        
        const formFeedback = contactForm.querySelector('.form-feedback');
        
        // Validation rules
        const validators = {
            name: (value) => {
                if (!value || value.trim().length < 2) {
                    return 'Пожалуйста, введите ваше имя (минимум 2 символа)';
                }
                return '';
            },
            
            phone: (value) => {
                if (!value) {
                    return 'Пожалуйста, введите номер телефона';
                }
                // Russian phone number pattern
                const phonePattern = /^[\+]?[7-8]?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
                if (!phonePattern.test(value.replace(/\s/g, ''))) {
                    return 'Введите корректный номер телефона';
                }
                return '';
            },
            
            email: (value) => {
                if (value && value.length > 0) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(value)) {
                        return 'Введите корректный email адрес';
                    }
                }
                return '';
            }
        };
        
        // Real-time validation on blur
        Object.keys(validators).forEach(fieldName => {
            const field = formInputs[fieldName];
            if (field) {
                field.addEventListener('blur', () => {
                    validateField(field, validators[fieldName]);
                });
                
                field.addEventListener('input', () => {
                    if (field.classList.contains('error')) {
                        validateField(field, validators[fieldName]);
                    }
                });
            }
        });
        
        // Validate individual field
        function validateField(field, validator) {
            const errorMessage = validator(field.value);
            const errorElement = field.parentElement.querySelector('.error-message');
            
            if (errorMessage) {
                field.classList.add('error');
                if (errorElement) {
                    errorElement.textContent = errorMessage;
                }
                return false;
            } else {
                field.classList.remove('error');
                if (errorElement) {
                    errorElement.textContent = '';
                }
                return true;
            }
        }
        
        // Validate entire form
        function validateForm() {
            let isValid = true;
            
            Object.keys(validators).forEach(fieldName => {
                const field = formInputs[fieldName];
                if (field && !validateField(field, validators[fieldName])) {
                    isValid = false;
                }
            });
            
            return isValid;
        }
        
        // Form submission
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Clear previous feedback
            formFeedback.className = 'form-feedback';
            formFeedback.style.display = 'none';
            
            if (validateForm()) {
                // Simulate form submission
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Отправка...';
                submitButton.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    // Success
                    formFeedback.className = 'form-feedback success';
                    formFeedback.textContent = '✓ Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.';
                    formFeedback.style.display = 'block';
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formFeedback.style.display = 'none';
                    }, 5000);
                    
                }, 1500);
                
            } else {
                // Show error
                formFeedback.className = 'form-feedback error';
                formFeedback.textContent = '⚠ Пожалуйста, исправьте ошибки в форме';
                formFeedback.style.display = 'block';
                
                // Scroll to first error
                const firstError = contactForm.querySelector('.error');
                if (firstError) {
                    firstError.focus();
                }
            }
        });
    }

    // ========================================
    // Parallax Effect on Hero Section
    // ========================================
    
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroContent = hero.querySelector('.hero-content');
            
            if (heroContent && scrolled <= window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
            }
        });
    }

    // ========================================
    // Active Menu Link Based on Scroll Position
    // ========================================
    
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollPosition = window.pageYOffset + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);

    // ========================================
    // Lazy Loading for Better Performance
    // ========================================
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ========================================
    // Keyboard Navigation Accessibility
    // ========================================
    
    // Trap focus in mobile menu when open
    document.addEventListener('keydown', (e) => {
        if (navMenu.classList.contains('active') && e.key === 'Escape') {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            navToggle.focus();
        }
    });

    // ========================================
    // Page Load Animation
    // ========================================
    
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Trigger initial animations
        const fadeInElements = document.querySelectorAll('.fade-in');
        fadeInElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    });

    // ========================================
    // Performance: Debounce Scroll Events
    // ========================================
    
    function debounce(func, wait = 10) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply debounce to scroll-heavy functions
    const debouncedReveal = debounce(revealOnScroll, 10);
    const debouncedHighlight = debounce(highlightNavigation, 10);
    
    window.addEventListener('scroll', debouncedReveal);
    window.addEventListener('scroll', debouncedHighlight);

    // ========================================
    // Console Message
    // ========================================
    
    console.log('%c🏠 Добро пожаловать в Русскую Избу!', 'color: #D4AF37; font-size: 16px; font-weight: bold;');
    console.log('%cРесторан русской кухни в Краснодаре', 'color: #C41E3A; font-size: 12px;');

})();
