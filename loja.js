/* =========================================================
   PRODUTOS
========================================================= */

const products = {

    /* =====================================================
       ROUPAS
    ===================================================== */

    bone: {
        id: "bone",
        name: "Boné — Extinção Zero",
        category: "ROUPAS",
        price: 49.90,
        rating: "4.9",
        image: "assets/img/bone.png",
        description:
            "Boné exclusivo da Extinção Zero, inspirado na biodiversidade brasileira e criado para representar a conservação da nossa fauna."
    },

    chapeu_1: {
        id: "chapeu_1",
        name: "Chapéu — Extinção Zero",
        category: "ROUPAS",
        price: 59.90,
        rating: "4.8",
        image: "assets/img/chapeu_1.png",
        description:
            "Chapéu da coleção Extinção Zero com design inspirado na natureza brasileira."
    },

    chapeu_2: {
        id: "chapeu_2",
        name: "Chapéu — Fauna Brasileira",
        category: "ROUPAS",
        price: 59.90,
        rating: "4.8",
        image: "assets/img/chapeu_2.png",
        description:
            "Chapéu inspirado na fauna brasileira, combinando estilo e conscientização ambiental."
    },

    blusa: {
        id: "blusa",
        name: "Blusa — Extinção Zero",
        category: "ROUPAS",
        price: 69.90,
        rating: "4.9",
        image: "assets/img/blusa.png",
        description:
            "Blusa exclusiva da Extinção Zero criada para levar a mensagem de preservação da fauna brasileira."
    },


    /* =====================================================
       ACTION FIGURES
    ===================================================== */

    action_figure: {
        id: "action_figure",
        name: "Action Figure — Lobo-guará",
        category: "ACTION FIGURES",
        price: 89.90,
        rating: "4.9",
        image: "assets/img/action_figure.png",
        description:
            "Action figure do lobo-guará, uma das espécies mais emblemáticas do Cerrado e símbolo da biodiversidade brasileira."
    },


    /* =====================================================
       ACESSÓRIOS
    ===================================================== */

    chaveiro: {
        id: "chaveiro",
        name: "Chaveiro — Fauna Brasileira",
        category: "ACESSÓRIOS",
        price: 19.90,
        rating: "4.8",
        image: "assets/img/chaveiro.png",
        description:
            "Chaveiro inspirado na fauna brasileira para você levar a biodiversidade sempre com você."
    },

    boton: {
        id: "boton",
        name: "Boton — Extinção Zero",
        category: "ACESSÓRIOS",
        price: 9.90,
        rating: "4.7",
        image: "assets/img/boton.png",
        description:
            "Boton exclusivo da Extinção Zero com identidade visual inspirada na conservação da fauna brasileira."
    },


    /* =====================================================
       PAPELARIA
    ===================================================== */

    caderno: {
        id: "caderno",
        name: "Caderno — Extinção Zero",
        category: "PAPELARIA",
        price: 34.90,
        rating: "4.9",
        image: "assets/img/caderno.png",
        description:
            "Caderno da coleção Extinção Zero, ideal para estudos, anotações e registros do dia a dia."
    },

    caneta: {
        id: "caneta",
        name: "Caneta — Extinção Zero",
        category: "PAPELARIA",
        price: 7.90,
        rating: "4.7",
        image: "assets/img/caneta.png",
        description:
            "Caneta exclusiva da Extinção Zero com design inspirado na biodiversidade brasileira."
    },

    figurinhas: {
        id: "figurinhas",
        name: "Kit de Figurinhas — Fauna Brasileira",
        category: "PAPELARIA",
        price: 14.90,
        rating: "4.9",
        image: "assets/img/figurinhas.png",
        description:
            "Kit de figurinhas com espécies da fauna brasileira para colecionar e conhecer mais sobre nossa biodiversidade."
    },

    figurinha: {
        id: "figurinha",
        name: "Figurinha — Fauna Brasileira",
        category: "PAPELARIA",
        price: 3.90,
        rating: "4.8",
        image: "assets/img/figurinha.png",
        description:
            "Figurinha individual inspirada em uma espécie da fauna brasileira."
    },


    /* =====================================================
       OUTROS
    ===================================================== */

    bolsa: {
        id: "bolsa",
        name: "Bolsa — Extinção Zero",
        category: "OUTROS",
        price: 49.90,
        rating: "4.8",
        image: "assets/img/bolsa.png",
        description:
            "Bolsa exclusiva da Extinção Zero inspirada na natureza brasileira, ideal para o dia a dia."
    }

};


