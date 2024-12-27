import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "./authAPI";

// Login async action
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(credentials);
      return response.data; // Assume response contains { user, token }
    } catch (err) {
      // Improved error handling
      const errorMessage = err.response?.data?.message || err.message || "An error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);

// Forgot Password async action
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await authAPI.forgotPassword(email);
      return response.data; // Assume success message or status from API
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "An error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);

// Slice definition
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,  // Use token from localStorage if available
    loading: false,
    error: null,
    successMessage: null,  // For forgot password success message
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.successMessage = null;  // Clear success message on logout
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login actions
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token); // Store token in localStorage
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;  // Use the specific error message
      })

      // Forgot Password actions
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;  // Store success message
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;  // Handle error on password reset failure
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
