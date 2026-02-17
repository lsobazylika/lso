const ministranci = [
    { name: "Hubert Fejkiel", points: 20 },
    { name: "Jan Fejkiel", points: 29 },
    { name: "Aleksander Filipek", points: 115 },
    { name: "Antoni Gniady", points: 35 },
    { name: "Julian Gniady", points: 30 },
    { name: "Kacper Gwóźdź", points: 10 },
    { name: "Paweł Janusz", points: 17 },
    { name: "Kacper Kandler", points: 38 },
    { name: "Sebastian Kmiecik", points: 5 },
    { name: "Karol Kuliński", points: 50 },
    { name: "Karol Mrozek", points: 21 },
    { name: "Nikodem Obrzut", points: 10 },
    { name: "Miłosz Smoła", points: 33 },
    { name: "Antoni Szary", points: 34 },
    { name: "Antoni Ślusarz", points: 31 },
    { name: "Antoni Tajak", points: 28 },
    { name: "Jakub Filuś", points: -33 },
    { name: "Gabriel Wojna", points: 14 }
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

