const ministranci = [
    { name: "Dawid Czyżyk", points: 37 },
    { name: "Filip Fejkiel", points: 51 },
    { name: "Mikołaj Gniady", points: 27 },
    { name: "Marcel Jajko", points: 24 },
    { name: "Dominik Kożuch", points: 51 },
    { name: "Franciszek Łabuda", points: 36 },
    { name: "Jan Łabuda", points: 30 },
    { name: "Julian Łabuda", points: 19 },
    { name: "Ignacy Markowicz", points: 9 },
    { name: "Karol Ornatowski", points: 53 },
    { name: "Tadeusz Przybycień", points: 43 },
    { name: "Mateusz Sieradzki", points: 58 },
    { name: "Bartosz Szura", points: 30 },
    { name: "Grzegorz Wojtas", points: 33 },
    { name: "Gabriel Bogdan", points: -2 },
    { name: "Grzegorz Bogdan", points: 8 },
    { name: "Paweł Homa", points: -18 },
    { name: "Jakub Jakiński", points: -21 },
    { name: "Kacper Kania", points: -7 },
    { name: "Konrad Kosiba", points: -19 },
    { name: "Mateusz Kozioł", points: -19 },
    { name: "Adam Mituś", points: 7 },
    { name: "Kajetan Musiał", points: 2 },
    { name: "Wojciech Podwika", points: -11 },
    { name: "Karol Rąpała", points: -21 },
    { name: "Bartosz Sieradzki", points: 47 },
    { name: "Michał Ślęzak", points: 15 },
    { name: "Jakub Zastępa", points: 10 },
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
