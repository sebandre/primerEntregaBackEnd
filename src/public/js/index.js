const socket = io();

//GET PRODUCTS FROM BACKEND
socket.on('getProducts', ({payload}) => {
    const productList = document.querySelector('#productList');
    productList.innerHTML = '';
    for(const product of payload){
        const {_id, title, price, stock} = product;
        const productItem = document.createElement('li');
        productItem.textContent = `id: ${_id} name: ${title} - price: $${price} - stock: ${stock} - category: ${product.category}`;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        // EVENT BUTTON: DELETE PRODUCT FROM BACKEND
        deleteBtn.onclick = () => {
            socket.emit('deleteProduct', _id);
        }
        productItem.appendChild(deleteBtn);
        productList.appendChild(productItem);
    }
});

// ADD PRODUCT TO BACKEND
const form = document.getElementById("formSocket");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const description = form.elements.description.value.trim();
    const price = +form.elements.price.value;
    const status = form.elements.status.value;
    const thumbnail = form.elements.thumbnail.value;
    const code = form.elements.code.value;
    const stock = form.elements.stock.value;
    const product = {
        title,
        description,
        price,
        status,
        thumbnail,
        code,
        stock,
    }
    socket.emit("newProduct", product);
    form.reset();
})

socket.on("refresh-products", (data) => {
    console.log("refresh-products", data);
    window.location.reload();
  });
  