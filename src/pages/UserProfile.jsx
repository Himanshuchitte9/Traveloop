import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User as UserIcon, Mail, MapPin, Edit2, 
  Calendar, Camera, LogOut, ChevronRight,
  Shield, Bell, Globe
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTrips } from '../hooks/useTrips';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import { updateProfile as updateProfileApi } from '../api/authApi';
import toast from 'react-hot-toast';

// Mock data remains for preplanned gallery if no real trips exist, 
// but we will prioritize fetching real user trips.
const preplannedGallery = [
  { id: 'p1', name: 'Swiss Alps Expedition', image: 'https://images.unsplash.com/photo-1531219572328-a0171b4448a3?auto=format&fit=crop&q=80&w=400', date: 'Jul 2025' },
  { id: 'p2', name: 'Desert Safari Dubai', image: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?auto=format&fit=crop&q=80&w=400', date: 'Aug 2025' },
  { id: 'p3', name: 'Amazon Rainforest', image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=400', date: 'Sep 2025' },
];

export default function UserProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { trips, loading: tripsLoading } = useTrips('All');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Traveler',
    email: user?.email || '',
    location: 'Mumbai, India',
    bio: 'Passionate traveler and mountain lover. Exploring the world one city at a time! 🏔️✈️'
  });

  const upcomingTrips = trips.filter(t => new Date(t.startDate) >= new Date()).slice(0, 5);
  const pastTrips = trips.filter(t => new Date(t.endDate) < new Date()).slice(0, 5);

  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email
      }));
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const response = await updateProfileApi({
        name: profileData.name,
        email: profileData.email
      });
      
      if (response.data.success) {
        setIsEditing(false);
        toast.success('Profile updated successfully! ✨');
        // Refresh page or update context if needed
        window.location.reload(); 
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };

  const initials = profileData.name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <DashboardHeader user={user} logout={logout} />

      <div className="pt-20 px-4 max-w-md mx-auto">
        {/* Profile Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar with Camera Icon */}
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-teal-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-teal-100 border-4 border-white overflow-hidden">
                {user?.profilePhoto ? (
                  <img src={user.profilePhoto} alt="User" className="w-full h-full object-cover" />
                ) : (
                  <span>{initials}</span>
                )}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border border-gray-100 text-gray-600 hover:text-teal-500 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* User Details */}
            <div className="flex-1 text-center sm:text-left">
              {isEditing ? (
                <form onSubmit={handleUpdate} className="space-y-3">
                  <input 
                    className="w-full font-bold text-xl text-gray-900 border-b-2 border-teal-500 outline-none pb-1"
                    value={profileData.name}
                    onChange={e => setProfileData({...profileData, name: e.target.value})}
                  />
                  <input 
                    className="w-full text-sm text-gray-500 border-b border-gray-200 outline-none pb-1"
                    value={profileData.email}
                    onChange={e => setProfileData({...profileData, email: e.target.value})}
                  />
                  <div className="flex justify-end gap-2 mt-4">
                    <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-1.5 text-xs font-bold text-gray-400">Cancel</button>
                    <button 
                      type="submit" 
                      disabled={isUpdating}
                      className="px-4 py-1.5 text-xs font-bold bg-teal-500 text-white rounded-lg disabled:opacity-50"
                    >
                      {isUpdating ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex items-center justify-center sm:justify-between mb-1">
                    <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="hidden sm:flex items-center gap-1.5 text-teal-600 text-xs font-bold hover:text-teal-700 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Edit Profile
                    </button>
                  </div>
                  <p className="text-gray-500 text-sm mb-3">{profileData.email}</p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">
                      <MapPin className="w-3 h-3" /> {profileData.location}
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full">
                      <Shield className="w-3 h-3" /> Verified Explorer
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {!isEditing && (
            <p className="mt-6 text-sm text-gray-500 text-center sm:text-left leading-relaxed">
              {profileData.bio}
            </p>
          )}

          <button 
            onClick={() => setIsEditing(true)}
            className="w-full mt-6 sm:hidden py-3 bg-teal-50 text-teal-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
          >
            <Edit2 className="w-4 h-4" /> Edit Profile
          </button>
        </motion.div>

        <div className="space-y-8 mb-12">
          {/* Upcoming / Preplanned Trips */}
          <section>
            <div className="flex items-center justify-between mb-4 px-1">
              <h2 className="text-lg font-bold text-gray-900">Upcoming Trips</h2>
              <button 
                onClick={() => navigate('/my-trips?tab=Upcoming')}
                className="text-teal-600 text-xs font-bold hover:underline"
              >
                See All
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar min-h-[140px]">
              {tripsLoading ? (
                <div className="w-full flex justify-center py-8">
                  <div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : upcomingTrips.length > 0 ? (
                upcomingTrips.map(trip => (
                  <TripCard key={trip.id} trip={trip} onAction={() => navigate(`/trips/${trip.id}/view`)} />
                ))
              ) : (
                <div className="w-full text-center py-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
                  <p className="text-xs text-gray-400">No upcoming trips planned yet.</p>
                  <button onClick={() => navigate('/create-trip')} className="mt-2 text-teal-600 text-xs font-bold">Start Planning +</button>
                </div>
              )}
            </div>
          </section>

          {/* Previous Trips */}
          <section>
            <div className="flex items-center justify-between mb-4 px-1">
              <h2 className="text-lg font-bold text-gray-900">Previous Trips</h2>
              <button 
                onClick={() => navigate('/my-trips?tab=Past')}
                className="text-teal-600 text-xs font-bold hover:underline"
              >
                See All
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar min-h-[140px]">
              {tripsLoading ? (
                <div className="w-full flex justify-center py-8">
                  <div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : pastTrips.length > 0 ? (
                pastTrips.map(trip => (
                  <TripCard key={trip.id} trip={trip} onAction={() => navigate(`/trips/${trip.id}/view`)} />
                ))
              ) : (
                <div className="w-full text-center py-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
                  <p className="text-xs text-gray-400">No completed trips found.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Account Quick Settings */}
        <div className="space-y-3 mb-12">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Account Settings</p>
          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
            <SettingsItem icon={<Bell className="w-5 h-5" />} label="Notifications" />
            <SettingsItem icon={<Globe className="w-5 h-5" />} label="Language & Region" sub="English (US)" />
            <SettingsItem icon={<Shield className="w-5 h-5" />} label="Security & Privacy" />
            <button 
              onClick={logout}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-red-50 group transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 text-red-500 rounded-xl">
                  <LogOut className="w-5 h-5" />
                </div>
                <span className="font-bold text-sm text-red-500">Log Out</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TripCard({ trip, onAction }) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="min-w-[160px] w-[160px] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col"
    >
      <div className="relative h-24">
        {trip.coverPhoto ? (
          <img src={trip.coverPhoto} alt={trip.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-teal-400 to-teal-600" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-2 left-2 right-2">
          <p className="text-[9px] font-bold text-white uppercase tracking-wider opacity-80">
            {trip.startDate ? new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'TBD'}
          </p>
        </div>
      </div>
      <div className="p-3 flex-1 flex flex-col justify-between gap-3">
        <h3 className="text-xs font-bold text-gray-900 line-clamp-1">{trip.name}</h3>
        <button 
          onClick={onAction}
          className="w-full py-2 bg-teal-500 text-white text-[10px] font-bold rounded-lg shadow-lg shadow-teal-50 hover:bg-teal-600 transition-all"
        >
          View
        </button>
      </div>
    </motion.div>
  );
}

function SettingsItem({ icon, label, sub }) {
  return (
    <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 border-b border-gray-50 last:border-0 transition-colors">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gray-50 text-gray-400 group-hover:text-teal-500 rounded-xl transition-colors">
          {icon}
        </div>
        <div className="text-left">
          <p className="font-bold text-sm text-gray-900">{label}</p>
          {sub && <p className="text-[10px] text-gray-400 font-medium">{sub}</p>}
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-300" />
    </button>
  );
}
