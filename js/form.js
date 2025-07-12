const params = new URLSearchParams(window.location.search);
const editId = parseInt(params.get("id"));

const form = document.getElementById("employeeForm");

const fields = {
  id: document.getElementById("emp-id"),
  firstName: document.getElementById("firstName"),
  lastName: document.getElementById("lastName"),
  email: document.getElementById("email"),
  department: document.getElementById("department"),
  role: document.getElementById("role"),
};

// Fill form if editing
if (editId) {
  const emp = mockEmployees.find((e) => e.id === editId);
  if (emp) {
    fields.id.value = emp.id;
    fields.firstName.value = emp.firstName;
    fields.lastName.value = emp.lastName;
    fields.email.value = emp.email;
    fields.department.value = emp.department;
    fields.role.value = emp.role;
  }
}

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newEmp = {
    id: fields.id.value ? parseInt(fields.id.value) : Date.now(),
    firstName: fields.firstName.value.trim(),
    lastName: fields.lastName.value.trim(),
    email: fields.email.value.trim(),
    department: fields.department.value.trim(),
    role: fields.role.value.trim(),
  };

  const index = mockEmployees.findIndex((e) => e.id === newEmp.id);
  if (index >= 0) {
    mockEmployees[index] = newEmp;
  } else {
    mockEmployees.push(newEmp);
  }

  // 🔁 Save updated array to sessionStorage
  sessionStorage.setItem("updatedEmployees", JSON.stringify(mockEmployees));

  // ✅ Navigate back to dashboard
  window.location.href = "index.html";
});
