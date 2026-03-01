const ministranci = [
    { name: "Dawid Czyżyk", points: 78 },
    { name: "Filip Fejkiel", points: 94 },
    { name: "Mikołaj Gniady", points: 64 },
    { name: "Marcel Jajko", points: 42 },
    { name: "Dominik Kożuch", points: 137 },
    { name: "Franciszek Łabuda", points: 107 },
    { name: "Jan Łabuda", points: 101 },
    { name: "Julian Łabuda", points: 70 },
    { name: "Ignacy Markowicz", points: 20 },
    { name: "Karol Ornatowski", points: 126 },
    { name: "Tadeusz Przybycień", points: 90 },
    { name: "Mateusz Sieradzki", points: 121 },
    { name: "Bartosz Szura", points: 38 },
    { name: "Grzegorz Wojtas", points: 46 },
    { name: "Gabriel Bogdan", points: -28 },
    { name: "Grzegorz Bogdan", points: 1 },
    { name: "Paweł Homa", points: -57 },
    { name: "Jakub Jakiński", points: -68 },
    { name: "Kacper Kania", points: -38 },
    { name: "Konrad Kosiba", points: -62 },
    { name: "Mateusz Kozioł", points: -65 },
    { name: "Adam Mituś", points: -25 },
    { name: "Kajetan Musiał", points: -32 },
    { name: "Wojciech Podwika", points: -39 },
    { name: "Karol Rąpała", points: -58 },
    { name: "Bartosz Sieradzki", points: 101 },
    { name: "Michał Ślęzak", points: 15 },
    { name: "Jakub Zastępa", points: 10 },
    { name: "Mateusz Machowski", points: 55 },
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

