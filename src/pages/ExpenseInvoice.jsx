import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Download, FileText, CheckCircle2, 
  Search, Filter, ArrowUpDown, PieChart, 
  MoreHorizontal, MapPin, Calendar, Users
} from 'lucide-react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import { useAuth } from '../context/AuthContext';
import { useBudget } from '../hooks/useBudget';
import { useTrips } from '../hooks/useTrips';

export default function ExpenseInvoice() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { trips } = useTrips();
  const { budget, expenses } = useBudget(tripId);

  const currentTrip = trips?.find(t => t.id === tripId) || {
    name: 'Trip to Europe Adventure',
    dates: 'May 25 - Jun 05, 2025',
    createdBy: 'James'
  };

  const invoiceId = "INV-xyz-30290";
  const generatedDate = "May 20, 2025";
  
  const subtotal = 21000;
  const tax = 1050;
  const discount = 50;
  const grandTotal = 22000;

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      <DashboardHeader user={user} logout={logout} />

      {/* Secondary Search/Filter Header */}
      <div className="pt-20 px-6 max-w-7xl mx-auto flex items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search invoices..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-amber-500"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50">
            <ArrowUpDown className="w-4 h-4" /> Sort
          </button>
        </div>
      </div>

      <div className="px-6 max-w-7xl mx-auto">
        {/* Back Link */}
        <button 
          onClick={() => navigate('/my-trips')}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-600 mb-6 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold">back to My Trips</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Invoice Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Invoice Summary Card */}
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-8">
              <div className="w-32 h-32 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0 border border-gray-100">
                <div className="w-16 h-16 border-2 border-gray-400 rounded-lg relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 border-2 border-gray-400 w-8 h-4 rotate-45" />
                </div>
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                <div>
                  <h2 className="text-xl font-black text-gray-900 mb-1">{currentTrip.name}</h2>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{currentTrip.dates} • created by {currentTrip.createdBy}</p>
                  
                  <div className="mt-6">
                    <h4 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-2">Traveler Details:</h4>
                    <div className="flex flex-col gap-0.5">
                      {['James', 'Arjun', 'Jerry', 'Cristina'].map(name => (
                        <p key={name} className="text-sm font-bold text-gray-600">{name}</p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between md:justify-start md:gap-12">
                    <div>
                      <h4 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-1">Invoice Id</h4>
                      <p className="text-sm font-bold text-gray-700">{invoiceId}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-1">Generated date</h4>
                      <p className="text-sm font-bold text-gray-700">{generatedDate}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-1">Payment status</h4>
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-black uppercase tracking-wider">
                      <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                      pending
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Expense Table Area */}
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">#</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Qty/details</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Unit Cost</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    <InvoiceRow id="1" cat="hotel" desc="hotel booking paris" qty="3 nights" cost="3000" amt="9000" />
                    <InvoiceRow id="2" cat="travel" desc="flight bookings (DEL -> PAR)" qty="1" cost="12000" amt="12000" />
                    {[3, 4, 5, 6].map(i => (
                      <tr key={i} className="h-12"><td colSpan={6} /></tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-gray-100 bg-gray-50/50">
                      <td colSpan={4} />
                      <td className="px-6 py-3 text-sm font-bold text-gray-500 text-right uppercase tracking-wider">Subtotal</td>
                      <td className="px-6 py-3 text-sm font-black text-gray-900 text-right">${subtotal}</td>
                    </tr>
                    <tr className="bg-gray-50/50">
                      <td colSpan={4} />
                      <td className="px-6 py-3 text-sm font-bold text-gray-500 text-right uppercase tracking-wider">tax(5%)</td>
                      <td className="px-6 py-3 text-sm font-black text-gray-900 text-right">${tax}</td>
                    </tr>
                    <tr className="bg-gray-50/50">
                      <td colSpan={4} />
                      <td className="px-6 py-3 text-sm font-bold text-gray-500 text-right uppercase tracking-wider">Discount</td>
                      <td className="px-6 py-3 text-sm font-black text-gray-900 text-right">${discount}</td>
                    </tr>
                    <tr className="bg-gray-900 text-white">
                      <td colSpan={4} />
                      <td className="px-6 py-6 text-base font-black text-right uppercase tracking-[0.2em]">Grand Total</td>
                      <td className="px-6 py-6 text-xl font-black text-right">${grandTotal}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-black text-gray-600 uppercase text-xs tracking-widest hover:border-amber-500 transition-colors shadow-sm">
                  <Download className="w-4 h-4" /> Download Invoice
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-black text-gray-600 uppercase text-xs tracking-widest hover:border-amber-500 transition-colors shadow-sm">
                  <FileText className="w-4 h-4" /> Export as PDF
                </button>
              </div>
              <button className="flex items-center justify-center gap-2 px-10 py-3 bg-amber-500 text-white rounded-xl font-black uppercase text-xs tracking-widest hover:bg-amber-600 transition-colors shadow-lg shadow-amber-200">
                Mark as paid
              </button>
            </div>
          </div>

          {/* Budget Insights Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">budget Insights</h3>
                <MoreHorizontal className="w-4 h-4 text-gray-300" />
              </div>

              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 mb-6">
                  {/* Mock Pie Chart */}
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="64" cy="64" r="50" fill="transparent" stroke="#F3F4F6" strokeWidth="20" />
                    <circle cx="64" cy="64" r="50" fill="transparent" stroke="#F5A623" strokeWidth="20" strokeDasharray="314" strokeDashoffset="80" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-xs font-black text-gray-900">75%</span>
                  </div>
                </div>

                <div className="w-full space-y-4 mb-8">
                  <InsightItem label="Total Budget" val="20000" color="bg-gray-200" />
                  <InsightItem label="total spent" val="22000" color="bg-amber-500" />
                  <div className="flex justify-between items-center py-2 border-t border-dashed border-gray-100">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Remaining:</span>
                    <span className="text-sm font-black text-red-500">-2000</span>
                  </div>
                </div>

                <button 
                  onClick={() => navigate(`/trips/${tripId}/budget`)}
                  className="w-full py-3 bg-gray-900 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-black transition-all"
                >
                  View Full Budget
                </button>
              </div>
            </div>

            {/* Traveler Icons Mock */}
            <div className="bg-amber-50 p-6 rounded-[32px] border border-amber-100 text-center">
              <Users className="w-8 h-8 text-amber-500 mx-auto mb-3" />
              <p className="text-xs font-bold text-amber-700">This invoice is shared with 4 travelers. Split expenses automatically in Settings.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InvoiceRow({ id, cat, desc, qty, cost, amt }) {
  return (
    <tr className="hover:bg-gray-50/50 transition-colors">
      <td className="px-6 py-5 text-sm font-black text-gray-300">{id}</td>
      <td className="px-6 py-5">
        <span className="text-[10px] font-black bg-gray-100 px-2 py-1 rounded text-gray-500 uppercase tracking-wider">{cat}</span>
      </td>
      <td className="px-6 py-5 text-sm font-bold text-gray-700">{desc}</td>
      <td className="px-6 py-5 text-sm font-medium text-gray-500">{qty}</td>
      <td className="px-6 py-5 text-sm font-bold text-gray-700 text-right">{cost}</td>
      <td className="px-6 py-5 text-sm font-black text-gray-900 text-right">{amt}</td>
    </tr>
  );
}

function InsightItem({ label, val, color }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{label}:</span>
      </div>
      <span className="text-sm font-black text-gray-900">{val}</span>
    </div>
  );
}
