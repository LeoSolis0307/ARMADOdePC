document.addEventListener('DOMContentLoaded', () => {
    const carrito = document.getElementById('carrito');
    const cartCurtain = document.getElementById('cartCurtain');

    carrito.addEventListener('click', () => {
        cartCurtain.classList.toggle('show');
    });
});
