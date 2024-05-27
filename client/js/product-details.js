document.addEventListener("DOMContentLoaded", function() {
    loadCartFromLocalStorage();
    const detallesContainer = document.getElementById("detalles");

    // Obtén el ID del producto de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    console.log("ID del producto:", productId);

    // Realiza una solicitud para obtener los detalles del producto con el ID dado
    // Esta solicitud podría ser a una API o a un archivo JSON que contenga los detalles del producto
    fetch(`https://api.escuelajs.co/api/v1/products/${productId}`)
        .then(response => response.json())
        .then(data => {
            console.log("Detalles del producto:", data);

            // Muestra los detalles del producto en el contenedor de detalles
            if (data) {
                const product = data;
                console.log("Detalles del producto:", product);

                detallesContainer.innerHTML = `
                    <h2 class="titleDescription">${product.title}</h2>
                    <div class="img-and-details">
                        <img class="img-details" src="${product.images[0]}" alt="${product.title}">
                        <p>${product.description}</p>
                    </div>
                    <div class="price">
                    <p class="titleDescription">Precio $ ${product.price}</p>
                    </div>
                `;
            } else {
                detallesContainer.innerHTML = `<p>No se encontraron detalles para este producto.</p>`;
            }
        })
        .catch(error => console.error("Error al obtener los detalles del producto:", error));
});