/* =========================================================
   ESTADO
========================================================= */

let cart = [];

let currentProduct = null;

let modalQuantity = 1;


/* =========================================================
   ELEMENTOS
========================================================= */

const cartElement =
    document.getElementById("cart");

const cartOverlay =
    document.getElementById("cartOverlay");

const openCartButton =
    document.getElementById("openCart");

const closeCartButton =
    document.getElementById("closeCart");

const cartItemsElement =
    document.getElementById("cartItems");

const cartCountElement =
    document.getElementById("cartCount");

const cartSubtotalElement =
    document.getElementById("cartSubtotal");

const productModal =
    document.getElementById("productModal");

const closeModalButton =
    document.getElementById("closeModal");

const modalImage =
    document.getElementById("modalImage");

const modalTitle =
    document.getElementById("modalTitle");

const modalCategory =
    document.getElementById("modalCategory");

const modalPrice =
    document.getElementById("modalPrice");

const modalDescription =
    document.getElementById("modalDescription");

const modalQuantityElement =
    document.getElementById("modalQuantity");

const decreaseQuantityButton =
    document.getElementById("decreaseQuantity");

const increaseQuantityButton =
    document.getElementById("increaseQuantity");

const modalAddCartButton =
    document.getElementById("modalAddCart");


/* =========================================================
   FORMATAÇÃO DE PREÇO
========================================================= */

function formatPrice(value) {

    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


/* =========================================================
   ABRIR CARRINHO
========================================================= */

function openCart() {

    cartElement.classList.add("active");

    cartOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* =========================================================
   FECHAR CARRINHO
========================================================= */

function closeCart() {

    cartElement.classList.remove("active");

    cartOverlay.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================================================
   EVENTOS CARRINHO
========================================================= */

if (openCartButton) {

    openCartButton.addEventListener(
        "click",
        openCart
    );

}

if (closeCartButton) {

    closeCartButton.addEventListener(
        "click",
        closeCart
    );

}

if (cartOverlay) {

    cartOverlay.addEventListener(
        "click",
        closeCart
    );

}


/* =========================================================
   ADICIONAR AO CARRINHO
========================================================= */

function addToCart(id, quantity = 1) {

    const product = products[id];

    if (!product) {
        console.warn(
            `Produto "${id}" não encontrado.`
        );
        return;
    }

    const existingProduct =
        cart.find(item => item.id === id);

    if (existingProduct) {

        existingProduct.quantity += quantity;

    } else {

        cart.push({
            ...product,
            quantity
        });

    }

    renderCart();

    openCart();

}


/* =========================================================
   REMOVER DO CARRINHO
========================================================= */

function removeFromCart(id) {

    cart = cart.filter(
        item => item.id !== id
    );

    renderCart();

}


/* =========================================================
   ALTERAR QUANTIDADE
========================================================= */

function changeCartQuantity(id, amount) {

    const item =
        cart.find(product => product.id === id);

    if (!item) {
        return;
    }

    item.quantity += amount;

    if (item.quantity <= 0) {

        removeFromCart(id);

        return;

    }

    renderCart();

}


/* =========================================================
   RENDER CARRINHO
========================================================= */

function renderCart() {

    if (!cartCountElement ||
        !cartSubtotalElement ||
        !cartItemsElement) {
        return;
    }


    /* TOTAL DE ITENS */

    const totalItems = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );

    cartCountElement.textContent =
        totalItems;


    /* SUBTOTAL */

    const subtotal = cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    cartSubtotalElement.textContent =
        formatPrice(subtotal);


    /* CARRINHO VAZIO */

    if (cart.length === 0) {

        cartItemsElement.innerHTML = `

            <div class="empty-cart">

                <i class="bi bi-bag"></i>

                <p>
                    Seu carrinho está vazio.
                </p>

                <span>
                    Adicione produtos para começar.
                </span>

            </div>

        `;

        return;

    }


    /* PRODUTOS */

    cartItemsElement.innerHTML =
        cart.map(item => {

            return `

                <div class="cart-item">

                    <div class="cart-item-image">

                        ${
                            item.image

                            ? `
                                <img
                                    src="${item.image}"
                                    alt="${item.name}"
                                >
                              `

                            : `
                                <span>
                                    🛍️
                                </span>
                              `
                        }

                    </div>


                    <div class="cart-item-info">

                        <h4>
                            ${item.name}
                        </h4>

                        <p>
                            ${formatPrice(item.price)}
                        </p>


                        <div class="cart-item-quantity">

                            <button
                                onclick="changeCartQuantity(
                                    '${item.id}',
                                    -1
                                )"
                            >
                                −
                            </button>

                            <span>
                                ${item.quantity}
                            </span>

                            <button
                                onclick="changeCartQuantity(
                                    '${item.id}',
                                    1
                                )"
                            >
                                +
                            </button>

                        </div>

                    </div>


                    <button
                        class="remove-item"
                        onclick="removeFromCart(
                            '${item.id}'
                        )"
                        aria-label="Remover produto"
                    >

                        <i class="bi bi-trash3"></i>

                    </button>

                </div>

            `;

        }).join("");

}


/* =========================================================
   BOTÕES "ADICIONAR"
========================================================= */

document.querySelectorAll(".add-cart")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const id =
                    button.dataset.id;

                addToCart(id);

            }
        );

    });


