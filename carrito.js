document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM completamente cargado y parseado");

    const cartItemsContainer = document.getElementById("cart-items");
    console.log("cartItemsContainer:", cartItemsContainer);
    const totalElement = document.getElementById("total-price");
    console.log("totalElement:", totalElement);
    const cartCount = document.getElementById("cart-count");
    console.log("cartCount:", cartCount);

    if (!cartItemsContainer || !totalElement || !cartCount) {
        console.error("Uno o más elementos necesarios no se encontraron en el DOM");
        return;
    }

    console.log("Elementos inicializados correctamente");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cleanInvalidProducts();
    updateCart();

    function cleanInvalidProducts() {
        const initialCartLength = cart.length;
        cart = cart.filter(product => product.id && product.name && product.price && product.image);
        if (cart.length !== initialCartLength) {
            console.log("Productos inválidos eliminados del carrito");
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }

    function updateCart() {
        console.log("Actualizando carrito");
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(product => {
            console.log("Producto en carrito:", product);

            if (!product.price) {
                console.error("El producto no tiene precio:", product);
                return;
            }

            const productElement = document.createElement("div");
            productElement.classList.add("bg-white", "p-6", "rounded-lg", "shadow-md", "flex", "items-center", "space-x-4", "cart-item");
            productElement.setAttribute("data-price", product.price);
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="w-24 h-24 rounded-full">
                <div>
                    <h3 class="text-lg font-semibold">${product.name}</h3>
                    <p class="text-gray-500">Precio: $${product.price.toFixed(2)}</p>
                    <label for="quantity-${product.id}">Cantidad:</label>
                    <input type="number" id="quantity-${product.id}" name="quantity" min="1" value="${product.quantity}" class="quantity-input" data-id="${product.id}">
                </div>
                <button class="ml-auto text-red-500 remove-item" data-id="${product.id}">Eliminar</button>
            `;
            cartItemsContainer.appendChild(productElement);

            total += product.price * product.quantity;
        });

        totalElement.innerText = `Total: $${total.toFixed(2)}`;
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const productId = button.getAttribute("data-id");
                removeFromCart(productId);
            });
        });

        document.querySelectorAll(".quantity-input").forEach(input => {
            input.addEventListener("input", function () {
                const productId = input.getAttribute("data-id");
                const quantity = parseInt(input.value);
                console.log(`Cantidad cambiada para el producto ${productId}: ${quantity}`);
                if (quantity < 1) {
                    input.value = 1;
                }
                updateProductQuantity(productId, quantity);
            });
        });
    }

    function updateCartCount() {
        const totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);
        console.log("Total de artículos en el carrito:", totalItems);
        cartCount.innerText = totalItems;
    }

    function removeFromCart(id) {
        cart = cart.filter(product => product.id !== id);
        updateCart();
    }

    function updateProductQuantity(id, quantity) {
        const productIndex = cart.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            cart[productIndex].quantity = quantity;
            console.log(`Cantidad actualizada para el producto ${id}: ${quantity}`);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCart();
        } else {
            console.error(`Producto con ID ${id} no encontrado en el carrito`);
        }
    }
});
