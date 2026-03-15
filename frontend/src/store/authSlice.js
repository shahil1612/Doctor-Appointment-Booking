import { createSlice } from "@reduxjs/toolkit";

const AUTH_STORAGE_KEY = "auth";

const normalizeUserType = (userType) => {
  if (!userType && userType !== 0) {
    return null;
  }

  if (typeof userType === "number") {
    return userType === 1 ? "DOCTOR" : "PATIENT";
  }

  const normalized = String(userType).trim().toUpperCase();

  if (normalized === "DOCTOR") {
    return "DOCTOR";
  }

  if (normalized === "PATIENT") {
    return "PATIENT";
  }

  return null;
};

const loadAuthFromStorage = () => {
  try {
    const raw = sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      return { token: null, userType: null };
    }

    const parsed = JSON.parse(raw);
    return {
      token: parsed?.token || null,
      userType: normalizeUserType(parsed?.userType),
    };
  } catch {
    return { token: null, userType: null };
  }
};

const saveAuthToStorage = (state) => {
  const data = {
    token: state.token,
    userType: state.userType,
  };

  sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
};

const clearAuthFromStorage = () => {
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
};

const initialState = loadAuthFromStorage();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, userType } = action.payload;

      state.token = token || null;
      state.userType = normalizeUserType(userType);
      saveAuthToStorage(state);
    },
    logout: (state) => {
      state.token = null;
      state.userType = null;
      clearAuthFromStorage();
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export const selectAuthToken = (state) => state.auth.token;
export const selectUserType = (state) => state.auth.userType;
export const selectIsAuthenticated = (state) => Boolean(state.auth.token);
export const mapBackendUserType = normalizeUserType;

export default authSlice.reducer;
