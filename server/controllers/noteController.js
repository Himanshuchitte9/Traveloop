const { PrismaClient } = require('@prisma/client');
const { validationResult } = require('express-validator');

const prisma = new PrismaClient();

const getNotes = async (req, res) => {
  try {
    const tripId = req.params.tripId;
    const trip = await prisma.trip.findFirst({ where: { id: tripId, userId: req.user.userId } });
    if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });

    const notes = await prisma.note.findMany({
      where: { tripId },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({ success: true, data: notes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const createNote = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  try {
    const { tripId, stopId, content } = req.body;
    
    const trip = await prisma.trip.findFirst({ where: { id: tripId, userId: req.user.userId } });
    if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });

    if (stopId) {
      const stop = await prisma.stop.findFirst({ where: { id: stopId, tripId } });
      if (!stop) return res.status(404).json({ success: false, message: 'Stop not found in this trip' });
    }

    const note = await prisma.note.create({
      data: { tripId, stopId, content }
    });

    res.status(201).json({ success: true, data: note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const updateNote = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  try {
    const id = req.params.id;
    const note = await prisma.note.findFirst({
      where: { id },
      include: { trip: true }
    });

    if (!note || note.trip.userId !== req.user.userId) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }

    const { content } = req.body;
    const updatedNote = await prisma.note.update({
      where: { id },
      data: { content }
    });

    res.status(200).json({ success: true, data: updatedNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;
    const note = await prisma.note.findFirst({
      where: { id },
      include: { trip: true }
    });

    if (!note || note.trip.userId !== req.user.userId) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }

    await prisma.note.delete({ where: { id } });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };
