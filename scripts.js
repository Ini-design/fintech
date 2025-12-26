const screens = document.querySelectorAll(".screen");

function showScreen(id) {
  screens.forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* Splash */
setTimeout(() => {
  showScreen("login");
}, 1500);

/* Login */
function login() {
  const name = document.getElementById("loginName").value;
  if (!name) return alert("Enter your name");

  const user = {
    name,
    balance: 50000,
    transactions: []
  };

  localStorage.setItem("user", JSON.stringify(user));
  loadDashboard();
}

/* Load Dashboard */
function loadDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;

  document.getElementById("userName").textContent = user.name;
  document.getElementById("balance").textContent = user.balance;
  document.getElementById("profileName").textContent = user.name;

  showScreen("dashboard");
}

/* Send Money */
function openSend() {
  showScreen("send");
}

function sendMoney() {
  const amount = Number(document.getElementById("amount").value);
  const user = JSON.parse(localStorage.getItem("user"));

  if (amount <= 0 || amount > user.balance) {
    return alert("Invalid amount");
  }

  user.balance -= amount;
  user.transactions.unshift({
    type: "Debit",
    amount,
    date: new Date().toLocaleString()
  });

  localStorage.setItem("user", JSON.stringify(user));
  loadDashboard();
}

/* Transactions */
function openTransactions() {
  const user = JSON.parse(localStorage.getItem("user"));
  const list = document.getElementById("txList");
  list.innerHTML = "";

  user.transactions.forEach(tx => {
    const li = document.createElement("li");
    li.textContent = `${tx.type} ₦${tx.amount} — ${tx.date}`;
    list.appendChild(li);
  });

  showScreen("transactions");
}

/* Profile */
function openProfile() {
  showScreen("profile");
}

/* Logout */
function logout() {
  localStorage.removeItem("user");
  showScreen("login");
}

/* Auto-login */
if (localStorage.getItem("user")) {
  loadDashboard();
}
