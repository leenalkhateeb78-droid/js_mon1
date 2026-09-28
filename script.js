// Creates the admin account once (if it does not exist yet)
function ensureAdmin() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (!users.some(u => u.role === "admin")) {
    users.push({ fullName: "Admin", email: "admin@site.com", password: "admin123", address: "HQ", role: "admin" });
    localStorage.setItem("users", JSON.stringify(users));
  }
}
ensureAdmin();

// If already logged in, skip the login page
const existing = JSON.parse(localStorage.getItem("currentUser"));
if (existing) {
  window.location.href = existing.role === "admin" ? "admin.html" : "dashboard.html";
}

const form = document.getElementById("login-form");
const msg = document.getElementById("loginMsg");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPassword").value;

  // ---- validation ----
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) return showMsg("Please enter a valid email.", "red");
  if (password === "") return showMsg("Password is required.", "red");

  // ---- check credentials ----
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return showMsg("Invalid email or password.", "red");

  // ---- save current user (without the password) ----
  const { password: _pw, ...safeUser } = user;
  localStorage.setItem("currentUser", JSON.stringify(safeUser));

  // ---- redirect by role ----
  window.location.href = user.role === "admin" ? "admin.html" : "dashboard.html";
});

function showMsg(text, color) { msg.textContent = text; msg.style.color = color; }