const ministranci = [ 
    { name: "Dawid Czyżyk", points: 181 },
    { name: "Filip Fejkiel", points: 229 },
    { name: "Mikołaj Gniady", points: 231 },
    { name: "Marcel Jajko", points: 120 },
    { name: "Dominik Kożuch", points: 364 },
    { name: "Franciszek Łabuda", points: 313 },
    { name: "Jan Łabuda", points: 239 },
    { name: "Julian Łabuda", points: 215 },
    { name: "Ignacy Markowicz", points: 99 },
    { name: "Karol Ornatowski", points: 239 },
    { name: "Tadeusz Przybycień", points: 232 },
    { name: "Mateusz Sieradzki", points: 324 },
    { name: "Bartosz Szura", points: 146 },
    { name: "Grzegorz Wojtas", points: 166 },
    { name: "Gabriel Bogdan", points: -13 },
    { name: "Grzegorz Bogdan", points: 62 },
    { name: "Paweł Homa", points: -58 },
    { name: "Jakub Jakiński", points: -124 },
    { name: "Kacper Kania", points: -2 },
    { name: "Konrad Kosiba", points: -41 },
    { name: "Mateusz Kozioł", points: -83 },
    { name: "Adam Mituś", points: -35 },
    { name: "Kajetan Musiał", points: -34 },
    { name: "Wojciech Podwika", points: -42 },
    { name: "Karol Rąpała", points: -100 },
    { name: "Bartosz Sieradzki", points: 224 },
    { name: "Michał Ślęzak", points: 40 },
    { name: "Jakub Zastępa", points: 45 },
    { name: "Mateusz Machowski", points: 90 },
];

// ===== ELEMENTY DOM =====
const tableBody = document.getElementById("table-body");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");

// ===== FUNKCJE POMOCNICZE =====
function getLastName(fullName) {
    const parts = fullName.trim().split(" ");
    return parts[parts.length - 1];
}

// ===== RENDER TABELI =====
function renderTable() {
    const searchValue = searchInput.value.toLowerCase();
    const sortValue = sortSelect.value;

    let filtered = ministranci
        .filter(m => m.name.toLowerCase().includes(searchValue))
        // 🔹 GŁÓWNE SORTOWANIE – PO NAZWISKU
        .sort((a, b) => {
            const lastA = getLastName(a.name);
            const lastB = getLastName(b.name);

            const lastCompare = lastA.localeCompare(lastB, "pl");
            if (lastCompare !== 0) return lastCompare;

            // jeśli nazwisko takie samo → sortuj po imieniu/nazwie całości
            return a.name.localeCompare(b.name, "pl");
        });

    // 🔹 DODATKOWE SORTOWANIE
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

// ===== EVENTY =====
searchInput.addEventListener("input", renderTable);
sortSelect.addEventListener("change", renderTable);

// ===== START =====
renderTable();
