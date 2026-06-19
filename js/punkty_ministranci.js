/* ==========================================================================
   1. INICJALIZACJA I REFERENCJE DO DOM
   ========================================================================== */
const ministranci = [
    { name: "Hubert Fejkiel", points: 187 },
    { name: "Jan Fejkiel", points: 204 },
    { name: "Aleksander Filipek", points: 510 },
    { name: "Antoni Gniady", points: 234 },
    { name: "Julian Gniady", points: 224 },
    { name: "Kacper Gwóźdź", points: 42 },
    { name: "Paweł Janusz", points: 83 },
    { name: "Kacper Kandler", points: 199 },
    { name: "Sebastian Kmiecik", points: 93 },
    { name: "Karol Kuliński", points: 205 },
    { name: "Karol Mrozek", points: 96 },
    { name: "Nikodem Obrzut", points: 95 },
    { name: "Miłosz Smoła", points: 125 },
    { name: "Antoni Szary", points: 132 },
    { name: "Antoni Śluzarz", points: 135 },
    { name: "Antoni Tajak", points: 221 },
    { name: "Gabriel Wojna", points: 122 }
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