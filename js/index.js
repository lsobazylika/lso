/* ==========================================================================
   1. OPTYMALIZACJA WYDAJNOŚCI SCROLLOWANIA
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const events = document.querySelectorAll(".event");
    const eventsPerPage = 5;
    let currentPage = 1;
    const totalPages = Math.ceil(events.length / eventsPerPage);
/* ==========================================================================
    2. INICJALIZACJA ELEMENTÓW UI
    ========================================================================== */
    const prevBtn = document.getElementById("prevPage");
    const nextBtn = document.getElementById("nextPage");
    const pageInfo = document.getElementById("pageInfo");
/* ==========================================================================
    3. LOGIKA STRONNICOWANIA
    ========================================================================== */
    function showPage(page) {
        events.forEach((event, index) => {
            event.style.display =
                index >= (page - 1) * eventsPerPage &&
                index < page * eventsPerPage
                    ? "block"
                    : "none";
        });
        pageInfo.textContent = `Strona ${page} z ${totalPages}`;
        prevBtn.disabled = page === 1;
        nextBtn.disabled = page === totalPages;
    }
/* ==========================================================================
    4. OBSŁUGA ZDARZEŃ PRZYCISKÓW
    ========================================================================== */
    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });
    nextBtn.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    });
/* ==========================================================================
    5. INICJALIZACJA WIDOKU STARTOWEGO
    ========================================================================== */
    showPage(currentPage);
});