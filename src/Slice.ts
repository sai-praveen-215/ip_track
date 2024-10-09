import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface State {
  data: any;
  loading: boolean;
  error: string | null;
  dataLoading: boolean;
}

const initialState: State = {
  data: null,
  loading: false,
  error: null,
  dataLoading: false,
};

export const getapi = createAsyncThunk("getdata", async (ipAddress: string) => {
  const url = `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_qZuBys4yIUxsMi3M37se9m0W6uBRn&ipAddress=${ipAddress}`;
  const response = await axios.get(url);
  console.log(response, "res");
  return response.data;
});

const getSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getapi.pending, (state) => {
        state.loading = true;

        state.error = null;
      })
      .addCase(getapi.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getapi.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.error.message;
        state.data = null;
      });
  },
});

export default getSlice.reducer;
