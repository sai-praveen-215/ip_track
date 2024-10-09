import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface State {
  data: any; // You can specify a more specific type instead of 'any'
  loading: boolean;
  error: string | null; // Make error nullable
}

const initialState: State = {
  data: null,
  loading: false,
  error: null,
};

// Create async thunk
export const getapi = createAsyncThunk("getdata", async (ipAddress: string) => {
  const url = `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_qZuBys4yIUxsMi3M37se9m0W6uBRn&ipAddress=${ipAddress}`;
  const response = await axios.get(url); // Wait for the API response
  return response.data; // Return the response data
});

// Create slice
const getSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getapi.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(getapi.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Assign the fetched data
      })
      .addCase(getapi.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.error.message; // Set error message
        state.data = null; // Reset data on error
      });
  },
});

export default getSlice.reducer;
