document.addEventListener("DOMContentLoaded", () => {
    const okresTel = document.getElementById("okres_liturgiczny_tel").querySelector("p");
    const okresPc = document.getElementById("okres_liturgiczny_pc").querySelector("p");

    function policzWielkanoc(rok) {
        const a = rok % 19;
        const b = Math.floor(rok / 100);
        const c = rok % 100;
        const d = Math.floor(b / 4);
        const e = b % 4;
        const f = Math.floor((b + 8) / 25);
        const g = Math.floor((b - f + 1) / 3);
        const h = (19 * a + b - d - g + 15) % 30;
        const i = Math.floor(c / 4);
        const k = c % 4;
        const l = (32 + 2 * e + 2 * i - h - k) % 7;
        const m = Math.floor((a + 11 * h + 22 * l) / 451);
        const miesiac = Math.floor((h + l - 7 * m + 114) / 31) - 1;
        const dzien = ((h + l - 7 * m + 114) % 31) + 1;
        return new Date(rok, miesiac, dzien);
    }

    function policzPierwszaNiedzieleAdwentu(rok) {
        const bozeNarodzenie = new Date(rok, 11, 25);
        const dzienTygodnia = bozeNarodzenie.getDay();
        const przesuniecie = ((dzienTygodnia + 6) % 7) + 21;
        const pierwszaNiedziela = new Date(bozeNarodzenie);
        pierwszaNiedziela.setDate(bozeNarodzenie.getDate() - przesuniecie);
        return pierwszaNiedziela;
    }

    function pobierzAktualnyOkresLiturgiczny() {
        const dzisiaj = new Date();
        const rok = dzisiaj.getFullYear();

        const wielkanoc = policzWielkanoc(rok);
        const popielec = new Date(wielkanoc);
        popielec.setDate(wielkanoc.getDate() - 46);

        const pentekost = new Date(wielkanoc);
        pentekost.setDate(wielkanoc.getDate() + 49);

        const triduumStart = new Date(wielkanoc);
        triduumStart.setDate(wielkanoc.getDate() - 3);

        const adwent = policzPierwszaNiedzieleAdwentu(rok);
        const bozeNarodzenieStart = new Date(rok, 11, 24);
        const bozeNarodzenieKoniec = new Date(rok + 1, 0, 6);

        const okresZwykly1Start = new Date(rok, 0, 6);
        const okresZwykly1End = new Date(popielec);
        okresZwykly1End.setDate(popielec.getDate() - 1);

        const okresZwykly2Start = new Date(pentekost);
        okresZwykly2Start.setDate(pentekost.getDate() + 1);
        const okresZwykly2End = new Date(adwent);
        okresZwykly2End.setDate(adwent.getDate() - 1);

        if (dzisiaj >= adwent && dzisiaj < bozeNarodzenieStart) return "Adwent";
        if (dzisiaj >= bozeNarodzenieStart && dzisiaj < bozeNarodzenieKoniec) return "Okres Bożego Narodzenia";
        if (dzisiaj >= okresZwykly1Start && dzisiaj <= okresZwykly1End) return "Okres Zwykły I";
        if (dzisiaj >= popielec && dzisiaj < triduumStart) return "Wielki Post";
        if (dzisiaj >= triduumStart && dzisiaj < wielkanoc) return "Triduum Paschalne";
        if (dzisiaj >= wielkanoc && dzisiaj <= pentekost) return "Okres Wielkanocny";
        if (dzisiaj >= okresZwykly2Start && dzisiaj <= okresZwykly2End) return "Okres Zwykły II";

        return "Okres Zwykły";
    }

    function aktualizujOkresLiturgiczny() {
        const tekst = pobierzAktualnyOkresLiturgiczny();
        let kolor = "#008000";

        if (tekst === "Adwent" || tekst === "Wielki Post") kolor = "#6a0dad";
        else if (tekst === "Okres Bożego Narodzenia" || tekst === "Okres Wielkanocny") kolor = "#b89e14";
        else if (tekst === "Triduum Paschalne") kolor = "#ff0000";
        else kolor = "#008000";

        const html = `<b style="color:${kolor};">${tekst}</b>`;
        okresTel.innerHTML = html;
        okresPc.innerHTML = html;
    }

    aktualizujOkresLiturgiczny();
    setInterval(aktualizujOkresLiturgiczny, 1000 * 60 * 60);
});