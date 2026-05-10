import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowDown, Plus, Save, Trash2, 
  ChevronLeft, Search, ListFilter, SlidersHorizontal, ArrowUpDown,
  DollarSign, Activity, Calendar
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import toast from 'react-hot-toast';

export default function ItineraryBudgetView() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [tripName, setTripName] = useState('Paris Trip');
  const [searchQuery, setSearchQuery] = useState('');

  // Initial state with 2 days, 3 rows each
  const [days, setDays] = useState([
    {
      id: 1,
      rows: [
        { id: '1-1', activity: 'Eiffel Tower Visit', expense: 2500 },
        { id: '1-2', activity: 'Seine River Cruise', expense: 1800 },
        { id: '1-3', activity: 'Dinner at Le Meurice', expense: 12000 },
      ]
    },
    {
      id: 2,
      rows: [
        { id: '2-1', activity: 'Louvre Museum', expense: 1500 },
        { id: '2-2', activity: 'Lunch at Cafe de Flore', expense: 3500 },
        { id: '2-3', activity: 'Shopping at Galeries Lafayette', expense: 5000 },
      ]
    }
  ]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const trip = params.get('trip');
    if (trip) setTripName(trip);
  }, [location]);

  const handleRowChange = (dayId, rowId, field, value) => {
    setDays(prev => prev.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          rows: day.rows.map(row => {
            if (row.id === rowId) {
              return { ...row, [field]: field === 'expense' ? parseFloat(value) || 0 : value };
            }
            return row;
          })
        };
      }
      return day;
    }));
  };

  const addDay = () => {
    const newDayId = days.length + 1;
    setDays([...days, {
      id: newDayId,
      rows: [
        { id: `${newDayId}-1`, activity: '', expense: 0 },
        { id: `${newDayId}-2`, activity: '', expense: 0 },
        { id: `${newDayId}-3`, activity: '', expense: 0 },
      ]
    }]);
    toast.success(`Day ${newDayId} added!`);
  };

  const calculateDayTotal = (rows) => rows.reduce((sum, row) => sum + row.expense, 0);
  const totalTripBudget = useMemo(() => days.reduce((sum, day) => sum + calculateDayTotal(day.rows), 0), [days]);

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <DashboardHeader user={user} logout={logout} />

      <div className="pt-20 px-4 max-w-[420px] mx-auto">
        {/* Wireframe Search & Filter Bar */}
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search bar ......"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-500 transition-all"
              />
            </div>
            <button className="px-3 py-2 border border-gray-200 rounded-lg text-[10px] font-bold text-gray-500 bg-white">Group by</button>
            <button className="px-3 py-2 border border-gray-200 rounded-lg text-[10px] font-bold text-gray-500 bg-white">Filter</button>
            <button className="px-3 py-2 border border-gray-200 rounded-lg text-[10px] font-bold text-gray-500 bg-white">Sort by...</button>
          </div>
        </div>

        {/* Screen Title */}
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold text-gray-900">Itinerary for {tripName}</h1>
          <p className="text-xs text-gray-400 mt-1">Manage your activities and budget</p>
        </div>

        {/* Column Headers */}
        <div className="flex items-center gap-3 px-1 mb-4">
          <div className="flex-[3] text-[10px] font-bold text-gray-400 uppercase tracking-wider">Physical Activity</div>
          <div className="flex-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Expense</div>
        </div>

        {/* Day Blocks */}
        <div className="space-y-12">
          {days.map((day, dayIdx) => (
            <div key={day.id} className="relative">
              {/* Day Label Pill */}
              <div className="absolute -left-2 top-0 -translate-x-full">
                <div className="px-3 py-1.5 border-2 border-teal-500 text-teal-600 rounded-full text-[10px] font-black bg-white shadow-sm whitespace-nowrap">
                  DAY {day.id}
                </div>
              </div>

              {/* Rows */}
              <div className="space-y-4">
                {day.rows.map((row, rowIdx) => (
                  <React.Fragment key={row.id}>
                    <div className="flex items-center gap-3">
                      <div className="flex-[3] bg-white border border-gray-100 rounded-xl p-1 shadow-sm focus-within:border-teal-500 transition-all">
                        <input 
                          type="text" 
                          value={row.activity}
                          onChange={(e) => handleRowChange(day.id, row.id, 'activity', e.target.value)}
                          placeholder="Activity name..."
                          className="w-full px-3 py-2 text-sm text-gray-700 bg-transparent outline-none font-medium"
                        />
                      </div>
                      <div className="flex-1 bg-white border border-gray-100 rounded-xl p-1 shadow-sm focus-within:border-teal-500 transition-all">
                        <input 
                          type="number" 
                          value={row.expense}
                          onChange={(e) => handleRowChange(day.id, row.id, 'expense', e.target.value)}
                          className="w-full px-2 py-2 text-sm text-teal-600 bg-transparent outline-none font-bold text-right"
                        />
                      </div>
                    </div>
                    {rowIdx < day.rows.length - 1 && (
                      <div className="flex justify-center py-1">
                        <ArrowDown className="w-4 h-4 text-teal-300" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Day Total */}
              <div className="mt-4 flex justify-end">
                <div className="bg-teal-50 px-4 py-1.5 rounded-full border border-teal-100">
                  <span className="text-[10px] font-bold text-teal-600 uppercase mr-2">Daily Total:</span>
                  <span className="text-sm font-black text-teal-700">₹{calculateDayTotal(day.rows).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-12 space-y-4">
          <button 
            onClick={addDay}
            className="w-full py-4 bg-white border-2 border-dashed border-teal-200 text-teal-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-teal-50 transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Another Day
          </button>
        </div>
      </div>

      {/* Floating Bottom Total Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-safe z-30 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)]">
        <div className="max-w-[420px] mx-auto flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Trip Budget</p>
            <p className="text-2xl font-black text-gray-900">₹{totalTripBudget.toLocaleString()}</p>
          </div>
          <button 
            onClick={() => toast.success('Itinerary & Budget saved!')}
            className="bg-teal-500 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-teal-100 flex items-center gap-2 hover:bg-teal-600 transition-all"
          >
            <Save className="w-5 h-5" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
