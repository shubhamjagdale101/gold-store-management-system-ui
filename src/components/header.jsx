import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAdmin } from '../reducers/admin';


const GoldLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Gold bar base */}
    <rect x="6" y="12" width="20" height="8" rx="1" fill="url(#goldGradient)" stroke="#D97706" strokeWidth="1"/>
    
    {/* Gold bar highlights */}
    <rect x="8" y="14" width="16" height="1" fill="#FEF3C7" fillOpacity="0.8"/>
    <rect x="10" y="16" width="12" height="1" fill="#FEF3C7" fillOpacity="0.6"/>
    
    {/* Crown emblem */}
    <path d="M16 8L19 12H13L16 8Z" fill="#FCD34D" stroke="#B45309" strokeWidth="0.5"/>
    <path d="M12 12L14 14H10L12 12Z" fill="#FCD34D" stroke="#B45309" strokeWidth="0.5"/>
    <path d="M20 12L22 14H18L20 12Z" fill="#FCD34D" stroke="#B45309" strokeWidth="0.5"/>
    
    <defs>
      <linearGradient id="goldGradient" x1="16" y1="12" x2="16" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FCD34D"/>
        <stop offset="1" stopColor="#D97706"/>
      </linearGradient>
    </defs>
  </svg>
);

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, name } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAdmin());
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/dashboard" className="flex items-center group">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-50 group-hover:bg-amber-100 transition-colors">
                <GoldLogo />
              </div>
              <span className="ml-3 text-xl font-semibold text-gray-800 group-hover:text-amber-600 transition-colors">
                AurumTrack
              </span>
            </Link>
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center space-x-4">
            {name && (
              <span className="hidden md:inline text-sm font-medium text-gray-600">
                Welcome, <span className="text-amber-600">{name || 'Admin'}</span>
              </span>
            )}

            {/* Profile Button */}
            <Link
              to="/profile"
              className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-amber-600 transition-colors group"
              title="View Profile"
            >
              <div className="relative">
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-green-400 border border-white"></span>
              </div>
              <span className="ml-2 hidden md:inline">Profile</span>
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              type="button"
              className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors group"
              title="Logout"
            >
              <span className="ml-2 hidden md:inline">Logout</span>
            </button>

            {/* Navigate to Dashboard */}
            <button
              onClick={() => navigate('/dashboard')}
              type="button"
              className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors group"
              title="Logout"
            >
              <span className="ml-2 hidden md:inline">Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;