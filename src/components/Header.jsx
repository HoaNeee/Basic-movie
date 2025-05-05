import React, { useRef } from "react";
import ImageLogo from "../assets/logo.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { FaSearch } from "react-icons/fa";
import { navigation } from "../constants/navigation";
import ImageUser from "../assets/user.png";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const inputRef = useRef();
  const handleToSearch = (e) => {
    e.preventDefault();
    const query = inputRef.current.value;
    navigate(`/search?q=${query}`);
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
                  {nav.label}
                </NavLink>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <form
            className="hidden md:flex gap-3 items-center"
            onSubmit={handleToSearch}
          >
            <input
              ref={inputRef}
              className="p-2 outline-none"
              type="text"
              placeholder="Search here..."
              defaultValue={location.search.slice(3)}
            />
            <button type="submit">
              <FaSearch className="text-white text-xl mr-3 cursor-pointer" />
            </button>
          </form>
          <div className="h-7 w-7 rounded-full overflow-hidden">
            <img src={ImageUser} alt="this is image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
