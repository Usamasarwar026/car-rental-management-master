import { axiosInstance } from "@/lib/axiosInstance";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface BookingState {
  loading: boolean;
  error: string | null;
  success: boolean;
  data: any | null;
  userBookings: any[];
  allBookings: any[];
  invoice: string | null; // Store base64 invoice
}

const initialState: BookingState = {
  loading: false,
  error: null,
  success: false,
  data: null,
  userBookings: [],
  allBookings: [],
  invoice: null,
};

export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData: any, { rejectWithValue }) => {
    try {
      
      const response = await axiosInstance.post("/booking", bookingData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const getUserBookings = createAsyncThunk(
  "booking/getUserBookings",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/booking`, {
        params: { userId },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const getAllBookings = createAsyncThunk(
  "booking/getAllBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/allBooking`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    resetBookingState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.data = null;
      state.invoice = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createBooking.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload.data;
        state.invoice = action.payload.invoice; // Store invoice
      })
      .addCase(createBooking.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getUserBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserBookings.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.userBookings = action.payload.data;
      })
      .addCase(getUserBookings.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBookings.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.allBookings = action.payload.data;
      })
      .addCase(getAllBookings.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetBookingState } = bookingSlice.actions;

export default bookingSlice.reducer;