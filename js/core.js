/*  ==========================================
    1. OPTYMALIZACJA WYDAJNOŚCI SCROLLOWANIA
    ==========================================  */
{
    let lastScrollY = window.scrollY;
    let ticking = false;
    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(() => {
            ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}
/*  ==========================================
    2. INICJALIZACJA INTERFEJSU (DOM READY)
    ========================================== */
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll('section, .event, #right-column section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });
    sections.forEach(s => {
        s.style.opacity = "0";
        s.style.transform = "translateY(30px)";
        s.style.transition = "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
        observer.observe(s);
    });
    const burger = document.getElementById('burger');
    const menu = document.querySelector('.menu');
    if (burger) {
        burger.addEventListener('click', () => {
            menu.classList.toggle('active');
            burger.classList.toggle('fa-bars');
            burger.classList.toggle('fa-xmark');
        });
    }
    const logo = document.querySelector('.header-left img');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            logo.style.height = "80px";
            logo.style.top = "15px";
        } else {
            logo.style.height = "130px";
            logo.style.top = "30px";
        }
    }, { passive: true });
});