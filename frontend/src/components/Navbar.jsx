import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon, FaUser, FaBars } from 'react-icons/fa';

function Navbar({ darkMode, toggleDarkMode, user, onLogout }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary-600">
            HealthCare HMS
          </Link>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaBars className="h-6 w-6" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="hover:text-primary-600">Dashboard</Link>
            <Link to="/appointments" className="hover:text-primary-600">Appointments</Link>
            <Link to="/records" className="hover:text-primary-600">Records</Link>
            
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 hover:text-primary-600"
              >
                <FaUser />
                <span>{user?.name || 'User'}</span>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-10">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    Profile Settings
                  </Link>
                  <hr className="my-2 border-gray-200 dark:border-gray-700" />
                  <button
                    onClick={() => {
                      onLogout();
                      setShowProfileMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="hover:text-primary-600"
                onClick={() => setShowMobileMenu(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/appointments" 
                className="hover:text-primary-600"
                onClick={() => setShowMobileMenu(false)}
              >
                Appointments
              </Link>
              <Link 
                to="/records" 
                className="hover:text-primary-600"
                onClick={() => setShowMobileMenu(false)}
              >
                Records
              </Link>
              <Link 
                to="/profile" 
                className="hover:text-primary-600"
                onClick={() => setShowMobileMenu(false)}
              >
                Profile Settings
              </Link>
              <button
                onClick={() => {
                  onLogout();
                  setShowMobileMenu(false);
                }}
                className="text-red-600 hover:text-red-700 text-left"
              >
                Logout
              </button>
              <button
                onClick={toggleDarkMode}
                className="flex items-center space-x-2 hover:text-primary-600"
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
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;