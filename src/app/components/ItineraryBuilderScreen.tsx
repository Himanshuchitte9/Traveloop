import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, GripVertical, Calendar, Activity } from 'lucide-react';

const stops = [
  { id: 1, city: 'Paris', dates: 'Jun 10 - Jun 13', activities: 8 },
  { id: 2, city: 'Amsterdam', dates: 'Jun 14 - Jun 17', activities: 6 },
  { id: 3, city: 'Berlin', dates: 'Jun 18 - Jun 21', activities: 7 },
];

export default function ItineraryBuilderScreen() {
  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center gap-3">
        <Link to="/my-trips" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5 text-[#1A1A1A]" />
        </Link>
        <div>
          <h2 className="text-xl text-[#1A1A1A]">Summer Europe Tour</h2>
          <p className="text-sm text-[#6B6B6B]">Build your itinerary</p>
        </div>
      </div>

      <div className="p-6 space-y-3">
        {stops.map((stop, index) => (
          <div key={stop.id} className="bg-[#F8F8F8] rounded-2xl p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <button className="p-2 hover:bg-gray-200 rounded-lg mt-1">
                <GripVertical className="w-5 h-5 text-[#6B6B6B]" />
              </button>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-[#F5A623] text-white rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-[#1A1A1A]">{stop.city}</h3>
                    <p className="text-sm text-[#6B6B6B]">{stop.dates}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-[#6B6B6B]">
                    <Activity className="w-4 h-4" />
                    <span>{stop.activities} activities</span>
                  </div>
                  <Link to="/activity-search" className="text-[#F5A623] hover:underline">
                    Add activities
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button className="w-full border-2 border-dashed border-gray-300 rounded-2xl p-6 flex items-center justify-center gap-2 text-[#6B6B6B] hover:border-[#F5A623] hover:text-[#F5A623] transition-colors">
          <Plus className="w-5 h-5" />
          <span>Add Stop</span>
        </button>
      </div>
    </div>
  );
}
