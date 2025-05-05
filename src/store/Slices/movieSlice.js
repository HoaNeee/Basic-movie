import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  moviesTrending: [],
  imageUrl: "",
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
  },
});

export const { setMoviesTrending, setImageUrl } = movieSlice.actions;

export default movieSlice.reducer;
