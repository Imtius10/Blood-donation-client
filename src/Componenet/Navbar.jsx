import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { FaTint, FaSearch, FaChartLine, FaSignOutAlt, FaHandHoldingHeart } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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

  // Elegant NavLink Styling
  const navLinkClass = ({ isActive }) =>
    `relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-full flex items-center gap-2
     ${isActive
      ? "text-red-600 bg-red-50"
      : "text-gray-600 hover:text-red-500 hover:bg-gray-50"}`;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
          ? "bg-white/80 backdrop-blur-md py-2 shadow-sm border-b border-red-50"
          : "bg-white py-4"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center gap-2 group transition-transform duration-300 hover:scale-105"
          >
            <div className="bg-red-600 p-2 rounded-xl rotate-12 group-hover:rotate-0 transition-all duration-500 shadow-lg shadow-red-200">
              <FaTint className="text-white text-xl -rotate-12 group-hover:rotate-0 transition-all duration-500" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-gray-800">
              Blood<span className="text-red-600">Care</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/donate" className={navLinkClass}>
              <FaHandHoldingHeart className="text-base" /> Donation
            </NavLink>

            {!user ? (
              <NavLink to="/login" className="ml-4 px-8 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-full hover:bg-red-600 hover:shadow-lg hover:shadow-red-200 transition-all duration-300">
                Sign In
              </NavLink>
            ) : (
              <div className="flex items-center gap-2 ml-4">
                <NavLink to="/search-request" className={navLinkClass}>
                  <FaSearch /> Search
                </NavLink>

                {/* Profile Dropdown */}
                <div className="relative ml-4">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center p-1 rounded-full border-2 border-transparent hover:border-red-100 transition-all duration-300"
                  >
                    <img
                      src={user.photoURL || "https://i.ibb.co/2d0Y4Yb/user.png"}
                      alt="profile"
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-md"
                    />
                  </button>

                  {dropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)}></div>
                      <div className="absolute right-0 mt-4 w-64 bg-white rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-100 z-20 overflow-hidden py-2 animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 bg-gray-50/50 mb-2">
                          <p className="text-xs font-bold text-red-500 uppercase tracking-widest mb-1">Account</p>
                          <p className="text-sm font-black text-gray-800 truncate">{user.displayName}</p>
                          <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                        </div>

                        <Link to="/dashboard" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-6 py-3 text-sm font-bold text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all">
                          <FaChartLine className="opacity-50" /> Dashboard
                        </Link>

                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-6 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-all border-t border-gray-50 mt-2">
                          <FaSignOutAlt className="opacity-50" /> Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-800 hover:text-red-600 transition-all"
          >
            {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar-style Menu */}
      <div className={`fixed inset-y-0 right-0 w-72 bg-white shadow-2xl transform transition-transform duration-500 z-50 p-6 md:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-between items-center mb-10">
          <span className="font-black text-xl">Menu</span>
          <button onClick={() => setMenuOpen(false)} className="p-2 bg-gray-100 rounded-full"><HiX /></button>
        </div>

        <div className="flex flex-col gap-4">
          <NavLink to="/donate" onClick={() => setMenuOpen(false)} className={navLinkClass}>Donation</NavLink>
          <NavLink to="/search-request" onClick={() => setMenuOpen(false)} className={navLinkClass}>Search</NavLink>
          {user && <NavLink to="/dashboard" onClick={() => setMenuOpen(false)} className={navLinkClass}>Dashboard</NavLink>}

          <div className="mt-auto pt-10">
            {user ? (
              <button onClick={handleLogout} className="w-full py-4 bg-red-50 text-red-600 font-bold rounded-2xl">Logout</button>
            ) : (
              <NavLink to="/login" onClick={() => setMenuOpen(false)} className="block w-full py-4 bg-gray-900 text-white text-center font-bold rounded-2xl">Sign In</NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;