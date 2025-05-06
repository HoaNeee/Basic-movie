import React, { useRef } from "react";
import ImageLogo from "../assets/logo.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { FaSearch } from "react-icons/fa";
import { navigation } from "../constants/navigation";
import ImageUser from "../assets/user.png";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../store/Slices/movieSlice";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const inputRef = useRef();
  const popRef = useRef();
  const closeTooltip = () => popRef.current.close();
  const dispatch = useDispatch();

  const language = useSelector((state) => state.movies.language);

  const handleToSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    let prevQuery = params.get("q");
    const currQuery = inputRef.current.value;
    if (prevQuery != currQuery) {
      navigate(`/search?q=${currQuery}&page=1`);
    }
  };

  return (
    <div className="h-14 w-full bg-neutral-600 fixed top-0 z-20 opacity-80">
      <div className="container flex justify-between items-center mx-auto h-full px-3">
        <div className="flex gap-3 items-center">
          <Link to={"/"} className="w-26 lg:w-32">
            <img className="w-full" src={ImageLogo} alt="this is image" />
          </Link>
          <div className="hidden md:flex gap-4 items-center ml-5">
            {navigation.map((nav, index) => {
              return (
                <NavLink
                  key={index}
                  to={nav.href}
                  className={({ isActive }) =>
                    `${isActive ? "text-white" : "text-neutral-300"}`
                  }
                >
                  {language === "vi" ? nav.labelVi : nav.label}
                </NavLink>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2 relative">
          <form
            className={`hidden gap-3 items-center md:flex`}
            onSubmit={handleToSearch}
          >
            <input
              ref={inputRef}
              className={`p-2 outline-none `}
              type="text"
              placeholder={
                language === "vi" ? "Nhập từ khóa..." : "Search here..."
              }
              defaultValue={new URLSearchParams(location.search).get("q")}
            />
            <button type="submit">
              <FaSearch className="text-white text-xl mr-3 cursor-pointer" />
            </button>
          </form>
          <div>
            <Popup
              ref={popRef}
              contentStyle={{
                background: "rgba(0,0,0,0.9)",
                border: "none",
              }}
              arrowStyle={{
                color: "black",
              }}
              position={"bottom right"}
              trigger={
                <div className="h-7 w-7 rounded-full overflow-hidden cursor-pointer">
                  <img src={ImageUser} alt="this is image" />
                </div>
              }
            >
              <div className="text-white p-2">
                <p className="text-lg">{`${
                  language === "en-US" ? "Languague" : "Ngôn ngữ"
                }`}</p>
                <div className="px-2 mt-2">
                  <p
                    className="py-2 px-3 hover:bg-neutral-500 cursor-pointer text-sm text-neutral-300"
                    onClick={() => {
                      if (language !== "en-US") {
                        dispatch(setLanguage("en-US"));
                      }
                      closeTooltip();
                    }}
                  >
                    {language === "en-US" ? "English" : "Tiếng Anh"}
                  </p>
                  <div className="my-1 h-[1px] w-full bg-neutral-500 rounded-full" />
                  <p
                    className="py-2 px-3 hover:bg-neutral-500 cursor-pointer text-sm text-neutral-300"
                    onClick={() => {
                      if (language !== "vi") {
                        dispatch(setLanguage("vi"));
                      }
                      closeTooltip();
                    }}
                  >
                    {language === "en-US" ? "Vietnamese" : "Tiếng Việt"}
                  </p>
                </div>
              </div>
            </Popup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
