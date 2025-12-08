const express = require('express');
const router = express.Router();
const vehicleImageController = require('../controllers/vehicleImageController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');
const { body } = require('express-validator');
const { validate, validators } = require('../utils/validators');

// Public routes
router.get('/', vehicleImageController.getAll);
router.get('/:id', validators.idParam(), validate, vehicleImageController.getById);

// Protected routes (require authentication)
router.post('/',
    authMiddleware,
    upload.single('image'),
    vehicleImageController.upload
);

router.put('/:id',
    authMiddleware,
    validators.idParam(),
    validate,
    vehicleImageController.update
);

router.delete('/:id',
    authMiddleware,
    validators.idParam(),
    validate,
    vehicleImageController.delete
);

module.exports = router;
