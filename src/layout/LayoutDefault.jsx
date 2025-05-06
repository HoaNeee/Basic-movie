import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NavMobile from "../components/NavMobile";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setImageUrl, setMoviesTrending } from "../store/Slices/movieSlice";

const LayoutDefault = () => {
  const dispatch = useDispatch();

  const language = useSelector((state) => state.movies.language);

  const fetchMovieTrending = async () => {
    try {
      const response = await axios.get("/trending/all/week", {
        params: {
          language: language,
        },
      });
      dispatch(setMoviesTrending(response.data.results));
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchConfiguration = async () => {
    try {
      const response = await axios.get("/configuration");
      dispatch(setImageUrl(response.data.images.secure_base_url + "original"));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovieTrending();
    fetchConfiguration();
  }, [language]);

  return (
    <main className="pb-14 md:pb-0">
      <Header />
      <div className="">
        <Outlet />
      </div>
      <Footer />
      <div className="flex md:hidden bg-neutral-600 fixed bottom-0 w-full h-14 items-center z-20">
        <NavMobile />
      </div>
    </main>
  );
};

export default LayoutDefault;
