import { ArrowLeft, Camera, LogOut, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import BottomNav from './BottomNav';

export default function UserProfileScreen() {
  const [name, setName] = useState('Alex Morgan');
  const [email, setEmail] = useState('alex.morgan@email.com');
  const [language, setLanguage] = useState('English');
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center gap-3">
        <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5 text-[#1A1A1A]" />
        </Link>
        <h2 className="text-xl text-[#1A1A1A]">Profile & Settings</h2>
      </div>

      <div className="p-6">
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="w-24 h-24 bg-[#F5A623] rounded-full flex items-center justify-center text-white text-3xl">
              AM
            </div>
            <button className="absolute bottom-0 right-0 bg-white border border-gray-300 p-2 rounded-full shadow-sm hover:bg-gray-50">
              <Camera className="w-4 h-4 text-[#6B6B6B]" />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm mb-2 text-[#1A1A1A]">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-[#F8F8F8] rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F5A623] text-[#1A1A1A]"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-[#1A1A1A]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#F8F8F8] rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F5A623] text-[#1A1A1A]"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-[#1A1A1A]">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-3 bg-[#F8F8F8] rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F5A623] text-[#1A1A1A]"
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-[#1A1A1A] mb-4">Preferences</h3>

            <Link to="/my-trips" className="block bg-[#F8F8F8] rounded-xl p-4 mb-3 hover:bg-gray-200 transition-colors">
              <h4 className="text-[#1A1A1A]">Saved Destinations</h4>
              <p className="text-sm text-[#6B6B6B]">12 cities saved</p>
            </Link>

            <div className="bg-[#F8F8F8] rounded-xl p-4 mb-3 flex items-center justify-between">
              <div>
                <h4 className="text-[#1A1A1A]">Notifications</h4>
                <p className="text-sm text-[#6B6B6B]">Trip reminders and updates</p>
              </div>
              <label className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#F5A623] transition-colors"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-6"></div>
              </label>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 space-y-3">
            <Link to="/" className="flex items-center gap-3 bg-[#F8F8F8] rounded-xl p-4 hover:bg-gray-200 transition-colors">
              <LogOut className="w-5 h-5 text-[#6B6B6B]" />
              <span className="text-[#1A1A1A]">Logout</span>
            </Link>

            <button className="flex items-center gap-3 bg-red-50 rounded-xl p-4 w-full hover:bg-red-100 transition-colors">
              <Trash2 className="w-5 h-5 text-red-600" />
              <span className="text-red-600">Delete Account</span>
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
