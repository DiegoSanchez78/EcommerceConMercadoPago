


document.addEventListener("DOMContentLoaded", function() {
    loadCartFromLocalStorage();
    const detallesContainer = document.getElementById("detalles");

    // Obtén el ID del producto de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Realiza una solicitud para obtener los detalles del producto con el ID dado
    // Esta solicitud podría ser a una API o a un archivo JSON que contenga los detalles del producto
    fetch(`https://api.escuelajs.co/api/v1/products?id=${productId}`)
        .then(response => response.json())
        .then(data => {
            // Muestra los detalles del producto en el contenedor de detalles
            // Verifica si se encontró un producto con el ID dado
            
            if (data && data.length > 0) {
                const product = data[0]; // Si la respuesta es un array, toma el primer elemento
                detallesContainer.innerHTML = `
                    <h2>${product.title}</h2>
                    <div class="img-and-details">
                        <img class="img-details" src="${product.images[0]}}">
                        <p>${product.description}</p>
                    </div>
                    <p class="price">$ ${product.price}</p>
                `;
            } else {
                detallesContainer.innerHTML = `<p>No se encontraron detalles para este producto.</p>`;
            }
        })
        .catch(error => console.error("Error al obtener los detalles del producto:", error));
});
