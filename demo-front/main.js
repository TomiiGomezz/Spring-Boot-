//variables globales
const elements = {
     productID: document.querySelector('#productID'),
     productName: document.querySelector('#productName'),
     productPrice: document.querySelector('#productPrice'),
     productQuantity: document.querySelector('#productQuantity'),
     productSave: document.querySelector('#productSave'),
     productTable: document.querySelector('#productTable')
};

//arreglo para guardar los daros del backend
let products = [];

//CONSTANTE para almacenar la URL
const API_URL = 'http://localhost:8080/api/v1/products';

document.addEventListener('DOMContentLoaded', ()=>{

    getAllProducts();
});

const getAllProducts = async () => {
try {
    
    const response = await fetch(API_URL);
    if(!response.ok){
        throw Error(`Error al solicitar los datos ${response.statusText}`)
    }

    const data = await response.json();
    products = data;
    console.log(products);
    renderProducts();

} catch (error) {
    console.log(`Error ${error.message}`);
}

}

const renderProducts = () => {
    elements.productTable.innerHTML = products.map(product => ` 
            <tr>
                <th scope="row">${product.id}</th>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.quantity}</td>
                <td><button type="submit" class="btn btn-warning" onclick = editProduct(${product.id}) >Editar</button>
                <button type="submit" class="btn btn-danger" onclick = deleteProduct(${product.id}) >Eliminar</button></td>
            </tr>
        `).join('');
}

const editProduct = id => {
    const product = products.find(product => product.id === id);
    if(product){
        elements.productID.value = product.id;
        elements.productName.value = product.name;
        elements.productPrice.value = product.price;
        elements.productQuantity.value = product.quantity;
    }
}
const deleteProduct = async id => {
    try {
    
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        if(!response.ok){
            throw Error(`Error al borrar producto ${response.statusText}`)
        }
        alert('Producto borrado con exito!!!');
        getAllProducts();
        

   } catch (error) {
       console.log(`Error ${error.message}`);
   }
}

elements.productSave.addEventListener('click', (e) => {
    e.preventDefault();
    const product = {
        id: elements.productID.value,
        name: elements.productName.value,
        price: elements.productPrice.value,
        quantity: elements.productQuantity.value
    };

    product.id ? updateProduct(product) : addProduct(product);
})

const updateProduct = async product => {
    try {
    
        const response = await fetch(`${API_URL}/${product.id}`, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(product)
        });

        if(!response.ok){
            throw Error(`Error al actualizar producto ${response.statusText}`)
        }
        alert('Producto actualizado con exito!!!');
        getAllProducts();
        formReset();

   } catch (error) {
       console.log(`Error ${error.message}`);
   }
}

const addProduct = async product => {
   try {
    
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(product)
        });

        if(!response.ok){
            throw Error(`Error al registrar producto ${response.statusText}`)
        }
        alert('Producto agregado con exito!!!');
        getAllProducts();
        formReset();

   } catch (error) {
       console.log(`Error ${error.message}`);
   }
}

const formReset = () => {
    elements.productID.value = '';
        elements.productName.value = '';
        elements.productPrice.value = '';
        elements.productQuantity.value = '';
}