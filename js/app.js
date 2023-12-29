
document.addEventListener('DOMContentLoaded', function () {
    var switchElement = document.getElementById('switch');

    if (switchElement) {
        switchElement.addEventListener('change', function () {
            var theme = this.checked ? 'dark' : 'light';
            document.body.setAttribute('data-theme', theme);
        });
    }
});

//funcion para arrastrar las imagenes y su informacion
function drop(event){
    event.preventDefault();
    var src = event.dataTransfer.getData("src");
    var imgElement = document.querySelector(`img[src="${src}"]`);
    var price = parseFloat(imgElement.getAttribute('data-price')); // Convertir el precio a un número
    var name = imgElement.getAttribute('data-name');
    var classElement = imgElement.getAttribute('class');
     // Verificar la compatibilidad antes de agregar el producto al carrito
     if (verificarCompatibilidadAMDINTEL(classElement)) {
        agregaralcarrito(src, price, name, classElement);
    } else {
        alert("Los productos AMD e Intel no son compatibles entre sí.");
    }
}
compatibilityArray = {};
function agregaralcarrito(src, price, name, classElement) {
    var cart = document.getElementById('cart-items');

    // Verificar si ya hay un producto de la misma marca en el carrito
    if (compatibilityArray[classElement]) {
        alert("Ya has agregado un producto " + classElement + " al carrito.");
        return;
    }

    var item = document.createElement('div');
    item.className = 'item ' + classElement;
    item.innerHTML = '<img src="' + src + '" alt="' + name + '"><span>' + name + '</span><span class="price">' + price + '</span>';
    cart.appendChild(item);

    compatibilityArray[classElement] = true;

    actualizarprecio(price) // Actualizar el total
    // Agregar una imagen del producto al resumen del carrito
    var resumenCarrito = document.getElementById("cartfinalizacion");
    var img = document.createElement('img');
    img.src = src;
    resumenCarrito.appendChild(img);
    actualizarMensajeCarrito();
    
}

function actualizarprecio(price) {
    var totalElement = document.getElementById('total');
    var currentTotal = parseFloat(totalElement.textContent) || 0; // Convertir el total actual a un número

    // Sumar el precio del artículo al total y actualizar el contenido del elemento total
    var newTotal = currentTotal + price;
    totalElement.textContent = newTotal.toFixed(2);
    // Mostrar el nuevo total con dos decimales
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("src", event.target.getAttribute('src'));
}

function actualizarMensajeCarrito() {
    var cart = document.getElementById('cart-items');
    var emptyCartMessage = document.getElementById('empty-cart');

    // Verificar si hay algún producto en el carrito
    var items = cart.getElementsByClassName('item');
    if (items.length > 0) {
        // Si hay al menos un producto, cambiar el mensaje a 'Nada'
        emptyCartMessage.textContent = ' ';
    } else {
        // Si no hay productos, cambiar el mensaje a 'El carrito está vacío'
        emptyCartMessage.textContent = 'El carrito está vacío';
    }
    var sections = document.getElementsByClassName('card');
    for (var i = 0; i < sections.length; i++) {
        if (sections[i].style.display !== 'none') {
            sections[i].style.display = 'none';
            if (i + 1 < sections.length) {
                sections[i + 1].style.display = 'block';
            }
            break;
        }
    }
}

function verificarCompatibilidadAMDINTEL(classElement) {
    console.log("Verificando compatibilidad para: " + classElement);
    console.log("compatibilityArray antes de la verificación: ", compatibilityArray);

    // Permitir productos universales independientemente de lo que ya esté en el carrito
    if (classElement === "universal") {
        console.log("compatibilityArray después de la verificación: ", compatibilityArray);
        console.log("No se detectó incompatibilidad");
        return true;
    }
    if (classElement === "universal2") {
        console.log("compatibilityArray después de la verificación: ", compatibilityArray);
        console.log("No se detectó incompatibilidad");
        return true;
    }
    if (classElement === "universal4") {
        console.log("compatibilityArray después de la verificación: ", compatibilityArray);
        console.log("No se detectó incompatibilidad");
        return true;
    }
    
    if (classElement === "universal3") {
        console.log("compatibilityArray después de la verificación: ", compatibilityArray);
        console.log("No se detectó incompatibilidad");
        return true;
    }
    // Verificar si la marca del producto ya está en el carrito
    if (classElement in compatibilityArray) {
        console.log("compatibilityArray después de la verificación: ", compatibilityArray);
        console.log("No se detectó incompatibilidad");
        return true;
    }

    // Si el carrito ya tiene productos de otra marca, no permitir agregar el producto
    for (var key in compatibilityArray) {
        if (compatibilityArray[key] && isCompatible(key, classElement)) {
            console.log("compatibilityArray después de la verificación: ", compatibilityArray);
            console.log("Se detectó incompatibilidad");
            return false;
        }
    }

    console.log("compatibilityArray después de la verificación: ", compatibilityArray);
    console.log("No se detectó incompatibilidad");
    return true;
}
function isCompatible(key, classElement) {
    if ((key === "amd" && classElement === "amd2") || (key === "amd2" && classElement === "amd")) {
        return true;
    }
    if ((key === "intel" && classElement === "intel2") || (key === "intel2" && classElement === "intel")) {
        return true;
    }
    return false;
}
window.onload = function() {
    var sections = document.getElementsByClassName('card');
    for (var i = 1; i < sections.length; i++) {
        sections[i].style.display = 'none';
    }
}
