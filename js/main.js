const ventaPinturas = JSON.parse(localStorage.getItem("Venta de Pinturas")) || [];
console.log(ventaPinturas);

const pinturas = [
    {
        id: "Amarillo",
        titulo: "212 - Amarillo Sol",
        precio: 15000,
        pesoNeto: 1, 
        img: "./img/212-amarillosol.jpg",
        stock: 10,
    },
    {
        id: "Rojo",
        titulo: "351 - Rojo Clásico",
        precio: 18000,
        pesoNeto: 1,
        img: "./img/351-rojoclasico.jpg",
        stock: 7,
    },
    {
        id: "Azul",
        titulo: "411 - Azul Reina",
        precio: 20000,
        pesoNeto: 1,
        img: "./img/411-azulreina.jpg",
        stock: 9,
    }
];

const contenedorDePinturas = document.querySelector("#pinturas");
const sinVentas = document.querySelector("#sin-ventas");
const pinturasVendidas = document.querySelector("#pinturas-vendidas");
const ventaTotal = document.querySelector("#venta-total");

pinturas.forEach((pintura) => {

    let div = document.createElement("div");
    div.classList.add("pintura");
    div.innerHTML = `
        <img class="pintura-img" src="${pintura.img}">
        <h3>${pintura.titulo}</h3>
        <p>$${pintura.precio}</p>
        <p>${pintura.pesoNeto}Kg</p>
        <p>Cantidad en stock: ${pintura.stock}</p>
    `;

    let button = document.createElement("button");
    button.classList.add("pintura-btn");
    button.innerText = "Unidades recibidas";
    button.addEventListener("click", () => {
        sumarAlStock(pintura);
    });

    div.append(button);
    contenedorDePinturas.append(div);
})

const actualizarStock = () => {
    if (ventaPinturas.length === 0) {
        sinVentas.classList.remove("d-none");
        pinturasVendidas.classList.add("d-none");
    } else {
        sinVentas.classList.add("d-none");
        pinturasVendidas.classList.remove("d-none");

        pinturasVendidas.innerHTML = "";
        ventaPinturas.forEach((pintura) => {
            let div = document.createElement("div");
            div.classList.add("pintura-vendida");
            div.innerHTML = `
                <h3>${pintura.titulo}</h3>
                <p>$${pintura.precio}</p>
                <p>Cant: ${pintura.cantidad}</p>
                <p>Peso: ${pintura.pesoNeto}</p>
            `;

            let button = document.createElement("button");
            button.classList.add("venta-pintura-btn");
            button.innerText = "borrar";
            button.addEventListener("click", () => {
                borrarDelStock(pintura);
            })

            div.append(button);
            pinturasVendidas.append(div);

        })
    }
    actualizarTotal();
    localStorage.setItem("Venta de Pinturas", JSON.stringify(ventaPinturas));
}

const agregarAlStock = (pintura) => {
    if (pintura.stock > 0) {
        const itemEncontrado = ventaPinturas.find(item => item.id === pintura.id);
        if (itemEncontrado) {
            itemEncontrado.cantidad++;
            pintura.stock--;
        } else {
            ventaPinturas.push( {...pintura, cantidad: 1} );
            pintura.stock--;
        }
        actualizarStock();
    } else {
        alert("No quedan más en stock!")
    }
}

const borrarDelStock = (pintura) => {
    const itemEncontrado = pintura.find(item => item.id === pintura.id);
    itemEncontrado.stock += pintura.cantidad;

    const prodIndex = ventaPinturas.findIndex(item => item.id === pintura.id);
    ventaPinturas.splice(prodIndex, 1);
    actualizarStock();
}

const actualizarTotal = () => {
    const total = ventaPinturas.reduce((acc, pintura) => acc + (pintura.precio * pintura.cantidad), 0);
    ventaTotal.innerText = `$${total}`;
}

actualizarStock();