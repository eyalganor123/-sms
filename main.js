var state = {
  products: [],
};
// test();
start();



function test() {
  addProduct('beer', 'mock vendor', 32, 04323);
  addProduct('mock description 2', 'mock vendor 2', 98, 14234);
  addProduct('mock description 3', 'mock vendor 3', 56, 25345);
  addProduct('beer', 'macabi', 14, 22343);
  deleteProduct(2);

  editProduct({ description: 'not beer', vendor: 'nesher', id: 1 });
  // console.log($);
}

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

// function editProduct(params) {
//   console.log(params.id);
//   var productIndex = getProductIndexById(params.id);
//   console.log("index:"+productIndex);
// var product = state.products[productIndex];

// var paramKeys = Object.keys(params);
// for (let index = 0; index < paramKeys.length; index++) {
//   var key = paramKeys[index];
//   product[key] = params[key];
// }
// }

function getProductIndexById(id) {
  console.log("state=" + id);
  for (let index = 0; index < state.products.length; index++) {
    var product = state.products[index];
    if (id == product.id) {
      return index;
    }
  } return "-999";
}

function start() {
  populatelist()//testing purpose
  $('section').hide();
  $('h2').hide();


}

function showHideInventory() {

  $('section').slideToggle(300);
  $('.items').remove();

  for (i = 0; i < state.products.length; i++) {
    var description = state.products[i].description;
    var vendor = state.products[i].vendor
    var stock = state.products[i].stock;
    var id = state.products[i].id

    var idElem = document.createElement('td');
    $(idElem).text(id);
    idElem.setAttribute("class", "items");
    idElem.setAttribute("id", "idSquare" + i);
    idElem.setAttribute("style", "background-color: red;");
    idElem.setAttribute("onmouseover", "changeColor(this)");
    idElem.setAttribute("onmouseout", "changeColorBack(this)");
    idElem.setAttribute("onclick", "editItem(" + i + ")");
    $("tbody").append(idElem);
    idElem = document.createElement('td');
    idElem.setAttribute("class", "items");
    $(idElem).text(description);
    $("tbody").append(idElem);
    idElem = document.createElement('td');
    idElem.setAttribute("class", "items");
    $(idElem).text(vendor);
    $("tbody").append(idElem);
    idElem = document.createElement('td');
    idElem.setAttribute("class", "items");
    $(idElem).text(stock);
    $("tbody").append(idElem);
    idElem = document.createElement('tr');
    idElem.setAttribute("class", "items");
    $("tbody").append(idElem);

  }

}
function showHideNewItem() {
  $('#newItemDialog').slideToggle(300);


}

function submit() {
  var id = document.getElementById('idInput').value;
  var description = document.getElementById('descriptionInput').value;
  var vendor = document.getElementById('vendorInput').value;
  var stock = document.getElementById('countInput').value;

  console.log(id, description, vendor, stock);

  addProduct(description, vendor, stock, id);

  showHideNewItem();

  document.getElementById('idInput').value = "";
  document.getElementById('descriptionInput').value = "";
  document.getElementById('vendorInput').value = "";
  document.getElementById('countInput').value = "";

  $('#newItemDialog').hide();
  $('section').hide();
  showHideInventory(300);
}

function editItem(x) {

  console.log(state.products[x]);

  $('#editItemDialog').show();
  document.getElementById('idEditInput').value = state.products[x].id;
  document.getElementById('descriptionEditInput').value = state.products[x].description;
  document.getElementById('vendorEditInput').value = state.products[x].vendor;
  document.getElementById('countEditInput').value = state.products[x].stock;

}


function changeColor(x) {
  x.setAttribute("style", "background-color: cyan;");
}
function changeColorBack(x) {
  x.setAttribute("style", "background-color: red;");
}
function submitEdit() {
  var id = document.getElementById('idEditInput').value;
  console.log(id);
  var x = getProductIndexById(id); console.log("x=" + x);

  state.products[x].description = document.getElementById('descriptionEditInput').value;
  state.products[x].vendor = document.getElementById('vendorEditInput').value;
  state.products[x].stock = document.getElementById('countEditInput').value;

  $('#editItemDialog').hide();
  $('section').hide();
  showHideInventory();
  console.log("submitted");
}

function submitRemove() {
  var deletedItemId = document.getElementById('idEditInput').value; console.log("deleted=" + deletedItemId);
  var xxx = getProductIndexById(deletedItemId); console.log('xxx=' + xxx);
  state.products.splice(getProductIndexById(deletedItemId), 1);
  // deleteProduct(deletedItemId);
  console.log("removed");
  $('#editItemDialog').hide();
  $('section').hide();
  showHideInventory(300);

}
//list populate used for testing
function populatelist() {

  for (let i = 1; i < 100; i++) {
    state.products.push({ description: i, vendor: i, stock: i, id: i });
  }

}
function hideMe() {
  document.getElementById("search").style.display = "none";
}

function search(id) {
  if (event.keyCode == 13) {
    console.log(id.value);
    index = getProductIndexById(id.value);
    if (index == -999) {
      console.log("xxx");
    }
    else {
      console.log(index);
      console.log(state.products[index].description);
      document.getElementById("search").style.display = "block"
      document.getElementById("search").innerHTML = "<br>" + "ITEM: " + state.products[index].id + "<br>" + "    DESCRIPTION: " + state.products[index].description + "<br>"
       + "     VENDOR: " + state.products[index].vendor + "<br>" + "      STOCK: " + state.products[index].stock
       +"<br><br><br><br><br><br>" +"(click here to return)";
    }
  }
}