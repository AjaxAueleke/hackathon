function addProduct() {
  let resItem = document.querySelector("#res-item");
  let resPrice = document.querySelector("#res-price");
  let resCategory = document.querySelector("#res-category");
  let resDelivery = document.querySelector("#res-delivery");
  console.log(
    resDelivery.value,
    resCategory.value,
    resPrice.value,
    resItem.value
  );
  let data = {
    resDelivery: resDelivery.value,
    resCategory: resCategory.value,
    resPrice: resPrice.value,
    resItem: resItem.value,
  };
  firebase
    .firestore()
    .collection("prod")
    .doc(localStorage.getItem("uid"))
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log(doc.data());
        prod = doc.data().prod ?? [];

        prod.push(data);
        firebase
          .firestore()
          .collection("prod")
          .doc(localStorage.getItem("uid"))
          .set({ prod: prod });
      } else {
        firebase
          .firestore()
          .collection("prod")
          .doc(localStorage.getItem("uid"))
          .set({
            prod: [data],
          });
      }
    });
}

function createDish(obj) {
  let cardHtml = `<div class="card m-auto" > 
  <img class="card-img-top" src="..." alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">Item Name : ${obj.resItem}</h5>
    <h5 >Price : ${obj.resPrice}</h3>
    
    
    <p class="card-text">Category : ${obj.resCategory}</p>
    <p class="card-text">Delivery Type : ${obj.resDelivery}</p>
  </div>
</div>`;
  let div = document.createElement("div");
  div.className = "col-4 p-5"
  div.innerHTML = cardHtml;
  return div;
}
function populate(prod) {

  let dishDiv = document.querySelector("#all-dishes");
  dishDiv.innerHTML = '';
  prod.forEach((obj) => dishDiv.append(createDish(obj)));
}

window.onload = () => {
  firebase
    .firestore()
    .collection("prod")
    .doc(localStorage.getItem("uid"))
    .onSnapshot((doc) => {
      if (doc.exists) {
        prod = doc.data().prod ?? [];
        populate(prod);
      } 
    });
};
