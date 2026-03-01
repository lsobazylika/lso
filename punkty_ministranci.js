const ministranci = [
    { name: "Hubert Fejkiel", points: 33 },
    { name: "Jan Fejkiel", points: 45 },
    { name: "Aleksander Filipek", points: 173 },
    { name: "Antoni Gniady", points: 52 },
    { name: "Julian Gniady", points: 50 },
    { name: "Kacper Gwóźdź", points: -12 },
    { name: "Paweł Janusz", points: 10 },
    { name: "Kacper Kandler", points: 61 },
    { name: "Sebastian Kmiecik", points: 0 },
    { name: "Karol Kuliński", points: 80 },
    { name: "Karol Mrozek", points: 28 },
    { name: "Nikodem Obrzut", points: 1 },
    { name: "Miłosz Smoła", points: 45 },
    { name: "Antoni Szary", points: 56 },
    { name: "Antoni Ślusarz", points: 46 },
    { name: "Antoni Tajak", points: 53 },
    { name: "Jakub Filuś", points: -47 },
    { name: "Gabriel Wojna", points: 17 }
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


