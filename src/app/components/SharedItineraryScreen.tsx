import { Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function SharedItineraryScreen() {
  const [copied, setCopied] = useState(false);
  const shareUrl = 'https://traveloop.app/shared/abc123';

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-[#F5A623] to-[#E09612] text-white p-6">
        <div className="flex items-center gap-3 mb-4">
          <Share2 className="w-6 h-6" />
          <h2 className="text-xl">Shared Itinerary</h2>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-4">
          <p className="text-sm mb-2">Public Link</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 bg-white/30 rounded-lg px-3 py-2 text-sm"
            />
            <button
              onClick={handleCopy}
              className="bg-white text-[#F5A623] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 hover:bg-white/30 transition-colors">
            WhatsApp
          </button>
          <button className="flex-1 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 hover:bg-white/30 transition-colors">
            Instagram
          </button>
          <button className="flex-1 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 hover:bg-white/30 transition-colors">
            Twitter
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-[#F5A623]/10 border border-[#F5A623]/30 rounded-2xl p-4 mb-6">
          <h3 className="text-[#1A1A1A] mb-2">Public View</h3>
          <p className="text-sm text-[#6B6B6B]">
            Anyone with this link can view your itinerary. They can also copy it to create their own trip.
          </p>
        </div>

        <button className="w-full bg-[#F5A623] text-white py-3 rounded-xl hover:bg-[#E09612] transition-colors mb-4">
          Copy This Trip
        </button>

        <div className="bg-[#F8F8F8] rounded-2xl p-6">
          <h3 className="text-[#1A1A1A] mb-4">Summer Europe Tour</h3>
          <p className="text-sm text-[#6B6B6B] mb-4">Jun 10 - Jun 25, 2026 • 5 cities</p>

          <div className="space-y-3">
            {['Paris', 'Amsterdam', 'Berlin', 'Prague', 'Vienna'].map((city, index) => (
              <div key={city} className="bg-white rounded-xl p-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-[#F5A623] text-white rounded-full flex items-center justify-center">
                  {index + 1}
                </div>
                <div>
                  <h4 className="text-[#1A1A1A]">{city}</h4>
                  <p className="text-sm text-[#6B6B6B]">3 days • 8 activities</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
