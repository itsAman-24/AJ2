import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSun, FaMoon, FaUser, FaBars, FaSignOutAlt } from "react-icons/fa";

function Navbar({ darkMode, toggleDarkMode, user, onLogout }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Appointments", path: "/appointments" },
    { label: "Health Records", path: "/records" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand */}
        <Link
          to="/"
          className="text-lg md:text-xl lg:text-2xl font-bold text-blue-600 dark:text-white"
        >
          HealthCare HMS
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded-lg text-sm md:text-base lg:text-lg xl:text-xl transition-colors font-medium ${
                location.pathname === item.path
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* Toggle Theme */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? (
              <FaSun className="text-yellow-400 text-lg md:text-xl" />
            ) : (
              <FaMoon className="text-lg md:text-xl" />
            )}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 text-sm md:text-base lg:text-lg px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FaUser />
              <span>{user?.name?.split(" ")[0] || "User"}</span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-40">
                <Link
                  to="/profile"
                  onClick={() => setShowProfileMenu(false)}
                  className="block px-4 py-2 text-sm md:text-base hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Profile Settings
                </Link>
                <button
                  onClick={() => {
                    onLogout();
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm md:text-base text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <FaSignOutAlt className="text-sm" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Toggle Mobile Menu"
        >
          <FaBars className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Nav Items */}
      {showMobileMenu && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4 px-4 space-y-3 bg-white dark:bg-gray-800 transition-all duration-300">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setShowMobileMenu(false)}
              className={`block px-4 py-2 rounded-lg text-sm md:text-base transition-colors font-medium ${
                location.pathname === item.path
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <Link
            to="/profile"
            onClick={() => setShowMobileMenu(false)}
            className="block px-4 py-2 text-sm md:text-base hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Profile Settings
          </Link>

          <button
            onClick={() => {
              onLogout();
              setShowMobileMenu(false);
            }}
            className="w-full text-left px-4 py-2 text-sm md:text-base text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
          >
            <FaSignOutAlt className="text-sm" />
            Logout
          </button>

          <button
            onClick={() => {
              toggleDarkMode();
              setShowMobileMenu(false);
            }}
            className="flex items-center gap-2 text-sm md:text-base px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {darkMode ? (
              <>
                <FaSun className="text-yellow-400" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <FaMoon />
                <span>Dark Mode</span>
              </>
            )}
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
