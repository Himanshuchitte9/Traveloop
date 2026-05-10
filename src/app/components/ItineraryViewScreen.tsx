import { Link } from 'react-router-dom';
import { ArrowLeft, List, Calendar, MapPin, Clock, DollarSign, Utensils, Camera, Compass } from 'lucide-react';

const days = [
  {
    day: 1,
    title: 'Paris',
    date: 'Jun 10',
    activities: [
      { id: 1, name: 'Eiffel Tower Visit', time: '09:00', cost: 25, category: 'sightseeing' },
      { id: 2, name: 'Lunch at Café de Flore', time: '12:30', cost: 45, category: 'food' },
      { id: 3, name: 'Louvre Museum', time: '14:00', cost: 17, category: 'sightseeing' },
    ]
  },
  {
    day: 2,
    title: 'Paris',
    date: 'Jun 11',
    activities: [
      { id: 4, name: 'Montmartre Walking Tour', time: '10:00', cost: 20, category: 'culture' },
      { id: 5, name: 'Seine River Cruise', time: '16:00', cost: 15, category: 'adventure' },
    ]
  },
];

const categoryIcons: { [key: string]: any } = {
  sightseeing: Camera,
  food: Utensils,
  culture: Compass,
  adventure: MapPin,
};

export default function ItineraryViewScreen() {
  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
        <div className="flex items-center gap-3 mb-3">
          <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5 text-[#1A1A1A]" />
          </Link>
          <h2 className="text-xl text-[#1A1A1A]">Summer Europe Tour</h2>
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2 bg-[#F5A623] text-white rounded-full flex items-center gap-2">
            <List className="w-4 h-4" />
            <span>List View</span>
          </button>
          <button className="px-4 py-2 bg-[#F8F8F8] text-[#6B6B6B] rounded-full flex items-center gap-2 hover:bg-gray-200">
            <Calendar className="w-4 h-4" />
            <span>Calendar</span>
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {days.map((day) => (
          <div key={day.day}>
            <div className="mb-4">
              <h3 className="text-[#1A1A1A]">Day {day.day} — {day.title}</h3>
              <p className="text-sm text-[#6B6B6B]">{day.date}</p>
            </div>

            <div className="space-y-3">
              {day.activities.map((activity) => {
                const Icon = categoryIcons[activity.category] || Camera;
                return (
                  <div key={activity.id} className="bg-[#F8F8F8] rounded-2xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#F5A623]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[#1A1A1A] mb-2">{activity.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-[#6B6B6B]">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{activity.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            <span className="px-2 py-1 bg-[#F5A623]/10 text-[#F5A623] rounded-full">
                              ${activity.cost}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
