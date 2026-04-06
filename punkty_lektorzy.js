const ministranci = [
    { name: "Dawid Czyżyk", points: 169 },
    { name: "Filip Fejkiel", points: 198 },
    { name: "Mikołaj Gniady", points: 207 },
    { name: "Marcel Jajko", points: 122 },
    { name: "Dominik Kożuch", points: 320 },
    { name: "Franciszek Łabuda", points: 267 },
    { name: "Jan Łabuda", points: 208 },
    { name: "Julian Łabuda", points: 177 },
    { name: "Ignacy Markowicz", points: 102 },
    { name: "Karol Ornatowski", points: 257 },
    { name: "Tadeusz Przybycień", points: 197 },
    { name: "Mateusz Sieradzki", points: 265 },
    { name: "Bartosz Szura", points: 135 },
    { name: "Grzegorz Wojtas", points: 152 },
    { name: "Gabriel Bogdan", points: 1 },
    { name: "Grzegorz Bogdan", points: 70 },
    { name: "Paweł Homa", points: -58 },
    { name: "Jakub Jakiński", points: -97 },
    { name: "Kacper Kania", points: 21 },
    { name: "Konrad Kosiba", points: -36 },
    { name: "Mateusz Kozioł", points: -54 },
    { name: "Adam Mituś", points: -16 },
    { name: "Kajetan Musiał", points: -5 },
    { name: "Wojciech Podwika", points: -13 },
    { name: "Karol Rąpała", points: -85 },
    { name: "Bartosz Sieradzki", points: 196 },
    { name: "Michał Ślęzak", points: 45 },
    { name: "Jakub Zastępa", points: 40 },
    { name: "Mateusz Machowski", points: 85 },
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

