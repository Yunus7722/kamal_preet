import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Login Function
document.getElementById("loginBtn").addEventListener("click", function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Login Successful!");
      localStorage.setItem("user", JSON.stringify(userCredential.user));
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Logout Function
document.getElementById("logoutBtn").addEventListener("click", function () {
  signOut(auth)
    .then(() => {
      localStorage.removeItem("user");
      alert("Logged out!");
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});
