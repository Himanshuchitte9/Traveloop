import { Link } from 'react-router-dom';
import { ArrowLeft, MoreVertical, MapPin, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import BottomNav from './BottomNav';

const trips = [
  {
    id: 1,
    name: 'Summer Europe Tour',
    dates: 'Jun 10 - Jun 25, 2026',
    stops: 5,
    image: 'https://images.unsplash.com/photo-1764215209063-d72a64ba4804?w=400',
    status: 'upcoming'
  },
  {
    id: 2,
    name: 'Asia Adventure',
    dates: 'Aug 5 - Aug 20, 2026',
    stops: 3,
    image: 'https://images.unsplash.com/photo-1761002067732-2acd31d27fec?w=400',
    status: 'upcoming'
  },
  {
    id: 3,
    name: 'Nordic Winter',
    dates: 'Dec 15 - Dec 30, 2025',
    stops: 4,
    image: 'https://images.unsplash.com/photo-1772379267589-7cb2776c6552?w=400',
    status: 'past'
  },
];

export default function MyTripsScreen() {
  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center gap-3">
        <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5 text-[#1A1A1A]" />
        </Link>
        <h2 className="text-xl text-[#1A1A1A]">My Trips</h2>
      </div>

      <div className="p-4">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button className="px-4 py-2 bg-[#F5A623] text-white rounded-full whitespace-nowrap">
            All
          </button>
          <button className="px-4 py-2 bg-[#F8F8F8] text-[#6B6B6B] rounded-full whitespace-nowrap hover:bg-gray-200">
            Upcoming
          </button>
          <button className="px-4 py-2 bg-[#F8F8F8] text-[#6B6B6B] rounded-full whitespace-nowrap hover:bg-gray-200">
            Past
          </button>
        </div>

        <div className="space-y-4">
          {trips.map((trip) => (
            <div key={trip.id} className="bg-[#F8F8F8] rounded-2xl overflow-hidden shadow-sm">
              <div className="flex gap-4 p-4">
                <ImageWithFallback
                  src={trip.image}
                  alt={trip.name}
                  className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#1A1A1A] mb-2">{trip.name}</h3>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-[#6B6B6B]">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{trip.dates}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#6B6B6B]">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span>{trip.stops} stops</span>
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-200 rounded-lg h-fit">
                  <MoreVertical className="w-5 h-5 text-[#6B6B6B]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
