document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('category');
    loadCartFromLocalStorage(); // Cargar carrito al iniciar
    displayCartCounter(); // Actualizar el contador

    if (!categoryId) {
        console.error('Category id not found in URL');
        return;
    }

    const shopContent = document.getElementById('shopContent');
    const cartBtn = document.getElementById('cart-btn');
    const cartCounter = document.getElementById('cart-counter');

    let filteredProducts = [];

    fetch(`https://api.escuelajs.co/api/v1/products`)
        .then(response => response.json())
        .then(products => {
            filteredProducts = products.filter(product => parseInt(product.category.id) === parseInt(categoryId));
            console.log(filteredProducts);

            if (filteredProducts.length === 0) {
                const noProductsMessage = document.createElement('p');
                noProductsMessage.textContent = 'No products found in this category';
                shopContent.appendChild(noProductsMessage);
            } else {
                filteredProducts.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.classList.add('card');
                    productCard.innerHTML = `
                        <div class="card-image">
                            <img src="${product.images[0]}" alt="${product.title}">
                        </div>
                        <div class="card-content">
                            <h3>${product.title}</h3>
                            <p class="price">$${product.price}</p>
                            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                        </div>
                    `;
                    shopContent.appendChild(productCard);
                });

                const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
                addToCartButtons.forEach(button => {
                    button.addEventListener('click', addToCartHandler);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });

    function addToCartHandler(event) {
        const productId = event.target.dataset.id;
        const product = getProductById(productId);
        addToCart(product);
        saveCartToLocalStorage();
        displayCartCounter();
    }

    function getProductById(id) {
        // Obtén el producto de la lista de productos previamente cargada
        return filteredProducts.find(product => product.id == id);
    }

    function addToCart(product) {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quanty += 1;
        } else {
            cart.push({ ...product, quanty: 1 });
        }
        console.log('Cart:', cart);
    }
});
