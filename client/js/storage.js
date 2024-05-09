// // Función para guardar el carrito en el almacenamiento local
// const saveCartToLocalStorage = () => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//     console.log('Carrito guardado en el almacenamiento local');
// }

// // Función para cargar el carrito desde el almacenamiento local
// const loadCartFromLocalStorage = () => {
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) {
//         cart = JSON.parse(savedCart);
//     }
// }

// // Cuando la página se carga, intenta cargar el carrito desde el almacenamiento local
// window.addEventListener('load', () => {
//     loadCartFromLocalStorage();
//     displayCart();
// });

// // Agregar evento al botón del carrito para actualizar el carrito y guardar en el almacenamiento local
// cartBtn.addEventListener("click", () => {
//     displayCart();
//     saveCartToLocalStorage();
// });


const saveCartToLocalStorage = () => {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Carrito guardado en el almacenamiento local:', cart);
    } catch (error) {
        console.error('Error al guardar el carrito en el almacenamiento local:', error);
    }
}

const loadCartFromLocalStorage = () => {
    try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            console.log('Carrito cargado desde el almacenamiento local:', cart);
        }
    } catch (error) {
        console.error('Error al cargar el carrito desde el almacenamiento local:', error);
    }
}

// Cuando la página se carga, intenta cargar el carrito desde el almacenamiento local
// window.addEventListener('load', () => {
//     loadCartFromLocalStorage();
//     displayCart();
// });

// // Agregar evento al botón del carrito para actualizar el carrito y guardar en el almacenamiento local
// cartBtn.addEventListener("click", () => {
//     displayCart();
//     saveCartToLocalStorage();
// });
