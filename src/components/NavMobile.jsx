import React from "react";
import { LuTv } from "react-icons/lu";
import { BiMoviePlay } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { navigationMobile } from "../constants/navigation";
import { NavLink } from "react-router";
import { FaHome } from "react-icons/fa";
import { useSelector } from "react-redux";

const iconsMap = {
  MovieIcon: <BiMoviePlay />,
  TvIcon: <LuTv />,
  SearchIcon: <FaSearch />,
  HomeIcon: <FaHome />,
};

const NavMobile = () => {
  const language = useSelector((state) => state.movies.language);
  return (
    <div className="flex justify-between items-center w-full px-5">
      {navigationMobile.map((nav, index) => (
        <NavLink
          key={index}
          to={nav.href}
          className={({ isActive }) =>
            `flex flex-col gap-1 justify-center items-center ${
              isActive ? "text-white" : "text-neutral-400"
            }`
          }
        >
          <div className="text-xl">{iconsMap[nav.icons]}</div>
          <p className={`${language === "vi" && "text-sm"}`}>
            {language === "vi" ? nav.labelVi : nav.label}
          </p>
        </NavLink>
      ))}
    </div>
  );
};

export default NavMobile;
