// Selección de todos los inputs
const inputs = document.querySelectorAll(".input");

// Función para agregar clase 'focus' cuando se hace focus en un input
function focusFunc() {
    let parent = this.parentNode;
    parent.classList.add("focus");
}

// Función para quitar clase 'focus' cuando se pierde el focus en un input y no tiene valor
function blurFunc() {
    let parent = this.parentNode;
    if (this.value === "") {
        parent.classList.remove("focus");
    }
}

// Agregar eventos de focus y blur a cada input
inputs.forEach(input => {
    input.addEventListener("focus", focusFunc);
    input.addEventListener("blur", blurFunc);
});

