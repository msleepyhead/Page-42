
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, MessageSquare, Bell, UserCircle, Settings } from './icons';

const BottomNav = () => {
  const { user } = useAuth();

  const navItems = [
    { path: '/subjects', label: 'Subjects', icon: BookOpen },
    { path: '/discussion', label: 'Discussion', icon: MessageSquare },
    { path: '/notices', label: 'Notices', icon: Bell },
    { path: '/profile', label: 'Profile', icon: UserCircle },
  ];

  if (user?.role === 'admin') {
    navItems.push({ path: '/admin', label: 'Admin', icon: Settings });
  }

  const activeLinkClass = 'text-primary dark:text-accent';
  const inactiveLinkClass = 'text-gray-500 dark:text-gray-400';

  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center space-y-1 transition-colors duration-200 ${isActive ? activeLinkClass : inactiveLinkClass}`
            }
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
