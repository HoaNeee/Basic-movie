import React from "react";
import { Link } from "react-router";
import ImageNotFound from "../assets/notfound.png";

const Card = ({ data, imageUrl, trending, index, media_type }) => {
  const mediaType = data?.media_type || media_type;

  return (
    <Link
      to={`/${mediaType ?? "collection"}/${data.id}`}
      className="h-94 w-[340px] lg:h-88 lg:w-[280px] relative inline-block overflow-hidden"
    >
      <img
        className="h-full w-full object-cover hover:scale-105 transition-all"
        src={data.poster_path ? imageUrl + data.poster_path : ImageNotFound}
        alt="this is image"
      />
      {trending && (
        <div className="absolute top-4">
          <span className="px-4 py-2 bg-neutral-900/80 backdrop-blur-3xl rounded-r-full inline-block text-sm">
            #{index} trending
          </span>
        </div>
      )}
      <div className="absolute bottom-0 h-18 backdrop-blur-3xl w-full bg-neutral-900/60 p-2">
        <p className="text-lg text-ellipsis line-clamp-1">
          {data?.name || data?.title}
        </p>
        <div className="flex items-center justify-between ">
          <span className="text-neutral-400 text-sm">
            {data?.release_date ?? new Date().toLocaleDateString()}
          </span>
          <span className="px-3 py-1 text-sm bg-yellow-500 rounded-sm text-white">
            {Number(data.vote_average).toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
