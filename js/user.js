function signUp() {
  let userName = document.querySelector("#user-name");
  let userEmail = document.querySelector("#user-email");
  let userCountry = document.querySelector("#user-country");
  let userCity = document.querySelector("#user-city");
  let userPhone = document.querySelector("#user-phone");
  let userPass = document.querySelector("#user-pass");

  console.log(
    userName.value,
    userEmail.value,
    userCountry.value,
    userCity.value,
    userPhone.value,
    userPass.value
  );
  firebase
    .auth()
    .createUserWithEmailAndPassword(userEmail.value, userPass.value)
    .then((user) => {
      localStorage.setItem("uid", user.user.uid);
      console.log(firebase.auth().currentUser);
      document.querySelector("#success-box").innerHTML = "Sign Up Successful";
      localStorage.setItem("uid", user.user.uid);
      firebase
        .database()
        .ref("users/" + user.user.uid)
        .set({
          userName: userName.value,
          userEmail: userEmail.value,
          userCountry: userCountry.value,
          userCity: userCity.value,
          userPhone: userPhone.value,
        })
        .then(() => {
          window.location = "login.html";
        });
    })
    .catch((err) => {
      console.error;
      document.querySelector("#danger-box").innerHTML = err.message;
    });
}
