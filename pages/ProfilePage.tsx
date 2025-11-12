
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, LogOut } from '../components/icons';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  if (!user) {
    return null; // Or a loading spinner
  }

  return (
    <div className="p-4 flex flex-col items-center">
      <header className="w-full text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-poppins">Profile</h1>
      </header>
      
      <div className="flex flex-col items-center space-y-4">
        <img 
          src={user.profilePhoto} 
          alt={user.name} 
          className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white dark:border-gray-700"
        />
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
        <span className="px-3 py-1 text-sm font-semibold text-green-800 bg-green-100 dark:bg-green-900 dark:text-green-200 rounded-full capitalize">
          {user.role}
        </span>
      </div>

      <div className="w-full max-w-xs mt-10 space-y-4">
         <button 
          onClick={toggleTheme}
          className="w-full flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md"
        >
          <span className="font-medium">Toggle Theme</span>
          {theme === 'light' ? <Moon className="w-6 h-6 text-primary"/> : <Sun className="w-6 h-6 text-accent"/>}
        </button>

        <button 
          onClick={logout}
          className="w-full flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md text-red-500"
        >
          <span className="font-medium">Logout</span>
          <LogOut className="w-6 h-6"/>
        </button>
      </div>

    </div>
  );
};

export default ProfilePage;
