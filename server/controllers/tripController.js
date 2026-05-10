const { PrismaClient } = require('@prisma/client');
const { validationResult } = require('express-validator');

const prisma = new PrismaClient();

const getTrips = async (req, res) => {
  try {
    const trips = await prisma.trip.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json({ success: true, data: trips });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const createTrip = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  try {
    const { name, description, startDate, endDate, coverPhoto } = req.body;
    const trip = await prisma.trip.create({
      data: {
        name,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        coverPhoto,
        userId: req.user.userId
      }
    });
    res.status(201).json({ success: true, data: trip });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const getTripById = async (req, res) => {
  try {
    const trip = await prisma.trip.findFirst({
      where: { id: req.params.id, userId: req.user.userId },
      include: {
        stops: {
          orderBy: { order: 'asc' },
          include: { activities: true }
        }
      }
    });
    
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }
    
    res.status(200).json({ success: true, data: trip });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const updateTrip = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  try {
    const trip = await prisma.trip.findFirst({ where: { id: req.params.id, userId: req.user.userId } });
    if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });

    const { name, description, startDate, endDate, coverPhoto } = req.body;
    const updatedTrip = await prisma.trip.update({
      where: { id: req.params.id },
      data: {
        name: name || trip.name,
        description: description !== undefined ? description : trip.description,
        startDate: startDate ? new Date(startDate) : trip.startDate,
        endDate: endDate ? new Date(endDate) : trip.endDate,
        coverPhoto: coverPhoto !== undefined ? coverPhoto : trip.coverPhoto
      }
    });
    res.status(200).json({ success: true, data: updatedTrip });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const deleteTrip = async (req, res) => {
  try {
    const trip = await prisma.trip.findFirst({ where: { id: req.params.id, userId: req.user.userId } });
    if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });

    await prisma.trip.delete({ where: { id: req.params.id } });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const getPublicTrip = async (req, res) => {
  try {
    const trip = await prisma.trip.findFirst({
      where: { id: req.params.id, isPublic: true },
      include: {
        stops: {
          orderBy: { order: 'asc' },
          include: { activities: true }
        }
      }
    });
    
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found or not public' });
    }
    
    res.status(200).json({ success: true, data: trip });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const toggleShare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  try {
    const trip = await prisma.trip.findFirst({ where: { id: req.params.id, userId: req.user.userId } });
    if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });

    const updatedTrip = await prisma.trip.update({
      where: { id: req.params.id },
      data: { isPublic: req.body.isPublic }
    });
    res.status(200).json({ success: true, data: updatedTrip });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = { getTrips, createTrip, getTripById, updateTrip, deleteTrip, getPublicTrip, toggleShare };
