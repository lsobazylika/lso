/* ==========================================================================
   1. INICJALIZACJA I OBSŁUGA ZDARZEŃ
   ========================================================================== */
document.addEventListener("DOMContentLoaded", function () {
    loadComponent("naglowek.html", "header-placeholder", "nagłówka");
    loadComponent("stopka.html", "footer-placeholder", "stopki");
});
/* ==========================================================================
   2. FUNKCJE POMOCNICZE DO ŁADOWANIA KOMPONENTÓW
   ========================================================================== */
/**
 * @param {string} url
 * @param {string} elementId
 * @param {string} componentName
 */
function loadComponent(url, elementId, componentName) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Nie udało się załadować ${componentName}.`);
            }
            return response.text();
        })
        .then(data => {
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = data;
            }
        })
        .catch(error => console.error(`Błąd ${componentName}:`, error));
}