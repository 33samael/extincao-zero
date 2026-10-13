const themeButtons = document.querySelectorAll(
    '#theme-button, #mobile-theme-button'
);

function updateThemeButtons() {
    const isLight = document.body.classList.contains("light-theme");
    const iconClass = isLight ? "bi-moon" : "bi-sun";

    themeButtons.forEach(button => {
        const icon = button.querySelector("i");
        if (icon) icon.className = `bi ${iconClass}`;
    });
}

if (localStorage.getItem("extincao-theme") === "light") {
    document.body.classList.add("light-theme");
}

updateThemeButtons();

themeButtons.forEach(button => {
    button.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");

        localStorage.setItem(
            "extincao-theme",
            document.body.classList.contains("light-theme") ? "light" : "dark"
        );

        updateThemeButtons();
    });
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
        const targetId = link.getAttribute("href");
        const target = targetId !== "#"
            ? document.querySelector(targetId)
            : null;

        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navActions = document.querySelector(".nav-actions");
const navContainer = document.querySelector(".nav-container");
const mobileQuery = window.matchMedia("(max-width: 800px)");
const hasSeparateMobileActions = Boolean(
    document.querySelector(".mobile-nav-actions")
);

function organizeMenuActions() {
    if (
        !menuToggle ||
        !navMenu ||
        !navActions ||
        !navContainer ||
        hasSeparateMobileActions
    ) {
        return;
    }

    if (mobileQuery.matches) {
        navMenu.appendChild(navActions);
    } else {
        navContainer.appendChild(navActions);
    }
}

function closeMenu() {
    if (!menuToggle || !navMenu) return;

    navMenu.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");

    const icon = menuToggle.querySelector("i");
    if (icon) icon.className = "bi bi-list";
}

organizeMenuActions();
mobileQuery.addEventListener("change", organizeMenuActions);

if (menuToggle && navMenu) {
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", event => {
        event.stopPropagation();

        const isOpen = navMenu.classList.toggle("active");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");

        const icon = menuToggle.querySelector("i");
        if (icon) icon.className = isOpen ? "bi bi-x-lg" : "bi bi-list";
    });

    navMenu.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", event => {
        if (
            navMenu.classList.contains("active") &&
            !navMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMenu();
        }
    });
}