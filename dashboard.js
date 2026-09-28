// ---- Guard: only logged-in users ----
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
  window.location.href = "index.html";
} else if (currentUser.role === "admin") {
  window.location.href = "admin.html";
}

// ---- Show user info ----
document.getElementById("name").textContent = currentUser.fullName;
document.getElementById("email").textContent = currentUser.email;
document.getElementById("address").textContent = currentUser.address;
document.getElementById("role").textContent = currentUser.role;

// ---- Logout ----
document.getElementById("logoutBtn").addEventListener("click", function () {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
});