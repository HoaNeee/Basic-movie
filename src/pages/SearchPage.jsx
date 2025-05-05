import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import Card from "../components/Card";

const SearchPage = () => {
  const location = useLocation();
  const moviesTrending = useSelector((state) => state.movies.moviesTrending);

  ///search/multi
  const inputRef = useRef();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const imageUrl = useSelector((state) => state.movies.imageUrl);

  console.log(data);

  const fetchData = async (q) => {
    try {
      const response = await axios.get(`/search/multi`, {
        params: {
          query: q,
          language: "en-US",
          page: 1,
        },
      });
      setData(response.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    setData([]);
    fetchData(location?.search?.slice(3).split("%20").join(" "));
  }, []);

  useEffect(() => {
    fetchData(location?.search?.slice(3).split("%20").join(" "));
  }, [location?.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`?q=${inputRef.current.value}`);
  };

  return (
    <div className="container px-2 min-h-[91vh] py-16">
      <form className="flex md:hidden w-full gap-3" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className="bg-white w-full text-black px-2 rounded-lg outline-none"
          type="text"
          name=""
          id=""
          placeholder="Search here..."
          defaultValue={location?.search?.slice(3).split("%20").join(" ")}
        />
        <button className="p-2 bg-purple-600 rounded-lg" type="submit">
          Search
        </button>
      </form>
      <h2 className="my-5 text-xl lg:text-2xl font-bold">Search Results</h2>

      {location?.search?.slice(3).split("%20").join(" ") ? (
        <div>
          {data.length > 0 ? (
            <div
              className={`grid grid-cols-[repeat(auto-fit,340px)] lg:grid-cols-[repeat(auto-fit,280px)] justify-center lg:justify-start gap-6 overflow-x-scroll scroll-none relative z-10 scroll-smooth`}
            >
              {data.map((item, index) => (
                <Card key={index} data={item} imageUrl={imageUrl} />
              ))}
            </div>
          ) : (
            <h2>No results</h2>
          )}
        </div>
      ) : (
        <div
          className={`grid grid-cols-[repeat(auto-fit,340px)] lg:grid-cols-[repeat(auto-fit,280px)] justify-center lg:justify-start gap-6 overflow-x-scroll scroll-none relative z-10 scroll-smooth`}
        >
          {moviesTrending.map((item, index) => (
            <Card key={index} data={item} imageUrl={imageUrl} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
