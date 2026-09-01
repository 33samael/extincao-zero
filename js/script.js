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

if (problemSection) {
    problemObserver.observe(problemSection);
}