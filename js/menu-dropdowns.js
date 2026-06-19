/* ==========================================================================
   1. OPTYMALIZACJA WYDAJNOŚCI SCROLLOWANIA
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const dropdowns = document.querySelectorAll('.dropnown');
/* ==========================================================================
    2. OBSŁUGA KLIKNIĘCIA W DROPDOWN
    ========================================================================== */
    dropdowns.forEach(drop => {
        const link = drop.querySelector('a');
        link.addEventListener('click', (e) => {
            if (window.innerWidth < 1000) {
                const isOpen = drop.classList.contains('open');
                dropdowns.forEach(d => d.classList.remove('open'));
                if (!isOpen) {
                    e.preventDefault();
                    drop.classList.add('open');
                } else {
                    drop.classList.remove('open');
                }
            }
        });
    });
/* ==========================================================================
    3. ZAMYKANIE DROPDOWN PO KLIKNIĘCIU POZA ELEMENTEM
    ========================================================================== */
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropnown')) {
            dropdowns.forEach(d => d.classList.remove('open'));
        }
    });
});