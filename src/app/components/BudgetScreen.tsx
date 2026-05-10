import { ArrowLeft, DollarSign, Plane, Hotel, Utensils, Camera, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const budgetData = [
  { name: 'Transport', value: 850, color: '#F5A623' },
  { name: 'Accommodation', value: 1200, color: '#2ECC71' },
  { name: 'Activities', value: 450, color: '#6B6B6B' },
  { name: 'Meals', value: 600, color: '#E09612' },
];

const categoryIcons: { [key: string]: any } = {
  Transport: Plane,
  Accommodation: Hotel,
  Activities: Camera,
  Meals: Utensils,
};

export default function BudgetScreen() {
  const total = budgetData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center gap-3">
        <Link to="/itinerary-view" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5 text-[#1A1A1A]" />
        </Link>
        <h2 className="text-xl text-[#1A1A1A]">Budget Breakdown</h2>
      </div>

      <div className="p-6">
        <div className="text-center mb-8">
          <p className="text-[#6B6B6B] mb-2">Total Trip Cost</p>
          <h1 className="text-5xl text-[#1A1A1A]">${total.toLocaleString()}</h1>
        </div>

        <div className="bg-[#F8F8F8] rounded-2xl p-6 mb-6">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={budgetData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {budgetData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value, entry: any) => (
                  <span className="text-sm text-[#1A1A1A]">
                    {value} (${entry.payload.value})
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3 mb-6">
          {budgetData.map((item) => {
            const Icon = categoryIcons[item.name];
            const percentage = ((item.value / total) * 100).toFixed(0);

            return (
              <div key={item.name} className="bg-[#F8F8F8] rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: item.color + '20' }}>
                      <Icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <span className="text-[#1A1A1A]">{item.name}</span>
                  </div>
                  <span className="text-[#1A1A1A]">${item.value}</span>
                </div>
                <div className="ml-13">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{ width: `${percentage}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-red-800 mb-1">Budget Alert</h4>
            <p className="text-sm text-red-600">You're $120 over budget for Jun 15</p>
          </div>
        </div>
      </div>
    </div>
  );
}
