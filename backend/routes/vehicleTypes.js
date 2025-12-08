const express = require('express');
const router = express.Router();
const vehicleTypeController = require('../controllers/vehicleTypeController');
const authMiddleware = require('../middleware/auth');
const { body } = require('express-validator');
const { validate, validators } = require('../utils/validators');

// Validation rules
const vehicleTypeValidation = [
    validators.requiredString('name', 3, 200),
    validators.requiredString('description', 10, 5000),
    validators.optionalString('icon', 100),
    validators.integer('capacity', 1),
    validators.optionalString('size', 50),
    validate
];

// Public routes
router.get('/', vehicleTypeController.getAll);
router.get('/:id', validators.idParam(), validate, vehicleTypeController.getById);

// Protected routes (require authentication)
router.post('/', authMiddleware, vehicleTypeValidation, vehicleTypeController.create);
router.put('/:id', authMiddleware, validators.idParam(), vehicleTypeValidation, vehicleTypeController.update);
router.delete('/:id', authMiddleware, validators.idParam(), validate, vehicleTypeController.delete);

module.exports = router;
