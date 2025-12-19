import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { FaTint } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        setDropdownOpen(false);
        setMenuOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const navLinkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg font-medium transition-all duration-200
     ${isActive
      ? "text-white bg-gradient-to-r from-red-600 to-red-500 shadow-md"
      : "text-gray-700 hover:text-red-600 hover:bg-red-50"}`;

  return (
    <nav
      className={`bg-white fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "shadow-lg border-b-2 border-red-100" : "shadow-sm border-b"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with gradient */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent hover:from-red-500 hover:to-red-600 transition-all duration-300"
          >
            <FaTint className="text-red-600 drop-shadow-sm animate-pulse" />
            <span className="hidden sm:inline">BloodDonate</span>
            <span className="sm:hidden">BD</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/donate" className={navLinkClass}>
              Donation
            </NavLink>

            {!user && (
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
            )}

            {user && (
              <>
                <NavLink to="/funding" className={navLinkClass}>
                  Funding
                </NavLink>

                {/* Enhanced User Dropdown */}
                <div className="relative ml-2">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 focus:outline-none group"
                  >
                    <div className="relative">
                      <img
                        src={user.photoURL || "https://i.ibb.co/2d0Y4Yb/user.png"}
                        alt="user"
                        className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-200 group-hover:border-red-400 transition-all duration-200 shadow-sm"
                      />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                  </button>

                  {dropdownOpen && (
                    <>
                      {/* Backdrop */}
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setDropdownOpen(false)}
                      ></div>

                      {/* Dropdown */}
                      <div className="absolute right-0 mt-3 w-52 bg-white border border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-red-50 to-pink-50">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {user.displayName || "User"}
                          </p>
                          <p className="text-xs text-gray-600 truncate">
                            {user.email}
                          </p>
                        </div>

                        <NavLink
                          to="/dashboard"
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
                          onClick={() => setDropdownOpen(false)}
                        >
                          📊 Dashboard
                        </NavLink>

                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors duration-150 border-t border-gray-100"
                        >
                          🚪 Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl text-gray-700 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu with animation */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="px-4 py-3 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <NavLink
              to="/donate"
              className={navLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              Donation
            </NavLink>

            {!user && (
              <NavLink
                to="/login"
                className={navLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>
            )}

            {user && (
              <>
                <NavLink
                  to="/funding"
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Funding
                </NavLink>

                <NavLink
                  to="/dashboard"
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </NavLink>

                <div className="pt-2 border-t border-gray-100 mt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;