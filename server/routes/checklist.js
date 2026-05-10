const express = require('express');
const { body } = require('express-validator');
const { getChecklist, addChecklistItem, togglePacked, deleteChecklistItem, resetChecklist } = require('../controllers/checklistController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/:tripId', getChecklist);

router.post('/', [
  body('tripId').notEmpty().withMessage('Trip ID is required'),
  body('label').notEmpty().withMessage('Label is required'),
  body('category').isIn(['CLOTHING', 'DOCUMENTS', 'ELECTRONICS', 'TOILETRIES', 'OTHER']).withMessage('Invalid category')
], addChecklistItem);

router.patch('/:id', [
  body('isPacked').isBoolean().withMessage('isPacked must be a boolean')
], togglePacked);

router.delete('/:id', deleteChecklistItem);

router.delete('/reset/:tripId', resetChecklist);

module.exports = router;
