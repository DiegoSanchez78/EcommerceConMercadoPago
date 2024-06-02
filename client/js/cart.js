const modalContainer = document.getElementById("modal-container");
const modalOverlay = document.getElementById("modal-overlay");
const cartBtn = document.getElementById("cart-btn");
const cartCounter = document.getElementById("cart-counter");

const displayCart = () => {
    loadCartFromLocalStorage(); // Asegúrate de cargar el carrito
    modalContainer.innerHTML = "";
    modalContainer.style.display = "block";
    modalOverlay.style.display = "block";

    const modalHeader = document.createElement("div");
    const modalClose = document.createElement("div");
    modalClose.innerHTML = `<i class="fa-solid fa-x"></i>`;
    modalClose.className = "modal-close";
    modalHeader.append(modalClose);

    modalClose.addEventListener("click", () => {
        modalContainer.style.display = "none";
        modalOverlay.style.display = "none";
    });
    
    const modalTitle = document.createElement("div");
    modalTitle.innerText = "Productos en el carrito:";
    modalTitle.className = "modal-title";
    modalHeader.append(modalTitle);

    modalContainer.append(modalHeader);

    if (cart.length > 0) {
        cart.forEach((product) => {
            const modalBody = document.createElement("div");
            modalBody.className = "modal-body";
            modalBody.innerHTML = `
                <div class="product">
                    <img src="${product.images[0]}">
                    <div class="product-info">
                        <h4>${product.title}</h4>
                    </div>
                    <div class="quantity">
                        <span class="quantity-btn-decrease"> <i class="fa-solid fa-minus"></i> </span>
                        <span class="quantity-input">${product.quanty}</span>
                        <span class="quantity-btn-increase"> <i class="fa-solid fa-plus"></i> </span>
                    </div>
                    <div class="price">$ ${product.price * product.quanty}</div>
                    <i class="bx bx-trash-alt"></i>
                    <div class="delete-product"> <i class="fa-solid fa-square-xmark"></i></div>
                </div>
            `;
            modalContainer.append(modalBody);

            const decreaseBtn = modalBody.querySelector(".quantity-btn-decrease");
            decreaseBtn.addEventListener("click", () => {
                if (product.quanty > 1) {
                    product.quanty--;
                    saveCartToLocalStorage();
                    displayCart();
                }
                displayCartCounter();
            });

            const increaseBtn = modalBody.querySelector(".quantity-btn-increase");
            increaseBtn.addEventListener("click", () => {
                product.quanty++;
                saveCartToLocalStorage();
                displayCart();
                displayCartCounter();
            });

            const deleteProduct = modalBody.querySelector(".delete-product");
            deleteProduct.addEventListener("click", () => {
                deleteCartProduct(product.id);
                displayCartCounter();
            });
        });

        const total = cart.reduce((acc, producto) => acc + producto.price * producto.quanty, 0);
        const modalFooter = document.createElement("div");
        modalFooter.className = "modal-footer";
        modalFooter.innerHTML = `
            <div class="total-price">
                <h3 class="total">Total: $ ${total}</h3>
            </div>
            <button class="btn-primary" id="checkout-btn">Ir a pagar</button>
            <button class="btn-primary" id="clear-cart-btn">Eliminar todos</button>
            <div id="button-checkout"></div>
        `;
        modalContainer.append(modalFooter);

        const mercadopago = new MercadoPago("TEST-f8e80416-ec26-4a7c-a2d7-a749c019d669", {
            locale: "es-AR",
        });
        const checkoutButton = modalFooter.querySelector("#checkout-btn");
        const clearCartButton = modalFooter.querySelector("#clear-cart-btn");

        checkoutButton.addEventListener("click", function() {
            checkoutButton.remove();

            const orderData = {
                quantity: 1,
                description: "compra de ecommerce",
                price: total,
            };

            fetch("http://localhost:8080/create_preference", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (preference) {
                createCheckoutButton(preference.id);
            })
            .catch(function () {
                alert("Ocurrió un error");
            });
        });

        clearCartButton.addEventListener("click", function() {
            clearCart();
        });

        function createCheckoutButton(preferenceId) {
            const bricksBuilder = mercadopago.bricks();

            const renderComponent = async (bricksBuilder) => {
                await bricksBuilder.create(
                    "wallet",
                    "button-checkout",
                    {
                        initialization: {
                            preferenceId: preferenceId,
                        },
                        callbacks: {
                            onError: (error) => console.error(error),
                            onReady: () => {},
                        }
                    }
                );
            };
            window.checkoutButton = renderComponent(bricksBuilder);
        }
    } else {
        const modalText = document.createElement("h2");
        modalText.className = "modal-body";
        modalText.innerHTML = "No hay productos";
        
        modalContainer.append(modalText);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const cartBtn = document.getElementById("cart-btn");
    if (cartBtn) {
        cartBtn.addEventListener("click", displayCart);
    }
    loadCartFromLocalStorage(); // Cargar carrito al iniciar
    displayCartCounter(); // Actualizar el contador
});

cartBtn.addEventListener("click", displayCart);

const deleteCartProduct = (id) => {
    const foundId = cart.findIndex((producto) => producto.id === id);
    cart.splice(foundId, 1);
    saveCartToLocalStorage();
    displayCart();
    displayCartCounter();
}

const clearCart = () => {
    cart = [];
    saveCartToLocalStorage();
    displayCart();
    displayCartCounter();
}

const displayCartCounter = () => {
    const cartLength = cart.reduce((acc, el) => acc + el.quanty, 0);
    if (cart.length > 0) {
        cartCounter.style.display = "block";
        cartCounter.innerText = cartLength;
    } else {
        cartCounter.style.display = "none";
    }
}
