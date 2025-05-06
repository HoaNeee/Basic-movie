import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  moviesTrending: [],
  imageUrl: "",
  language: "en-US",
};

export const movieSlice = createSlice({
  name: "movie",
  initialState: initialValue,
  reducers: {
    setMoviesTrending: (state, actions) => {
      state.moviesTrending = actions.payload;
    },
    setImageUrl: (state, actions) => {
      state.imageUrl = actions.payload;
    },
    setLanguage: (state, actions) => {
      state.language = actions.payload;
    },
  },
});

export const { setMoviesTrending, setImageUrl, setLanguage } =
  movieSlice.actions;

export default movieSlice.reducer;
