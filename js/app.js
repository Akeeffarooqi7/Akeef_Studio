/* =============================================
   Akeef Studio — Main JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Slide Carousel ----
    const slides = document.querySelectorAll('.slides .slide');
    const prevBtn = document.querySelector('.slides-nav__item--prev');
    const nextBtn = document.querySelector('.slides-nav__item--next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.opacity = i === index ? '1' : '0';
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startAutoplay() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoplay() {
        clearInterval(slideInterval);
        startAutoplay();
    }

    if (slides.length > 0) {
        showSlide(0);
        startAutoplay();

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetAutoplay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetAutoplay();
            });
        }
    }

    // ---- Scroll-based text animations ----
    const animElements = document.querySelectorAll('.text-anim, .service-block');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });

        // Don't hide the hero on load
        const hero = document.querySelector('.hero.text-anim');
        if (hero) {
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }
    }

    // ---- Page transition ----
    const transitionEl = document.querySelector('.page-transition');
    if (transitionEl) {
        // On page load, slide the overlay down and out
        transitionEl.style.transform = 'translateY(0)';
        transitionEl.style.transition = 'none';
        transitionEl.classList.add('active');
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                transitionEl.style.transition = 'transform 0.9s cubic-bezier(0.65, 0, 0.35, 1)';
                transitionEl.style.transform = 'translateY(100%)';
                setTimeout(() => {
                    transitionEl.classList.remove('active');
                    transitionEl.style.transition = 'none';
                    transitionEl.style.transform = 'translateY(-100%)';
                }, 950);
            });
        });

        // Intercept nav link clicks
        document.addEventListener('click', function (e) {
            const link = e.target.closest('a[href]');
            if (!link) return;
            const href = link.getAttribute('href');
            // Skip anchors, external links, mailto, tel
            if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || link.target === '_blank') return;
            // Skip if same page
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            if (href === currentPage) return;

            e.preventDefault();
            transitionEl.style.transition = 'transform 0.9s cubic-bezier(0.65, 0, 0.35, 1)';
            transitionEl.style.transform = 'translateY(0)';
            transitionEl.classList.add('active');
            setTimeout(() => {
                window.location.href = href;
            }, 900);
        });
    }

    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ---- Active nav highlight on scroll ----
    const sections = document.querySelectorAll('#work, #contact');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current) {
                link.classList.add('active');
            }
        });
    });

});
