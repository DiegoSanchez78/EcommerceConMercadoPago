

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

