import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPincodeDetails = createAsyncThunk(
  "pincode/fetchPincodeDetails",
  async (pincode, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      if (response.data[0].Status === "Error") {
        throw new Error("Invalid pincode");
      }
      return response.data[0].PostOffice || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const pincodeSlice = createSlice({
  name: "pincode",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPincodeDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPincodeDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchPincodeDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default pincodeSlice.reducer;
