const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.note.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.checklistItem.deleteMany();
  await prisma.stop.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.user.deleteMany();

  // Create test user
  const hashedPassword = await bcrypt.hash('password123', 10);
  const testUser = await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'test@traveloop.com',
      password: hashedPassword,
    },
  });

  // Create Sample Trips
  const trip1 = await prisma.trip.create({
    data: {
      name: 'European Summer',
      description: 'Backpacking through Europe',
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-06-15'),
      coverPhoto: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a',
      userId: testUser.id,
    },
  });

  const trip2 = await prisma.trip.create({
    data: {
      name: 'Japan Adventure',
      description: 'Exploring Tokyo and Kyoto',
      startDate: new Date('2024-09-10'),
      endDate: new Date('2024-09-24'),
      coverPhoto: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
      userId: testUser.id,
    },
  });

  // Create Stops for Trip 1
  const paris = await prisma.stop.create({
    data: {
      city: 'Paris',
      country: 'France',
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-06-05'),
      order: 1,
      tripId: trip1.id,
    },
  });

  const rome = await prisma.stop.create({
    data: {
      city: 'Rome',
      country: 'Italy',
      startDate: new Date('2024-06-06'),
      endDate: new Date('2024-06-10'),
      order: 2,
      tripId: trip1.id,
    },
  });

  // Create Stops for Trip 2
  const tokyo = await prisma.stop.create({
    data: {
      city: 'Tokyo',
      country: 'Japan',
      startDate: new Date('2024-09-10'),
      endDate: new Date('2024-09-17'),
      order: 1,
      tripId: trip2.id,
    },
  });

  const kyoto = await prisma.stop.create({
    data: {
      city: 'Kyoto',
      country: 'Japan',
      startDate: new Date('2024-09-17'),
      endDate: new Date('2024-09-24'),
      order: 2,
      tripId: trip2.id,
    },
  });

  // Create Activities
  await prisma.activity.createMany({
    data: [
      { name: 'Eiffel Tower', type: 'SIGHTSEEING', cost: 25.0, duration: '2h', description: 'Visit the iconic tower', stopId: paris.id },
      { name: 'Louvre Museum', type: 'CULTURE', cost: 17.0, duration: '4h', description: 'See the Mona Lisa', stopId: paris.id },
      { name: 'Croissant Tasting', type: 'FOOD', cost: 10.0, duration: '1h', description: 'Best bakeries', stopId: paris.id },
      
      { name: 'Colosseum', type: 'SIGHTSEEING', cost: 18.0, duration: '3h', description: 'Ancient arena', stopId: rome.id },
      { name: 'Pasta Making Class', type: 'FOOD', cost: 60.0, duration: '3h', description: 'Learn to make pasta', stopId: rome.id },
      { name: 'Vatican Museums', type: 'CULTURE', cost: 20.0, duration: '4h', description: 'Sistine Chapel', stopId: rome.id },

      { name: 'Shibuya Crossing', type: 'SIGHTSEEING', cost: 0, duration: '1h', description: 'Busiest intersection', stopId: tokyo.id },
      { name: 'Sushi Omakase', type: 'FOOD', cost: 100.0, duration: '2h', description: 'Amazing sushi', stopId: tokyo.id },
      { name: 'Akihabara', type: 'CULTURE', cost: 20.0, duration: '3h', description: 'Anime and electronics', stopId: tokyo.id },

      { name: 'Fushimi Inari Taisha', type: 'SIGHTSEEING', cost: 0, duration: '3h', description: 'Thousand torii gates', stopId: kyoto.id },
      { name: 'Tea Ceremony', type: 'CULTURE', cost: 40.0, duration: '2h', description: 'Traditional matcha', stopId: kyoto.id },
      { name: 'Bamboo Forest', type: 'SIGHTSEEING', cost: 0, duration: '2h', description: 'Arashiyama', stopId: kyoto.id },
    ],
  });

  // Create Checklist Items
  await prisma.checklistItem.createMany({
    data: [
      { label: 'Passport', category: 'DOCUMENTS', tripId: trip1.id, isPacked: false },
      { label: 'Travel Insurance', category: 'DOCUMENTS', tripId: trip1.id, isPacked: false },
      { label: 'T-Shirts', category: 'CLOTHING', tripId: trip1.id, isPacked: true },
      { label: 'Jeans', category: 'CLOTHING', tripId: trip1.id, isPacked: false },
      { label: 'Phone Charger', category: 'ELECTRONICS', tripId: trip1.id, isPacked: true },
      { label: 'Power Bank', category: 'ELECTRONICS', tripId: trip1.id, isPacked: false },
      { label: 'Toothbrush', category: 'TOILETRIES', tripId: trip1.id, isPacked: false },
      { label: 'Sunscreen', category: 'TOILETRIES', tripId: trip1.id, isPacked: false },
      { label: 'Sunglasses', category: 'OTHER', tripId: trip1.id, isPacked: true },
      { label: 'Water Bottle', category: 'OTHER', tripId: trip1.id, isPacked: false },
    ],
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
