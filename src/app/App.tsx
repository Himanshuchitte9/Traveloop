import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import { Toaster } from 'react-hot-toast';

import Login from '../pages/Login';
import Signup from '../pages/Signup';
import MyTrips from '../pages/MyTrips';

import Dashboard from '../pages/Dashboard';
import CreateTrip from '../pages/CreateTrip';
import CitySearch from '../pages/CitySearch';
import ActivitySearch from '../pages/ActivitySearch';
import ItineraryBuilder from '../pages/ItineraryBuilder';
import ItineraryView from '../pages/ItineraryView';
import TripBudget from '../pages/TripBudget';
import PackingChecklist from '../pages/PackingChecklist';
import TripNotes from '../pages/TripNotes';
import UserProfile from '../pages/UserProfile';
import PublicItinerary from '../pages/PublicItinerary';
import UniversalSearch from '../pages/UniversalSearch';
import ActivityShare from '../pages/ActivityShare';
import ActivityDiscovery from '../pages/ActivityDiscovery';
import ItineraryBudgetView from '../pages/ItineraryBudgetView';
import BuildItinerary from '../pages/BuildItinerary';
import UserTripListing from '../pages/UserTripListing';
import TripItineraryView from '../pages/TripItineraryView';
import SearchScreen from '../pages/SearchScreen';
import CommunityPage from '../pages/CommunityPage';
import ExpenseInvoice from '../pages/ExpenseInvoice';
import AdminDashboardScreen from './components/AdminDashboardScreen';
import BottomNav from '../components/shared/BottomNav';

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" toastOptions={{
        style: { borderRadius: '12px', fontFamily: 'Inter' },
        success: { iconTheme: { primary: '#F5A623', secondary: '#fff' } }
      }} />
      <Router>
        <div className="size-full bg-white overflow-auto relative">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route path="/dashboard" element={<ProtectedRoute><div className="pb-20"><Dashboard /></div><BottomNav /></ProtectedRoute>} />
            <Route path="/create-trip" element={<ProtectedRoute><CreateTrip /></ProtectedRoute>} />
            <Route path="/trip-listing" element={<ProtectedRoute><div className="pb-20"><UserTripListing /></div><BottomNav /></ProtectedRoute>} />
            <Route path="/my-trips" element={<ProtectedRoute><div className="pb-20"><MyTrips /></div><BottomNav /></ProtectedRoute>} />
            
            {/* Discovery */}
            <Route path="/discover/cities" element={<ProtectedRoute><div className="pb-20"><CitySearch /></div><BottomNav /></ProtectedRoute>} />
            <Route path="/discover/activities" element={<ProtectedRoute><div className="pb-20"><ActivitySearch /></div><BottomNav /></ProtectedRoute>} />
            <Route path="/discover/search" element={<ProtectedRoute><div className="pb-20"><SearchScreen /></div><BottomNav /></ProtectedRoute>} />
            <Route path="/community" element={<ProtectedRoute><div className="pb-20"><CommunityPage /></div><BottomNav /></ProtectedRoute>} />
            
            {/* Trip Management Routes */}
            <Route path="/itinerary-builder" element={<ProtectedRoute><div className="pb-20"><BuildItinerary /></div><BottomNav /></ProtectedRoute>} />
            <Route path="/trips/:tripId/builder" element={<ProtectedRoute><ItineraryBuilder /></ProtectedRoute>} />
            <Route path="/itinerary-view" element={<ProtectedRoute><div className="pb-20"><TripItineraryView /></div><BottomNav /></ProtectedRoute>} />
            <Route path="/trips/:tripId/view" element={<ProtectedRoute><ItineraryView /></ProtectedRoute>} />
             <Route path="/trips/:tripId/budget" element={<ProtectedRoute><TripBudget /></ProtectedRoute>} />
             <Route path="/trips/:tripId/invoice" element={<ProtectedRoute><ExpenseInvoice /></ProtectedRoute>} />
             <Route path="/invoice" element={<ProtectedRoute><div className="pb-20"><ExpenseInvoice /></div><BottomNav /></ProtectedRoute>} />
             <Route path="/trips/:tripId/packing" element={<ProtectedRoute><PackingChecklist /></ProtectedRoute>} />
            <Route path="/packing" element={<ProtectedRoute><div className="pb-20"><PackingChecklist /></div><BottomNav /></ProtectedRoute>} />
             <Route path="/trips/:tripId/notes" element={<ProtectedRoute><TripNotes /></ProtectedRoute>} />
             <Route path="/notes" element={<ProtectedRoute><div className="pb-20"><TripNotes /></div><BottomNav /></ProtectedRoute>} />
            
            {/* User & Public */}
            <Route path="/profile" element={<ProtectedRoute><div className="pb-20"><UserProfile /></div><BottomNav /></ProtectedRoute>} />
            <Route path="/search" element={<ProtectedRoute><div className="pb-20"><UniversalSearch /></div><BottomNav /></ProtectedRoute>} />
            <Route path="/activity-discovery" element={<ProtectedRoute><div className="pb-20"><ActivityDiscovery /></div><BottomNav /></ProtectedRoute>} />
            <Route path="/itinerary-budget" element={<ProtectedRoute><div className="pb-20"><ItineraryBudgetView /></div><BottomNav /></ProtectedRoute>} />
            <Route path="/share-trip/:tripId" element={<ProtectedRoute><ActivityShare /></ProtectedRoute>} />
            <Route path="/share/:tripId" element={<PublicItinerary />} />
            
            {/* Admin */}
            <Route path="/admin" element={<ProtectedRoute><AdminDashboardScreen /></ProtectedRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}