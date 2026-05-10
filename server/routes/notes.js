const express = require('express');
const { body } = require('express-validator');
const { getNotes, createNote, updateNote, deleteNote } = require('../controllers/noteController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/:tripId', getNotes);

router.post('/', [
  body('tripId').notEmpty().withMessage('Trip ID is required'),
  body('content').notEmpty().withMessage('Content is required')
], createNote);

router.put('/:id', [
  body('content').notEmpty().withMessage('Content is required')
], updateNote);

router.delete('/:id', deleteNote);

module.exports = router;
