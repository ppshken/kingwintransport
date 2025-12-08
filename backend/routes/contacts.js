const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middleware/auth');
const { body } = require('express-validator');
const { validate, validators } = require('../utils/validators');

// Validation rules for contact form submission
const contactValidation = [
    validators.requiredString('name', 2, 200),
    validators.phone(),
    validators.requiredString('subject', 3, 255),
    validators.requiredString('message', 10, 5000),
    validate
];

// Status update validation
const statusValidation = [
    body('status')
        .isIn(['new', 'read', 'replied'])
        .withMessage('สถานะต้องเป็น new, read หรือ replied'),
    validate
];

// Public routes
router.post('/', contactValidation, contactController.submit);

// Protected routes (admin only)
router.get('/', authMiddleware, contactController.getAll);
router.get('/:id', authMiddleware, validators.idParam(), validate, contactController.getById);
router.put('/:id/status', authMiddleware, validators.idParam(), statusValidation, contactController.updateStatus);
router.delete('/:id', authMiddleware, validators.idParam(), validate, contactController.delete);

module.exports = router;
