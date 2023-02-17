let bodyCart, btnProcesar, idTotal, ecommerceCart, idTotalItems, itemsCart;
ecommerceCart = [];

window.onload = function () {
    console.log("DESA cart:");
    bodyCart = document.getElementById("body-cart");
    ecommerceCart = JSON.parse(localStorage.getItem("CART")) || [];
    idTotal = document.getElementById("id-total-cart");
    idTotalItems = document.getElementById("id-total-cart-items");

    itemsCart = document.getElementById("items-cart");
    let arr = JSON.parse(localStorage.getItem("CART"));
    arr = arr ?? [];
    itemsCart.innerText = arr.length;

    document.getElementById("btn-process-buy").addEventListener("click", () => procesar());
    document.getElementById("btn-delete-basket").addEventListener("click", () => vaciarCarrito());

    cartUpdate();
    mostrarCarrito();
};

function cartUpdate() {
    itemsCart = document.getElementById("items-cart");
    let arr = JSON.parse(localStorage.getItem("CART"));
    arr = arr ?? [];
    itemsCart.innerText = arr.length;
}

function procesar() {
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

            console.log("BUY:", ecommerceCart);
			vaciarCarrito();
			mostrarCarrito();
        }
    });
}

function vaciarCarrito() {
    bodyCart.innerHTML = "";
    ecommerceCart = [];
    localStorage.clear();
	cartUpdate();
	mostrarCarrito();
}

function eliminarProducto(id) {
    let arr = [];
    arr = JSON.parse(localStorage.getItem("CART"));
    ecommerceCart = arr.filter((hab) => hab.id !== id);

    localStorage.clear();
    localStorage.setItem("CART", JSON.stringify(ecommerceCart));
    mostrarCarrito();
	cartUpdate();
}

const mostrarCarrito = () => {
    let total = 0;

    bodyCart.innerHTML = "";
    ecommerceCart.forEach((prod) => {
        
        const { id, title, price, thumbnail, qty } = prod;
        bodyCart.innerHTML += `
			<div class="col d-flex align-items-start mb-2">
				<div class="icon-square bg-light text-dark flex-shrink-0 me-3">
					<img class="img-fluid img-carrito imagen-mediana" src="${thumbnail}" width="154" height="100" />
				</div>
				<div>
					<h5>${title}</h5>
					<h6 class="mb-0"> Precio:$ ${price} &nbsp;&nbsp; Qty:${qty}  </h6>
					<div class="buttons mt-3 ">
						<button id="btn-delete-basket" style="width:90px; height:30px" class='btn btn-outline-dark btn-sm outline-custom text-uppercase'
						onclick="eliminarProducto(${id})" > <b>borrar</b> </button>
					</div>
				</div>
			</div>
					`;
        total += price;
    });
    idTotal.innerText = "$" + total + ".-";
    idTotalItems.innerText = ecommerceCart.length;
};