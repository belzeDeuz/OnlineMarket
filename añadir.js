document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".boton-agregar");
    const cartValueElement = document.getElementById("cart-value");
    const cartCountElement = document.querySelector("#user-cart .relative span");

    // Función para calcular y mostrar el precio total del carrito
    function updateCartValue() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let total = cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
        if (cartValueElement) {
            cartValueElement.innerText = `$${total.toFixed(2)}`;
        }
    }

    // Función para calcular y mostrar el contador de productos en el carrito
    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let totalCount = cart.reduce((sum, product) => sum + product.quantity, 0);
        if (cartCountElement) {
            cartCountElement.innerText = totalCount;
        }
    }

    // Inicializar el valor del carrito y el contador al cargar la página
    updateCartValue();
    updateCartCount();

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            const productElement = button.closest(".producto");
            const productName = productElement.querySelector("h3").innerText;
            const productPriceText = productElement.querySelector(".precio").innerText;
            const productPrice = parseFloat(productPriceText.replace("$", "").trim());
            const productId = productName.toLowerCase().replace(/\s+/g, '-'); // Generar un ID basado en el nombre
            const productImage = productElement.querySelector("img").src;

            if (!productId || !productName || isNaN(productPrice) || !productImage) {
                console.error("Información del producto inválida", { productId, productName, productPrice, productImage });
                return;
            }

            const cartItem = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            };

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            const existingProductIndex = cart.findIndex(item => item.id === productId);

            if (existingProductIndex !== -1) {
                cart[existingProductIndex].quantity += 1;
            } else {
                cart.push(cartItem);
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            // Actualizar el valor del carrito y el contador después de añadir un producto
            updateCartValue();
            updateCartCount();
        });
    });
});
