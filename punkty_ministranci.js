const ministranci = [
    { name: "Hubert Fejkiel", points: 19 },
    { name: "Jan Fejkiel", points: 18 },
    { name: "Aleksander Filipek", points: 73 },
    { name: "Antoni Gniady", points: 12 },
    { name: "Julian Gniady", points: 10 },
    { name: "Kacper Gwóźdź", points: 7 },
    { name: "Paweł Janusz", points: 11 },
    { name: "Kacper Kandler", points: 23 },
    { name: "Sebastian Kmiecik", points: 8 },
    { name: "Karol Kuliński", points: 25 },
    { name: "Karol Mrozek", points: 20 },
    { name: "Nikodem Obrzut", points: 6 },
    { name: "Miłosz Smoła", points: 27 },
    { name: "Antoni Szary", points: 18 },
    { name: "Antoni Śluzarz", points: 17 },
    { name: "Antoni Tajak", points: 24 },
    { name: "Jakub Filuś", points: -9 },
    { name: "Gabriel Wojna", points: 4 }
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
