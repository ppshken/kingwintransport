const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const authMiddleware = require('../middleware/auth');
const { validate, validators } = require('../utils/validators');

// Validation rules for new schema - simplified
const customerValidation = [
    validators.requiredString('title', 2, 200),
    // All other fields are optional - no validation needed
    validate
];

// Public routes
router.get('/', customerController.getAll);
router.get('/:id', validators.idParam(), validate, customerController.getById);

// Protected routes
router.post('/', authMiddleware, customerValidation, customerController.create);
router.put('/:id', authMiddleware, validators.idParam(), customerValidation, customerController.update);
router.delete('/:id', authMiddleware, validators.idParam(), validate, customerController.delete);

module.exports = router;
