let card = document.getElementById("card-pertama");



// console.log(card);

let isi_cart = JSON.parse(localStorage.getItem("data")) || [];

let generate = () => {
    return (card.innerHTML = cardItemsData
        .map((x) => {
            let { id, nama, harga, img } = x;
            let find_quantity = isi_cart.find((x) => x.id === id ) || [];
            return `
            <div class="col-4 card-shoes mb-5" id=product-id-${id} >
            <div class="image">
                <img src=${img} alt="" width="277"/>
            </div>
            <div class="card-detail">
                <p class="name-shoes">${nama}</p>
                <div class="card-price">
                    <p>Rp. ${separator(harga)}k</p>
                        <div class="button-quantity">
                            <i onclick="decrement(${id})" class="bi bi-dash"></i>
                            <div id=${id} class="quantity">${find_quantity.product === undefined ? 0 : find_quantity.product}</div>
                            <i onclick="increment(${id})" class="bi bi-plus"></i>
                        </div>
                    </div>
                </div>
            </div>  
            `;
        })
        .join(""));
};

generate();

let increment = (id) => {
    let selectedCart = id;
    let search = isi_cart.find((x) => x.id === selectedCart.id);

    if (search === undefined) {
        isi_cart.push({
            id: selectedCart.id,
            product: 1,
        });
    } else {
        search.product += 1;
    }

    // console.log(isi_cart);
    updateQuantity(selectedCart.id);
    localStorage.setItem("data", JSON.stringify(isi_cart));
};

let decrement = (id) => {
    let selectedCart = id;
    let search = isi_cart.find((x) => x.id === selectedCart.id);

    if(search === undefined) return;
    else if (search.product === 0) return;
    else {
        search.product -= 1;
    }

    updateQuantity(selectedCart.id);
    isi_cart = isi_cart.filter((x) => x.product !== 0);
    // console.log(isi_cart);
    localStorage.setItem("data", JSON.stringify(isi_cart));
};

let updateQuantity = (id) => {
    let search = isi_cart.find((x) => x.id === id);
    console.log(search.product);
    document.getElementById(id).innerHTML = search.product;
    calculate_cart();
};

let calculate_cart = () => {
    let cartIcon = document.getElementById("amount");
    cartIcon.innerHTML = isi_cart.map((x) => x.product).reduce((x, y) => x + y, 0);
};

calculate_cart();

function separator (x) {
    let formatted = x.toLocaleString('en-US');
    return formatted;
}