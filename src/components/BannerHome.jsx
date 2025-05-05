import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const BannerHome = () => {
  const [currIndex, setCurrIndex] = useState(0);

  const moviesTrending = useSelector((state) => state.movies.moviesTrending);
  const imageUrl = useSelector((state) => state.movies.imageUrl);

  const handleNext = () => {
    let index = currIndex;
    if (index != moviesTrending.length - 1) {
      ++index;
    } else {
      index = 0;
    }
    setCurrIndex(index);
  };
  const handlePrev = () => {
    let index = currIndex;
    if (index > 0) {
      --index;
    } else {
      index = moviesTrending.length - 1;
    }
    setCurrIndex(index);
  };

  return (
    <section className="h-full w-full">
      <div className="flex min-h-full max-h-[95vh] relative overflow-hidden group">
        {moviesTrending &&
          moviesTrending.map((movie, index) => (
            <div
              style={{
                transform: `translateX(-${currIndex * 100}%)`,
              }}
              key={index}
              className="min-h-[550px] lg:min-h-full min-w-full overflow-hidden transition-all"
            >
              <div className="h-full w-full">
                <img
                  className="h-full w-full object-cover"
                  src={imageUrl + movie.backdrop_path}
                  alt="this is image banner"
                />
              </div>

              <div className="w-full top-0 h-full hidden items-center justify-between absolute z-10 px-5 lg:group-hover:flex">
                <button
                  className="p-3 bg-white rounded-full text-black text-lg cursor-pointer"
                  onClick={handlePrev}
                >
                  <FaAngleLeft />
                </button>
                <button
                  className="p-3 bg-white rounded-full text-black text-lg cursor-pointer"
                  onClick={handleNext}
                >
                  <FaAngleRight />
                </button>
              </div>

              <div className="absolute top-0 h-full w-full bg-gradient-to-t from-neutral-900 to-transparent" />

              <div className="container mx-auto">
                <div className="px-3 absolute bottom-0 w-full max-w-lg z-11">
                  <p className="text-2xl lg:text-3xl text-white font-bold">
                    {movie.title || movie.name}
                  </p>
                  <p className="text-sm text-ellipsis line-clamp-3 mt-3">
                    {movie.overview}
                  </p>
                  <div className="my-4 flex gap-3">
                    <p className="">
                      Rating: {Number(movie.vote_average).toFixed(1)}+
                    </p>
                    |<p>View : {Number(movie.popularity).toFixed(0)}k</p>
                  </div>

                  <button className="py-2 px-4 rounded-md text-black font-black text-lg bg-white mb-3 cursor-pointer hover:bg-gradient-to-r hover:from-orange-600 hover:to-red-300 transition-all hover:scale-105">
                    Play Now
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default BannerHome;
