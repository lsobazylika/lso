document.addEventListener("DOMContentLoaded", () => {
    const burger = document.getElementById("burger");
    const menu = document.querySelector(".menu");

    if (!burger || !menu) return;

    burger.addEventListener("click", () => {
        menu.classList.toggle("active");
    });
});
