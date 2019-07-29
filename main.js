var state = {
  products: [],
};

function addProduct(description, vendor, stock, id) {
  var newProduct = {
    description: description,
    vendor: vendor,
    stock: stock,
    id: id,
  };
  state.products.push(newProduct);
}

function deleteProduct(productId) {
  state.products.splice(getProductIndexById(productId), 1);
}

function editProduct(params) {
  var productIndex = getProductIndexById(params.id);
  var product = state.products[productIndex];

  var paramKeys = Object.keys(params);
  for (let index = 0; index < paramKeys.length; index++) {
    var key = paramKeys[index];
    product[key] = params[key];
  }
}

function getProductIndexById(id) {
  for (let index = 0; index < state.products.length; index++) {
    var product = state.products[index];
    if (id == product.id) {
      return index;
    }
  }
}
