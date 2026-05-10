import { Users, MapPin, TrendingUp, Activity } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const kpis = [
  { id: 1, label: 'Total Users', value: '12,458', icon: Users, color: '#F5A623' },
  { id: 2, label: 'Trips Created', value: '3,742', icon: MapPin, color: '#2ECC71' },
  { id: 3, label: 'Active Today', value: '1,234', icon: Activity, color: '#6B6B6B' },
  { id: 4, label: 'Growth', value: '+23%', icon: TrendingUp, color: '#F5A623' },
];

const tripsPerWeek = [
  { week: 'Week 1', trips: 420 },
  { week: 'Week 2', trips: 580 },
  { week: 'Week 3', trips: 720 },
  { week: 'Week 4', trips: 650 },
  { week: 'Week 5', trips: 890 },
];

const topCities = [
  { name: 'Paris', value: 1250, color: '#F5A623' },
  { name: 'Tokyo', value: 980, color: '#2ECC71' },
  { name: 'New York', value: 850, color: '#6B6B6B' },
  { name: 'London', value: 720, color: '#E09612' },
  { name: 'Barcelona', value: 640, color: '#1A1A1A' },
];

const recentUsers = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah.j@email.com', trips: 3, joined: '2026-05-08' },
  { id: 2, name: 'Mike Chen', email: 'mike.chen@email.com', trips: 1, joined: '2026-05-09' },
  { id: 3, name: 'Emma Wilson', email: 'emma.w@email.com', trips: 5, joined: '2026-05-09' },
  { id: 4, name: 'David Brown', email: 'david.b@email.com', trips: 2, joined: '2026-05-10' },
];

export default function AdminDashboardScreen() {
  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <div className="flex">
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">
          <h1 className="text-2xl text-[#1A1A1A] mb-8">Traveloop Admin</h1>
          <nav className="space-y-2">
            <a href="#" className="block px-4 py-3 bg-[#F5A623] text-white rounded-lg">
              Dashboard
            </a>
            <a href="#" className="block px-4 py-3 text-[#6B6B6B] hover:bg-gray-100 rounded-lg">
              Users
            </a>
            <a href="#" className="block px-4 py-3 text-[#6B6B6B] hover:bg-gray-100 rounded-lg">
              Trips
            </a>
            <a href="#" className="block px-4 py-3 text-[#6B6B6B] hover:bg-gray-100 rounded-lg">
              Analytics
            </a>
            <a href="#" className="block px-4 py-3 text-[#6B6B6B] hover:bg-gray-100 rounded-lg">
              Settings
            </a>
          </nav>
        </div>

        <div className="flex-1 p-8">
          <h2 className="text-2xl text-[#1A1A1A] mb-6">Analytics Overview</h2>

          <div className="grid grid-cols-4 gap-6 mb-8">
            {kpis.map((kpi) => {
              const Icon = kpi.icon;
              return (
                <div key={kpi.id} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: kpi.color + '20' }}>
                      <Icon className="w-6 h-6" style={{ color: kpi.color }} />
                    </div>
                  </div>
                  <h3 className="text-3xl text-[#1A1A1A] mb-1">{kpi.value}</h3>
                  <p className="text-sm text-[#6B6B6B]">{kpi.label}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-[#1A1A1A] mb-4">Trips Created Per Week</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={tripsPerWeek}>
                  <XAxis dataKey="week" stroke="#6B6B6B" />
                  <YAxis stroke="#6B6B6B" />
                  <Tooltip />
                  <Bar dataKey="trips" fill="#F5A623" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-[#1A1A1A] mb-4">Top Destinations</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={topCities}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={(entry) => entry.name}
                  >
                    {topCities.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-[#1A1A1A] mb-4">Recent Users</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-[#6B6B6B]">Name</th>
                    <th className="text-left py-3 px-4 text-[#6B6B6B]">Email</th>
                    <th className="text-left py-3 px-4 text-[#6B6B6B]">Trips</th>
                    <th className="text-left py-3 px-4 text-[#6B6B6B]">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-[#F8F8F8]">
                      <td className="py-3 px-4 text-[#1A1A1A]">{user.name}</td>
                      <td className="py-3 px-4 text-[#6B6B6B]">{user.email}</td>
                      <td className="py-3 px-4 text-[#1A1A1A]">{user.trips}</td>
                      <td className="py-3 px-4 text-[#6B6B6B]">{user.joined}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
