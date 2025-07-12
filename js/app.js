// 🔁 Load updated data if available from sessionStorage
if (sessionStorage.getItem("updatedEmployees")) {
  mockEmployees = JSON.parse(sessionStorage.getItem("updatedEmployees"));
}

let employees = [...mockEmployees];
let filteredEmployees = [...employees];
let currentPage = 1;
const itemsPerPage = 8;

// DOM Elements
const container = document.getElementById("employee-list-container");
const searchInput = document.getElementById("search-input");
const pagination = document.getElementById("pagination");
const filterToggle = document.getElementById("filter-toggle");
const filterContainer = document.getElementById("filter-container");
const filterDept = document.getElementById("filter-department");
const filterRole = document.getElementById("filter-role");
const applyFilterBtn = document.getElementById("apply-filters");

// Render Employees with Pagination
function renderEmployees(list) {
  container.innerHTML = "";
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageData = list.slice(start, end);

  if (!pageData.length) {
    container.innerHTML = "<p>No employees found.</p>";
    return;
  }

  pageData.forEach((emp) => {
    const div = document.createElement("div");
    div.className = "employee-card";
    div.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p>${emp.email}</p>
      <p>${emp.department}</p>
      <p>${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;
    container.appendChild(div);
  });

  renderPagination(list.length);
}

// Render Pagination Buttons
function renderPagination(total) {
  pagination.innerHTML = "";
  const pages = Math.ceil(total / itemsPerPage);
  for (let i = 1; i <= pages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.disabled = true;
    btn.addEventListener("click", () => {
      currentPage = i;
      renderEmployees(filteredEmployees);
    });
    pagination.appendChild(btn);
  }
}

// Filter & Search
function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase();
  const dept = filterDept.value;
  const role = filterRole.value;

  filteredEmployees = employees.filter((emp) => {
    const fullName = (emp.firstName + " " + emp.lastName).toLowerCase();
    return (
      (!dept || emp.department === dept) &&
      (!role || emp.role === role) &&
      (fullName.includes(searchTerm) || emp.email.toLowerCase().includes(searchTerm))
    );
  });

  currentPage = 1;
  renderEmployees(filteredEmployees);
}

// Delete Employee
function deleteEmployee(id) {
  if (!confirm("Delete this employee?")) return;
  employees = employees.filter((emp) => emp.id !== id);
  // Update sessionStorage to reflect new state
  sessionStorage.setItem("updatedEmployees", JSON.stringify(employees));
  applyFilters();
}

// Navigate to Edit Page
function editEmployee(id) {
  window.location.href = `form.html?id=${id}`;
}

// Event Listeners
searchInput.addEventListener("input", applyFilters);
filterToggle.addEventListener("click", () =>
  filterContainer.classList.toggle("hidden")
);
applyFilterBtn.addEventListener("click", applyFilters);

// Initial Render
renderEmployees(filteredEmployees);
