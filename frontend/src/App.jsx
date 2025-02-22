import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import Records from './pages/Records';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import { Toaster } from 'react-hot-toast';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <Router>
      <div className="min-h-screen">
        <Toaster position="top-right" />
        {isAuthenticated && (
          <Navbar 
            darkMode={darkMode} 
            toggleDarkMode={toggleDarkMode} 
            user={currentUser}
            onLogout={handleLogout}
          />
        )}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/auth" 
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <Auth onLogin={handleLogin} />
                )
              } 
            />
            <Route 
              path="/" 
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/auth" />} 
            />
            <Route 
              path="/appointments" 
              element={isAuthenticated ? <Appointments /> : <Navigate to="/auth" />} 
            />
            <Route 
              path="/records" 
              element={isAuthenticated ? <Records /> : <Navigate to="/auth" />} 
            />
            <Route 
              path="/profile" 
              element={
                isAuthenticated ? (
                  <Profile user={currentUser} onUpdateProfile={handleLogin} />
                ) : (
                  <Navigate to="/auth" />
                )
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;