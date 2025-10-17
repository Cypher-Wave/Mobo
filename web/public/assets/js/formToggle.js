const userRoleSelect = document.getElementById("userRole");
const farmerFields = document.getElementById("farmerFields");
const companyFields = document.getElementById("companyFields");

userRoleSelect.addEventListener("change", function () {
    const selectedRole = this.value;

    if (selectedRole === "family_farmer") {
        farmerFields.style.display = "block";
        companyFields.style.display = "none";
    } else {
        farmerFields.style.display = "none";
        companyFields.style.display = "block";
    }
});