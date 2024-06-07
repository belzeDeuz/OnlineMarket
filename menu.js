document.addEventListener("DOMContentLoaded", function() {
    const menuBtn = document.querySelector('.menu-btn');
    const navContainer = document.querySelector('.nav-container');

    menuBtn.addEventListener('click', function() {
        navContainer.classList.toggle('expanded');
    });
});