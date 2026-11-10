document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    let mobileMenu = document.querySelector('.mobile-menu');

    if (!mobileMenu) {
        mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        mobileMenu.innerHTML = `
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#why-membiq">Why Membiq</a>
            <a href="#app-view">App View</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
            <a href="#download" class="btn-primary" style="text-align:center; margin-top:10px;"><i data-lucide="download"></i> Download App</a>
        `;
        document.getElementById('navbar').appendChild(mobileMenu);
        lucide.createIcons();
    }

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // 2. Sticky Navbar Shadow on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Hero Word Rotator Animation
    const words = ["Simplify Everything.", "Track Expiries.", "Manage Members.", "Organize Shifts."];
    let wordIndex = 0;
    const wordRotator = document.getElementById('word-rotator');
    
    if (wordRotator) {
        setInterval(() => {
            wordRotator.style.opacity = 0;
            setTimeout(() => {
                wordIndex = (wordIndex + 1) % words.length;
                wordRotator.textContent = words[wordIndex];
                wordRotator.style.opacity = 1;
            }, 300);
        }, 3000);
    }

    // 4. Count-up Stats Animation
    const counters = document.querySelectorAll('[data-counter]');
    let animated = false;

    function runCounters() {
        if (animated) return;
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const speed = target / 30 || 1;
            const updateCount = () => {
                count += speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCount, 40);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
        animated = true;
    }

    window.addEventListener('scroll', () => {
        const statsSection = document.querySelector('[data-counter]');
        if (statsSection) {
            const rect = statsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                runCounters();
            }
        }
    });

    // 5. Carousel Logic for Both Galleries
    function setupCarousel(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const track = container.querySelector('.carousel-track');
        const slides = container.querySelectorAll('.carousel-slide');
        const prevBtn = container.querySelector('.prev-btn');
        const nextBtn = container.querySelector('.next-btn');
        
        const isDesktop = containerId === 'desktop-carousel';
        const counterEl = container.parentElement.querySelector(isDesktop ? '.desktop-counter' : '.android-counter');
        const captionEl = container.parentElement.querySelector(isDesktop ? '.desktop-caption' : '.android-caption');
        const dotsContainer = container.parentElement.querySelector(isDesktop ? '.desktop-dots' : '.android-dots');
        const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];

        let currentIndex = 0;
        const totalSlides = slides.length;

        const captions = isDesktop 
            ? ["Dashboard Overview", "Member Management", "Membership Tracking", "Seat Availability", "Shift Management"]
            : ["Mobile Dashboard", "Member Registration", "Member Details", "Seat Management", "Membership Status"];

        function updateCarousel() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            if (counterEl) counterEl.textContent = `${currentIndex + 1}/${totalSlides}`;
            if (captionEl) captionEl.textContent = captions[currentIndex];
            
            dots.forEach((dot, idx) => {
                if (idx === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateCarousel();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                updateCarousel();
            });
        }

        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                currentIndex = idx;
                updateCarousel();
            });
        });

        // Touch Swipe
        let touchStartX = 0;
        let touchEndX = 0;

        container.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});

        container.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateCarousel();
            } else if (touchEndX - touchStartX > 50) {
                currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                updateCarousel();
            }
        }, {passive: true});
    }

    setupCarousel('desktop-carousel');
    setupCarousel('android-carousel');

    // 6. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-btn');
        btn.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isOpen) {
                item.classList.add('active');
            }
        });
    });
});

// 7. Lightbox Functions
function openLightbox(imgSrc, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    if (lightbox && lightboxImg) {
        lightboxImg.src = imgSrc;
        if (lightboxCaption) lightboxCaption.textContent = caption;
        lightbox.classList.add('active');
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});




// external js file for the membiq pricing page 

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    let mobileMenu = document.querySelector('.mobile-menu');

    if (!mobileMenu) {
        mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        mobileMenu.innerHTML = `
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#why-membiq">Why Membiq</a>
            <a href="#pricing">Pricing</a>
            <a href="#app-view">App View</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
            <a href="#download" class="btn-primary" style="text-align:center; margin-top:10px;"><i data-lucide="download"></i> Download App</a>
        `;
        document.getElementById('navbar').appendChild(mobileMenu);
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }

    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // 2. Sticky Navbar Shadow on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            if (navbar) navbar.classList.add('scrolled');
        } else {
            if (navbar) navbar.classList.remove('scrolled');
        }
    });

    // 3. Hero Word Rotator Animation
    const words = ["Simplify Everything.", "Track Expiries.", "Manage Members.", "Organize Shifts."];
    let wordIndex = 0;
    const wordRotator = document.getElementById('word-rotator');
    
    if (wordRotator) {
        setInterval(() => {
            wordRotator.style.opacity = 0;
            setTimeout(() => {
                wordIndex = (wordIndex + 1) % words.length;
                wordRotator.textContent = words[wordIndex];
                wordRotator.style.opacity = 1;
            }, 300);
        }, 3000);
    }

    // 4. Count-up Stats Animation
    const counters = document.querySelectorAll('[data-counter]');
    let animated = false;

    function runCounters() {
        if (animated) return;
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const speed = target / 30 || 1;
            const updateCount = () => {
                count += speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCount, 40);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
        animated = true;
    }

    window.addEventListener('scroll', () => {
        const statsSection = document.querySelector('[data-counter]');
        if (statsSection) {
            const rect = statsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                runCounters();
            }
        }
    });

    // 5. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-btn');
        if (btn) {
            btn.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');
                faqItems.forEach(i => i.classList.remove('active'));
                if (!isOpen) {
                    item.classList.add('active');
                }
            });
        }
    });
});