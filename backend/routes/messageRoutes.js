const express = require('express');
const { body } = require('express-validator');
const { createMessage, getMessages, updateMessage, deleteMessage } = require('../controllers/messageController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('message').trim().isLength({ min: 5 }).withMessage('Message must be at least 5 characters'),
    body('phone').optional({ checkFalsy: true }).isMobilePhone('any').withMessage('Invalid phone number'),
  ],
  validate,
  createMessage
);

router.get('/', protect, getMessages);
router.put('/:id', protect, updateMessage);
router.delete('/:id', protect, deleteMessage);

module.exports = router;
