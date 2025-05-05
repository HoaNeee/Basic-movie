import React from "react";
import BannerHome from "../components/BannerHome";
import MovieList from "../components/MovieList";
import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const moviesTrending = useSelector((state) => state.movies.moviesTrending);

  const { data: airingTodayData } = useFetch("/tv/airing_today");
  const { data: topRatedData } = useFetch("/movie/top_rated");
  const { data: popularData } = useFetch("/movie/popular");

  return (
    <div className="">
      <BannerHome />
      <MovieList
        title={"Trending Show"}
        trending={true}
        movies={moviesTrending}
      />
      <MovieList
        title={"Popular Movie"}
        movies={popularData}
        media_type={"movie"}
      />
      <MovieList
        title={"Top Rated Movie"}
        movies={topRatedData}
        media_type={"movie"}
      />
      <MovieList
        title={"Airing Today"}
        movies={airingTodayData}
        media_type={"tv"}
      />
    </div>
  );
};

export default Home;
