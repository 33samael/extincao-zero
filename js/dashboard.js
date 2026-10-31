const speciesFilters = {
    search: document.getElementById("species-search"),
    biome: document.getElementById("biome-filter"),
    taxon: document.getElementById("taxon-filter"),
    risk: document.getElementById("risk-filter")
};
const speciesCards = [...document.querySelectorAll(".species-card")];
const emptyFilterMessage = document.getElementById("empty-filter");

function normalizeSearch(value) {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase("pt-BR")
        .trim();
}

function filterSpecies() {
    if (!emptyFilterMessage) return;

    const searchTerm = normalizeSearch(speciesFilters.search?.value || "");
    const biome = speciesFilters.biome?.value || "todos";
    const taxon = speciesFilters.taxon?.value || "todos";
    const risk = speciesFilters.risk?.value || "todos";
    let visibleSpecies = 0;

    speciesCards.forEach(card => {
        const matchesSearch = normalizeSearch(card.dataset.search || card.textContent).includes(searchTerm);
        const matchesBiome = biome === "todos" || card.dataset.biomes.split(" ").includes(biome);
        const matchesTaxon = taxon === "todos" || card.dataset.taxon === taxon;
        const matchesRisk = risk === "todos" || card.dataset.risk === risk;
        const matches = matchesSearch && matchesBiome && matchesTaxon && matchesRisk;

        card.hidden = !matches;
        if (matches) visibleSpecies += 1;
    });

    emptyFilterMessage.hidden = visibleSpecies > 0;
}

Object.values(speciesFilters).forEach(filter => {
    filter?.addEventListener(filter instanceof HTMLInputElement ? "input" : "change", filterSpecies);
});
