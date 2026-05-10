const express = require('express');
const { body } = require('express-validator');
const { getTrips, createTrip, getTripById, updateTrip, deleteTrip, getPublicTrip, toggleShare } = require('../controllers/tripController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/public/:id', getPublicTrip);

router.use(authMiddleware);

router.get('/', getTrips);

router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('endDate').isISO8601().withMessage('Valid end date is required')
], createTrip);

router.get('/:id', getTripById);

router.put('/:id', [
  body('startDate').optional().isISO8601(),
  body('endDate').optional().isISO8601()
], updateTrip);

router.delete('/:id', deleteTrip);

router.patch('/:id/share', [
  body('isPublic').isBoolean().withMessage('isPublic must be a boolean')
], toggleShare);

module.exports = router;
