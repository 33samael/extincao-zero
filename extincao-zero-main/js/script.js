const themeButton = document.getElementById("theme-button");

themeButton.addEventListener("click", () => {

    document.body.classList.toggle("light-theme");

});

const problemSection = document.querySelector(".problem-section");

const problemObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                problemObserver.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.2
    }
);

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navActions = document.querySelector(".nav-actions");
const navContainer = document.querySelector(".nav-container");

const mobileQuery = window.matchMedia("(max-width: 700px)");

function organizarMenu() {

    if (mobileQuery.matches) {
        // Coloca os botões dentro do menu mobile
        navMenu.appendChild(navActions);

    } else {
        // Devolve os botões para o lado direito no desktop
        navContainer.appendChild(navActions);
    }
}

organizarMenu();

mobileQuery.addEventListener("change", organizarMenu);


menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    if (navMenu.classList.contains("active")) {

        icon.classList.remove("bi-list");
        icon.classList.add("bi-x");

    } else {

        icon.classList.remove("bi-x");
        icon.classList.add("bi-list");

    }

});

/* ========================================
   CARROSSEL DE ESPÉCIES
======================================== */

const slides = document.querySelectorAll(".field-slide");
const dots = document.querySelectorAll(".carousel-dot");

const nextButton = document.getElementById("carousel-next");
const prevButton = document.getElementById("carousel-prev");
const pauseButton = document.getElementById("carousel-pause");

let currentSlide = 0;
let carouselInterval;
let isPaused = false;


function showSlide(index) {

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    dots.forEach(dot => {
        dot.classList.remove("active");
    });

    slides[index].classList.add("active");
    dots[index].classList.add("active");

    currentSlide = index;
}


function nextSlide() {

    let next = currentSlide + 1;

    if (next >= slides.length) {
        next = 0;
    }

    showSlide(next);
}


function previousSlide() {

    let previous = currentSlide - 1;

    if (previous < 0) {
        previous = slides.length - 1;
    }

    showSlide(previous);
}


function startCarousel() {

    clearInterval(carouselInterval);

    carouselInterval = setInterval(() => {

        if (!isPaused) {
            nextSlide();
        }

    }, 6000);
}


nextButton.addEventListener("click", () => {
    nextSlide();
    startCarousel();
});


prevButton.addEventListener("click", () => {
    previousSlide();
    startCarousel();
});


dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {
        showSlide(index);
        startCarousel();
    });

});


pauseButton.addEventListener("click", () => {

    isPaused = !isPaused;

    const icon = pauseButton.querySelector("i");

    if (isPaused) {
        icon.classList.remove("bi-pause");
        icon.classList.add("bi-play");
    } else {
        icon.classList.remove("bi-play");
        icon.classList.add("bi-pause");
    }

});


showSlide(0);
startCarousel();