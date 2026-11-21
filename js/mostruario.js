(() => {
    "use strict";

    const species = [
        {
            key: "onca", common: "Onça-pintada", scientific: "Panthera onca",
            modelPath: "assets/models/jaguar.glb",
            biomes: "Amazônia, Caatinga, Cerrado, Mata Atlântica e Pantanal.",
            habitatShort: "Florestas, savanas e áreas alagáveis",
            national: "VU", nationalName: "Vulnerável", global: "NT · Quase ameaçada",
            source: "https://www.gov.br/icmbio/pt-br/assuntos/biodiversidade/programa-de-manejo-populacional/onca-pintada/pmp_onca_pintada.pdf",
            iucn: "https://www.iucnredlist.org/search?query=Panthera%20onca&searchType=species",
            info: {
                habitat: "No Brasil, ocorre em quase todos os biomas, com exceção do Pampa, onde já foi extinta. Utiliza ambientes variados, de florestas densas a áreas úmidas e paisagens abertas com cobertura vegetal.",
                alimentacao: "Carnívora. Alimenta-se de diferentes vertebrados, e sua dieta varia conforme o bioma e a disponibilidade de presas.",
                comportamento: "É geralmente solitária e territorial. É o maior felino das Américas e o maior carnívoro terrestre brasileiro.",
                ameacas: "Perda e degradação do habitat, caça, conflitos socioambientais e outras formas de mortalidade provocadas por atividades humanas.",
                ajuda: "Proteja áreas naturais e corredores de vegetação; não alimente nem se aproxime de animais silvestres; apoie iniciativas de coexistência e conservação."
            }
        },
        {
            key: "tartaruga", common: "Tartaruga-verde", scientific: "Chelonia mydas",
            modelPath: "assets/models/tartaruga-verde.glb",
            biomes: "Ambiente marinho; desova no litoral norte do Espírito Santo e no Delta do Parnaíba, Piauí.",
            habitatShort: "Oceano aberto e praias de desova",
            national: "NT", nationalName: "Quase ameaçada", global: "EN · Em perigo",
            source: "https://salve.icmbio.gov.br/salve/api/pdf/doi/382b574f73347872452b77383535307574712f6f314341696a7834527954676c786d69395644334c6768303d",
            iucn: "https://www.iucnredlist.org/search?query=Chelonia%20mydas&searchType=species",
            info: {
                habitat: "É uma tartaruga marinha de hábitos costeiros. No Brasil, ocorre ao longo da costa e utiliza áreas próximas a ilhas, baías, estuários e lagunas. As principais áreas de desova ficam na Ilha da Trindade (ES), no Atol das Rocas (RN) e em Fernando de Noronha (PE).",
                alimentacao: "Os filhotes são onívoros. Durante o crescimento, a dieta muda e os juvenis e adultos passam a consumir principalmente algas e gramíneas marinhas.",
                comportamento: "É migratória e pode percorrer grandes distâncias entre áreas de alimentação e reprodução. O modelo 3D enviado representa um indivíduo juvenil.",
                ameacas: "Captura incidental na pesca, poluição marinha, resíduos sólidos, degradação de áreas costeiras e perturbação de praias de desova continuam sendo pressões importantes.",
                ajuda: "Descarte resíduos corretamente, reduza o uso de plásticos, respeite áreas de desova e apoie ações de monitoramento e conservação do Projeto TAMAR/ICMBio."
            }
        },
        {
            key: "jacare-acu", common: "Jacaré-açu", scientific: "Melanosuchus niger",
            modelPath: "assets/models/jacare-acu.glb",
            biomes: "Amazônia e Cerrado.",
            habitatShort: "Rios, lagos e áreas alagáveis",
            national: "LC", nationalName: "Menos preocupante (avaliação 08/2016)", global: "LC · Menos preocupante",
            source: "https://doi.org/10.37002/salve.ficha.19152",
            iucn: "https://www.iucnredlist.org/search?query=Melanosuchus%20niger&searchType=species",
            info: {
                habitat: "O SALVE registra a espécie na Amazônia e no Cerrado, em estados da Região Norte e no Centro-Oeste. Vive em rios, lagos, igarapés e áreas alagáveis, incluindo ambientes de várzea.",
                alimentacao: "Carnívoro. Alimenta-se de peixes e de outros animais aquáticos ou terrestres, com presas que variam conforme o tamanho do jacaré e a disponibilidade local.",
                comportamento: "É um grande crocodiliano semiaquático. Usa margens e bancos de vegetação para termorregular e pode construir ninhos próximos à água.",
                ameacas: "A caça histórica por couro reduziu populações em partes da distribuição. Alterações e degradação de ambientes aquáticos, captura e conflitos com pessoas também podem afetá-lo.",
                ajuda: "Não compre produtos de origem silvestre; preserve rios e áreas alagáveis; mantenha distância de animais e comunique captura ou comércio ilegal às autoridades ambientais."
            }
        },
        {
            key: "tartaruga-couro", common: "Tartaruga-de-couro", scientific: "Dermochelys coriacea",
            modelPath: "assets/models/tartaruga-de-couro.glb",
            biomes: "Sistema Costeiro-Marinho; o SALVE também registra ocorrência associada à Amazônia, Caatinga, Cerrado, Mata Atlântica e Pampa.",
            habitatShort: "Oceano aberto e praias de desova",
            national: "CR", nationalName: "Criticamente em perigo (avaliação 10/2018)", global: "VU · Vulnerável",
            source: "https://doi.org/10.37002/salve.ficha.12567.2",
            iucn: "https://www.iucnredlist.org/search?query=Dermochelys%20coriacea&searchType=species",
            info: {
                habitat: "É uma tartaruga marinha de ampla distribuição oceânica. No Brasil, o SALVE registra ocorrência nos estados da Bahia, Espírito Santo, Pará, Piauí e Rio Grande do Norte, além dos biomas e do Sistema Costeiro-Marinho listados na ficha.",
                alimentacao: "Alimenta-se principalmente de águas-vivas e outros organismos gelatinosos. Sua garganta possui estruturas que ajudam a reter esse alimento.",
                comportamento: "É a maior tartaruga marinha viva e realiza migrações de longa distância entre áreas de alimentação e reprodução. As fêmeas desovam em praias arenosas.",
                ameacas: "Captura incidental em pescarias, degradação e iluminação de praias de desova, ingestão de resíduos e mudanças ambientais que afetam o oceano e a incubação dos ovos.",
                ajuda: "Reduza resíduos plásticos, respeite praias de desova e áreas protegidas, consuma pescado de origem responsável e apoie o monitoramento e a conservação marinha."
            }
        },
        {
            key: "veado-campeiro", common: "Veado-campeiro", scientific: "Ozotoceros bezoarticus",
            modelPath: "assets/models/veado-campeiro.glb",
            biomes: "Amazônia, Cerrado, Mata Atlântica, Pampa e Pantanal (avaliação da espécie no SALVE, 04/2025).",
            habitatShort: "Campos abertos e savanas",
            national: "LC", nationalName: "Menos preocupante (espécie; avaliação 04/2025)", global: "NT · Quase ameaçado",
            source: "https://salve.icmbio.gov.br/#/tableResult",
            iucn: "https://www.iucnredlist.org/search?query=Ozotoceros%20bezoarticus&searchType=species",
            info: {
                habitat: "A avaliação da espécie no SALVE, de abril de 2025, registra ocorrência na Amazônia, no Cerrado, na Mata Atlântica, no Pampa e no Pantanal. É associado sobretudo a campos naturais, savanas e outras áreas abertas.",
                alimentacao: "Herbívoro, alimenta-se principalmente de gramíneas e outras plantas disponíveis nos ambientes abertos.",
                comportamento: "É um cervídeo de ambientes abertos. Pode ser observado sozinho ou em pequenos grupos, mantendo atenção a predadores e a perturbações no habitat.",
                ameacas: "Conversão e fragmentação de campos naturais, expansão agropecuária, queimadas, caça e isolamento de populações por barreiras e alterações da paisagem.",
                ajuda: "Proteja campos nativos e corredores entre áreas naturais; evite queimadas e caça; dirija com atenção e apoie iniciativas locais de conservação."
            }
        }
    ];

    const image = document.getElementById("species-image");
    const viewer3D = document.getElementById("species-3d");
    const glbViewer = document.getElementById("species-glb");
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
        const animal = species[currentIndex];
        const isSketchfab = Boolean(animal && animal.modelUrl);
        const isGlb = Boolean(animal && animal.modelPath);
        const is3D = isSketchfab || isGlb;
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

        if (isSketchfab) {
            const spin = rotationEnabled && !motionPreference.matches ? "0.2" : "0";
            const nextSrc = `${animal.modelUrl}?autospin=${spin}&autostart=1&preload=1&transparent=1&ui_hint=0`;
            if (viewer3D.dataset.spin !== spin) {
                viewer3D.src = nextSrc;
                viewer3D.dataset.spin = spin;
            }
        }
        if (isGlb) {
            glbViewer.toggleAttribute("auto-rotate", rotationEnabled && !motionPreference.matches);
        }
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
        const categoryPositions = { LC: 8, NT: 30, VU: 55, EN: 78, CR: 96 };
        const position = categoryPositions[animal.national];
        const categoryColors = { LC: "#7fa875", NT: "#d5b853", VU: "#e59354", EN: "#ca6555", CR: "#bd514c" };

        document.getElementById("specimen-index").textContent =
            `FICHA ${String(currentIndex + 1).padStart(2, "0")} / ${String(species.length).padStart(2, "0")}`;
        document.getElementById("species-name").textContent = animal.common;
        document.getElementById("species-scientific").textContent = animal.scientific;
        document.getElementById("species-biomes").textContent = animal.biomes;
        document.getElementById("species-habitat-short").textContent = animal.habitatShort;
        document.getElementById("species-image-caption").textContent = animal.scientific;
        document.getElementById("pager-current").textContent = String(currentIndex + 1).padStart(2, "0");
        document.getElementById("pager-total").textContent = String(species.length).padStart(2, "0");
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
        const icmbioLink = document.getElementById("species-icmbio-link");
        if (icmbioLink) {
            icmbioLink.href = animal.source || "https://www.gov.br/icmbio/pt-br/assuntos/biodiversidade/fauna-brasileira/fauna-brasileira";
            icmbioLink.textContent = animal.source ? "referência ICMBio da espécie" : "portal de avaliação do ICMBio";
        }
        model.dataset.species = animal.key;
        const hasSketchfab = Boolean(animal.modelUrl);
        const hasGlb = Boolean(animal.modelPath);
        const has3D = hasSketchfab || hasGlb;
        model.classList.toggle("is-3d", has3D);
        model.setAttribute("aria-label", has3D
            ? `Modelo 3D de ${animal.common}. Arraste sobre o modelo para girá-lo.`
            : `Imagem de ${animal.common}.`);
        viewer3D.hidden = !hasSketchfab;
        viewer3D.title = `Modelo 3D interativo: ${animal.common}`;
        viewer3D.dataset.spin = "";
        if (!hasSketchfab) viewer3D.removeAttribute("src");
        glbViewer.hidden = !hasGlb;
        glbViewer.alt = `Modelo 3D de ${animal.common}`;
        if (hasGlb && glbViewer.getAttribute("src") !== animal.modelPath) {
            glbViewer.setAttribute("src", animal.modelPath);
        }
        if (!hasGlb) glbViewer.removeAttribute("src");
        image.hidden = has3D;
        fallback.hidden = true;
        image.alt = animal.common;
        if (!has3D) image.src = animal.image;
        document.getElementById("species-viewer-caption").textContent = hasGlb
            ? "MODELO 3D · GLB"
            : hasSketchfab ? "MODELO 3D · SKETCHFAB" : "IMAGEM DE REFERÊNCIA";

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
        if (model.classList.contains("is-3d")) return;
        if (event.pointerType === "mouse" && event.button !== 0) return;
        dragStart = { x: event.clientX, y: event.clientY };
        model.setPointerCapture(event.pointerId);
        model.classList.add("manual-mode", "is-dragging");
        rotationEnabled = false;
        updateRotationButton();
    });

    model.addEventListener("pointermove", event => {
        if (model.classList.contains("is-3d") || !dragStart) return;
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
        if (model.classList.contains("is-3d")) return;
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