import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { axiosInstance } from "@/lib/axiosInstance";
import { EventsState } from "@/types/types";
import { CalendarEvent } from "@/types/types";

const initialState: EventsState = {
  events: [],
  loading: false,
  error: null,
};

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const res = await fetch("/api/dailySchedule");
  if (!res.ok) throw new Error("Failed to fetch events");
  return await res.json();
});

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (event: Omit<CalendarEvent, "id">) => {
    const res = await fetch("/api/dailySchedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });
    if (!res.ok) throw new Error("Failed to create event");
    return await res.json();
  }
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete("/dailySchedule", { data: { id } });
      return id;
    } catch {
      rejectWithValue("Something wrong in delete event");
    }
  }
);

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events = action.payload;
        state.loading = false;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.error = action.error.message || "Error fetching events";
        state.loading = false;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(
          (event) => event.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.error = action.error.message || "Error fetching events";
        state.loading = false;
      });
  },
});

export const selectEvents = (state: RootState) => state.eventStore;

export default eventsSlice.reducer;
