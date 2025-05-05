import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Card from "../components/Card";
import { useSelector } from "react-redux";

const ExplorePage = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const imageUrl = useSelector((state) => state.movies.imageUrl);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/discover/${params.explore}`, {
        params: {
          page: page,
        },
      });
      setData((prev) => [...prev, ...response.data.results]);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setData([]);
    if (page != 1) {
      setPage(1);
    }
    if (page == 1) {
      fetchData();
    }
  }, [params.explore]);

  useEffect(() => {
    if (page != 0) {
      fetchData();
    }
  }, [page]);

  const scrollToNext = () => {
    if (
      Math.round(window.innerHeight + window.scrollY) >=
      document.body.offsetHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollToNext);
  }, []);

  return (
    data &&
    data.length > 0 && (
      <div className="container px-2 py-14 min-h-screen">
        <h2 className="my-5 text-xl lg:text-2xl font-bold">
          {params.explore === "tv" ? "TV Shows" : "Movies"}
        </h2>
        <div
          className={`grid grid-cols-[repeat(auto-fit,340px)] lg:grid-cols-[repeat(auto-fit,280px)] justify-center lg:justify-start gap-6 overflow-x-scroll scroll-none relative z-10 scroll-smooth`}
        >
          {data.map((item, index) => (
            <Card
              key={index}
              data={item}
              imageUrl={imageUrl}
              media_type={params.explore}
            />
          ))}
        </div>
      </div>
    )
  );
};

export default ExplorePage;
