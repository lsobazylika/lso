document.addEventListener("DOMContentLoaded", () => {
    const events = document.querySelectorAll(".event");
    const eventsPerPage = 5;
    let currentPage = 1;
    const totalPages = Math.ceil(events.length / eventsPerPage);

    const prevBtn = document.getElementById("prevPage");
    const nextBtn = document.getElementById("nextPage");
    const pageInfo = document.getElementById("pageInfo");

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

    showPage(currentPage);
});