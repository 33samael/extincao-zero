const problemSection = document.querySelector(".problem-section");

if (problemSection && "IntersectionObserver" in window) {
	const problemObserver = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add("visible");
					problemObserver.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.2 }
	);

	problemObserver.observe(problemSection);
}

const slides = document.querySelectorAll(".field-slide");
const dots = document.querySelectorAll(".carousel-dot");
const nextButton = document.getElementById("carousel-next");
const prevButton = document.getElementById("carousel-prev");
const pauseButton = document.getElementById("carousel-pause");

if (slides.length && dots.length === slides.length) {
	let currentSlide = 0;
	let carouselInterval;
	let isPaused = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	function showSlide(index) {
		slides.forEach(slide => slide.classList.remove("active"));
		dots.forEach((dot, dotIndex) => {
			dot.classList.toggle("active", dotIndex === index);
			dot.setAttribute("aria-pressed", String(dotIndex === index));
		});
		slides[index].classList.add("active");
		currentSlide = index;
	}

	function moveSlide(direction) {
		showSlide((currentSlide + direction + slides.length) % slides.length);
	}

	function startCarousel() {
		clearInterval(carouselInterval);
		if (isPaused) return;
		carouselInterval = setInterval(() => {
			if (!isPaused) moveSlide(1);
		}, 6000);
	}

	nextButton?.addEventListener("click", () => {
		moveSlide(1);
		startCarousel();
	});

	prevButton?.addEventListener("click", () => {
		moveSlide(-1);
		startCarousel();
	});

	dots.forEach((dot, index) => {
		dot.addEventListener("click", () => {
			showSlide(index);
			startCarousel();
		});
	});

	pauseButton?.addEventListener("click", () => {
		isPaused = !isPaused;
		const icon = pauseButton.querySelector("i");

		if (icon) {
			icon.className = isPaused ? "bi bi-play" : "bi bi-pause";
		}
		pauseButton.setAttribute(
			"aria-label",
			isPaused ? "Retomar rotação dos destaques" : "Pausar rotação dos destaques"
		);
	});

	if (isPaused && pauseButton) {
		pauseButton.querySelector("i")?.classList.replace("bi-pause", "bi-play");
		pauseButton.setAttribute("aria-label", "Retomar rotação dos destaques");
	}

	showSlide(0);
	startCarousel();
}