let contenedorProductos;
let btnBuy, btnBasket, data, arr_products, qtyTobuy, itemsCart;
data = {};
arr_products = [];

window.onload = function () {

    let id = null;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has("id")) id = urlParams.get("id");

	
    btnBuy = document.getElementById("btn-buy");
    btnBuy.addEventListener("click", () => processBuy());

    btnBasket = document.getElementById("btn-basket");
    btnBasket.addEventListener("click", () => processBasket());

    qtyTobuy = document.getElementById("qty-tobuy");
    qtyTobuy.value = 1;

    itemsCart = document.getElementById("items-cart");
    let arr = JSON.parse(localStorage.getItem("CART"));
    arr = arr ?? [];
    itemsCart.innerText = arr.length;

    cartUpdate();
    init(id);
};

function cartUpdate() {
    itemsCart = document.getElementById("items-cart");
    let arr = JSON.parse(localStorage.getItem("CART"));
    arr = arr ?? [];
    itemsCart.innerText = arr.length;
}

async function init(id) {
    if (!id) return;

    let response;
    const urlParam = "/" + String(id);
    try {
        response = await fetch("http://localhost:3000/products" + urlParam, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) throw new Error(`Request failed.`);
        data = await response.json();
    } catch (err) {
        data = { message: "error 400" };
        console.log("ERR catch:", err);
    }
     product_load(data);
}

function product_load(obj) {
    const htmlImage = document.getElementById("main-product-image");
    const htmlTitle = document.getElementById("main-product-title");
    const htmlDescription = document.getElementById("main-product-description");
    const htmlPrice = document.getElementById("main-product-price");

    htmlTitle.innerText = obj.title;
    htmlDescription.innerText = obj.description;
    htmlPrice.innerText = obj.price;

    htmlImage.src = obj.thumbnail;

    for (let i = 0; i < imgList().length; i++) {
        const img = imgList()[i].getElementsByTagName("img")[0];
        if (obj.images[i] !== undefined) img.src = obj.images[i];
    }
    return;
}

const imgList = () => {
    const thumbnail = document.getElementById("thumbnail");
    const lis = thumbnail.getElementsByTagName("li");
    return lis;
};

function changeImage(element) {
    var main_prodcut_image = document.getElementById("main-product-image");
    main_prodcut_image.src = element.src;
}

function processBuy() {
    Swal.fire({
        title: "Aviso",
        text: "Compra procesada!",
        confirmButtonColor: "#1477d2",
        confirmButtonText: "Aceptar",
        showCancelButton: true,
        allowOutsideClick: false,
        cancelButtonColor: "#a1a1a1",
        cancelButtonText: "Cancelar",
        customClass: "white-background",
    }).then(function (e) {
        if (e.isConfirmed) {
            new swal({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 6000,
                icon: "success",
                title: "Compra confirmada!",
                showCloseButton: true,
            });
            data = { ...data, qty: parseInt(qtyTobuy.value) };
            arr_products = [];
            arr_products.push(data);
            console.log("BUY:", arr_products);
            
        }
    });
}


function processBasket() {
    
    let arr = [];
    arr = JSON.parse(localStorage.getItem("CART"));
    data = { ...data, qty: parseInt(qtyTobuy.value) };
    if (!arr || arr.length === 0) {
        arr = [];
        console.log("CART vacio:");
    }

	const isPresent = arr.some((o) => o.id === data.id);
	if(isPresent) {
		alert('Ya existe el producto')
	}else arr.push(data);


    localStorage.setItem("CART", JSON.stringify(arr));

	cartUpdate();
}




const increaseNumber = (e) => {
    var qtyTobuy = document.getElementById(e);
    const stockQty = productStock(0, qtyTobuy.value);
    if (qtyTobuy.value >= stockQty) {
        qtyTobuy.value = stockQty;
        alert("No hay stock!");
    
    } else {
        qtyTobuy.value = parseInt(qtyTobuy.value) + 1;
    }
};

const decreaseNumber = (e) => {
    var qtyTobuy = document.getElementById(e);
    if (qtyTobuy.value <= 1) {
        qtyTobuy.value = 1;
    } else {
        qtyTobuy.value = parseInt(qtyTobuy.value) - 1;
    }
};

function productStock(idProduct, cant) {
    return 4;
}