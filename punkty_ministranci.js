const ministranci = [
    { name: "Hubert Fejkiel", points: 121 },
    { name: "Jan Fejkiel", points: 152 },
    { name: "Aleksander Filipek", points: 346 },
    { name: "Antoni Gniady", points: 180 },
    { name: "Julian Gniady", points: 182 },
    { name: "Kacper Gwóźdź", points: 12 },
    { name: "Paweł Janusz", points: 45 },
    { name: "Kacper Kandler", points: 166 },
    { name: "Sebastian Kmiecik", points: 83 },
    { name: "Karol Kuliński", points: 158 },
    { name: "Karol Mrozek", points: 106 },
    { name: "Nikodem Obrzut", points: 50 },
    { name: "Miłosz Smoła", points: 84 },
    { name: "Antoni Szary", points: 91 },
    { name: "Antoni Ślusarz", points: 106 },
    { name: "Antoni Tajak", points: 179 },
    { name: "Jakub Filuś", points: -47 },
    { name: "Gabriel Wojna", points: 88 }
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


