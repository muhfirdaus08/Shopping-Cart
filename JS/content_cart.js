let isi_cart = JSON.parse(localStorage.getItem("data")) || [];

let label = document.getElementById("label");
let cartItem = document.getElementById("home-cart");
let total = document.getElementById("totalHarga");
let deleteAll_cart = document.getElementById("deleteAll");

let calculate_cart = () => {
    let cartIcon = document.getElementById("amount");
    cartIcon.innerHTML = isi_cart.map((x) => x.product).reduce((x, y) => x + y, 0);
};

calculate_cart();

let generateContentCart = () => {
    if (isi_cart.length !== 0) {
        return (cartItem.innerHTML = isi_cart
            .map((x) => {
                let { id, product } = x;
                let search = cardItemsData.find((y) => y.id === id) || [];
                return `
            <div class="container mb-4">
                <div class="row">
                    <div class="image col-5">
                        <i onclick="deleteItemCart(${id})" class="bi bi-x-square-fill"></i>
                        <img src=${search.img} alt="shoes" width="277" />
                    </div>
                    <div class="content-detail col-5">
                        <p>${search.nama}</p>
                        <p class="price">Rp. ${search.harga}K</p>
                        <p class="total-price">Total: Rp. ${separator(product * search.harga)}k</p>
                    </div>
                    <div class="button-quantity col-2 d-flex justify-content-end">
                        <i onclick="decrement(${id})" class="bi bi-dash"></i>
                        <div id=${id} class="quantity">${product}</div>
                        <i onclick="increment(${id})" class="bi bi-plus"></i>
                    </div>
                </div>
            </div>       
            `;
            })
            .join(""));
    } else {
        cartItem.innerHTML = ``;
        label.innerHTML = `
        <p>Cart is Empty</p>
        `;
    }
};

generateContentCart();

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

    generateContentCart();
    updateQuantity(selectedCart.id);
    localStorage.setItem("data", JSON.stringify(isi_cart));
};

let decrement = (id) => {
    let selectedCart = id;
    let search = isi_cart.find((x) => x.id === selectedCart.id);

    if (search === undefined) return;
    else if (search.product === 0) return;
    else {
        search.product -= 1;
    }

    updateQuantity(selectedCart.id);
    isi_cart = isi_cart.filter((x) => x.product !== 0);
    generateContentCart();
    localStorage.setItem("data", JSON.stringify(isi_cart));
};

let updateQuantity = (id) => {
    let search = isi_cart.find((x) => x.id === id);
    console.log(search.product);
    document.getElementById(id).innerHTML = search.product;
    calculate_cart();
    totalPrice();
};

let deleteItemCart = (id) => {
    let selectedId = id;
    // console.log(selectedId.id);
    isi_cart = isi_cart.filter((x) => x.id !== selectedId.id);
    generateContentCart();
    totalPrice();
    calculate_cart();
    localStorage.setItem("data", JSON.stringify(isi_cart));
};

let deleteAll = () => {
    isi_cart = [];
    generateContentCart();
    totalPrice();
    calculate_cart();
    localStorage.setItem("data", JSON.stringify(isi_cart));
}

let totalPrice = () => {
    if (isi_cart.length !== 0) {
        let price = isi_cart
            .map((x) => {
                let { id, product } = x;
                let search = cardItemsData.find((y) => y.id === id) || [];
                return product * search.harga;
            })
            .reduce((x, y) => x + y, 0);
        total.innerHTML = `<p>Total Price: Rp. ${separator(price)}k</p>`;
        // console.log(price);
    } else {
        total.innerHTML = `<p>Total Price: Rp. 0k</p>`;
    }
    deleteAll_cart.innerHTML = `<button onclick="deleteAll()" class="button-clear">Clear Cart</button>`
};

totalPrice();

function separator (x) {
    let formatted = x.toLocaleString('en-US');
    return formatted;
}
