document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const themeToggle = document.querySelector('.theme-toggle');
    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section, .hero-content');
    const progressBar = document.getElementById('progressBar');

    const setTheme = (theme) => {
        document.body.classList.toggle('light-theme', theme === 'light');
        document.body.classList.toggle('dark-theme', theme === 'dark');
        if (themeToggle) themeToggle.textContent = theme === 'light' ? '☀️' : '🌙';
        localStorage.setItem('theme', theme);
    };

    const preferredTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    setTheme(preferredTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const nextTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
            setTheme(nextTheme);
        });
    }

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('open');
        });
    }

    if (nav) {
        nav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
            });
        });
    }

    const revealOnScroll = () => {
        window.requestAnimationFrame(() => {
            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight - 100) {
                    section.classList.add('active');
                }
            });

            if (header) {
                if (window.scrollY > 30) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
        });
    };

    const updateProgress = () => {
        if (!progressBar) return;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const percent = Math.min((scrollTop / Math.max(scrollHeight - clientHeight, 1)) * 100, 100);
        progressBar.style.width = `${percent}%`;
    };

    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', revealOnScroll);

    if (loader) {
        setTimeout(() => {
            loader.classList.add('hide');
        }, 650);
    }

    setTimeout(() => {
        revealOnScroll();
        updateProgress();
    }, 750);
});