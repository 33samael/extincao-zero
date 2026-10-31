const sharedNavbarMarkup = `
    <div class="nav-container">
        <a href="index.html" class="logo"><img src="assets/img/logo.svg" alt="Extinção Zero"></a>
        <nav class="nav-menu" id="primary-navigation" aria-label="Navegação principal">
            <a href="index.html" class="nav-link">Início</a>
            <a href="app.html" class="nav-link">O App</a>
            <div class="nav-explore">
                <button class="nav-link nav-dropdown" type="button" aria-expanded="false" aria-controls="explore-menu">Explorar <i class="bi bi-chevron-down"></i></button>
                <div class="nav-submenu" id="explore-menu">
                    <a class="nav-link" href="dashboard.html"><i class="bi bi-bar-chart-line"></i> Dashboard</a>
                    <a class="nav-link" href="biomas.html"><i class="bi bi-tree"></i> Biomas</a>
                    <a class="nav-link" href="mostruario.html"><i class="bi bi-journal-richtext"></i> Mostruário</a>
                </div>
            </div>
            <a href="preservar.html" class="nav-link">Preservar</a>
            <a href="loja.html" class="nav-link">Loja</a>
            <div class="nav-actions">
                <a class="nav-action cart-trigger" id="openCart" href="loja.html#cart" aria-label="Abrir carrinho na loja"><i class="bi bi-cart"></i><span class="cart-count" id="cartCount" data-cart-count>0</span></a>
                <button class="nav-button" id="theme-button" type="button" aria-label="Alterar tema"><i class="bi bi-sun"></i></button>
            </div>
        </nav>
        <button class="menu-toggle" id="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="primary-navigation"><i class="bi bi-list"></i></button>
    </div>
`;

const sharedFooterMarkup = `
    <div class="footer-container">
        <div class="footer-brand">
            <div class="footer-logo"><a href="index.html" class="logo"><img src="assets/img/logo.svg" alt="Extinção Zero"></a></div>
            <p>Projeto acadêmico da Fatec Carapicuíba.<br>Conhecer é o primeiro passo para preservar.</p>
        </div>
        <div class="footer-navigation">
            <h4>NAVEGAÇÃO</h4>
            <div class="footer-links">
                <div><a href="index.html">Início</a><a href="app.html">O App</a><a href="dashboard.html">Dashboard</a><a href="biomas.html">Biomas</a></div>
                <div><a href="mostruario.html">Mostruário</a><a href="preservar.html">Preservar</a><a href="loja.html">Loja</a></div>
            </div>
        </div>
        <div class="footer-sources">
            <h4>FONTES DE DADOS</h4>
            <p>ICMBio/MMA · IUCN Red List · IBGE · INPE/PRODES · MapBiomas</p>
        </div>
    </div>
    <div class="footer-bottom">
        <p>© 2026 Extinção Zero — Fatec Carapicuíba. Projeto educativo sem fins lucrativos.</p>
        <p>Dados com finalidade educativa. Consulte as fontes originais.</p>
    </div>
`;

document.querySelectorAll("header.navbar").forEach(header => {
    header.innerHTML = sharedNavbarMarkup;
});

document.querySelectorAll("footer.site-footer").forEach(footer => {
    footer.innerHTML = sharedFooterMarkup;
});

const screenIndicator = document.createElement("div");
screenIndicator.className = "screen-indicator";
screenIndicator.textContent = "Modo atual:";
screenIndicator.setAttribute("aria-hidden", "true");
document.body.append(screenIndicator);

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

const currentPage = window.location.pathname.split("/").pop() || "index.html";
const SHARED_CART_STORAGE_KEY = "extincao-cart";
const pageLabels = {
    "app.html": "O App",
    "biomas.html": "Biomas",
    "dashboard.html": "Dashboard",
    "loja.html": "Loja",
    "mostruario.html": "Mostruário",
    "preservar.html": "Preservar"
};

function updateCartBadges() {
    let totalItems = 0;

    try {
        const savedCart = JSON.parse(localStorage.getItem(SHARED_CART_STORAGE_KEY) || "[]");
        if (Array.isArray(savedCart)) {
            totalItems = savedCart.reduce((total, item) => {
                const quantity = Number(item?.quantity);
                return total + (Number.isSafeInteger(quantity) && quantity > 0 ? quantity : 0);
            }, 0);
        }
    } catch {
        totalItems = 0;
    }

    document.querySelectorAll("[data-cart-count]").forEach(badge => {
        badge.textContent = totalItems;
    });
}

updateCartBadges();
window.addEventListener("storage", event => {
    if (event.key === SHARED_CART_STORAGE_KEY) updateCartBadges();
});

if (navMenu) {
    navMenu.id = "primary-navigation";
    navMenu.setAttribute("aria-label", "Navegação principal");

    navMenu.querySelectorAll("a.nav-link").forEach(link => {
        const isCurrent = new URL(link.href).pathname === window.location.pathname;
        link.classList.toggle("active", isCurrent);

        if (isCurrent) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });

    const currentSubmenuLink = navMenu.querySelector('a[aria-current="page"]');
    if (currentSubmenuLink?.closest(".nav-submenu")) {
        navMenu.querySelector(".nav-dropdown")?.classList.add("active");
    }
}

if (menuToggle) {
    menuToggle.type = "button";
    menuToggle.setAttribute("aria-controls", "primary-navigation");
}

if (currentPage !== "index.html" && pageLabels[currentPage]) {
    const breadcrumb = document.createElement("nav");
    breadcrumb.className = "site-breadcrumb";
    breadcrumb.setAttribute("aria-label", "Você está em");

    const homeLink = document.createElement("a");
    homeLink.href = "index.html";
    homeLink.textContent = "Início";
    breadcrumb.append(homeLink);

    const separator = document.createElement("span");
    separator.className = "breadcrumb-separator";
    separator.setAttribute("aria-hidden", "true");
    separator.textContent = "/";
    breadcrumb.append(separator);

    const currentLabel = document.createElement("span");
    currentLabel.textContent = pageLabels[currentPage];
    currentLabel.setAttribute("aria-current", "page");
    breadcrumb.append(currentLabel);

    document.body.classList.add("has-breadcrumb");
    document.querySelector(".navbar")?.insertAdjacentElement("afterend", breadcrumb);
}

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

    navMenu.querySelectorAll(".nav-explore").forEach(explore => {
        explore.classList.remove("open");
        explore.querySelector(".nav-dropdown")?.setAttribute("aria-expanded", "false");
    });
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

    navMenu.querySelectorAll("a.nav-link, a.cart-trigger").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    const exploreMenus = [...navMenu.querySelectorAll(".nav-explore")];
    exploreMenus.forEach(explore => {
        const button = explore.querySelector(".nav-dropdown");
        if (!button) return;

        button.addEventListener("click", event => {
            event.stopPropagation();
            const isOpen = explore.classList.toggle("open");
            button.setAttribute("aria-expanded", String(isOpen));
        });
    });

    document.addEventListener("click", event => {
        exploreMenus.forEach(explore => {
            if (!explore.contains(event.target)) {
                explore.classList.remove("open");
                explore.querySelector(".nav-dropdown")?.setAttribute("aria-expanded", "false");
            }
        });

        if (
            navMenu.classList.contains("active") &&
            !navMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key !== "Escape") return;

        exploreMenus.forEach(explore => {
            explore.classList.remove("open");
            explore.querySelector(".nav-dropdown")?.setAttribute("aria-expanded", "false");
        });

        if (navMenu.classList.contains("active")) closeMenu();
    });
}