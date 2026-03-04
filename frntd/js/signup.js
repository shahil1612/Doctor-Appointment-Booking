import { initLayout } from "./layout.js";

// Wait for DOM to be ready before initializing
document.addEventListener("DOMContentLoaded", async function () {
  // Initialize layout first
  await initLayout("signup");

  // Initialize Lucide icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Get DOM elements
  const toggleBtns = document.querySelectorAll(".toggle-btn");
  const userTypeInput = document.getElementById("userTypeInput");
  const formTitle = document.getElementById("formTitleText");
  const formDesc = document.getElementById("formDescText");
  const patientFields = document.getElementById("patientFields");
  const doctorFields = document.getElementById("doctorFields");

  // Setup user type toggle (UI only)
  if (toggleBtns.length && userTypeInput) {
    toggleBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const type = this.dataset.type;

        // Update active state
        toggleBtns.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");

        // Update hidden input
        userTypeInput.value = type;

        // Update form title and description
        if (type === "patient") {
          formTitle.textContent = "Patient Registration";
          formDesc.textContent =
            "Create your account to book appointments with verified doctors";
          if (patientFields) patientFields.style.display = "block";
          if (doctorFields) doctorFields.style.display = "none";
        } else {
          formTitle.textContent = "Doctor Registration";
          formDesc.textContent =
            "Join our network of verified healthcare professionals";
          if (patientFields) patientFields.style.display = "none";
          if (doctorFields) doctorFields.style.display = "block";
        }

        // Re-initialize icons for dynamic content
        if (typeof lucide !== "undefined") {
          lucide.createIcons();
        }
      });
    });
  }

  // Enable submit button
  const submitBtn = document.getElementById("signupSubmitBtn");
  if (submitBtn) {
    submitBtn.disabled = false;
  }
});
