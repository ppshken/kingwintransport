const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const authMiddleware = require('../middleware/auth');
const { validate, validators } = require('../utils/validators');

// Validation rules
const serviceValidation = [
    validators.requiredString('title', 3, 200),
    validators.requiredString('description', 10, 5000),
    validators.optionalString('icon', 100),
    validate
];

// Public routes
router.get('/', serviceController.getAll);
router.get('/:id', validators.idParam(), validate, serviceController.getById);

// Protected routes
router.post('/', authMiddleware, serviceValidation, serviceController.create);
router.put('/:id', authMiddleware, validators.idParam(), serviceValidation, serviceController.update);
router.delete('/:id', authMiddleware, validators.idParam(), validate, serviceController.delete);

module.exports = router;
