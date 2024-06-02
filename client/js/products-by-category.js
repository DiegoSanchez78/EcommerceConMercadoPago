document.addEventListener('DOMContentLoaded', function() {
    const categoriesContainer = document.getElementById('categories');

    fetch('https://api.escuelajs.co/api/v1/categories')
        .then(response => response.json())
        .then(categories => {
            categories.forEach(category => {
                const categoryCard = document.createElement('div');
                categoryCard.classList.add('category-card');
                
                // Crear la imagen de la categoría
                const categoryImage = document.createElement('img');
                categoryImage.src = category.image;
                categoryImage.alt = category.name;
                categoryCard.appendChild(categoryImage);

                // Crear el nombre de la categoría
                const categoryName = document.createElement('h3');
                categoryName.textContent = category.name;
                categoryCard.appendChild(categoryName);

                // Añadir el evento click a la tarjeta para redirigir a los productos de la categoría
                categoryCard.addEventListener('click', () => {
                    window.location.href = `category-products.html?category=${category.id}`;
                });

                categoriesContainer.appendChild(categoryCard);
            });
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
        });
});
