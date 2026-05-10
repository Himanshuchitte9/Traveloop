import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Share2, Copy, Instagram, Twitter, Facebook, 
  ArrowLeft, Check, Download, Globe, Users
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useTrips } from '../hooks/useTrips';

export default function ActivitySharePage() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { trips } = useTrips();
  const [copied, setCopied] = useState(false);
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    if (trips && tripId) {
      const found = trips.find(t => t.id === tripId);
      if (found) setTrip(found);
    }
  }, [trips, tripId]);

  const shareUrl = `${window.location.origin}/share/${tripId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success('Share link copied! 🔗');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out my trip: ${trip?.name}`,
          text: `I'm planning an amazing trip to ${trip?.destination || 'somewhere awesome'}! Check it out on Travelloop.`,
          url: shareUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 pt-8">
      <div className="max-w-[420px] mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Share Trip</h1>
          <div className="w-9" /> {/* Spacer */}
        </div>

        {/* Trip Preview Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[32px] overflow-hidden shadow-xl shadow-teal-100/50 border border-teal-50 mb-8"
        >
          <div className="relative h-48">
            {trip?.coverPhoto ? (
              <img src={trip.coverPhoto} alt={trip.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-teal-400 to-teal-600" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-6">
              <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-wider mb-2 inline-block">
                Trip Summary
              </span>
              <h2 className="text-2xl font-bold text-white">{trip?.name || 'My Adventure'}</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-teal-100 flex items-center justify-center text-[10px] font-bold text-teal-600">
                    {i === 3 ? '+5' : <Users className="w-3 h-3" />}
                  </div>
                ))}
              </div>
              <p className="text-xs font-bold text-gray-400">Viewed by 12 people</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 rounded-2xl">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Destination</p>
                <p className="text-sm font-bold text-gray-900 truncate">{trip?.destination || 'TBD'}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-2xl">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Duration</p>
                <p className="text-sm font-bold text-gray-900">7 Days</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Share Options */}
        <div className="space-y-6">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] text-center">Share Via</p>
          
          <div className="grid grid-cols-4 gap-4">
            <ShareOption icon={<Instagram className="w-6 h-6" />} label="Stories" color="bg-pink-500" />
            <ShareOption icon={<Twitter className="w-6 h-6" />} label="X" color="bg-black" />
            <ShareOption icon={<Facebook className="w-6 h-6" />} label="Feed" color="bg-blue-600" />
            <ShareOption icon={<Download className="w-6 h-6" />} label="Save" color="bg-teal-500" />
          </div>

          <div className="pt-4">
            <p className="text-xs font-bold text-gray-400 mb-3 ml-1">Copy Trip Link</p>
            <div className="bg-white p-2 rounded-2xl border border-gray-100 flex items-center shadow-sm">
              <div className="flex-1 px-3 text-sm text-gray-500 truncate font-medium">
                {shareUrl}
              </div>
              <button 
                onClick={copyToClipboard}
                className={`px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                  copied ? 'bg-green-500 text-white' : 'bg-teal-500 text-white'
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          <button 
            onClick={handleNativeShare}
            className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-gray-200 hover:bg-gray-800 transition-all"
          >
            <Share2 className="w-5 h-5" />
            Quick Share
          </button>
        </div>

        {/* Visibility Settings */}
        <div className="mt-12 p-6 bg-white rounded-[24px] border border-gray-100">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-teal-500" /> Visibility Settings
          </h4>
          <div className="space-y-4">
            <VisibilityToggle 
              label="Public link" 
              sub="Anyone with the link can view" 
              active 
            />
            <VisibilityToggle 
              label="Allow duplication" 
              sub="Others can copy this itinerary" 
              active 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ShareOption({ icon, label, color }) {
  return (
    <button className="flex flex-col items-center gap-2 group">
      <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110`}>
        {icon}
      </div>
      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{label}</span>
    </button>
  );
}

function VisibilityToggle({ label, sub, active }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-bold text-gray-900">{label}</p>
        <p className="text-[10px] text-gray-400">{sub}</p>
      </div>
      <div className={`w-10 h-6 rounded-full p-1 transition-colors ${active ? 'bg-teal-500' : 'bg-gray-200'}`}>
        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${active ? 'translate-x-4' : 'translate-x-0'}`} />
      </div>
    </div>
  );
}
