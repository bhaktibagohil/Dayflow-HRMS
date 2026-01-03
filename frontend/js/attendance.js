const API_BASE = "http://localhost:5000/api/attendance";
const token = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", () => {
  loadAttendance();
  document.getElementById("checkInBtn")?.addEventListener("click", checkIn);
  document.getElementById("checkOutBtn")?.addEventListener("click", checkOut);
});

async function loadAttendance() {
  const res = await fetch(`${API_BASE}/my`, {
    headers: {
      Authorization: token,
    },
  });

  const data = await res.json();
  if (res.ok) {
    const table = document.getElementById("attendanceTable");
    table.innerHTML = `
      <tr>
        <th>Date</th>
        <th>Check-In</th>
        <th>Check-Out</th>
        <th>Status</th>
        <th>Work Hours</th>
      </tr>
    `;
    data.forEach((entry) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${entry.date}</td>
        <td>${entry.check_in || "-"}</td>
        <td>${entry.check_out || "-"}</td>
        <td>${entry.status}</td>
        <td>${entry.work_hours || "-"}</td>
      `;
      table.appendChild(row);
    });
  } else {
    alert("Failed to load attendance data.");
  }
}

async function checkIn() {
  const res = await fetch(`${API_BASE}/checkin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  const data = await res.json();
  if (res.ok) {
    alert("Checked in successfully!");
    loadAttendance();
  } else {
    alert(data.message || "Check-in failed.");
  }
}

async function checkOut() {
  const res = await fetch(`${API_BASE}/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  const data = await res.json();
  if (res.ok) {
    alert("Checked out successfully!");
    loadAttendance();
  } else {
    alert(data.message || "Check-out failed.");
  }
}
