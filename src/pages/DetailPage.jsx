import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import Devider from "../components/Devider";
import useFetchDetail from "../hooks/useFetchDetail";
import ImageAvatar from "../assets/avatarNotFound.jpg";
import ImageNotFound from "../assets/notfound.png";
import ImageLogo from "../assets/logo.png";
import { FaPlay } from "react-icons/fa";
import useFetch from "../hooks/useFetch";
import MovieList from "../components/MovieList";

const DetailPage = () => {
  const params = useParams();
  const imageUrl = useSelector((state) => state.movies.imageUrl);

  const { data: dataDetails } = useFetchDetail(
    `/${params.explore}/${params.id}`
  );

  const { data: credits } = useFetchDetail(
    `/${params.explore}/${params.id}/credits`
  );

  const { data: similarData } = useFetch(
    `/${params.explore === "collection" ? "movie" : params.explore}/${
      params.id
    }/similar`
  );

  const { data: recommendations } = useFetch(
    `/${params.explore === "collection" ? "movie" : params.explore}/${
      params.id
    }/recommendations`
  );

  const director = credits?.crew?.find((cre) => cre.job === "Director");
  const writer = credits?.crew?.filter((cre) =>
    cre.department.includes("Writing")
  );

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [params.id]);

  const writers = [...new Set(writer?.map((item) => item.name))];

  const handleTrailer = () => {
    console.log("ok");
  };

  // const fetchMuti = async () => {
  //   try {
  //     const res = await axios.get("https://api.themoviedb.org/3/search/multi", {
  //       params: {
  //         query: "spider",
  //       },
  //     });
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchMuti();
  // }, []);

  return (
    dataDetails && (
      <section className="min-h-[91vh] w-full lg:py-0 py-14 lg:mb-4">
        <div className="hidden md:block">
          <div className="h-[320px] relative">
            <img
              className="h-full w-full object-cover"
              src={
                dataDetails.poster_path
                  ? imageUrl + dataDetails.backdrop_path
                  : ImageLogo
              }
              alt="this is banner"
            />
            <div className="absolute top-0  w-full h-full bg-gradient-to-t from-neutral-900 to-transparent" />
          </div>
        </div>
        <div className="container px-2 relative flex mx-auto lg:flex-row flex-col lg:gap-10 gap-5 items-center lg:items-start">
          <div className="lg:-mt-30 ml-5">
            <img
              className="h-98 w-[276px] rounded-lg"
              src={
                dataDetails.poster_path
                  ? imageUrl + dataDetails.poster_path
                  : ImageNotFound
              }
              alt=""
            />
            <button className="inline-block w-full py-2 text-black font-bold text-lg rounded bg-white mt-4 cursor-pointer hover:bg-gradient-to-r from-orange-600 to-yellow-300 hover:scale-105 transition-all">
              Play Now
            </button>
          </div>
          <div className="flex-1">
            <div className="text-center lg:text-start">
              <h2 className="text-2xl lg:text-4xl font-bold text-white">
                {dataDetails?.title ||
                  dataDetails?.original_title ||
                  dataDetails?.name}
              </h2>
              <p className="text-neutral-400 ml-1 ">
                {dataDetails?.genres?.map((item) => item?.name).join(", ")}
              </p>
              <div
                className="inline-flex items-center text-black gap-2 my-4 px-4 rounded bg-gradient-to-r from-orange-600 to-yellow-400 group cursor-pointer transition-all hover:scale-105"
                onClick={handleTrailer}
              >
                <FaPlay className="cursor-pointer" />
                <button className="font-bold py-2 cursor-pointer">
                  Trailer
                </button>
              </div>
              <p className="text-neutral-400 ml-1 ">
                {dataDetails.tagline || "Playing now!"}
              </p>
            </div>
            <Devider />
            <div className="flex gap-3">
              <p>
                Rating : {Number(dataDetails?.vote_average || 0).toFixed(1)}+
              </p>
              <span>|</span>
              <p>View : {Number(dataDetails.popularity || 0).toFixed(1)}</p>
              <span>|</span>
              <p>
                Duration : {Number(dataDetails.runtime / 60 || 0).toFixed(0)}h{" "}
                {Number(dataDetails.runtime % 60 || 0).toFixed(0)}m
              </p>
            </div>
            <Devider />
            <div>
              <p className="text-xl text-white font-bold mb-1">Overview: </p>
              <p>{dataDetails.overview}</p>
            </div>
            <Devider />
            <div className="flex gap-3 justify-center lg:justify-start items-center">
              <p>Status : {dataDetails.status}</p>
              <span>|</span>
              <p>
                Release :{" "}
                {dataDetails?.release_date || new Date().toLocaleDateString()}
              </p>
              <span>|</span>
              <p>Revenue : {dataDetails?.revenue || "00001"}</p>
            </div>
            <Devider />
            <div>
              <p>
                <span className="text-white font-bold">Director</span> :{" "}
                {director?.name || "Not Available"}
              </p>
            </div>
            <Devider />
            <div>
              <p>
                {" "}
                <span className="text-white font-bold">Writers</span> :{" "}
                {writers?.join(", ") || "Not Available"}
              </p>
            </div>

            <Devider />
            <div>
              <h2 className="mb-3 text-white text-lg font-bold">Star Cast: </h2>
              <div className="grid grid-cols-[repeat(auto-fit,76px)] lg:grid-cols-[repeat(auto-fit,120px)] gap-4">
                {credits &&
                  credits.cast &&
                  credits.cast.map((credit) => (
                    <Link
                      className="text-center flex flex-col gap-2"
                      key={credit.id}
                    >
                      <div className="h-19 w-19 lg:h-30 lg:w-30">
                        <img
                          className="h-full w-full object-cover rounded-full"
                          src={
                            credit.profile_path
                              ? imageUrl + credit.profile_path
                              : ImageAvatar
                          }
                          alt="this is image"
                        />
                      </div>
                      <p className="text-sm">{credit.name}</p>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3">
          {similarData && similarData.length > 0 && (
            <MovieList
              media_type={
                params.explore === "collection" ? "movie" : params.explore
              }
              movies={similarData}
              title={`Similar  ${
                params.explore === "tv" ? "TV Shows" : "Movies"
              }`}
            />
          )}
          {recommendations && recommendations.length > 0 && (
            <MovieList
              media_type={
                params.explore === "collection" ? "movie" : params.explore
              }
              movies={recommendations}
              title={`Recommendations`}
            />
          )}
        </div>
      </section>
    )
  );
};

export default DetailPage;
