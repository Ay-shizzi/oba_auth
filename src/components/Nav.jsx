import React, { useState } from "react";
import { LuUserCircle } from "react-icons/lu";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Redirect to login page after logout
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="relative">
      <nav className="flex-no-wrap relative flex w-full items-center justify-between bg-zinc-50 py-2 shadow-dark-mild dark:bg-surface-dark lg:flex-wrap lg:justify-start lg:py-4">
        <div className="flex w-full flex-wrap items-center justify-between px-3 relative">
          {/* Hamburger Menu */}
          <button
            className="block border-0 bg-transparent px-2 text-indigo-500 lg:hidden text-2xl"
            type="button"
            onClick={toggleMenu}
            aria-controls="navbarSupportedContent12"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            <GiHamburgerMenu />
          </button>

          {/* Hamburger Menu Dropdown */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-indigo-500 shadow-md lg:hidden">
              <ul
                className="list--none flex flex-col p-6"
                data-twe-navbar-nav-ref
              >
                <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                  <Link
                    className="text-black transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                    to="#"
                  >
                    Dashboard
                  </Link>
                </li>

                <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                  <Link
                    className="text-black transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                    to="#"
                  >
                    Team
                  </Link>
                </li>

                <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                  <Link
                    className="text-black transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                    to="#"
                  >
                    Projects
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* User Icon with Dropdown */}
          <div className="relative flex items-center">
            <button
              className="text-indigo-500  text-2xl"
              onClick={toggleUserMenu}
            >
              <LuUserCircle />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 top-8 mt-2 w-48 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 bg-indigo-500">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-gray-100"
                    role="menuitem"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/change-password"
                    className="block px-4 py-2 text-sm text-gray-100"
                    role="menuitem"
                  >
                    Change Password
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-100"
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
