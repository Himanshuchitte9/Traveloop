import { Link, useLocation } from 'react-router-dom';
import { Home, Map, User, FileText } from 'lucide-react';

export default function BottomNav() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-around items-center">
      <Link
        to="/dashboard"
        className={`flex flex-col items-center gap-1 ${
          isActive('/dashboard') ? 'text-[#F5A623]' : 'text-[#6B6B6B]'
        }`}
      >
        <Home className="w-6 h-6" />
        <span className="text-xs">Home</span>
      </Link>

      <Link
        to="/my-trips"
        className={`flex flex-col items-center gap-1 ${
          isActive('/my-trips') ? 'text-[#F5A623]' : 'text-[#6B6B6B]'
        }`}
      >
        <Map className="w-6 h-6" />
        <span className="text-xs">Trips</span>
      </Link>

      <Link
        to="/notes"
        className={`flex flex-col items-center gap-1 ${
          isActive('/notes') ? 'text-[#F5A623]' : 'text-[#6B6B6B]'
        }`}
      >
        <FileText className="w-6 h-6" />
        <span className="text-xs">Notes</span>
      </Link>

      <Link
        to="/profile"
        className={`flex flex-col items-center gap-1 ${
          isActive('/profile') ? 'text-[#F5A623]' : 'text-[#6B6B6B]'
        }`}
      >
        <User className="w-6 h-6" />
        <span className="text-xs">Profile</span>
      </Link>
    </nav>
  );
}
