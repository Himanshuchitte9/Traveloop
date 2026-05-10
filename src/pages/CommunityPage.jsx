import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ArrowUpDown, Layers, MessageSquare, Heart, Share2, MapPin, Star } from 'lucide-react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import { useAuth } from '../context/AuthContext';

const MOCK_POSTS = [
  {
    id: 1,
    user: { name: 'Alex Rivera', avatar: 'AR' },
    location: 'Paris, France',
    content: 'The sunrise at Trocadéro is absolutely worth the early wake-up call! Best view of the Eiffel Tower without the crowds. 🥐☕️',
    rating: 4.9,
    likes: 124,
    comments: 18,
    time: '2h ago'
  },
  {
    id: 2,
    user: { name: 'Sarah Chen', avatar: 'SC' },
    location: 'Kyoto, Japan',
    content: 'Just finished a matcha ceremony in Gion. The attention to detail is mind-blowing. Highly recommend the "Tea House" on Shijo Street.',
    rating: 4.8,
    likes: 89,
    comments: 12,
    time: '5h ago'
  },
  {
    id: 3,
    user: { name: 'Marcus Thorne', avatar: 'MT' },
    location: 'Bali, Indonesia',
    content: 'Surfing at Uluwatu is not for the faint of heart! But the waves are legendary. Anyone heading there this weekend? 🌊🏄‍♂️',
    rating: 4.7,
    likes: 256,
    comments: 45,
    time: '1d ago'
  },
  {
    id: 4,
    user: { name: 'Elena Gomez', avatar: 'EG' },
    location: 'Rome, Italy',
    content: 'Pro-tip: Visit the Colosseum at night. The lighting is magical and it feels like a completely different place. #Rome #History',
    rating: 4.9,
    likes: 312,
    comments: 24,
    time: '2d ago'
  }
];

export default function CommunityPage() {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSort, setActiveSort] = useState('latest');

  const filteredPosts = useMemo(() => {
    return MOCK_POSTS.filter(post => 
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      <DashboardHeader user={user} logout={logout} />

      <div className="pt-20 px-4 max-w-2xl mx-auto">
        {/* Search & Action Row */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text"
              placeholder="Search experiences, places..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <ActionButton icon={<Layers className="w-4 h-4" />} label="Group by" />
            <ActionButton icon={<Filter className="w-4 h-4" />} label="Filter" />
            <ActionButton icon={<ArrowUpDown className="w-4 h-4" />} label="Sort by..." />
          </div>
        </div>

        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-gray-900">Community tab</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Discover experiences shared by fellow travelers</p>
        </div>

        {/* Post Creation (Chat Style) */}
        <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm mb-10">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-white font-black text-xs shrink-0">
              {user?.name?.[0] || 'U'}
            </div>
            <div className="flex-1">
              <textarea 
                placeholder={`Share your adventure, ${user?.name?.split(' ')[0] || 'Traveler'}...`}
                className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-amber-500/20 outline-none resize-none min-h-[100px]"
              />
              <div className="flex items-center justify-between mt-3">
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors">
                    <MapPin className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors">
                    <Star className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <button className="px-6 py-2 bg-gray-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all">
                  Post Experience
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          <AnimatePresence>
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4"
              >
                {/* User Avatar Column */}
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-md ring-4 ring-white">
                    {post.user.avatar}
                  </div>
                </div>

                {/* Post Content Column */}
                <div className="flex-1 bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900">{post.user.name}</h3>
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-bold uppercase tracking-wider">
                        <MapPin className="w-3 h-3" /> {post.location}
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400">{post.time}</span>
                  </div>

                  <p className="text-gray-700 leading-relaxed text-sm mb-4">
                    {post.content}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 transition-colors">
                        <Heart className="w-4 h-4" />
                        <span className="text-xs font-bold">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-gray-400 hover:text-amber-500 transition-colors">
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-xs font-bold">{post.comments}</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-[10px] font-black">{post.rating}</span>
                      </div>
                      <button className="text-gray-300 hover:text-gray-500">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon, label }) {
  return (
    <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-bold text-gray-600 hover:border-amber-500 hover:text-amber-600 transition-all shadow-sm whitespace-nowrap">
      {icon}
      {label}
    </button>
  );
}
