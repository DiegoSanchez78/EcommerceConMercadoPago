


const shopContent = document.getElementById("shopContent");
let cart = [];


    fetch("https://api.escuelajs.co/api/v1/products")
    .then(response => response.json())
    .then(data => {
        // Iterar sobre los productos recibidos
        data.forEach(product => {
            if(product.id <= 49) {
            const content = document.createElement("div");
            content.className = "card";
            content.innerHTML = `
            <img src="${product.images[0]}">
                <h3>${product.title}</h3>
                <p class="price">$ ${product.price} </p>
                <div id="detalles"></div>
            `;
            content.addEventListener("click", (event) => {
                


                
                // Verifica si el clic fue en el botón "Comprar"
                if (!event.target.matches('button')) {
                    console.log(product.description)
                    window.location.href = `product-details.html?id=${product.id}`;

                    //Si no fue en el botón "Comprar", redirige a la página de detalles del producto
                    const detalles = document.getElementById("detalles");
                    detalles.style.display = "block";
                    detalles.innerHTML = `<p>${product.description}</p>`
                    content.append(detalles);
                   
                    detalles.innerHTML = `
                    <div class="product-details">
                       
                        <h2 id"detalles">${product.title}</h2>
                        <p>${product.description}</p>
                        <p class="price">$ ${product.price}</p> 
                    </div>
                     `;  
                 

                }
                
            });
            
    shopContent.append(content);

    

    const buyButton = document.createElement("button");
    buyButton.innerText = "Comprar";

    content.append(buyButton);

    buyButton.addEventListener("click", () => {
        //buscar repetido
        const repeat = cart.some((repeatProduct) => repeatProduct.id === product.id);
        if (repeat) {
            cart.forEach((productCart) => {
                if (productCart.id === product.id) {
                    productCart.quanty += 1;
                    displayCartCounter();
                }
            });
        } else {
            cart.push({
                ...product,
                quanty: 1,
            });
            displayCartCounter()
        }
        console.log(cart);
        // // Guardar el carrito en el almacenamiento local antes de cambiar de página
        // saveCartToLocalStorage();
       saveCartToLocalStorage()
        // // Navegar a la página de detalles del producto
        // window.location.href = `product-details.html?id=${product.id}`;
    })
}
})
 
})
.catch(error => console.error("Error al obtener los productos:", error));



