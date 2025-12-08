const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const authMiddleware = require('../middleware/auth');
const { body } = require('express-validator');
const { validate, validators } = require('../utils/validators');

// Validation rules
const articleValidation = [
    validators.requiredString('title', 3, 255),
    validators.requiredString('content', 10, 50000),
    validators.optionalString('excerpt', 500),
    validators.optionalString('featured_image', 500),
    validators.boolean('is_featured'),
    validate
];

// Public routes
router.get('/', articleController.getAll);
router.get('/:id', validators.idParam(), validate, articleController.getById);
router.get('/slug/:slug', articleController.getBySlug);

// Protected routes
router.post('/', authMiddleware, articleValidation, articleController.create);
router.put('/:id', authMiddleware, validators.idParam(), articleValidation, articleController.update);
router.delete('/:id', authMiddleware, validators.idParam(), validate, articleController.delete);

module.exports = router;
