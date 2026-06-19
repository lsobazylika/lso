/* ==========================================================================
   1. OPTYMALIZACJA WYDAJNOŚCI SCROLLOWANIA
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const imgs = Array.from(document.querySelectorAll('.gallery-item img'));
    let idx = 0;
    if (!lb) return;
    const update = () => { lbImg.src = imgs[idx].src; };
    imgs.forEach((img, i) => {
        img.addEventListener('click', () => {
            idx = i;
            update();
            lb.classList.add('active');
            document.body.classList.add('no-scroll');
        });
    });
    document.querySelector('.next').onclick = (e) => { e.stopPropagation(); idx = (idx + 1) % imgs.length; update(); };
    document.querySelector('.prev').onclick = (e) => { e.stopPropagation(); idx = (idx - 1 + imgs.length) % imgs.length; update(); };
    document.querySelector('.close').onclick = () => { lb.classList.remove('active'); document.body.classList.remove('no-scroll'); };
    lb.onclick = (e) => { if(e.target === lb) document.querySelector('.close').click(); };
});