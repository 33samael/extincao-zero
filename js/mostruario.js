(() => {
    "use strict";

    const species = [
        {
            key: "onca",
            common: "Onça-pintada",
            scientific: "Panthera onca",
            image: "assets/img/onca.jpg",
            biomes: "Amazônia, Cerrado, Pantanal, Caatinga e Mata Atlântica.",
            habitatShort: "Florestas, savanas e áreas alagáveis",
            national: "VU",
            nationalName: "Vulnerável",
            global: "NT · Quase ameaçada",
            iucn: "https://www.iucnredlist.org/search?query=Panthera%20onca&searchType=species",
            info: {
                habitat: "Ocupa ambientes diversos, de florestas densas a áreas úmidas e paisagens abertas com cobertura vegetal. Precisa de território amplo, água e disponibilidade de presas.",
                alimentacao: "Carnívora e oportunista: caça mamíferos, répteis e outros animais, com dieta que varia conforme a região e a disponibilidade de presas.",
                comportamento: "Em geral solitária e territorial. Costuma ser mais ativa no crepúsculo e à noite, mas seu ritmo varia conforme o ambiente e a atividade humana.",
                ameacas: "Perda e fragmentação de habitat, conflitos após ataques a animais domésticos, redução de presas, caça e atropelamentos em algumas regiões.",
                ajuda: "Proteja áreas naturais e corredores de vegetação; não alimente nem se aproxime de animais silvestres; apoie iniciativas de coexistência e conservação com base científica."
            }
        },
        {
            key: "mico",
            common: "Mico-leão-dourado",
            scientific: "Leontopithecus rosalia",
            image: "assets/img/mico.png",
            biomes: "Mata Atlântica, principalmente em remanescentes de floresta do estado do Rio de Janeiro.",
            habitatShort: "Floresta de baixada e copa das árvores",
            national: "EN",
            nationalName: "Em perigo",
            global: "EN · Em perigo",
            iucn: "https://www.iucnredlist.org/search?query=Leontopithecus%20rosalia&searchType=species",
            info: {
                habitat: "Vive na Mata Atlântica de baixada, usando diferentes estratos da floresta, cavidades de árvores e áreas com oferta de alimento e abrigo.",
                alimentacao: "Frutos, néctar, flores e pequenos animais, como insetos e outros invertebrados. A dieta acompanha a oferta sazonal da floresta.",
                comportamento: "Primata diurno e arborícola, que vive em grupos familiares. Usa vocalizações e marcações para comunicação e organização do território.",
                ameacas: "Fragmentação e perda da Mata Atlântica, isolamento de populações, incêndios e eventos extremos que reduzem a continuidade do habitat.",
                ajuda: "Apoie a restauração e conexão de florestas, respeite áreas protegidas e divulgue iniciativas de conservação conduzidas por instituições especializadas."
            }
        },
        {
            key: "arara",
            common: "Arara-azul-grande",
            scientific: "Anodorhynchus hyacinthinus",
            image: "assets/img/arara.png",
            biomes: "Cerrado, Pantanal e áreas de transição com palmeirais.",
            habitatShort: "Palmeirais, savanas e matas abertas",
            national: "VU",
            nationalName: "Vulnerável",
            global: "VU · Vulnerável",
            iucn: "https://www.iucnredlist.org/search?query=Anodorhynchus%20hyacinthinus&searchType=species",
            info: {
                habitat: "Utiliza palmeirais, savanas e matas abertas. Cavidades em árvores e paredões podem servir como locais de nidificação, conforme a região.",
                alimentacao: "Especializada em sementes e frutos de palmeiras, incluindo bocaiúva e acuri. A disponibilidade desses recursos influencia sua distribuição.",
                comportamento: "Costuma ser observada em pares ou grupos e utiliza cavidades para nidificação. O cuidado parental é compartilhado pelo casal.",
                ameacas: "Captura ilegal, perda de árvores usadas para alimentação e reprodução, incêndios e degradação dos ambientes de ocorrência.",
                ajuda: "Nunca compre animais silvestres; denuncie tráfico às autoridades; apoie a proteção de palmeirais, árvores-ninho e áreas de reprodução."
            }
        },
        {
            key: "lobo",
            common: "Lobo-guará",
            scientific: "Chrysocyon brachyurus",
            image: "assets/img/lobo-guara.png",
            biomes: "Cerrado e outros ambientes abertos da América do Sul.",
            habitatShort: "Campos, savanas e vegetação aberta",
            national: "VU",
            nationalName: "Vulnerável",
            global: "NT · Quase ameaçado",
            iucn: "https://www.iucnredlist.org/search?query=Chrysocyon%20brachyurus&searchType=species",
            info: {
                habitat: "Prefere campos, savanas e mosaicos com vegetação aberta e cobertura para abrigo. A espécie é associada ao Cerrado, mas ocorre em outros ambientes sul-americanos.",
                alimentacao: "Onívoro: consome frutos, como a lobeira, e pequenos vertebrados e invertebrados. Sua dieta contribui para a dispersão de sementes.",
                comportamento: "Geralmente solitário, com atividade sobretudo ao entardecer e à noite. Usa vocalizações e marcações para comunicar presença e território.",
                ameacas: "Conversão e fragmentação de áreas abertas, atropelamentos, incêndios e conflitos associados à presença em áreas rurais e urbanas.",
                ajuda: "Dirija com atenção em áreas de ocorrência; preserve vegetação nativa; não persiga nem ofereça alimento a animais silvestres; apoie ações locais de coexistência."
            }
        }
    ];

    const image = document.getElementById("species-image");
    const fallback = document.getElementById("animal-fallback");
    const model = document.getElementById("animal-model");
    const rotationToggle = document.getElementById("rotation-toggle");
    const tabs = [...document.querySelectorAll(".dossier-tab")];
    const panels = [...document.querySelectorAll(".dossier-panel")];
    const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
    let currentIndex = 0;
    let selectedPanel = "habitat";
    let rotationEnabled = !motionPreference.matches;
    let dragStart = null;
    let angleX = 0;
    let angleY = 0;

    function updateRotationButton() {
        model.classList.toggle("manual-mode", !rotationEnabled);
        rotationToggle.setAttribute("aria-pressed", String(rotationEnabled));
        rotationToggle.disabled = motionPreference.matches;
        rotationToggle.querySelector("span").textContent = motionPreference.matches
            ? "Movimento reduzido"
            : rotationEnabled ? "Rotação automática" : "Retomar rotação";
        rotationToggle.setAttribute(
            "aria-label",
            motionPreference.matches
                ? "Rotação automática desativada pela preferência de movimento reduzido"
                : rotationEnabled ? "Pausar rotação automática" : "Retomar rotação automática"
        );
    }

    function selectPanel(key, allowClose = false) {
        const isClosing = allowClose && selectedPanel === key;
        selectedPanel = isClosing ? "" : key;

        tabs.forEach(tab => {
            const active = tab.dataset.panel === selectedPanel;
            tab.classList.toggle("active", active);
            tab.setAttribute("aria-selected", String(active));
            tab.setAttribute("aria-expanded", String(active));
        });

        panels.forEach(panel => {
            const active = panel.id === `panel-${selectedPanel}`;
            panel.hidden = !active;
            panel.classList.toggle("active", active);
        });
    }

    function updateSpecies(index) {
        currentIndex = (index + species.length) % species.length;
        const animal = species[currentIndex];
        const categoryPositions = { NT: 30, VU: 55, EN: 78, CR: 96 };
        const position = categoryPositions[animal.national];
        const categoryColors = { NT: "#d5b853", VU: "#e59354", EN: "#ca6555", CR: "#bd514c" };

        document.getElementById("specimen-index").textContent =
            `FICHA ${String(currentIndex + 1).padStart(2, "0")} / ${String(species.length).padStart(2, "0")}`;
        document.getElementById("species-name").textContent = animal.common;
        document.getElementById("species-scientific").textContent = animal.scientific;
        document.getElementById("species-biomes").textContent = animal.biomes;
        document.getElementById("species-habitat-short").textContent = animal.habitatShort;
        document.getElementById("species-image-caption").textContent = animal.scientific;
        document.getElementById("pager-current").textContent = String(currentIndex + 1).padStart(2, "0");
        document.getElementById("risk-source").textContent = "LISTA NACIONAL · ICMBio";
        document.getElementById("risk-name").textContent = animal.nationalName;
        document.getElementById("risk-global").textContent = animal.global;
        document.getElementById("risk-meter").setAttribute("aria-label", `Grau de ameaça nacional: ${animal.nationalName}`);
        document.getElementById("risk-fill").style.width = `${position}%`;
        document.getElementById("risk-pin").style.left = `${position}%`;
        document.getElementById("risk-pin").style.backgroundColor = categoryColors[animal.national];
        document.getElementById("risk-symbol").style.color = categoryColors[animal.national];
        document.getElementById("risk-name").style.color = categoryColors[animal.national];
        document.getElementById("species-iucn-link").href = animal.iucn;
        model.dataset.species = animal.key;
        model.setAttribute("aria-label", `Imagem interativa de ${animal.common}. Arraste para inclinar a imagem.`);
        image.hidden = false;
        fallback.hidden = true;
        image.alt = animal.common;
        image.src = animal.image;

        Object.entries(animal.info).forEach(([key, value]) => {
            const content = document.getElementById(`info-${key}`);
            if (content) content.textContent = value;
        });

        selectPanel(selectedPanel || "habitat");
        angleX = 0;
        angleY = 0;
        model.style.setProperty("--manual-x", "0deg");
        model.style.setProperty("--manual-y", "0deg");
        model.classList.remove("is-dragging");
        rotationEnabled = !motionPreference.matches;
        updateRotationButton();
    }

    image.addEventListener("error", () => {
        image.hidden = true;
        fallback.hidden = false;
    });

    document.getElementById("species-prev").addEventListener("click", () => updateSpecies(currentIndex - 1));
    document.getElementById("species-next").addEventListener("click", () => updateSpecies(currentIndex + 1));

    rotationToggle.addEventListener("click", () => {
        rotationEnabled = !rotationEnabled;
        updateRotationButton();
    });

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => selectPanel(tab.dataset.panel, matchMedia("(max-width: 650px)").matches));
        tab.addEventListener("keydown", event => {
            if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(event.key)) return;
            event.preventDefault();
            const direction = ["ArrowDown", "ArrowRight"].includes(event.key) ? 1 : -1;
            tabs[(index + direction + tabs.length) % tabs.length].focus();
        });
    });

    model.addEventListener("pointerdown", event => {
        if (event.pointerType === "mouse" && event.button !== 0) return;
        dragStart = { x: event.clientX, y: event.clientY };
        model.setPointerCapture(event.pointerId);
        model.classList.add("manual-mode", "is-dragging");
        rotationEnabled = false;
        updateRotationButton();
    });

    model.addEventListener("pointermove", event => {
        if (!dragStart) return;
        const deltaX = event.clientX - dragStart.x;
        const deltaY = event.clientY - dragStart.y;
        dragStart = { x: event.clientX, y: event.clientY };
        angleY = Math.max(-24, Math.min(24, angleY + deltaX * .35));
        angleX = Math.max(-12, Math.min(12, angleX - deltaY * .25));
        model.style.setProperty("--manual-x", `${angleX}deg`);
        model.style.setProperty("--manual-y", `${angleY}deg`);
    });

    function finishDrag() {
        dragStart = null;
        model.classList.remove("is-dragging");
    }

    model.addEventListener("pointerup", finishDrag);
    model.addEventListener("pointercancel", finishDrag);
    model.addEventListener("lostpointercapture", finishDrag);

    model.addEventListener("keydown", event => {
        if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
        event.preventDefault();
        rotationEnabled = false;
        updateRotationButton();
        angleY = Math.max(-24, Math.min(24, angleY + (event.key === "ArrowLeft" ? -5 : event.key === "ArrowRight" ? 5 : 0)));
        angleX = Math.max(-12, Math.min(12, angleX + (event.key === "ArrowUp" ? 3 : event.key === "ArrowDown" ? -3 : 0)));
        model.style.setProperty("--manual-x", `${angleX}deg`);
        model.style.setProperty("--manual-y", `${angleY}deg`);
    });

    updateSpecies(0);
})();
