const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const authButtons = document.getElementById("authButtons");

loginBtn.onclick = async () => {
  const email = prompt("Email:");
  const password = prompt("Password:");
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    alert("Welcome!");
    window.location.href = "dashboard.html";
  } catch (e) {
    alert(e.message);
  }
};

registerBtn.onclick = async () => {
  const email = prompt("Email:");
  const password = prompt("Password:");
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    alert("Registered Successfully");
  } catch (e) {
    alert(e.message);
  }
};

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    authButtons.innerHTML = `<span class="text-sm">👋 Welcome, ${user.email}</span>`;
  }
});
