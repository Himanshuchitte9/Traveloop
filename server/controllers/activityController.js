const { PrismaClient } = require('@prisma/client');
const { validationResult } = require('express-validator');

const prisma = new PrismaClient();

const createActivity = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  try {
    const { stopId, name, type, cost, duration, description } = req.body;

    const stop = await prisma.stop.findFirst({
      where: { id: stopId },
      include: { trip: true }
    });

    if (!stop || stop.trip.userId !== req.user.userId) {
      return res.status(404).json({ success: false, message: 'Stop not found' });
    }

    const activity = await prisma.activity.create({
      data: { stopId, name, type, cost, duration, description }
    });

    res.status(201).json({ success: true, data: activity });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const updateActivity = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  try {
    const activityId = req.params.id;
    const activity = await prisma.activity.findFirst({
      where: { id: activityId },
      include: { stop: { include: { trip: true } } }
    });

    if (!activity || activity.stop.trip.userId !== req.user.userId) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }

    const { name, type, cost, duration, description } = req.body;
    const updatedActivity = await prisma.activity.update({
      where: { id: activityId },
      data: {
        name: name || activity.name,
        type: type || activity.type,
        cost: cost !== undefined ? cost : activity.cost,
        duration: duration !== undefined ? duration : activity.duration,
        description: description !== undefined ? description : activity.description
      }
    });

    res.status(200).json({ success: true, data: updatedActivity });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const deleteActivity = async (req, res) => {
  try {
    const activityId = req.params.id;
    const activity = await prisma.activity.findFirst({
      where: { id: activityId },
      include: { stop: { include: { trip: true } } }
    });

    if (!activity || activity.stop.trip.userId !== req.user.userId) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }

    await prisma.activity.delete({ where: { id: activityId } });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const searchActivities = async (req, res) => {
  try {
    const { type, maxCost } = req.query;
    
    // Find all activities for the user's trips
    const userTrips = await prisma.trip.findMany({
      where: { userId: req.user.userId },
      select: { id: true }
    });
    
    const tripIds = userTrips.map(t => t.id);

    const whereClause = {
      stop: {
        tripId: { in: tripIds }
      }
    };

    if (type) {
      whereClause.type = type;
    }
    if (maxCost) {
      whereClause.cost = { lte: parseFloat(maxCost) };
    }

    const activities = await prisma.activity.findMany({
      where: whereClause,
      include: { stop: true }
    });

    res.status(200).json({ success: true, data: activities });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = { createActivity, updateActivity, deleteActivity, searchActivities };