/* =========================================================
   FILTRO DE CATEGORIAS
========================================================= */

const categoryButtons =
    document.querySelectorAll(
        ".category-button"
    );

const productCards =
    document.querySelectorAll(
        ".product-card"
    );

const productCount =
    document.getElementById(
        "productCount"
    );


categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            /* Remove active dos outros */

            categoryButtons.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


            /* Ativa botão selecionado */

            button.classList.add(
                "active"
            );


            /* Categoria */

            const category =
                button.dataset.category;


            let visibleProducts = 0;


            /* Filtra produtos */

            productCards.forEach(card => {

                const cardCategory =
                    card.dataset.category;


                if (
                    category === "todos" ||
                    cardCategory === category
                ) {

                    card.style.display = "";

                    visibleProducts++;

                } else {

                    card.style.display =
                        "none";

                }

            });


            /* Atualiza contador */

            if (productCount) {

                productCount.textContent =
                    visibleProducts;

            }

        }
    );

});


/* =========================================================
   ABRIR MODAL DO PRODUTO
========================================================= */

document.querySelectorAll(".product-view")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const id =
                    button.dataset.product;

                openProductModal(id);

            }
        );

    });


function openProductModal(id) {

    const product =
        products[id];

    if (!product) {

        console.warn(
            `Produto "${id}" não encontrado.`
        );

        return;

    }


    currentProduct = product;

    modalQuantity = 1;


    /* QUANTIDADE */

    if (modalQuantityElement) {

        modalQuantityElement.textContent =
            modalQuantity;

    }


    /* INFORMAÇÕES */

    if (modalCategory) {

        modalCategory.textContent =
            product.category;

    }

    if (modalTitle) {

        modalTitle.textContent =
            product.name;

    }

    if (modalPrice) {

        modalPrice.textContent =
            formatPrice(product.price);

    }

    if (modalDescription) {

        modalDescription.textContent =
            product.description;

    }


    /* IMAGEM */

    if (modalImage) {

        if (product.image) {

            modalImage.src =
                product.image;

            modalImage.alt =
                product.name;

            modalImage.style.display =
                "block";

        } else {

            modalImage.style.display =
                "none";

        }

    }


    /* ABRE MODAL */

    if (productModal) {

        productModal.classList.add(
            "active"
        );

        document.body.style.overflow =
            "hidden";

    }

}


/* =========================================================
   FECHAR MODAL
========================================================= */

function closeProductModal() {

    if (!productModal) {
        return;
    }

    productModal.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


if (closeModalButton) {

    closeModalButton.addEventListener(
        "click",
        closeProductModal
    );

}


if (productModal) {

    productModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                productModal
            ) {

                closeProductModal();

            }

        }
    );

}


/* =========================================================
   QUANTIDADE DO MODAL
========================================================= */

if (decreaseQuantityButton) {

    decreaseQuantityButton.addEventListener(
        "click",
        () => {

            if (modalQuantity > 1) {

                modalQuantity--;

                modalQuantityElement.textContent =
                    modalQuantity;

            }

        }
    );

}


if (increaseQuantityButton) {

    increaseQuantityButton.addEventListener(
        "click",
        () => {

            modalQuantity++;

            modalQuantityElement.textContent =
                modalQuantity;

        }
    );

}


/* =========================================================
   ADICIONAR PELO MODAL
========================================================= */

if (modalAddCartButton) {

    modalAddCartButton.addEventListener(
        "click",
        () => {

            if (!currentProduct) {
                return;
            }

            addToCart(
                currentProduct.id,
                modalQuantity
            );

            closeProductModal();

        }
    );

}


/* =========================================================
   ESC
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeCart();

            closeProductModal();

        }

    }
);


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

renderCart();