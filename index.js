document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  const dataTable = document.getElementById("dataTable");
  const tableBody = document.querySelector("#dataTable tbody");
  const dobError = document.getElementById("dobError");

  // Load existing data from localStorage
  let formDataList = JSON.parse(localStorage.getItem("formDataList")) || [];

  // Function to update table
  function updateTable() {
    tableBody.innerHTML = ""; // Clear current rows

    if (formDataList.length === 0) {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.setAttribute("colspan", "5");
      cell.textContent = "No data yet.";
      cell.style.textAlign = "center";
      row.appendChild(cell);
      tableBody.appendChild(row);
      dataTable.style.display = "table";
      return;
    }

    dataTable.style.display = "table";

    formDataList.forEach((entry) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${entry.name}</td>
        <td>${entry.email}</td>
        <td>•••••••</td>
        <td>${entry.dob}</td>
        <td>${entry.checkbox}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Handle form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const dobInput = document.getElementById("dob");
    const checkboxInput = document.getElementById("checkbox");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const dob = dobInput.value;
    const checkbox = checkboxInput.checked;

    // Reset error message
    dobError.style.display = "none";

    // Validate DOB
    if (!dob) {
      dobError.textContent = "Please select a valid date.";
      dobError.style.display = "block";
      return;
    }

    const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();
    const dayDiff = today.getDate() - dobDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    if (age < 18 || age > 55) {
      dobError.style.display = "block";
      return;
    }

    // Create new entry
    const newData = { name, email, password, dob, checkbox };

    // Add to list and save to localStorage
    formDataList.push(newData);
    localStorage.setItem("formDataList", JSON.stringify(formDataList));

    // Reset form fields
    form.reset();

    // Update table immediately
    updateTable();
  });

  // Initial load of table
  updateTable();
});
