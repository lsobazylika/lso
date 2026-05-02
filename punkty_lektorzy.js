const ministranci = [
    { name: "Dawid Czyżyk", points: 56 },
    { name: "Filip Fejkiel", points: 67 },
    { name: "Mikołaj Gniady", points: 49 },
    { name: "Marcel Jajko", points: 37 },
    { name: "Dominik Kożuch", points: 81 },
    { name: "Franciszek Łabuda", points: 64 },
    { name: "Jan Łabuda", points: 65 },
    { name: "Julian Łabuda", points: 36 },
    { name: "Ignacy Markowicz", points: 7 },
    { name: "Karol Ornatowski", points: 79 },
    { name: "Tadeusz Przybycień", points: 62 },
    { name: "Mateusz Sieradzki", points: 89 },
    { name: "Bartosz Szura", points: 27 },
    { name: "Grzegorz Wojtas", points: 35 },
    { name: "Gabriel Bogdan", points: -12 },
    { name: "Grzegorz Bogdan", points: 10 },
    { name: "Paweł Homa", points: -38 },
    { name: "Jakub Jakiński", points: -45 },
    { name: "Kacper Kania", points: -22 },
    { name: "Konrad Kosiba", points: -38 },
    { name: "Mateusz Kozioł", points: -43 },
    { name: "Adam Mituś", points: -8 },
    { name: "Kajetan Musiał", points: -14 },
    { name: "Wojciech Podwika", points: -23 },
    { name: "Karol Rąpała", points: -43 },
    { name: "Bartosz Sieradzki", points: 71 },
    { name: "Michał Ślęzak", points: 15 },
    { name: "Jakub Zastępa", points: 10 },
    { name: "Mateusz Machowski", points: 32 },
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
