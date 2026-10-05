/* =========================================================
   PRODUTOS
========================================================= */

const products = {

    onca: {
        id: "onca",
        name: "Action Figure — Onça-pintada",
        category: "ACTION FIGURES",
        price: 89.90,
        rating: "4.9",
        image: "assets/img/onca.jpg",
        description:
            "Uma representação da onça-pintada, símbolo da fauna brasileira e uma das espécies mais importantes dos nossos ecossistemas."
    },

    camiseta: {
        id: "camiseta",
        name: "Camiseta — Extinção Zero",
        category: "CAMISETAS",
        price: 59.90,
        rating: "4.8",
        image: null,
        description:
            "Camiseta exclusiva da coleção Extinção Zero criada para levar a mensagem de conservação da fauna brasileira."
    },

    acessorio: {
        id: "acessorio",
        name: "Ecobag — Fauna Brasileira",
        category: "ACESSÓRIOS",
        price: 39.90,
        rating: "4.7",
        image: null,
        description:
            "Ecobag reutilizável com identidade visual inspirada na fauna brasileira."
    },

    poster: {
        id: "poster",
        name: "Poster — Fauna Brasileira",
        category: "POSTERS",
        price: 29.90,
        rating: "4.9",
        image: null,
        description:
            "Poster exclusivo para levar a biodiversidade brasileira para dentro da sua casa."
    },

    adesivos: {
        id: "adesivos",
        name: "Kit — Fauna Brasileira",
        category: "ADESIVOS",
        price: 19.90,
        rating: "4.8",
        image: null,
        description:
            "Kit de adesivos inspirado em espécies da fauna brasileira."
    },

    mico: {
        id: "mico",
        name: "Action Figure — Mico-leão",
        category: "ACTION FIGURES",
        price: 79.90,
        rating: "4.9",
        image: "assets/img/mico.png",
        description:
            "Action figure inspirada no mico-leão, uma das espécies mais emblemáticas da fauna brasileira."
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

openCartButton.addEventListener(
    "click",
    openCart
);

closeCartButton.addEventListener(
    "click",
    closeCart
);

cartOverlay.addEventListener(
    "click",
    closeCart
);


/* =========================================================
   ADICIONAR AO CARRINHO
========================================================= */

function addToCart(id, quantity = 1) {

    const product = products[id];

    if (!product) {
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
   REMOVER
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

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCountElement.textContent =
        totalItems;


    const subtotal = cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    cartSubtotalElement.textContent =
        formatPrice(subtotal);


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
                                    <span style="
                                        font-size:28px;
                                    ">
                                        🐆
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
    document.querySelectorAll(".category-button");

const productCards =
    document.querySelectorAll(".product-card");

const productCount =
    document.getElementById("productCount");


categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            categoryButtons.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });

            button.classList.add("active");


            const category =
                button.dataset.category;

            let visibleProducts = 0;


            productCards.forEach(card => {

                const cardCategory =
                    card.dataset.category;


                if (
                    category === "todos" ||
                    cardCategory === category
                ) {

                    card.style.display =
                        "";

                    visibleProducts++;

                } else {

                    card.style.display =
                        "none";

                }

            });


            productCount.textContent =
                visibleProducts;

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
        return;
    }


    currentProduct = product;

    modalQuantity = 1;

    modalQuantityElement.textContent =
        modalQuantity;


    modalCategory.textContent =
        product.category;

    modalTitle.textContent =
        product.name;

    modalPrice.textContent =
        formatPrice(product.price);

    modalDescription.textContent =
        product.description;


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


    productModal.classList.add(
        "active"
    );

    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   FECHAR MODAL
========================================================= */

function closeProductModal() {

    productModal.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


closeModalButton.addEventListener(
    "click",
    closeProductModal
);


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


/* =========================================================
   QUANTIDADE DO MODAL
========================================================= */

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


increaseQuantityButton.addEventListener(
    "click",
    () => {

        modalQuantity++;

        modalQuantityElement.textContent =
            modalQuantity;

    }
);


/* =========================================================
   ADICIONAR PELO MODAL
========================================================= */

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