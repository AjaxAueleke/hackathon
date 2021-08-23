function login() {
  let resEmail = document.querySelector("#res-email");
  let resPass = document.querySelector("#res-pass");
  let type = document.querySelector("#user-type").value;

  console.log(
    resEmail.value,
    resPass.value
  );
  if (type === "admin") {

    firebase
      .auth()
      .signInWithEmailAndPassword(resEmail.value, resPass.value)
      .then((user) => {
        localStorage.clear();
        console.log(user);
        console.log(firebase.auth().currentUser);
        document.querySelector("#success-box").innerHTML = "Sign Up Successful";
        localStorage.setItem("uid", user.user.uid);
        window.location = "dashboard.html";
  
      })
      .catch((err) => {
        console.error;
        document.querySelector("#danger-box").innerHTML = err.message;
      });
      
  } else if (type === "user") {
     firebase
      .auth()
      .signInWithEmailAndPassword(resEmail.value, resPass.value)
      .then((user) => {
        localStorage.clear();
        console.log(user);
        console.log(firebase.auth().currentUser);
        document.querySelector("#success-box").innerHTML = "Sign Up Successful";
        localStorage.setItem("uid", user.user.uid);
        window.location = "user-dashboard.html";
  
      })
      .catch((err) => {
        console.error;
        document.querySelector("#danger-box").innerHTML = err.message;
      });
    
  }

}