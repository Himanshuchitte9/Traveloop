import { useState } from 'react';
import { ArrowLeft, Search, Star, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';

const cities = [
  { id: 1, name: 'Paris', country: 'France', cost: '$$$', rating: 4.8, region: 'Europe', image: 'https://images.unsplash.com/photo-1764215209063-d72a64ba4804?w=400' },
  { id: 2, name: 'Tokyo', country: 'Japan', cost: '$$', rating: 4.9, region: 'Asia', image: 'https://images.unsplash.com/photo-1761002067732-2acd31d27fec?w=400' },
  { id: 3, name: 'Prague', country: 'Czech Republic', cost: '$', rating: 4.7, region: 'Europe', image: 'https://images.unsplash.com/photo-1772379267589-7cb2776c6552?w=400' },
  { id: 4, name: 'Amsterdam', country: 'Netherlands', cost: '$$', rating: 4.6, region: 'Europe', image: 'https://images.unsplash.com/photo-1761145061451-48ff88354965?w=400' },
  { id: 5, name: 'New York', country: 'USA', cost: '$$$', rating: 4.8, region: 'Americas', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400' },
  { id: 6, name: 'Bangkok', country: 'Thailand', cost: '$', rating: 4.7, region: 'Asia', image: 'https://images.unsplash.com/photo-1508009603885-50cf7cbf0c46?w=400' },
  { id: 7, name: 'Rio de Janeiro', country: 'Brazil', cost: '$$', rating: 4.6, region: 'Americas', image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400' }
];

const filters = ['All', 'Europe', 'Asia', 'Americas', 'Budget', 'Popular'];

export default function CitySearchScreen() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredCities = cities.filter(city => {
    // Filter by text search
    if (search && !city.name.toLowerCase().includes(search.toLowerCase()) && !city.country.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    
    // Filter by category
    if (activeFilter === 'All') return true;
    if (['Europe', 'Asia', 'Americas'].includes(activeFilter)) {
      return city.region === activeFilter;
    }
    if (activeFilter === 'Budget') {
      return city.cost === '$' || city.cost === '$$';
    }
    if (activeFilter === 'Popular') {
      return city.rating >= 4.8;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Link to="/itinerary-builder" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-[#1A1A1A]" />
          </Link>
          <h2 className="text-xl font-bold text-[#1A1A1A]">Search Cities</h2>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search cities or countries..."
            className="w-full pl-11 pr-4 py-3 bg-[#F8F8F8] rounded-xl border border-gray-200 focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] text-[#1A1A1A] transition-all"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 ${
                activeFilter === f 
                  ? 'bg-amber-500 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCities.length > 0 ? (
          filteredCities.map((city) => (
            <div key={city.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex gap-4 p-2">
                <ImageWithFallback
                  src={city.image}
                  alt={city.name}
                  className="w-32 h-32 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 py-2 pr-2 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">{city.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{city.country}</p>
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <span className="text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md">{city.cost}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="text-gray-700">{city.rating}</span>
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 text-amber-500 font-semibold hover:text-amber-600 transition-colors self-start mt-2 bg-amber-50 px-3 py-1.5 rounded-lg group-hover:bg-amber-100">
                    <Plus className="w-4 h-4" />
                    <span>Add to Trip</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-gray-500">
            <p>No cities found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
