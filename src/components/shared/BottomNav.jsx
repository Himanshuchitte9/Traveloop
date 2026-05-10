import React from 'react';
import { NavLink } from 'react-router-dom';
import { Compass, Map, Home, User, Search, Users, Briefcase, FileText, Notebook } from 'lucide-react';

export default function BottomNav() {
  const navItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Home', path: '/dashboard' },
    { icon: <Search className="w-5 h-5" />, label: 'Explore', path: '/discover/search' },
    { icon: <Map className="w-5 h-5" />, label: 'Trips', path: '/trip-listing' },
    { icon: <Users className="w-5 h-5" />, label: 'Social', path: '/community' },
    { icon: <FileText className="w-5 h-5" />, label: 'Bills', path: '/invoice' },
    { icon: <Notebook className="w-5 h-5" />, label: 'Journal', path: '/notes' },
    { icon: <User className="w-5 h-5" />, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-100 px-2 py-3 pb-safe z-40">
      <div className="max-w-md mx-auto flex items-center justify-between gap-1">
        {navItems.map((item) => (
          <NavLink 
            key={item.label}
            to={item.path}
            className={({ isActive }) => 
              `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-amber-500 font-bold' : 'text-gray-400 hover:text-gray-600'}`
            }
          >
            {item.icon}
            <span className="text-[10px] uppercase tracking-wider">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
