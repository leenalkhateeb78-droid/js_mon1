// ---- Guard: only admin ----
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
  window.location.href = "index.html";
} else if (currentUser.role !== "admin") {
  window.location.href = "dashboard.html";
}

document.getElementById("adminName").textContent = currentUser.fullName;

// ---- Show all registered users ----
const users = JSON.parse(localStorage.getItem("users")) || [];
document.getElementById("count").textContent = users.length;
const tbody = document.getElementById("usersBody");

users.forEach(function (u, index) {
  const row = document.createElement("tr");
  [index + 1, u.fullName, u.email, u.address, u.role].forEach(function (value) {
    const td = document.createElement("td");
    td.textContent = value;
    row.appendChild(td);
  });
  tbody.appendChild(row);
});

// ---- Logout ----
document.getElementById("logoutBtn").addEventListener("click", function () {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
});