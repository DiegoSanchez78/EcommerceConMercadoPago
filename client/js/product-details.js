document.addEventListener("DOMContentLoaded", function() {
    loadCartFromLocalStorage(); // Cargar carrito al iniciar
    displayCartCounter(); // Actualizar el contador

    const detallesContainer = document.getElementById("detalles");

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    fetch(`https://api.escuelajs.co/api/v1/products/${productId}`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                const product = data;
                detallesContainer.innerHTML = `
                    <h2 class="titleDescription">${product.title}</h2>
                    <div class="img-and-details">
                        <img class="img-details" src="${product.images[0]}" alt="${product.title}">
                        <p>${product.description}</p>
                    </div>
                    <div class="price">
                        <p class="titleDescription">Precio $ ${product.price}</p>
                    </div>
                    <button id="add-to-cart-btn" class="btn-primary">Agregar al carrito</button>
                `;

                const addToCartBtn = document.getElementById("add-to-cart-btn");
                addToCartBtn.addEventListener("click", () => {
                    const repeat = cart.some((repeatProduct) => repeatProduct.id === product.id);
                    if (repeat) {
                        cart.forEach((productCart) => {
                            if (productCart.id === product.id) {
                                productCart.quanty += 1;
                            }
                        });
                    } else {
                        cart.push({
                            ...product,
                            quanty: 1,
                        });
                    }
                    saveCartToLocalStorage();
                    displayCartCounter();
                });
            } else {
                detallesContainer.innerHTML = `<p>No se encontraron detalles para este producto.</p>`;
            }
        })
        .catch(error => console.error("Error al obtener los detalles del producto:", error));

    const cartBtn = document.getElementById("cart-btn");
    if (cartBtn) {
        cartBtn.addEventListener("click", displayCart);
    }
});
