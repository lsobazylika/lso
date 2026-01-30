const items = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentIndex = 0;
let images = [];

function refreshImages() {
    images = Array.from(document.querySelectorAll(".gallery-item img"));
}

refreshImages();

items.forEach((item, index) => {
    item.addEventListener("click", () => {
        refreshImages();
        const img = item.querySelector("img");
        currentIndex = images.indexOf(img);
        openLightbox();
    });
});

function openLightbox() {
    lightbox.style.display = "flex";
    updateImage();
}

function closeLightbox() {
    lightbox.style.display = "none";
}

function updateImage() {
    lightboxImg.src = images[currentIndex].src;
}

nextBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
};

prevBtn.onclick = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
};

closeBtn.onclick = closeLightbox;

lightbox.onclick = (e) => {
    if (e.target === lightbox) closeLightbox();
};

document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") nextBtn.onclick();
        if (e.key === "ArrowLeft") prevBtn.onclick();
    }
});
