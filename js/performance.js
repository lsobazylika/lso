/* ==========================================================================
   1. INICJALIZACJA I REFERENCJE DO DOM
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
const images = document.querySelectorAll('img[loading="lazy"]');
images.forEach(img => {
img.style.opacity = "0";
img.onload = () => {
img.style.opacity = "1";
        };
    });
});