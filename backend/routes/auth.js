const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const { body } = require('express-validator');
const { validate } = require('../utils/validators');

// Validation rules
const registerValidation = [
    body('username')
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage('ชื่อผู้ใช้ต้องมีความยาว 3-50 ตัวอักษร')
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('ชื่อผู้ใช้ต้องประกอบด้วยตัวอักษร ตัวเลข และ _ เท่านั้น'),
    body('email')
        .isEmail()
        .withMessage('รูปแบบอีเมลไม่ถูกต้อง')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 })
        .withMessage('รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร'),
    validate
];

const loginValidation = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('กรุณากระบุชื่อผู้ใช้'),
    body('password')
        .notEmpty()
        .withMessage('กรุณากระบุรหัสผ่าน'),
    validate
];

// Routes
router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;
