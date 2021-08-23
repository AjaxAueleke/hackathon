window.onload = () => {
  firebase
    .database()
    .ref("restaurants/")
    .once("value")
    .then((data) => {
      console.log(data.val());
      resObj = data.val();
      displayRes(resObj);
    });
};

function displayRes(obj) {
    let resDiv = document.querySelector("#restaurants-list")
  for (let i in obj) {
      resDiv.append(createRestaurant(obj[i],i));
  }
}

function createRestaurant(obj,i) {
  let cardHtml = `<div class="card m-auto" > 
  <img class="card-img-top" src="..." alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">Restaurant Name : ${obj.resName}</h5>
    <h5 >Restaurant Country : ${obj.resCountry}</h3>
    <p class="card-text">Category : ${obj.resPhone}</p>
    <btn class = "btn btn-primary" type = "button" onclick="resList('${id}')">See Items Offered!</btn>
  </div>
</div>`;
  let div = document.createElement("div");
    div.innerHTML = cardHtml;
    div.className = 'col-sm-12 col-md-6 col-lg-4 p-5'
    return div;
}

function resList(id) {
     firebase
    .firestore()
    .collection("prod")
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log(doc.data());
        prod = doc.data().prod ?? [];
        let resItem = document.querySelector("#restaurant-items");
        prod.forEach(data => {
           resItem.append(createDish(data, id)) 
        });
      } else {
      }
    });
    
}

function order(id) {
     firebase
    .firestore()
    .collection("orders")
    .get(id)
    .then((doc) => {

      if (doc.exists) {
        console.log(doc.data());
        orders = doc.data().orders ?? [];

        orders.push(data);
        firebase
          .firestore()
          .collection("orders")
          .doc(id)
          .set({ orders: orders });
      } else {
        firebase
          .firestore()
          .collection("orders")
          .doc(id)
          .set({
            prod: [data],
          });
      }
    });
}
function createDish(obj, id) {
  let cardHtml = `<div class="card m-auto" > 
  <img class="card-img-top" src="..." alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">Item Name : ${obj.resItem}</h5>
    <h5 >Price : ${obj.resPrice}</h3>
    
    
    <p class="card-text">Category : ${obj.resCategory}</p>
    <p class="card-text">Delivery Type : ${obj.resDelivery}</p>
    <button class = "btn btn-primary" onclick = "order('${id}', '${obj.resItem}', '${obj.resPrice}')">Order this Item!</button>
  </div>
</div>`;
  let div = document.createElement("div");
  div.className = "col-sm-12 col-md-6 col-lg-4 p-5";
  div.innerHTML = cardHtml;
  return div;
}

function populateDish(prod) {
  let dishDiv = document.querySelector("#all-dishes");
  dishDiv.innerHTML = "";
  prod.forEach((obj) => dishDiv.append(createDish(obj)));
}

function populateRes() {}
