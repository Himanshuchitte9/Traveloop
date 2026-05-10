import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1708037429826-de89ac0dd6c7?w=1080"
          alt="Travel background"
          className="w-full h-full object-cover blur-sm"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="bg-[#F5A623] p-3 rounded-2xl">
              <Plane className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl text-[#1A1A1A]">Traveloop</h1>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl mb-6 text-[#1A1A1A]">Welcome Back</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-[#1A1A1A]">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-[#F8F8F8] rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F5A623] text-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-[#1A1A1A]">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-[#F8F8F8] rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F5A623] text-[#1A1A1A]"
                />
              </div>

              <Link to="/dashboard" className="block w-full bg-[#F5A623] text-white py-3 rounded-xl text-center hover:bg-[#E09612] transition-colors">
                Login
              </Link>

              <div className="text-center space-y-2">
                <Link to="/signup" className="block text-[#F5A623] hover:underline">
                  Sign Up
                </Link>
                <button className="text-[#6B6B6B] hover:underline text-sm">
                  Forgot Password?
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
