import { initLayout } from "./layout.js";
import ToastManager from "./core/ToastManager.js";

const API_BASE_URL = "https://localhost:7168/api";
const DASHBOARD_PATH = {
  PATIENT: "patient-dashboard.html",
  DOCTOR: "doctor-dashboard.html",
};

const toast = new ToastManager();
const storage = window.sessionStorage;
let isSubmitting = false;

function refreshIcons() {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

function setSubmitState(button, busy) {
  if (!button) {
    return;
  }

  button.disabled = busy;
  button.innerHTML = busy
    ? '<i data-lucide="loader-2" class="icon-sm"></i> Signing In...'
    : '<i data-lucide="log-in" class="icon-sm"></i> Sign In';

  refreshIcons();
}

function getFormValues() {
  return {
    email: document.getElementById("email")?.value.trim() ?? "",
    password: document.getElementById("password")?.value ?? "",
    userType: document.querySelector('input[name="userType"]')?.value ?? "",
  };
}

function validate(values) {
  if (!values.email) {
    toast.error("Email is required.");
    return false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(values.email)) {
    toast.error("Please enter a valid email address.");
    return false;
  }

  if (!values.password) {
    toast.error("Password is required.");
    return false;
  }

  if (!values.userType || !["patient", "doctor"].includes(values.userType)) {
    toast.error("Please choose a valid user type.");
    return false;
  }

  return true;
}

function storeSession(token, profile) {
  storage.setItem("authToken", token);
  storage.setItem("userProfile", JSON.stringify(profile));
}

function redirect(userType) {
  const path = DASHBOARD_PATH[userType];
  if (path) {
    window.location.href = path;
  }
}

function checkExistingLogin() {
  const token = storage.getItem("authToken");
  const profileRaw = storage.getItem("userProfile");

  if (!token || !profileRaw) {
    return;
  }

  try {
    const profile = JSON.parse(profileRaw);
    redirect(profile.userType);
  } catch (_) {
    storage.removeItem("authToken");
    storage.removeItem("userProfile");
  }
}

function setupUserTypeToggle() {
  const buttons = document.querySelectorAll(".toggle-btn");
  const hiddenInput = document.querySelector('input[name="userType"]');

  if (!buttons.length || !hiddenInput) {
    return;
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((button) => button.classList.remove("active"));
      btn.classList.add("active");
      hiddenInput.value = btn.dataset.type;
      refreshIcons();
    });
  });
}

async function loginRequest(payload) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const raw = await response.text();
  let parsed = null;
  if (raw) {
    try {
      parsed = JSON.parse(raw);
    } catch (_) {
      parsed = null;
    }
  }

  if (!response.ok) {
    const message = parsed?.message || "Login failed. Please try again.";
    throw new Error(message);
  }

  return parsed;
}

function setupLoginFormHandler() {
  const form = document.getElementById("loginForm");
  const submitBtn = document.getElementById("loginSubmitBtn");

  if (!form || !submitBtn) {
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (isSubmitting) {
      return false;
    }

    const values = getFormValues();
    if (!validate(values)) {
      return false;
    }

    const payload = {
      email: values.email,
      password: values.password,
      userType: values.userType.toUpperCase(),
    };

    isSubmitting = true;
    setSubmitState(submitBtn, true);

    try {
      const result = await loginRequest(payload);
      storeSession(result.token, result.profile);
      toast.success(result.message || "Login successful. Redirecting...");

      setTimeout(() => {
        redirect(result.profile.userType);
      }, 900);
    } catch (error) {
      toast.error(error.message || "Unable to login.");
      setSubmitState(submitBtn, false);
      isSubmitting = false;
    }

    return false;
  });
}

async function initLoginPage() {
  try {
    await initLayout("login");
  } catch (error) {
    console.warn("Layout initialization failed", error);
  }

  refreshIcons();
  checkExistingLogin();
  setupUserTypeToggle();
  setupLoginFormHandler();

  const submitBtn = document.getElementById("loginSubmitBtn");
  if (submitBtn) {
    submitBtn.disabled = false;
  }
}

document.addEventListener("DOMContentLoaded", initLoginPage);
