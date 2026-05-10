const express = require('express');
const { body } = require('express-validator');
const { createStop, updateStop, deleteStop, reorderStops } = require('../controllers/stopController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const { tripId } = req.query;
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    const stops = await prisma.stop.findMany({
      where: { tripId },
      orderBy: { order: 'asc' }
    });
    res.json({ success: true, data: stops });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

router.post('/', [
  body('tripId').notEmpty().withMessage('Trip ID is required'),
  body('city').notEmpty().withMessage('City is required'),
  body('country').notEmpty().withMessage('Country is required'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('endDate').isISO8601().withMessage('Valid end date is required'),
  body('order').isInt().withMessage('Order must be an integer')
], createStop);

router.patch('/reorder', [
  body('stops').isArray().withMessage('Stops array is required')
], reorderStops);

router.put('/:id', [
  body('startDate').optional().isISO8601(),
  body('endDate').optional().isISO8601(),
  body('order').optional().isInt()
], updateStop);

router.delete('/:id', deleteStop);

module.exports = router;
