import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const MovieList = ({ title, trending, movies, media_type }) => {
  const imageUrl = useSelector((state) => state.movies.imageUrl);
  const containerRef = useRef();

  const handleNext = () => {
    containerRef.current.scrollLeft += 320;
  };
  const handlePrev = () => {
    containerRef.current.scrollLeft -= 320;
  };
  return (
    movies &&
    movies.length > 0 && (
      <div className="container px-3 mx-auto my-5 relative">
        <h2 className="text-xl lg:text-2xl font-bold my-5">
          {title ?? "there is place title!"}
        </h2>

        <div className="relative group">
          <div
            ref={containerRef}
            className={`grid auto-cols-max grid-flow-col gap-6 overflow-x-scroll scroll-none relative z-10 scroll-smooth`}
          >
            {movies.map((movie, index) => (
              <Card
                imageUrl={imageUrl}
                data={movie}
                key={index}
                trending={trending}
                index={index + 1}
                media_type={media_type}
              />
            ))}
          </div>

          <div className="hidden group-hover:md:flex absolute top-0 justify-between items-center h-full w-full">
            <button
              className="p-3 bg-white text-black rounded-full -ml-3 cursor-pointer z-10"
              onClick={handlePrev}
            >
              <FaAngleLeft />
            </button>
            <button
              className="p-3 bg-white text-black rounded-full -mr-3 cursor-pointer z-10"
              onClick={handleNext}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default MovieList;
