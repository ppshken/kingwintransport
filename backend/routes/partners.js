const express = require('express');
const router = express.Router();
const partnerController = require('../controllers/partnerController');
const authMiddleware = require('../middleware/auth');
const { validate, validators } = require('../utils/validators');

// Validation rules
const partnerValidation = [
    validators.requiredString('name', 2, 200),
    validators.optionalString('logo_url', 500),
    validators.integer('display_order', 0),
    validators.boolean('is_active'),
    validate
];

// Public routes
router.get('/', partnerController.getAll);
router.get('/:id', validators.idParam(), validate, partnerController.getById);

// Protected routes
router.post('/', authMiddleware, partnerValidation, partnerController.create);
router.put('/:id', authMiddleware, validators.idParam(), partnerValidation, partnerController.update);
router.delete('/:id', authMiddleware, validators.idParam(), validate, partnerController.delete);

module.exports = router;
