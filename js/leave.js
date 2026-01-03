const API_BASE = "http://localhost:5000/api/leave";
const token = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", () => {
  loadLeaveRequests();
  document.getElementById("applyLeaveBtn")?.addEventListener("click", applyLeave);
});

async function loadLeaveRequests() {
  const res = await fetch(`${API_BASE}/my`, {
    headers: { Authorization: token },
  });

  const data = await res.json();
  if (res.ok) {
    const table = document.getElementById("leaveTable");
    table.innerHTML = `
      <tr>
        <th>Type</th>
        <th>From</th>
        <th>To</th>
        <th>Status</th>
        <th>Reason</th>
      </tr>
    `;
    data.forEach((leave) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${leave.leave_type}</td>
        <td>${leave.start_date}</td>
        <td>${leave.end_date}</td>
        <td>${leave.status}</td>
        <td>${leave.reason || "-"}</td>
      `;
      table.appendChild(row);
    });
  } else {
    alert("Failed to load leave data.");
  }
}

async function applyLeave() {
  const payload = {
    leave_type_id: document.getElementById("leaveType").value,
    start_date: document.getElementById("startDate").value,
    end_date: document.getElementById("endDate").value,
    reason: document.getElementById("reason").value,
  };

  const res = await fetch(`${API_BASE}/apply`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (res.ok) {
    alert("Leave applied successfully!");
    loadLeaveRequests();
  } else {
    alert(data.message || "Failed to apply for leave.");
  }
}
