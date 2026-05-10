const { PrismaClient } = require('@prisma/client');
const { validationResult } = require('express-validator');

const prisma = new PrismaClient();

const createStop = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  try {
    const { tripId, city, country, startDate, endDate, order } = req.body;
    
    // Verify trip exists and belongs to user
    const trip = await prisma.trip.findFirst({ where: { id: tripId, userId: req.user.userId } });
    if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });

    const stop = await prisma.stop.create({
      data: {
        tripId,
        city,
        country,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        order
      }
    });

    res.status(201).json({ success: true, data: stop });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const updateStop = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  try {
    const stopId = req.params.id;
    // Verify stop belongs to user's trip
    const stop = await prisma.stop.findFirst({
      where: { id: stopId },
      include: { trip: true }
    });
    
    if (!stop || stop.trip.userId !== req.user.userId) {
      return res.status(404).json({ success: false, message: 'Stop not found' });
    }

    const { city, country, startDate, endDate, order } = req.body;
    const updatedStop = await prisma.stop.update({
      where: { id: stopId },
      data: {
        city: city || stop.city,
        country: country || stop.country,
        startDate: startDate ? new Date(startDate) : stop.startDate,
        endDate: endDate ? new Date(endDate) : stop.endDate,
        order: order !== undefined ? order : stop.order
      }
    });

    res.status(200).json({ success: true, data: updatedStop });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const deleteStop = async (req, res) => {
  try {
    const stopId = req.params.id;
    const stop = await prisma.stop.findFirst({
      where: { id: stopId },
      include: { trip: true }
    });
    
    if (!stop || stop.trip.userId !== req.user.userId) {
      return res.status(404).json({ success: false, message: 'Stop not found' });
    }

    await prisma.stop.delete({ where: { id: stopId } });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const reorderStops = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  try {
    const { stops } = req.body; // Array of { id, order }

    // Use transaction to update all
    const updatePromises = stops.map(stop => 
      prisma.stop.update({
        where: { id: stop.id },
        data: { order: stop.order }
      })
    );

    await prisma.$transaction(updatePromises);

    res.status(200).json({ success: true, message: 'Stops reordered' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = { createStop, updateStop, deleteStop, reorderStops };
