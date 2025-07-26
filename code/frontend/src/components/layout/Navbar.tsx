import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Home, User, Settings, LogOut, Menu, X, Building2 } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/properties', label: 'Properties', icon: Building2 },
  ];

  const userNavLinks = isAuthenticated ? [
    { path: '/dashboard', label: 'Dashboard', icon: User },
    { path: '/bookings', label: 'My Bookings', icon: Settings },
    ...(user?.type === 'owner' ? [
      { path: '/add-property', label: 'Add Property', icon: Building2 },
      { path: '/manage-properties', label: 'Manage Properties', icon: Settings },
    ] : []),
    ...(user?.type === 'admin' ? [
      { path: '/admin', label: 'Admin Panel', icon: Settings },
    ] : [])
  ] : [];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-xl text-gray-900">RentEase</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === path
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={closeMenu}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}

            {userNavLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === path
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={closeMenu}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-700">Hello, {user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === path
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={closeMenu}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}

            {userNavLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === path
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={closeMenu}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}

            <div className="border-t pt-4">
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2 text-gray-700">Hello, {user?.name}</div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md"
                    onClick={closeMenu}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;