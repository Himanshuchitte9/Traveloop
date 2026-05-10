const express = require('express');
const { body } = require('express-validator');
const { createActivity, updateActivity, deleteActivity, searchActivities } = require('../controllers/activityController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/search', searchActivities);

router.post('/', [
  body('stopId').notEmpty().withMessage('Stop ID is required'),
  body('name').notEmpty().withMessage('Name is required'),
  body('type').isIn(['SIGHTSEEING', 'FOOD', 'ADVENTURE', 'CULTURE', 'OTHER']).withMessage('Invalid activity type'),
  body('cost').isFloat({ min: 0 }).withMessage('Cost must be a positive number')
], createActivity);

router.put('/:id', [
  body('type').optional().isIn(['SIGHTSEEING', 'FOOD', 'ADVENTURE', 'CULTURE', 'OTHER']),
  body('cost').optional().isFloat({ min: 0 })
], updateActivity);

router.delete('/:id', deleteActivity);

module.exports = router;
