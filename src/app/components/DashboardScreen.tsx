import { Link } from 'react-router-dom';
import { Plus, Calendar, MapPin, Compass, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import BottomNav from './BottomNav';

const destinations = [
  { id: 1, name: 'Paris', country: 'France', image: 'https://images.unsplash.com/photo-1764215209063-d72a64ba4804?w=400' },
  { id: 2, name: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-1761002067732-2acd31d27fec?w=400' },
  { id: 3, name: 'Prague', country: 'Czech Republic', image: 'https://images.unsplash.com/photo-1772379267589-7cb2776c6552?w=400' },
  { id: 4, name: 'Amsterdam', country: 'Netherlands', image: 'https://images.unsplash.com/photo-1761145061451-48ff88354965?w=400' },
];

const upcomingTrips = [
  { id: 1, name: 'Summer Europe Tour', dates: 'Jun 10 - Jun 25, 2026', destinations: 5, image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800' },
  { id: 2, name: 'Asia Adventure', dates: 'Aug 5 - Aug 20, 2026', destinations: 3, image: null },
];

export default function DashboardScreen() {
  const nextTrip = upcomingTrips[0];
  const otherTrips = upcomingTrips.slice(1);

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24 font-sans selection:bg-amber-200 relative overflow-hidden">
      {/* Decorative Top Gradient */}
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-b from-amber-100/70 via-amber-50/30 to-transparent pointer-events-none" />

      <div className="p-6 relative z-10">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8 pt-4">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-1 tracking-tight">Hello, Alex <span className="inline-block animate-[bounce-slow_3s_ease-in-out_infinite] origin-bottom-right">👋</span></h2>
            <p className="text-gray-500 font-medium">Ready for your next adventure?</p>
          </div>
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md ring-2 ring-amber-100 cursor-pointer hover:scale-105 transition-transform">
            <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Hero Card for Next Trip */}
        <div className="mb-10">
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-xl font-bold text-gray-900">Next Trip</h3>
            <Link to="/my-trips" className="text-sm font-bold text-amber-500 hover:text-amber-600 flex items-center gap-1 group transition-colors">
              See all <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <Link to="/itinerary-view" className="block group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <ImageWithFallback
              src={nextTrip.image}
              alt={nextTrip.name}
              className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent"></div>
            
            {/* Glassmorphism Details Panel */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/20 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white">
              <h4 className="text-xl font-bold mb-2 shadow-sm truncate">{nextTrip.name}</h4>
              <div className="flex items-center justify-between text-sm font-medium">
                <div className="flex items-center gap-1.5 opacity-90">
                  <Calendar className="w-4 h-4 text-amber-300" />
                  <span>{nextTrip.dates}</span>
                </div>
                <div className="flex items-center gap-1.5 opacity-90 bg-white/20 px-2.5 py-1 rounded-full">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{nextTrip.destinations} spots</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Recommended Destinations (Horizontal Scroll) */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Explore Destinations</h3>
          <div className="flex gap-4 overflow-x-auto pb-6 hide-scrollbar snap-x snap-mandatory -mx-6 px-6">
            {destinations.map((dest) => (
              <Link key={dest.id} to="/city-search" className="flex-shrink-0 w-40 snap-start group cursor-pointer">
                <div className="relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-52 border border-gray-100">
                  <ImageWithFallback
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform w-full">
                    <h4 className="text-white font-bold text-lg leading-tight shadow-sm truncate">{dest.name}</h4>
                    <p className="text-white/80 text-xs mt-1.5 flex items-center gap-1 font-medium truncate">
                      <Compass className="w-3 h-3 shrink-0" /> {dest.country}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Other Upcoming Trips List */}
        {otherTrips.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Planned Later</h3>
            <div className="space-y-3">
              {otherTrips.map((trip) => (
                <Link key={trip.id} to="/itinerary-view" className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-amber-200 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-gray-900 font-bold mb-1 truncate">{trip.name}</h4>
                    <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="truncate">{trip.dates}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-amber-500 transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <Link 
        to="/create-trip" 
        className="fixed bottom-24 right-6 bg-gradient-to-r from-amber-400 to-amber-500 text-white p-4 rounded-2xl shadow-[0_8px_30px_rgb(245,166,35,0.4)] hover:shadow-[0_8px_30px_rgb(245,166,35,0.6)] hover:-translate-y-1 transition-all duration-300 z-10 flex items-center justify-center group"
      >
        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
      </Link>

      <BottomNav />
      
      {/* Required custom CSS for standardizing scrollbars and animations */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-5%) rotate(-10deg); }
          50% { transform: translateY(0) rotate(10deg); }
        }
      `}</style>
    </div>
  );
}
