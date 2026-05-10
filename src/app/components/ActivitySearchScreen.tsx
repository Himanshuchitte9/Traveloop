import { useState } from 'react';
import { ArrowLeft, Search, Clock, DollarSign, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';

const activities = [
  {
    id: 1,
    name: 'Eiffel Tower Skip-the-Line Tour',
    duration: '2 hours',
    cost: 25,
    description: 'Visit the iconic Eiffel Tower with priority access',
    image: 'https://images.unsplash.com/photo-1764215209063-d72a64ba4804?w=400',
    added: false
  },
  {
    id: 2,
    name: 'Seine River Cruise',
    duration: '1.5 hours',
    cost: 15,
    description: 'Romantic boat tour along the Seine',
    image: 'https://images.unsplash.com/photo-1708037429826-de89ac0dd6c7?w=400',
    added: false
  },
  {
    id: 3,
    name: 'Louvre Museum Guided Tour',
    duration: '3 hours',
    cost: 45,
    description: 'Explore world-famous art with an expert guide',
    image: 'https://images.unsplash.com/photo-1708037429904-fa6f0a93bc22?w=400',
    added: true
  },
];

export default function ActivitySearchScreen() {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState(activities);

  const toggleActivity = (id: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, added: !item.added } : item
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
        <div className="flex items-center gap-3 mb-4">
          <Link to="/itinerary-builder" className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5 text-[#1A1A1A]" />
          </Link>
          <h2 className="text-xl text-[#1A1A1A]">Find Activities</h2>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search activities..."
            className="w-full pl-11 pr-4 py-3 bg-[#F8F8F8] rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F5A623] text-[#1A1A1A]"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          <button className="px-4 py-2 bg-[#F5A623] text-white rounded-full whitespace-nowrap">All</button>
          <button className="px-4 py-2 bg-[#F8F8F8] text-[#6B6B6B] rounded-full whitespace-nowrap">Sightseeing</button>
          <button className="px-4 py-2 bg-[#F8F8F8] text-[#6B6B6B] rounded-full whitespace-nowrap">Food</button>
          <button className="px-4 py-2 bg-[#F8F8F8] text-[#6B6B6B] rounded-full whitespace-nowrap">Adventure</button>
          <button className="px-4 py-2 bg-[#F8F8F8] text-[#6B6B6B] rounded-full whitespace-nowrap">Culture</button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {items.map((activity) => (
          <div key={activity.id} className="bg-[#F8F8F8] rounded-2xl overflow-hidden shadow-sm">
            <ImageWithFallback
              src={activity.image}
              alt={activity.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-[#1A1A1A] mb-2">{activity.name}</h3>
              <p className="text-sm text-[#6B6B6B] mb-3">{activity.description}</p>
              <div className="flex items-center gap-4 text-sm text-[#6B6B6B] mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{activity.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  <span>${activity.cost}</span>
                </div>
              </div>
              <button
                onClick={() => toggleActivity(activity.id)}
                className={`w-full py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                  activity.added
                    ? 'bg-[#2ECC71] text-white'
                    : 'bg-[#F5A623] text-white hover:bg-[#E09612]'
                }`}
              >
                {activity.added && <Check className="w-5 h-5" />}
                <span>{activity.added ? 'Added' : 'Add to Itinerary'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
