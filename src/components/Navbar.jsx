import React from "react";
import { useState } from "react";
import { navLinks } from "../constants";
import { IoCloseSharp, IoMenuOutline } from "react-icons/io5";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full flex py-6 px-4 justify-between items-center bg-[#010510]">
      <img src="./logo.png" alt="obabank" className="w-[124px] h-[32px]" />

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] text-white ${
              index == navLinks.length - 1 ? "mr-0 " : "mr-10"
            } `}
          >
            <a href={`#${nav.id}`}> {nav.title} </a>
          </li>
        ))}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <div
          onClick={() => setToggle((prev) => !prev)}
          className="w-[28px] h-[28px]"
        >
          {toggle ? (
            <IoCloseSharp className="w-full h-full text-white" />
          ) : (
            <IoMenuOutline className="w-full h-full text-white" />
          )}
        </div>
        <div
          className={`${
            toggle ? "flex" : "hidden"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex flex-col justify-end items-center flex-1">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-normal cursor-pointer text-[16px] text-white ${
                  index == navLinks.length - 1 ? "mr-0 " : "mb-4"
                } `}
              >
                <a href={`#${nav.id}`}> {nav.title} </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
