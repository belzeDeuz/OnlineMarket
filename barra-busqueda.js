document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById("search-bar");
    const searchButton = document.getElementById("search-button");
    const productContainer = document.querySelector(".ofertas-container, .producto-container");

    function filterProducts() { //Esta función se encarga de filtrar los productos en base al texto de búsqueda ingresado y mostrar un mensaje si no hay resultados.
        const query = searchBar.value.toLowerCase();
        const products = document.querySelectorAll(".oferta, .producto");
        let anyProductVisible = false;

        products.forEach(product => {
            const title = product.querySelector("h3").innerText.toLowerCase();
            if (title.includes(query)) {
                product.style.display = "block";
                anyProductVisible = true;
            } else {
                product.style.display = "none";
            }
        });

        const noResultsMessage = document.getElementById("no-results-message");
        if (!anyProductVisible) {
            if (!noResultsMessage) {
                const message = document.createElement("div");
                message.id = "no-results-message";
                message.innerText = "El artículo no está disponible.";
                message.style.color = "red";
                message.style.fontSize = "20px";
                message.style.textAlign = "center";
                productContainer.appendChild(message);
            }
        } else {
            if (noResultsMessage) {
                noResultsMessage.remove();
            }
        }
    }

    if (searchBar) {
        searchBar.addEventListener("input", filterProducts);
        searchBar.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                e.preventDefault(); 
                filterProducts();
            }
        });
    }

    if (searchButton) {
        searchButton.addEventListener("click", function (e) {
            e.preventDefault();
            filterProducts();
        });
    }
});
