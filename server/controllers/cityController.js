const cities = [
  { id: 1, name: 'Paris', country: 'France', region: 'Europe', costIndex: '$$$', popularityScore: 98, imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34' },
  { id: 2, name: 'Tokyo', country: 'Japan', region: 'Asia', costIndex: '$$$', popularityScore: 97, imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf' },
  { id: 3, name: 'Bali', country: 'Indonesia', region: 'Asia', costIndex: '$', popularityScore: 95, imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4' },
  { id: 4, name: 'New York', country: 'USA', region: 'North America', costIndex: '$$$', popularityScore: 96, imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9' },
  { id: 5, name: 'Rome', country: 'Italy', region: 'Europe', costIndex: '$$', popularityScore: 94, imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5' },
  { id: 6, name: 'Barcelona', country: 'Spain', region: 'Europe', costIndex: '$$', popularityScore: 92, imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded' },
  { id: 7, name: 'Dubai', country: 'UAE', region: 'Middle East', costIndex: '$$$', popularityScore: 90, imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c' },
  { id: 8, name: 'Bangkok', country: 'Thailand', region: 'Asia', costIndex: '$', popularityScore: 93, imageUrl: 'https://images.unsplash.com/photo-1508009603885-247a53e3cb89' },
  { id: 9, name: 'London', country: 'UK', region: 'Europe', costIndex: '$$$', popularityScore: 95, imageUrl: 'https://images.unsplash.com/photo-1513635269975-5969336bc1d3' },
  { id: 10, name: 'Sydney', country: 'Australia', region: 'Oceania', costIndex: '$$$', popularityScore: 89, imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9' },
  { id: 11, name: 'Istanbul', country: 'Turkey', region: 'Europe/Asia', costIndex: '$', popularityScore: 88, imageUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200' },
  { id: 12, name: 'Amsterdam', country: 'Netherlands', region: 'Europe', costIndex: '$$', popularityScore: 91, imageUrl: 'https://images.unsplash.com/photo-1517736996303-4eec4a66bb17' },
  { id: 13, name: 'Prague', country: 'Czech Republic', region: 'Europe', costIndex: '$', popularityScore: 87, imageUrl: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439' },
  { id: 14, name: 'Lisbon', country: 'Portugal', region: 'Europe', costIndex: '$', popularityScore: 89, imageUrl: 'https://images.unsplash.com/photo-1513407030348-c1e4ee953b6f' },
  { id: 15, name: 'Singapore', country: 'Singapore', region: 'Asia', costIndex: '$$$', popularityScore: 92, imageUrl: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd' },
  { id: 16, name: 'Cape Town', country: 'South Africa', region: 'Africa', costIndex: '$$', popularityScore: 86, imageUrl: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99' },
  { id: 17, name: 'Maldives', country: 'Maldives', region: 'Asia', costIndex: '$$$', popularityScore: 94, imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8' },
  { id: 18, name: 'Santorini', country: 'Greece', region: 'Europe', costIndex: '$$$', popularityScore: 93, imageUrl: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e' },
  { id: 19, name: 'Kyoto', country: 'Japan', region: 'Asia', costIndex: '$$', popularityScore: 91, imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e' },
  { id: 20, name: 'Marrakech', country: 'Morocco', region: 'Africa', costIndex: '$', popularityScore: 85, imageUrl: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70' }
];

const getCities = (req, res) => {
  res.status(200).json({ success: true, data: cities });
};

const searchCities = (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(200).json({ success: true, data: cities });
  }

  const query = q.toLowerCase();
  const filtered = cities.filter(c => 
    c.name.toLowerCase().includes(query) || 
    c.country.toLowerCase().includes(query)
  );

  res.status(200).json({ success: true, data: filtered });
};

module.exports = { getCities, searchCities };
