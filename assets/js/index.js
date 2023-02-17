//
let contenedorProductos, itemsCart;
window.onload = function () {
    contenedorProductos = document.getElementById("contenedorProductos");

	cartUpdate()
    init();
};

function cartUpdate() {
    itemsCart = document.getElementById("items-cart");
	let arr = JSON.parse(localStorage.getItem("CART"));
	arr= arr ?? [];
	itemsCart.innerText = arr.length;	
}


async function init() {
    let response, data;
    try {
        response = await fetch("http://localhost:3000/products", {
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
    const slicedArray = data.slice(0, 50);
     product_load(slicedArray);
}

function shorterText(oneText, length) {
    return oneText.length < length ? oneText : oneText.substring(0, length - 2) + "..";
};

function product_load(objs) {
    
    objs.forEach((element) => {
        let tarjetaProducto = document.createElement("div");
        tarjetaProducto.innerHTML = `
			<div class="col ">
				<div class="card custom-card" >
					<a class="a-link-normal " target="_top" rel="noopener" title="to be defined" href="/index-detail.html?id=${element.id}">
						<div class="mx-auto custom-img"  >				
							<img src="${element.thumbnail}" class="mx-auto d-block custom-img" 
								width="210" height="140" alt="..." > 
						</div>
						<div class="card-body pb-0" style="height:200px;"> 
							<span class="card-text"> <b> ${shorterText(element.title, 26)} </b>   </span>
							
							<p class="h-50 card-text">${shorterText(element.description, 26*4)}  </p>

							<div class="card-footer bg-transparent ">
								<span class="price-font" id="itemval1"> <span class="price-font">$</span> ${element.price} </span>
							</div>
						</div>
					</a>
				</div>
			</div>
		`;
        contenedorProductos.append(tarjetaProducto);
    });
}