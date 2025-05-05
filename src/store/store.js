import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./Slices/movieSlice";

export default configureStore({
  reducer: {
    movies: movieReducer,
  },
});
