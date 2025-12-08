const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const authMiddleware = require('../middleware/auth');
const { validate, validators } = require('../utils/validators');

// Validation rules
const customerValidation = [
    validators.requiredString('name', 2, 200),
    validators.optionalString('logo_url', 500),
    validators.integer('display_order', 0),
    validators.boolean('is_active'),
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
