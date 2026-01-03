const API_BASE = "http://localhost:5000/api/auth";

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("token", data.token);
    alert("Login successful!");
    window.location.href = "employee_dashboard.html"; // or admin_dashboard.html based on role
  } else {
    alert(data.message);
  }
}

async function signup() {
  const payload = {
    first_name: document.getElementById("firstName").value,
    last_name: document.getElementById("lastName").value,
    employee_id: document.getElementById("employeeId").value,
    company_code: document.getElementById("companyCode").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    role: document.getElementById("role").value,
    year_of_joining: parseInt(document.getElementById("yearOfJoining").value),
  };

  const res = await fetch(`${API_BASE}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (res.ok) {
    alert("Signup successful! Please login.");
    window.location.href = "login.html";
  } else {
    alert(data.message);
  }
}
