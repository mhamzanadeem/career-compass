import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const savedSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {},
});

export default savedSlice.reducer;
