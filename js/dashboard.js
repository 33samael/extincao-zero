(() => {
    "use strict";

    const data = window.dashboardFaunaData;
    const dashboard = document.querySelector(".dashboard");
    const records = data?.records;
    const salveApi = window.SalveSpeciesAPI;

    if (!dashboard || !Array.isArray(records) || records.length === 0 ||
        !salveApi || !Array.isArray(salveApi.records) || salveApi.records.length === 0) {
        const message = !salveApi || !Array.isArray(salveApi.records) || salveApi.records.length === 0
            ? "A lista de espécies ameaçadas do SALVE não foi carregada corretamente."
            : "Não foi possível carregar os dados oficiais do dashboard.";
        const notice = document.createElement("p");
        notice.className = "dashboard-data-error";
        notice.setAttribute("role", "alert");
        notice.textContent = message;
        dashboard?.prepend(notice);
        console.error(message);
        return;
    }

    data.source = "Indicadores: ICMBio/SALVE (2026-11-18); registros individuais usados nos filtros detalhados: base local do painel, não sincronizada com o SALVE";
    data.consultedAt = "2026-11-18";
    data.evaluatedApprox = 15974;

    const numberFormat = new Intl.NumberFormat("pt-BR");
    const biomeNames = ["Amazônia", "Cerrado", "Mata Atlântica", "Caatinga", "Pantanal", "Pampa"];
    const unassignedBiomeKey = "sem-bioma-continental";
    const unassignedBiomeLabel = "Costeiro-marinho / sem bioma continental";
    const biomeDistributionNames = [...biomeNames, unassignedBiomeKey];
    const unassignedBiomeColor = "#8b9b9f";
    const biomeColors = {
        "Amazônia": "#97af41",
        "Cerrado": "#f9b558",
        "Mata Atlântica": "#71bf97",
        "Caatinga": "#fde588",
        "Pantanal": "#78968d",
        "Pampa": "#f4e1bc"
    };
    const groupNames = ["Mamíferos", "Aves", "Répteis", "Anfíbios", "Peixes", "Invertebrados"];
    const salveSummary = {
        evaluated: 15974,
        statuses: { CR: 361, EN: 510, VU: 512 },
        groups: {
            Mamíferos: 104,
            Aves: 242,
            Répteis: 123,
            Anfíbios: 159,
            Peixes: 375,
            Invertebrados: 380
        },
        biomes: {
            Amazônia: { CR: 22, EN: 67, VU: 132 },
            Cerrado: { CR: 59, EN: 124, VU: 115 },
            "Mata Atlântica": { CR: 185, EN: 206, VU: 141 },
            Caatinga: { CR: 30, EN: 50, VU: 34 },
            Pantanal: { CR: 0, EN: 3, VU: 5 },
            Pampa: { CR: 13, EN: 25, VU: 14 },
            [unassignedBiomeKey]: { CR: 52, EN: 35, VU: 71 }
        }
    };
    const statusInfo = {
        CR: { label: "CR · Criticamente em perigo", color: "#ff8a72" },
        EN: { label: "EN · Em perigo", color: "#f0ba65" },
        VU: { label: "VU · Vulnerável", color: "#d8cf69" }
    };
    const filters = {
        biome: document.getElementById("biome-filter"),
        group: document.getElementById("taxon-filter"),
        state: document.getElementById("state-filter"),
        status: document.getElementById("risk-filter"),
        period: document.getElementById("period-filter"),
        search: document.getElementById("species-search")
    };

    const stateNames = [...new Set(records.flatMap(record => record.states))]
        .sort((a, b) => a.localeCompare(b, "pt-BR"));
    stateNames.forEach(state => {
        const option = document.createElement("option");
        option.value = state;
        option.textContent = state;
        filters.state.append(option);
    });

    const speciesCards = [...dashboard.querySelectorAll(".species-card")];
    const speciesGrid = document.getElementById("species-grid");
    const recordsByScientificName = new Map(records.map(record => [record.scientific, record]));
    const emptyFilterMessage = document.getElementById("empty-filter");
    const searchSuggestions = document.getElementById("species-search-suggestions");
    const searchResults = document.getElementById("species-search-results");
    const filterForm = document.getElementById("dashboard-filters");
    const clearButton = document.getElementById("clear-filters");
    const mapImage = dashboard.querySelector(".biome-map-image");
    const mapCanvas = document.createElement("canvas");
    const mapContext = mapCanvas.getContext("2d", { willReadFrequently: true });
    const mapDetails = document.getElementById("risk-map-details");
    const mapBiomeColors = [
        { name: "Amazônia", red: 151, green: 175, blue: 65 },
        { name: "Caatinga", red: 253, green: 229, blue: 136 },
        { name: "Cerrado", red: 249, green: 181, blue: 88 },
        { name: "Pantanal", red: 120, green: 150, blue: 141 },
        { name: "Mata Atlântica", red: 113, green: 191, blue: 151 },
        { name: "Pampa", red: 244, green: 225, blue: 188 }
    ];

    function primaryBiome(record) {
        const biomes = record.biomes || record.biomas || [];
        return biomeNames.find(biome => biomes.includes(biome)) || null;
    }

    function biomeCategory(record) {
        return primaryBiome(record) || unassignedBiomeKey;
    }

    function filteredRecords(ignoreBiomeFilter = false) {
        const period = filters.period.value;
        const [periodStart, periodEnd] = period === "todos"
            ? [null, null]
            : period.split("-").map(Number);

        return records.filter(record =>
            (ignoreBiomeFilter || filters.biome.value === "todos" || biomeCategory(record) === filters.biome.value) &&
            (filters.group.value === "todos" || record.group === filters.group.value) &&
            (filters.state.value === "todos" || record.states.includes(filters.state.value)) &&
            (filters.status.value === "todos" || record.status === filters.status.value) &&
            (periodStart === null || (record.year >= periodStart && record.year <= periodEnd))
        );
    }

    function appendBar(container, label, value, max, color) {
        const row = document.createElement("div");
        row.className = "dashboard-bar-row";
        row.title = `${label}: ${numberFormat.format(value)}`;

        const name = document.createElement("span");
        name.className = "dashboard-bar-label";
        name.textContent = label;

        const track = document.createElement("span");
        track.className = "dashboard-bar-track";
        const bar = document.createElement("span");
        bar.style.setProperty("--bar-width", `${max ? value / max * 100 : 0}%`);
        if (color) bar.style.setProperty("--bar-color", color);
        track.append(bar);

        const count = document.createElement("strong");
        count.className = "dashboard-bar-value";
        count.textContent = numberFormat.format(value);

        row.append(name, track, count);
        container.append(row);
    }

    function countBiomes(list) {
        return Object.fromEntries(biomeDistributionNames.map(biome => [
            biome,
            list.reduce((count, record) => count + Number(biomeCategory(record) === biome), 0)
        ]));
    }

    function renderStatusChart(list, officialCounts) {
        const counts = officialCounts || Object.fromEntries(Object.keys(statusInfo).map(status => [
            status,
            list.filter(record => record.status === status).length
        ]));
        const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
        let start = 0;
        const segments = Object.entries(statusInfo).map(([status, info]) => {
            const end = start + (total ? counts[status] / total * 100 : 0);
            const segment = `${info.color} ${start}% ${end}%`;
            start = end;
            return segment;
        });

        const donut = document.getElementById("status-donut");
        donut.style.background = total
            ? `conic-gradient(${segments.join(", ")})`
            : "conic-gradient(var(--surface-light) 0% 100%)";
        donut.setAttribute("aria-label", Object.entries(statusInfo)
            .map(([status, info]) => `${info.label}: ${numberFormat.format(counts[status])}`)
            .join(". "));
        document.getElementById("status-total").textContent = numberFormat.format(total);

        const legend = document.getElementById("status-chart-legend");
        legend.replaceChildren();
        Object.entries(statusInfo).forEach(([status, info]) => {
            const item = document.createElement("li");
            const marker = document.createElement("i");
            marker.style.setProperty("--status-color", info.color);
            const label = document.createElement("span");
            label.textContent = info.label;
            const value = document.createElement("strong");
            value.textContent = numberFormat.format(counts[status]);
            item.append(marker, label, value);
            legend.append(item);
        });
    }

    function selectBiome(biome) {
        filters.biome.value = filters.biome.value === biome ? "todos" : biome;
        renderDashboard();
    }

    function renderMap(counts) {
        mapDetails.replaceChildren();
        biomeNames.forEach(biome => {
            const button = document.createElement("button");
            button.className = "map-biome-card";
            button.type = "button";
            button.dataset.biome = biome;
            button.setAttribute("aria-pressed", String(filters.biome.value === biome));
            button.style.setProperty("--map-color", biomeColors[biome]);

            const name = document.createElement("span");
            name.textContent = biome;
            const value = document.createElement("strong");
            value.textContent = numberFormat.format(counts[biome]);
            button.append(name, value);
            mapDetails.append(button);
        });
    }

    function renderTimeline(list) {
        const timeline = document.getElementById("assessment-timeline");
        timeline.replaceChildren();
        const years = [...new Set(records.map(record => record.year).filter(Number.isInteger))]
            .sort((a, b) => a - b);
        const counts = new Map(years.map(year => [
            year,
            list.filter(record => record.year === year).length
        ]));
        const max = Math.max(0, ...counts.values());

        years.forEach(year => {
            const item = document.createElement("div");
            item.className = "timeline-year";
            const count = counts.get(year);
            item.title = `${year}: ${numberFormat.format(count)} avaliações presentes na lista atual`;
            const bar = document.createElement("span");
            bar.style.setProperty("--bar-height", `${max ? Math.max(count / max * 100, 1) : 1}%`);
            bar.setAttribute("aria-hidden", "true");
            const label = document.createElement("strong");
            label.textContent = String(year);
            item.append(bar, label);
            timeline.append(item);
        });
    }

    let activeSuggestionIndex = -1;
    let searchPage = 1;
    const searchPageSize = 24;

    function normalizeSearch(value) {
        return (value || "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase("pt-BR")
            .trim();
    }

    function matchesSearchTerms(text, query) {
        const terms = normalizeSearch(text);
        return query.split(/\s+/).every(term => terms.includes(term));
    }

    function matchesSpeciesFilters(record) {
        const biome = filters.biome.value;
        const primary = primaryBiome(record);
        const matchesBiome = biome === "todos" ||
            (biome === unassignedBiomeKey ? !primary : primary === biome);
        const groupMatches = filters.group.value === "todos" ||
            record.grupo === filters.group.value ||
            (filters.group.value === "Peixes" && record.grupo?.startsWith("Peixes")) ||
            (filters.group.value === "Invertebrados" && record.grupo?.startsWith("Invertebrados"));
        const stateMatches = filters.state.value === "todos" || record.estados.includes(filters.state.value);
        const statusMatches = filters.status.value === "todos" || record.categoria === filters.status.value;
        const period = filters.period.value;
        const [periodStart, periodEnd] = period === "todos" ? [null, null] : period.split("-").map(Number);
        const periodMatches = periodStart === null ||
            (record.anoAvaliacao >= periodStart && record.anoAvaliacao <= periodEnd);
        return matchesBiome && groupMatches && stateMatches && statusMatches && periodMatches;
    }

    function hideSearchSuggestions() {
        searchSuggestions.hidden = true;
        filters.search.setAttribute("aria-expanded", "false");
        filters.search.removeAttribute("aria-activedescendant");
        activeSuggestionIndex = -1;
    }

    function selectSearchSuggestion(record) {
        const commonName = salveApi.getCommonName(record);
        filters.search.value = commonName.startsWith("Nome popular não registrado")
            ? record.nomeCientifico
            : commonName;
        renderDashboard();
        hideSearchSuggestions();
        filters.search.focus();
    }

    function renderSearchSuggestions(query) {
        activeSuggestionIndex = -1;
        searchSuggestions.replaceChildren();
        if (!query || !salveApi.records.length) {
            hideSearchSuggestions();
            return;
        }

        const suggestions = salveApi.search(query, 8);
        if (!suggestions.length) {
            hideSearchSuggestions();
            return;
        }

        suggestions.forEach((record, index) => {
            const item = document.createElement("li");
            item.id = `species-suggestion-${index}`;
            item.setAttribute("role", "option");
            item.setAttribute("aria-selected", "false");
            const button = document.createElement("button");
            button.type = "button";
            button.className = "species-suggestion";
            button.dataset.scientific = record.nomeCientifico;
            const name = document.createElement("strong");
            name.textContent = salveApi.getCommonName(record);
            const scientific = document.createElement("em");
            scientific.textContent = record.nomeCientifico;
            const category = document.createElement("span");
            category.textContent = `${record.categoria} · ${record.categoriaNome}`;
            button.append(name, scientific, category);
            item.append(button);
            searchSuggestions.append(item);
        });
        searchSuggestions.hidden = false;
        filters.search.setAttribute("aria-expanded", "true");
    }

    function addSpeciesDetail(details, label, value, fallback) {
        const row = document.createElement("div");
        const term = document.createElement("dt");
        term.textContent = label;
        const description = document.createElement("dd");
        description.textContent = value || fallback;
        row.append(term, description);
        details.append(row);
    }

    function createApiSpeciesCard(record, index) {
        const card = document.createElement("article");
        card.className = "species-card species-card-api";
        card.dataset.scientific = record.nomeCientifico;

        const image = document.createElement("div");
        image.className = "species-image species-image-placeholder";
        image.setAttribute("role", "img");
        image.setAttribute("aria-label", "Buscando imagem da espécie");
        const placeholder = document.createElement("span");
        placeholder.textContent = "Buscando imagem...";
        const order = document.createElement("span");
        order.className = "species-order";
        order.textContent = String(index + 1).padStart(2, "0");
        image.append(placeholder, order);

        const content = document.createElement("div");
        content.className = "species-content";
        const biome = document.createElement("span");
        biome.className = "species-biome";
        const biomeIcon = document.createElement("i");
        biomeIcon.className = "bi bi-geo-alt";
        biomeIcon.setAttribute("aria-hidden", "true");
        biome.append(biomeIcon, document.createTextNode(
            record.biomas.length ? ` ${record.biomas.join(", ")}` : " Bioma não informado"
        ));
        const heading = document.createElement("h3");
        heading.textContent = salveApi.getCommonName(record);
        const scientific = document.createElement("em");
        scientific.textContent = record.nomeCientifico;
        const statusList = document.createElement("div");
        statusList.className = "status-list";
        const status = document.createElement("span");
        status.className = `status-badge ${record.categoria === "CR" ? "critical" : record.categoria === "EN" ? "endangered" : "vulnerable"}`;
        status.append(document.createTextNode(record.categoria));
        const statusLabel = document.createElement("small");
        statusLabel.textContent = `Brasil · SALVE · ${record.categoriaNome}`;
        status.append(statusLabel);
        statusList.append(status);

        const disclosure = document.createElement("details");
        disclosure.className = "species-details";
        const summary = document.createElement("summary");
        summary.textContent = "Informações da espécie";
        const detailList = document.createElement("dl");
        addSpeciesDetail(
            detailList,
            "Habitat",
            record.habitat,
            record.biomas.length
                ? `A listagem resumida registra ocorrência em: ${record.biomas.join(", ")}. O habitat específico não é detalhado nessa consulta.`
                : "Não detalhado na listagem pública resumida do SALVE."
        );
        addSpeciesDetail(detailList, "Alimentação", record.alimentacao, "Não detalhada na listagem pública resumida do SALVE.");
        addSpeciesDetail(detailList, "Comportamento", record.comportamento, "Não detalhado na listagem pública resumida do SALVE.");
        addSpeciesDetail(detailList, "Ameaças", record.ameacas, "Não detalhadas na listagem pública resumida do SALVE.");
        addSpeciesDetail(detailList, "Como ajudar", record.comoAjudar, "Consulte a ficha oficial do SALVE para orientações específicas.");
        disclosure.append(summary, detailList);

        const source = document.createElement("a");
        source.className = "species-source";
        source.href = record.fonte;
        source.target = "_blank";
        source.rel = "noopener noreferrer";
        source.append(document.createTextNode("Abrir ficha oficial no SALVE "));
        const sourceIcon = document.createElement("i");
        sourceIcon.className = "bi bi-box-arrow-up-right";
        sourceIcon.setAttribute("aria-hidden", "true");
        source.append(sourceIcon);

        content.append(biome, heading, scientific, statusList, disclosure, source);
        card.append(image, content);
        salveApi.getImage(record).then(imageInfo => {
            if (!image.isConnected) return;
            if (!imageInfo) {
                placeholder.textContent = "Imagem não encontrada";
                image.setAttribute("aria-label", "Imagem não encontrada");
                return;
            }

            const photo = document.createElement("img");
            photo.alt = `${salveApi.getCommonName(record)} (${record.nomeCientifico})`;
            photo.loading = "lazy";
            photo.onerror = () => {
                console.error(`Não foi possível carregar a imagem de ${record.nomeCientifico}.`);
                placeholder.textContent = "Imagem não encontrada";
                image.classList.add("species-image-placeholder");
                image.setAttribute("role", "img");
                image.setAttribute("aria-label", "Imagem não encontrada");
                image.replaceChildren(placeholder, order);
            };
            photo.src = imageInfo.url;

            const credit = document.createElement("a");
            credit.className = "species-image-credit";
            credit.href = imageInfo.pageUrl;
            credit.target = "_blank";
            credit.rel = "noopener noreferrer";
            credit.textContent = "Fonte: Wikimedia Commons";
            image.classList.remove("species-image-placeholder");
            image.removeAttribute("role");
            image.removeAttribute("aria-label");
            image.replaceChildren(photo, order, credit);
        });
        return card;
    }

    function renderSpeciesCards() {
        const query = normalizeSearch(filters.search.value);
        searchPage = 1;
        let visibleCount = 0;
        const salveSyncComplete = ["current", "updated", "baseline", "storage-error"]
            .includes(salveApi.getSyncState().status);

        speciesCards.forEach(card => {
            const record = recordsByScientificName.get(card.dataset.scientific);
            if (!record) {
                card.hidden = true;
                console.error(`Espécie não encontrada na lista oficial: ${card.dataset.scientific}`);
                return;
            }
            const officialRecord = salveApi.getCurrentRecord(card.dataset.scientific);
            if (salveSyncComplete &&
                (!officialRecord || !["CR", "EN", "VU"].includes(officialRecord.categoria))) {
                card.hidden = true;
                return;
            }
            const officialBadge = [...card.querySelectorAll(".status-badge")]
                .find(badge => badge.querySelector("small")?.textContent.startsWith("Brasil"));
            if (officialRecord && officialBadge) {
                const statusClass = officialRecord.categoria === "CR"
                    ? "critical"
                    : officialRecord.categoria === "EN" ? "endangered" : "vulnerable";
                officialBadge.className = `status-badge ${statusClass}`;
                const categoryText = [...officialBadge.childNodes].find(node => node.nodeType === 3);
                if (categoryText) categoryText.textContent = `${officialRecord.categoria} `;
                officialBadge.querySelector("small").textContent =
                    `Brasil · SALVE · ${officialRecord.categoriaNome}`;
            }
            const searchable = normalizeSearch(`${card.dataset.search || ""} ${card.textContent}`);
            const matchesSearch = !query || matchesSearchTerms(searchable, query);
            const matchesFilters = (
                filters.biome.value === "todos" || biomeCategory(record) === filters.biome.value
            ) && (
                filters.group.value === "todos" || record.group === filters.group.value
            ) && (
                filters.state.value === "todos" || record.states.includes(filters.state.value)
            ) && (
                filters.status.value === "todos" || record.status === filters.status.value
            );
            const period = filters.period.value;
            const [periodStart, periodEnd] = period === "todos" ? [null, null] : period.split("-").map(Number);
            const matchesPeriod = periodStart === null || (record.year >= periodStart && record.year <= periodEnd);
            card.hidden = !(matchesSearch && matchesFilters && matchesPeriod);
            if (!card.hidden) visibleCount += 1;
        });

        emptyFilterMessage.hidden = query ? true : visibleCount > 0;
        searchResults.replaceChildren();
        searchResults.hidden = !query;
        speciesGrid.hidden = Boolean(query);
        renderSearchSuggestions(query);
        if (!query) return;

        const matchingRecords = salveApi.records.filter(record => {
            const terms = normalizeSearch(salveApi.getSearchText(record));
            return matchesSearchTerms(terms, query) && matchesSpeciesFilters(record);
        });
        const resultHeading = document.createElement("p");
        resultHeading.className = "species-search-count";
        const totalMatches = matchingRecords.length;
        resultHeading.textContent = `${totalMatches} ${totalMatches === 1 ? "espécie encontrada" : "espécies encontradas"} na lista do SALVE.`;
        searchResults.append(resultHeading);

        if (!totalMatches) {
            const empty = document.createElement("p");
            empty.className = "empty-filter";
            empty.textContent = "Nenhuma espécie encontrada. Confira a grafia ou ajuste os filtros.";
            searchResults.append(empty);
            return;
        }

        renderSpeciesSearchPage(matchingRecords, totalMatches);
    }

    function renderSpeciesSearchPage(apiMatches, totalMatches) {
        const resultGrid = document.createElement("div");
        resultGrid.className = "species-search-results-grid";
        const visibleRecords = apiMatches.slice(0, searchPage * searchPageSize);
        visibleRecords.forEach((record, index) => {
            resultGrid.append(createApiSpeciesCard(record, index));
        });
        searchResults.replaceChildren(searchResults.querySelector(".species-search-count"), resultGrid);
        if (visibleRecords.length < apiMatches.length) {
            const more = document.createElement("button");
            more.className = "species-search-more";
            more.type = "button";
            more.textContent = `Carregar mais espécies (${visibleRecords.length} de ${apiMatches.length})`;
            more.addEventListener("click", () => {
                searchPage += 1;
                renderSpeciesSearchPage(apiMatches, totalMatches);
            });
            searchResults.append(more);
        }

    }

    function renderSalveUpdates(state) {
        const syncTime = document.getElementById("salve-sync-time");
        const syncMessage = document.getElementById("salve-sync-message");
        const updateList = document.getElementById("salve-update-list");
        const refreshButton = document.getElementById("salve-refresh");
        const checkedAt = state.checkedAt ? new Date(state.checkedAt) : null;
        syncTime.textContent = checkedAt && !Number.isNaN(checkedAt.getTime())
            ? `Última consulta: ${new Intl.DateTimeFormat("pt-BR", {
                dateStyle: "short",
                timeStyle: "short"
            }).format(checkedAt)}`
            : state.status === "loading" ? "Consultando..." : "Aguardando consulta";
        refreshButton.disabled = state.status === "loading";
        refreshButton.textContent = state.status === "loading" ? "Consultando..." : "Atualizar agora";
        syncMessage.textContent = state.error
            ? `${state.message} Detalhe: ${state.error}`
            : state.message;
        updateList.replaceChildren();

        const events = state.events || [];
        if (!events.length) {
            const empty = document.createElement("li");
            empty.className = "salve-update-item";
            empty.textContent = state.status === "baseline"
                ? "O histórico começa nesta consulta; mudanças aparecerão após a próxima verificação diária."
                : state.status === "error" || state.status === "loading" || state.status === "idle"
                    ? "As mudanças serão detectadas após uma consulta bem-sucedida ao SALVE."
                    : "Nenhuma mudança registrada desde o início do monitoramento.";
            updateList.append(empty);
            return;
        }

        events.slice(0, 10).forEach(event => {
            const item = document.createElement("li");
            item.className = "salve-update-item";
            item.dataset.type = event.type;
            const name = document.createElement("strong");
            name.textContent = event.nome;
            const scientific = document.createElement("em");
            scientific.textContent = event.nomeCientifico;
            const message = document.createElement("span");
            message.textContent = event.message;
            item.append(name, scientific, message);

            if (event.at) {
                const eventTime = new Date(event.at);
                if (!Number.isNaN(eventTime.getTime())) {
                    const time = document.createElement("time");
                    time.dateTime = event.at;
                    time.textContent = new Intl.DateTimeFormat("pt-BR", {
                        dateStyle: "short",
                        timeStyle: "short"
                    }).format(eventTime);
                    item.append(time);
                }
            }

            if (event.fonte) {
                const source = document.createElement("a");
                source.href = event.fonte;
                source.target = "_blank";
                source.rel = "noopener noreferrer";
                source.textContent = "Ver avaliação no SALVE";
                item.append(source);
            }
            updateList.append(item);
        });
    }

    speciesCards.forEach(card => {
        const record = salveApi.getByScientificName(card.dataset.scientific);
        if (!record || card.querySelector(".salve-featured-source")) return;
        const source = document.createElement("a");
        source.className = "species-source salve-featured-source";
        source.href = record.fonte;
        source.target = "_blank";
        source.rel = "noopener noreferrer";
        source.append(document.createTextNode("Ficha oficial no SALVE "));
        const icon = document.createElement("i");
        icon.className = "bi bi-box-arrow-up-right";
        icon.setAttribute("aria-hidden", "true");
        source.append(icon);
        card.querySelector(".species-content").append(source);
    });

    function renderDashboard() {
        const list = filteredRecords();
        const hasAdditionalFilters = (
            filters.group.value !== "todos" ||
            filters.state.value !== "todos" ||
            filters.status.value !== "todos" ||
            filters.period.value !== "todos"
        );
        const selectedBiome = filters.biome.value;
        const selectedBiomeLabel = selectedBiome === unassignedBiomeKey
            ? unassignedBiomeLabel
            : selectedBiome;
        const useOfficialSummary = !hasAdditionalFilters;
        const officialRecords = salveApi.records.filter(record =>
            selectedBiome === "todos" || biomeCategory(record) === selectedBiome
        );
        const officialStatusCounts = Object.fromEntries(Object.keys(statusInfo).map(status => [
            status,
            officialRecords.filter(record => record.categoria === status).length
        ]));
        const threatenedCount = useOfficialSummary
            ? Object.values(officialStatusCounts).reduce((sum, count) => sum + count, 0)
            : list.length;
        const criticalCount = useOfficialSummary
            ? officialStatusCounts.CR
            : list.filter(record => record.status === "CR").length;
        const affectedBiomes = new Set(list.map(primaryBiome).filter(Boolean));

        document.querySelector('[data-indicator="evaluated"]').textContent = numberFormat.format(salveSummary.evaluated);
        document.querySelector('[data-indicator="threatened"]').textContent = numberFormat.format(threatenedCount);
        document.querySelector('[data-indicator="critical"]').textContent = numberFormat.format(criticalCount);
        document.querySelector('[data-indicator="biomes"]').textContent = numberFormat.format(
            useOfficialSummary
                ? (selectedBiome === "todos" ? biomeNames.length : Number(selectedBiome !== unassignedBiomeKey))
                : affectedBiomes.size
        );
        document.getElementById("filter-summary").textContent = useOfficialSummary
            ? `${numberFormat.format(threatenedCount)} espécies ameaçadas no SALVE${selectedBiome === "todos" ? "" : ` para ${selectedBiomeLabel}`}.`
            : `${numberFormat.format(list.length)} registros carregados correspondem aos filtros selecionados.`;

        renderStatusChart(list, useOfficialSummary ? officialStatusCounts : null);
        const groupCounts = useOfficialSummary && selectedBiome === "todos"
            ? Object.fromEntries(groupNames.map(group => [
                group,
                salveApi.records.filter(record =>
                    record.grupo === group ||
                    (group === "Peixes" && record.grupo.startsWith("Peixes")) ||
                    (group === "Invertebrados" && record.grupo.startsWith("Invertebrados"))
                ).length
            ]))
            : Object.fromEntries(groupNames.map(group => [
                group,
                useOfficialSummary
                    ? officialRecords.filter(record =>
                        record.grupo === group ||
                        (group === "Peixes" && record.grupo.startsWith("Peixes")) ||
                        (group === "Invertebrados" && record.grupo.startsWith("Invertebrados"))
                    ).length
                    : list.filter(record => record.group === group).length
            ]));
        const groupChart = document.getElementById("group-bars");
        groupChart.replaceChildren();
        groupNames.forEach(group => appendBar(
            groupChart,
            group,
            groupCounts[group],
            Math.max(...Object.values(groupCounts)),
            "var(--field-gold)"
        ));

        const biomeList = filteredRecords(true);
        const biomeCounts = useOfficialSummary
            ? countBiomes(salveApi.records)
            : countBiomes(biomeList);
        const biomeChart = document.getElementById("biome-bars");
        biomeChart.replaceChildren();
        biomeDistributionNames.forEach(biome => {
            const label = biome === unassignedBiomeKey ? unassignedBiomeLabel : biome;
            appendBar(
                biomeChart,
                label,
                biomeCounts[biome],
                Math.max(...Object.values(biomeCounts)),
                biomeColors[biome] || unassignedBiomeColor
            );
        });
        renderTimeline(list);
        renderMap(biomeCounts);
        renderSpeciesCards();
    }

    Object.values(filters).forEach(control => {
        control?.addEventListener(control === filters.search ? "input" : "change", renderDashboard);
    });
    searchSuggestions.addEventListener("click", event => {
        const button = event.target.closest(".species-suggestion");
        if (!button) return;
        const record = salveApi.getByScientificName(button.dataset.scientific);
        if (record) selectSearchSuggestion(record);
    });
    filters.search.addEventListener("keydown", event => {
        const suggestions = [...searchSuggestions.querySelectorAll(".species-suggestion")];
        if (event.key === "Escape") {
            hideSearchSuggestions();
            return;
        }
        if (!suggestions.length) return;
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            const direction = event.key === "ArrowDown" ? 1 : -1;
            activeSuggestionIndex = (activeSuggestionIndex + direction + suggestions.length) % suggestions.length;
            suggestions.forEach((button, index) => {
                const active = index === activeSuggestionIndex;
                button.closest('[role="option"]').setAttribute("aria-selected", String(active));
                button.classList.toggle("active", active);
            });
            filters.search.setAttribute("aria-activedescendant", `species-suggestion-${activeSuggestionIndex}`);
        } else if (event.key === "Enter" && activeSuggestionIndex >= 0) {
            event.preventDefault();
            suggestions[activeSuggestionIndex].click();
        }
    });
    document.addEventListener("click", event => {
        if (!event.target.closest(".species-tools")) hideSearchSuggestions();
    });
    filterForm.addEventListener("reset", () => setTimeout(renderDashboard, 0));
    mapDetails.addEventListener("click", event => {
        const button = event.target.closest("[data-biome]");
        if (button) selectBiome(button.dataset.biome);
    });
    mapImage.addEventListener("click", event => {
        const bounds = mapImage.getBoundingClientRect();
        const x = Math.floor((event.clientX - bounds.left) * mapImage.naturalWidth / bounds.width);
        const y = Math.floor((event.clientY - bounds.top) * mapImage.naturalHeight / bounds.height);
        const [red, green, blue, alpha] = mapContext.getImageData(x, y, 1, 1).data;

        if (alpha < 128) return;

        const closestBiome = mapBiomeColors.reduce((closest, biome) => {
            const distance = Math.hypot(red - biome.red, green - biome.green, blue - biome.blue);
            return distance < closest.distance ? { name: biome.name, distance } : closest;
        }, { name: null, distance: Infinity });

        if (closestBiome.distance <= 50) selectBiome(closestBiome.name);
    });

    mapCanvas.width = mapImage.naturalWidth;
    mapCanvas.height = mapImage.naturalHeight;
    mapContext.drawImage(mapImage, 0, 0);

    renderDashboard();
    renderSalveUpdates(salveApi.getSyncState());
    document.getElementById("salve-refresh").addEventListener("click", () => salveApi.refresh(true));
    salveApi.subscribe(state => {
        renderSalveUpdates(state);
        if (["current", "updated", "baseline", "storage-error"].includes(state.status)) {
            renderDashboard();
        }
    });
    salveApi.refresh();
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) salveApi.refresh();
    });
    globalThis.setInterval(() => salveApi.refresh(), 60 * 60 * 1000);
})();
