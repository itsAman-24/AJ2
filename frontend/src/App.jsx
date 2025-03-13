import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import Records from './pages/Records';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import { Toaster } from 'react-hot-toast';

function AppRoutes({
  isAuthenticated,
  handleLogin,
  handleLogout,
  darkMode,
  toggleDarkMode,
  currentUser
}) {
  const location = useLocation();

  // Save last visited route (optional, useful if you want to use later for analytics etc)
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('lastVisitedRoute', location.pathname);
    }
  }, [location.pathname, isAuthenticated]);

  return (
    <>
      <Toaster position="top-right" />
      {isAuthenticated && (
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          user={currentUser}
          onLogout={handleLogout}
        />
      )}
      <main className="container mx-auto px-4 py-20">
        <Routes>
          <Route
            path="/auth"
            element={
              isAuthenticated ? <Navigate to={location.state?.from || '/'} /> : <Auth onLogin={handleLogin} />
            }
          />
          <Route
            path="/"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/auth" state={{ from: '/' }} />}
          />
          <Route
            path="/appointments"
            element={isAuthenticated ? <Appointments /> : <Navigate to="/auth" state={{ from: '/appointments' }} />}
          />
          <Route
            path="/records"
            element={isAuthenticated ? <Records /> : <Navigate to="/auth" state={{ from: '/records' }} />}
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile user={currentUser} onUpdateProfile={handleLogin} /> : <Navigate to="/auth" state={{ from: '/profile' }} />}
          />
        </Routes>
      </main>
    </>
  );
}

function AppWrapper() {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedTheme = localStorage.getItem('darkMode');

    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }

    if (storedTheme === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('lastVisitedRoute');
  };

  return (
    <AppRoutes
      isAuthenticated={isAuthenticated}
      handleLogin={handleLogin}
      handleLogout={handleLogout}
      darkMode={darkMode}
      toggleDarkMode={toggleDarkMode}
      currentUser={currentUser}
    />
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
