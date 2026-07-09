import { axiosInstance } from "@/lib/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthStateProps, ChangePassword } from "@/types/types";

const initialState: AuthStateProps = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  loading: false,
  error: null,
  allUsers: [],
};

export const userSignUp = createAsyncThunk(
  "auth/signUp",
  async (
    {
      firstName,
      lastName,
      email,
      password,
    }: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/signUpApi", {
        firstName,
        lastName,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Please try again.>"
        );
      } else {
        return rejectWithValue(
          "An unexpected error occurred. Please try again."
        );
      }
    }
  }
);

export const userForgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/forgetPassword", { email });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Error sending reset password email. Please try again later."
        );
      } else {
        return rejectWithValue("An unexpected error occurred.");
      }
    }
  }
);

export const userNewPassword = createAsyncThunk(
  "auth/userUpdatePassword",
  async (
    { newPassword, token }: { newPassword: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put("/forgetPassword", {
        password: newPassword,
        token,
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Error sending reset password email. Please try again later."
        );
      } else {
        return rejectWithValue("An unexpected error occurred.");
      }
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data: ChangePassword, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/changePassword", data);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Error changing password. Please try again later."
        );
      } else {
        return rejectWithValue("An unexpected error occurred.");
      }
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "auth/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/allUsers");
      return response.data.users;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Error fetching all users. Please try again later."
        );
      } else {
        return rejectWithValue("An unexpected error occurred.");
      }
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // SignUp
      .addCase(userSignUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userSignUp.fulfilled, (state, action) => {
        state.loading = false;
        state.firstName = action?.payload?.firstName || "";
        state.lastName = action?.payload?.lastName || "";
        state.email = action?.payload?.email || "";
        state.password = action?.payload?.password || "";
      })
      .addCase(userSignUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload as string;
      })
      // Handling forget password actions
      .addCase(userForgetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userForgetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.email =
          action.payload.message || "Password reset link sent successfully.";
      })
      .addCase(userForgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // NewPassword
      .addCase(userNewPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userNewPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.password = action.payload.message;
      })
      .addCase(userNewPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // change password
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.password = action.payload.message;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // get all users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
