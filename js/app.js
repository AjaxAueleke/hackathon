function signUp() {
  let resName = document.querySelector("#res-name");
  let resEmail = document.querySelector("#res-email");
  let resCountry = document.querySelector("#res-country");
  let resCity = document.querySelector("#res-city");
  let resPhone = document.querySelector("#res-phone");
  let resPass = document.querySelector("#res-pass");

  console.log(
    resName.value,
    resEmail.value,
    resCountry.value,
    resCity.value,
    resPhone.value,
    resPass.value
  );
  firebase
    .auth()
    .createUserWithEmailAndPassword(resEmail.value, resPass.value)
    .then((user) => {
      console.log(firebase.auth().currentUser);
      document.querySelector("#success-box").innerHTML = "Sign Up Successful";
      localStorage.setItem("uid", user.user.uid);
      firebase.database().ref('restaurants/' + user.user.uid).set({
          resName : resName.value,
          resEmail : resEmail.value,
          resCountry : resCountry.value,
          resCity : resCity.value,
          resPhone : resPhone.value,
      }).then(
          () => {

              window.location = "login.html";
          }
      )

    })
    .catch((err) => {
      console.error;
      document.querySelector("#danger-box").innerHTML = err.message;
    });
    

}
