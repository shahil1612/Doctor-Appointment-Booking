const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://localhost:7168/api";

import { store } from "../store";

/**
 * Get authentication token from Redux store
 */
const getAuthToken = () => {
  return store.getState().auth.token;
};

/**
 * Generic API fetch wrapper
 */
const apiFetch = async (endpoint, options = {}) => {
  const token = getAuthToken();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const fullUrl = `${API_BASE_URL}${endpoint}`;
  console.log(`🌐 API Request: ${options.method || "GET"} ${fullUrl}`);
  console.log("📦 Request Options:", { ...options, headers });
  const response = await fetch(fullUrl, {
    ...options,
    headers,
  });

  console.log(`📊 Response Status: ${response.status}`);

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Request failed" }));
    console.error(`❌ API Error: ${response.status}`, error);
    throw new Error(
      error.Message || error.message || `HTTP ${response.status}`,
    );
  }

  const data = await response.json();
  console.log(`✅ Response Data:`, data);
  return data;
};

/**
 * Auth API calls
 */
export const authAPI = {
  login: async (credentials) => {
    return apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  signup: async (data) => {
    return apiFetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  logout: () => {
    // Auth cleanup is handled in Redux slice.
  },
};

/**
 * Patient API calls
 */
export const patientAPI = {
  getProfile: async () => {
    return apiFetch("/patient/profile", {
      method: "GET",
    });
  },

  updateProfile: async (data) => {
    return apiFetch("/patient/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
};

/**
 * Appointment API calls
 */
export const appointmentAPI = {
  // Patient endpoints
  getAvailableDoctors: async () => {
    return apiFetch("/appointments/doctors/available", {
      method: "GET",
    });
  },

  getAvailableSlots: async (doctorUserId, clinicId = null) => {
    const query = new URLSearchParams();

    if (doctorUserId) {
      query.append("doctorUserId", doctorUserId);
    }
    if (clinicId) {
      query.append("clinicId", clinicId);
    }

    const endpoint = `/appointments/slots/available${query.toString() ? `?${query}` : ""}`;

    return apiFetch(endpoint, {
      method: "GET",
    });
  },

  createAppointment: async (data) => {
    return apiFetch("/appointments", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Doctor endpoints
  getPendingAppointments: async () => {
    return apiFetch("/appointments/pending", {
      method: "GET",
    });
  },

  decideAppointment: async (appointmentId, data) => {
    return apiFetch(`/appointments/${appointmentId}/decision`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  cancelAppointment: async (appointmentId, data) => {
    return apiFetch(`/appointments/${appointmentId}/cancel`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  createSlot: async (data) => {
    return apiFetch("/appointments/doctor/slots", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  getDoctorSlots: async (clinicId = null, includeBooked = true) => {
    const query = new URLSearchParams({
      includeBooked,
      ...(clinicId && { clinicId }),
    });
    return apiFetch(`/appointments/doctor/slots?${query}`, {
      method: "GET",
    });
  },

  deleteSlot: async (slotId) => {
    return apiFetch(`/appointments/doctor/slots/${slotId}`, {
      method: "DELETE",
    });
  },
};
