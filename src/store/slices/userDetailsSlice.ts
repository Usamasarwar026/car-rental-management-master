import { axiosInstance } from "@/lib/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userDetailsProps } from "@/types/types";
import { UserState } from "@/types/types";

const initialState: UserState = {
  userDetails: null,
  loading: false,
  error: null,
};

export const fetchUserDetails = createAsyncThunk(
  "userDetails/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/getUserDetails");
      return response.data.user;
    } catch {
      rejectWithValue("Failed to fetch user details");
    }
  }
);

export const updateUser = createAsyncThunk(
  "userDetails/updateUser",
  async (updatedData: Partial<userDetailsProps>, { rejectWithValue }) => {
    try {
      console.log("user updated",updatedData)
      const response = await axiosInstance.put("/getUserDetails", updatedData);
      console.log("response",response)
      return response.data.user;
    } catch {
      return rejectWithValue("Failed to update user details");
    }
  }
);

export const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get user details
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // update user details
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        if (state.userDetails) {
          state.userDetails = { ...state.userDetails, ...action.payload };
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userDetailsSlice.reducer;
