// PRODUCTOS
const productos = [
    // Abrigos
    {
        id: "CAMPERA",
        titulo: "ABRIGO DE ARGENTINA",
        imagen: "./img/campera-argentina.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 30000
    },
    {
        id: "CAMPERA-02",
        titulo: "ABRIGO DE ARGENTINA",
        imagen: "./img/campera-argentina2.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 30000
    },
    {
        id: "CAMPERA-03",
        titulo: "ABRIGO DE ARGENTINA",
        imagen: "./img/campera-argentina3.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 30000
    },
    {
        id: "CAMPERA-04",
        titulo: "ABRIGO DE ARGENTINA",
        imagen: "./img/campera-argentina4.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 25000
    },
    {
        id: "CAMPERA-05",
        titulo: "ABRIGO DE ARGENTINA",
        imagen: "./img/campera-argentina5.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 27000
    },
    // Camisetas
    {
        id: "camiseta-01",
        titulo: "CAMISETA DE ARGENTINA 2022",
        imagen: "./img/argentina.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 17000
    },
    {
        id: "camiseta-02",
        titulo: "CAMISETA DE ARGENTINA 2022",
        imagen: "./img/argentina-2.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 17000
    },
    {
        id: "camiseta-03",
        titulo: "CAMISETA DE BOCA",
        imagen: "./img/boca.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 17000
    },
    {
        id: "camiseta-04",
        titulo: "CAMISETA DE BOCA",
        imagen: "./img/boca2.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 17000
    },
    {
        id: "camiseta-05",
        titulo: "CAMISETA DE BOCA",
        imagen: "./img/boca3.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 17000
    },
    // Pantalones
    {
        id: "pantalon-01",
        titulo: "PANTALON DE ARGENTINA",
        imagen: "./img/pantalon-1.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 10000
    },
    {
        id: "pantalon-02",
        titulo: "PANTALON DE ARGENTINA",
        imagen: "./img/pantalon-2.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 10000
    },
    {
        id: "pantalon-03",
        titulo: "PANTALON DE ARGENTINA",
        imagen: "./img/pantalon-3.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 10000
    },
    {
        id: "pantalon-04",
        titulo: "PANTALON DE ARGENTINA",
        imagen: "./img/pantalon-4.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 10000
    },
    {
        id: "pantalon-05",
        titulo: "PANTALON DE ARGETINA",
        imagen: "./img/pantalon-5.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 10000
    }
];


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}