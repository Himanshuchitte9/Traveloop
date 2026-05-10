const { PrismaClient } = require('@prisma/client');
const { validationResult } = require('express-validator');

const prisma = new PrismaClient();

const getChecklist = async (req, res) => {
  try {
    const tripId = req.params.tripId;
    const trip = await prisma.trip.findFirst({ where: { id: tripId, userId: req.user.userId } });
    if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });

    const items = await prisma.checklistItem.findMany({
      where: { tripId }
    });

    res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const addChecklistItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  try {
    const { tripId, label, category } = req.body;
    const trip = await prisma.trip.findFirst({ where: { id: tripId, userId: req.user.userId } });
    if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });

    const item = await prisma.checklistItem.create({
      data: { tripId, label, category }
    });

    res.status(201).json({ success: true, data: item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const togglePacked = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  try {
    const id = req.params.id;
    const item = await prisma.checklistItem.findFirst({
      where: { id },
      include: { trip: true }
    });

    if (!item || item.trip.userId !== req.user.userId) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    const { isPacked } = req.body;
    const updatedItem = await prisma.checklistItem.update({
      where: { id },
      data: { isPacked }
    });

    res.status(200).json({ success: true, data: updatedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const deleteChecklistItem = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await prisma.checklistItem.findFirst({
      where: { id },
      include: { trip: true }
    });

    if (!item || item.trip.userId !== req.user.userId) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    await prisma.checklistItem.delete({ where: { id } });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const resetChecklist = async (req, res) => {
  try {
    const tripId = req.params.tripId;
    const trip = await prisma.trip.findFirst({ where: { id: tripId, userId: req.user.userId } });
    if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });

    await prisma.checklistItem.updateMany({
      where: { tripId },
      data: { isPacked: false }
    });

    res.status(200).json({ success: true, message: 'Checklist reset' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = { getChecklist, addChecklistItem, togglePacked, deleteChecklistItem, resetChecklist };
