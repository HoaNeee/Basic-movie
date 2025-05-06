import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import Card from "../components/Card";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Loader from "../components/Loader";

const SearchPage = () => {
  const location = useLocation();
  const moviesTrending = useSelector((state) => state.movies.moviesTrending);
  const language = useSelector((state) => state.movies.language);

  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);

  const query = new URLSearchParams(location.search);

  const inputRef = useRef();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const imageUrl = useSelector((state) => state.movies.imageUrl);

  const fetchData = async (q, page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(`/search/multi`, {
        params: {
          query: q,
          language: language,
          page: page,
        },
      });
      setData(response.data.results);
      setTotalPage(response.data.total_pages);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(Number(query.get("page")));
    fetchData(query.get("q"), query.get("page"));
  }, []);

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
    setData([]);
    setPage(Number(query.get("page")));
    fetchData(query.get("q"));
  }, [query.get("q")]);

  useEffect(() => {
    if (page != 1) {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
      navigate(`?q=${query.get("q")}&page=${page}`);
      fetchData(query.get("q"), page);
    }
  }, [page]);

  const handleSubmitMobile = (e) => {
    e.preventDefault();
    navigate(`?q=${inputRef.current.value}&page=1`);
    fetchData(inputRef.current.value, 1);
  };

  const handleNextPage = () => {
    if (page < totalPage) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div className="container mx-auto px-2 min-h-[91vh] py-16 relative">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <form
            className="flex w-full gap-3 sticky top-16 z-20 md:hidden"
            onSubmit={handleSubmitMobile}
          >
            <input
              ref={inputRef}
              className="bg-white w-full text-black px-2 rounded-lg outline-none"
              type="text"
              name=""
              id=""
              placeholder={
                language === "vi" ? "Nhập từ khóa..." : "Search here..."
              }
              defaultValue={query.get("q")}
            />
            <div
              className={`${
                language === "vi" ? "text-sm" : ""
              } bg-purple-600 rounded-lg w-24 p-2`}
            >
              <button className={"inline-block w-full"} type="submit">
                {language === "vi" ? "Tìm kiếm" : "Search"}
              </button>
            </div>
          </form>
          <h2 className="my-5 text-xl lg:text-2xl font-bold">
            {language === "vi" ? "Kết quả tìm kiếm" : "Search Results"}
          </h2>

          {query.get("q") ? (
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
                <h2>{language === "vi" ? "Không có kết quả" : "No results"}</h2>
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
          {totalPage > 1 && (
            <div className="mt-5">
              <div className="flex gap-2 justify-end items-center mr-6">
                <button
                  className="p-2 bg-white text-black cursor-pointer"
                  onClick={handlePrevPage}
                >
                  <FaAngleLeft />
                </button>
                <div className="px-2">
                  <p className="text-lg font-bold">{page}</p>
                </div>
                <button
                  className="p-2 bg-white text-black cursor-pointer"
                  onClick={handleNextPage}
                >
                  <FaAngleRight />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
