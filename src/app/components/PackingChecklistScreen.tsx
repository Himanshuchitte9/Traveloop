import { useState } from 'react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Item {
  id: number;
  name: string;
  checked: boolean;
}

const initialCategories = {
  Clothing: [
    { id: 1, name: 'Shirts (5)', checked: true },
    { id: 2, name: 'Pants (3)', checked: true },
    { id: 3, name: 'Jacket', checked: false },
    { id: 4, name: 'Shoes (2 pairs)', checked: true },
  ],
  Documents: [
    { id: 5, name: 'Passport', checked: true },
    { id: 6, name: 'Travel Insurance', checked: false },
    { id: 7, name: 'Hotel Confirmations', checked: true },
  ],
  Electronics: [
    { id: 8, name: 'Phone Charger', checked: false },
    { id: 9, name: 'Power Bank', checked: false },
    { id: 10, name: 'Camera', checked: true },
  ],
  Toiletries: [
    { id: 11, name: 'Toothbrush & Toothpaste', checked: true },
    { id: 12, name: 'Shampoo', checked: false },
  ],
};

export default function PackingChecklistScreen() {
  const [categories, setCategories] = useState(initialCategories);

  const toggleItem = (category: string, itemId: number) => {
    setCategories({
      ...categories,
      [category]: categories[category as keyof typeof categories].map(item =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      ),
    });
  };

  const totalItems = Object.values(categories).flat().length;
  const packedItems = Object.values(categories).flat().filter(item => item.checked).length;
  const progress = (packedItems / totalItems) * 100;

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
        <div className="flex items-center gap-3 mb-4">
          <Link to="/itinerary-view" className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5 text-[#1A1A1A]" />
          </Link>
          <h2 className="text-xl text-[#1A1A1A]">Packing Checklist</h2>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2 text-sm">
            <span className="text-[#6B6B6B]">{packedItems} of {totalItems} items packed</span>
            <span className="text-[#F5A623]">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#F5A623] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {Object.entries(categories).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-[#1A1A1A] mb-3">{category}</h3>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="bg-[#F8F8F8] rounded-xl p-4 flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleItem(category, item.id)}
                    className="w-5 h-5 rounded border-gray-300 text-[#F5A623] focus:ring-[#F5A623] cursor-pointer"
                  />
                  <span className={`flex-1 ${item.checked ? 'line-through text-[#6B6B6B]' : 'text-[#1A1A1A]'}`}>
                    {item.name}
                  </span>
                  <button className="p-2 hover:bg-gray-200 rounded-lg">
                    <Trash2 className="w-4 h-4 text-[#6B6B6B]" />
                  </button>
                </div>
              ))}
              <button className="w-full border border-dashed border-gray-300 rounded-xl p-3 flex items-center justify-center gap-2 text-[#6B6B6B] hover:border-[#F5A623] hover:text-[#F5A623] transition-colors">
                <Plus className="w-4 h-4" />
                <span className="text-sm">Add Item</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
