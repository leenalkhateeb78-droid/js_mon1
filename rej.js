// Creates the admin account once (if it does not exist yet)
function ensureAdmin() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (!users.some(u => u.role === "admin")) {
    users.push({ fullName: "Admin", email: "admin@site.com", password: "admin123", address: "HQ", role: "admin" });
    localStorage.setItem("users", JSON.stringify(users));
  }
}
ensureAdmin();

const form = document.getElementById("register-form");
const msg = document.getElementById("registerMsg");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const fullName = document.getElementById("regFullName").value.trim();
  const email = document.getElementById("regEmail").value.trim().toLowerCase();
  const password = document.getElementById("regPassword").value;
  const address = document.getElementById("regAddress").value.trim();
  const confirmPassword = document.getElementById("regConfirmPassword").value;

  // ---- validation ----
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (fullName.length < 3) return showMsg("Full name must be at least 3 characters.", "red");
  if (!emailPattern.test(email)) return showMsg("Please enter a valid email.", "red");
  if (password.length < 6) return showMsg("Password must be at least 6 characters.", "red");
  if (address === "") return showMsg("Address is required.", "red");
  if (password !== confirmPassword) return showMsg("Passwords do not match.", "red");

  // ---- get old users, then ADD the new one (old users stay) ----
  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.some(u => u.email === email)) return showMsg("This email is already registered.", "red");

  users.push({ fullName, email, password, address, role: "user" });
  localStorage.setItem("users", JSON.stringify(users));

  showMsg("Registered successfully! Redirecting to login...", "green");
  form.reset();
  setTimeout(() => { window.location.href = "index.html"; }, 1500);
});

function showMsg(text, color) { msg.textContent = text; msg.style.color = color; }