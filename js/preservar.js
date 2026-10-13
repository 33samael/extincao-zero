/* =========================================================
   CONTRIBUIÇÃO DINÂMICA
========================================================= */

const contributionData = {

    ong: {

        image: "assets/img/onca.jpg",

        label: "APOIE A CONSERVAÇÃO",

        title: "Fortaleça quem protege.",

        description:
            "Conheça organizações que trabalham diretamente " +
            "com conservação da fauna, das florestas e dos oceanos."
    },


    doe: {

        image: "assets/img/amazonia.jpg",

        label: "CONTRIBUA",

        title: "Sua contribuição pode ajudar.",

        description:
            "Doações são uma das formas de apoiar projetos " +
            "de pesquisa, educação ambiental e conservação."
    },


    compartilhe: {

        image: "assets/img/arara.png",

        label: "ESPALHE CONHECIMENTO",

        title: "Informação também protege.",

        description:
            "Compartilhar informações confiáveis ajuda a levar " +
            "o conhecimento sobre biodiversidade para mais pessoas."
    },


    participe: {

        image: "assets/img/queimadas.jpg",

        label: "AÇÃO",

        title: "Faça parte das iniciativas.",

        description:
            "Participe de atividades, projetos e ações ambientais " +
            "que aproximam pessoas da conservação."
    }

};


const contributionCards =
    document.querySelectorAll(".contribution-card");

const contributionImage =
    document.getElementById("contribution-image");

const contributionLabel =
    document.getElementById("contribution-label");

const contributionTitle =
    document.getElementById("contribution-title");

const contributionDescription =
    document.getElementById("contribution-description");

const display =
    document.querySelector(".display-image");


contributionCards.forEach(card => {

    card.addEventListener("click", () => {

        const action =
            card.dataset.action;

        const data =
            contributionData[action];

        if (!data) return;


        contributionCards.forEach(item => {

            item.classList.remove("active");

        });

        card.classList.add("active");


        /*
         * Inicia transição
         */

        display.classList.add("change");


        setTimeout(() => {

            contributionImage.src =
                data.image;

            contributionImage.alt =
                data.title;

            contributionLabel.textContent =
                data.label;

            contributionTitle.textContent =
                data.title;

            contributionDescription.textContent =
                data.description;


            display.classList.remove("change");

        }, 250);

    });

});


