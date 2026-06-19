/* ==========================================================================
   1. INICJALIZACJA I REFERENCJE DO DOM
   ========================================================================== */
const ministranci = [
    { name: "Dawid Czyżyk", points: 215 },
    { name: "Filip Fejkiel", points: 268 },
    { name: "Mikołaj Gniady", points: 267 },
    { name: "Marcel Jajko", points: 125 },
    { name: "Dominik Kożuch", points: 424 },
    { name: "Franciszek Łabuda", points: 360 },
    { name: "Jan Łabuda", points: 256 },
    { name: "Julian Łabuda", points: 239 },
    { name: "Ignacy Markowicz", points: 107 },
    { name: "Karol Ornatowski", points: 344 },
    { name: "Tadeusz Przybycień", points: 275 },
    { name: "Mateusz Sieradzki", points: 396 },
    { name: "Bartosz Szura", points: 170 },
    { name: "Grzegorz Wojtas", points: 168 },
    { name: "Gabriel Bogdan", points: -31 },
    { name: "Grzegorz Bogdan", points: 55 },
    { name: "Paweł Homa", points: -82 },
    { name: "Kacper Kania", points: -10 },
    { name: "Mateusz Kozioł", points: -102 },
    { name: "Adam Mituś", points: -59 },
    { name: "Bartosz Sieradzki", points: 263 },
    { name: "Michał Ślęzak", points: 46 },
    { name: "Jakub Zastępa", points: 50 },
    { name: "Mateusz Machowski", points: 107 },
];
const tableBody = document.getElementById("table-body");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
/* ==========================================================================
   2. FUNKCJE POMOCNICZE
   ========================================================================== */
function getLastName(fullName) {
    const parts = fullName.trim().split(" ");
    return parts[parts.length - 1];
}
/* ==========================================================================
   3. LOGIKA RENDEROWANIA I SORTOWANIA TABELI
   ========================================================================== */
function renderTable() {
    const searchValue = searchInput.value.toLowerCase();
    const sortValue = sortSelect.value;
    let filtered = ministranci
        .filter(m => m.name.toLowerCase().includes(searchValue))
        .sort((a, b) => {
            const lastA = getLastName(a.name);
            const lastB = getLastName(b.name);
            const lastCompare = lastA.localeCompare(lastB, "pl");
            if (lastCompare !== 0) return lastCompare;
            return a.name.localeCompare(b.name, "pl");
        });
    if (sortValue === "points-asc") {
        filtered.sort((a, b) => a.points - b.points);
    } else if (sortValue === "points-desc") {
        filtered.sort((a, b) => b.points - a.points);
    }
    tableBody.innerHTML = "";
    filtered.forEach(m => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${m.name}</td>
            <td>${m.points}</td>
        `;
        tableBody.appendChild(row);
    });
}
/* ==========================================================================
   4. EVENT LISTENERY I INICJALIZACJA
   ========================================================================== */
searchInput.addEventListener("input", renderTable);
sortSelect.addEventListener("change", renderTable);
renderTable();
document.addEventListener("DOMContentLoaded", () => {
    const search = document.getElementById('search');
    const table = document.querySelector('table tbody');
    if (!search || !table) return;
    search.addEventListener('input', (e) => {
        const text = e.target.value.toLowerCase();
        const rows = table.querySelectorAll('tr');
        rows.forEach(row => {
            const name = row.cells[0].innerText.toLowerCase();
            row.style.display = name.includes(text) ? '' : 'none';
        });
    });
});