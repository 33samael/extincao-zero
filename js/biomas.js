(() => {
    "use strict";

    const journey = document.getElementById("biome-stops");
    const videoStage = document.querySelector(".biome-video-stage");
    const video = document.getElementById("biome-background-video");
    const journeyCount = document.getElementById("biome-journey-count");
    const journeyName = document.getElementById("biome-journey-name");
    const journeyProgress = document.getElementById("biome-journey-progress");

    if (!journey || !videoStage || !video) return;

    const stops = [...journey.querySelectorAll(".biome-stop")];
    const links = [...document.querySelectorAll(".biome-atlas-nav a")];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let activeStop = null;
    let scrollFrame = 0;

    function setActiveStop(stop) {
        if (activeStop === stop) return;
        activeStop = stop;

        stops.forEach(item => {
            const isActive = item === stop;
            item.toggleAttribute("data-active", isActive);
        });
        links.forEach(link => {
            const isActive = stop && link.hash === `#${stop.id}`;
            if (isActive) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
        });

        if (!stop) {
            videoStage.classList.remove("is-visible");
            video.pause();
            delete video.dataset.source;
            document.body.classList.remove("biome-video-active");
            journeyCount.textContent = "00 / 06";
            journeyName.textContent = "Escolha uma paisagem";
            journeyProgress.style.width = "0%";
            return;
        }

        const index = stops.indexOf(stop) + 1;
        journeyCount.textContent = `${String(index).padStart(2, "0")} / 06`;
        journeyName.textContent = stop.dataset.biomeName;
        journeyProgress.style.width = `${index / stops.length * 100}%`;

        const poster = stop.dataset.poster;
        const source = stop.dataset.video;
        if (poster) {
            video.poster = poster;
            videoStage.style.setProperty("--biome-poster", `url("${new URL(poster, document.baseURI).href}")`);
        }
        videoStage.classList.add("is-visible");
        document.body.classList.add("biome-video-active");

        if (reducedMotion.matches || !source || video.dataset.source === source) return;

        video.dataset.source = source;
        videoStage.classList.add("video-unavailable");
        video.pause();
        video.src = source;
        video.load();
        video.play().catch(error => {
            if (error.name !== "AbortError" && activeStop === stop) {
                console.error(`Não foi possível reproduzir o vídeo do bioma ${stop.dataset.biomeName}.`, error);
            }
        });
    }

    function updateActiveStop() {
        scrollFrame = 0;
        const journeyBounds = journey.getBoundingClientRect();
        if (journeyBounds.bottom <= 0 || journeyBounds.top >= window.innerHeight) {
            setActiveStop(null);
            return;
        }

        const viewportCenter = window.innerHeight / 2;
        const visibleStops = stops
            .map(stop => {
                const bounds = stop.getBoundingClientRect();
                const visibleHeight = Math.max(
                    0,
                    Math.min(bounds.bottom, window.innerHeight) - Math.max(bounds.top, 0)
                );
                return {
                    stop,
                    visibleHeight,
                    centerDistance: Math.abs((bounds.top + bounds.bottom) / 2 - viewportCenter)
                };
            })
            .filter(item => item.visibleHeight > 0)
            .sort((a, b) => b.visibleHeight - a.visibleHeight || a.centerDistance - b.centerDistance);

        setActiveStop(visibleStops[0]?.stop || null);
    }

    function scheduleUpdate() {
        if (scrollFrame) return;
        scrollFrame = window.requestAnimationFrame(updateActiveStop);
    }

    video.addEventListener("error", () => {
        if (!activeStop || video.dataset.source !== activeStop.dataset.video) return;
        videoStage.classList.add("video-unavailable");
        const name = activeStop?.dataset.biomeName || "selecionado";
        console.error(`Falha ao carregar o vídeo do bioma ${name}.`);
    });
    video.addEventListener("loadeddata", () => {
        videoStage.classList.remove("video-unavailable");
    });

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);
    reducedMotion.addEventListener("change", () => {
        if (reducedMotion.matches) {
            video.pause();
            delete video.dataset.source;
            videoStage.classList.remove("is-visible");
            document.body.classList.remove("biome-video-active");
        } else {
            activeStop = null;
            scheduleUpdate();
        }
    });

    scheduleUpdate();
})();
