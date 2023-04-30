import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: {},
  genres: {},
};

export const homeSlice = createSlice({
  name: "Home",
  initialState,
  reducers: {
    fetchConfigurationData: (state, action) => {
      state.url = action.payload;
    },
    fetchAllGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export const { fetchConfigurationData, fetchAllGenres } = homeSlice.actions;
export default homeSlice.reducer;
