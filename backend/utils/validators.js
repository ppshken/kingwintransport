const { body, param, validationResult } = require('express-validator');

// Validation middleware to check for errors
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error('Validation errors:', errors.array());
        console.error('Request body:', req.body);
        return res.status(400).json({
            success: false,
            message: 'ข้อมูลไม่ถูกต้อง',
            errors: errors.array()
        });
    }
    next();
};

// Common validation rules
const validators = {
    // Email validation
    email: () => body('email')
        .isEmail()
        .withMessage('รูปแบบอีเมลไม่ถูกต้อง')
        .normalizeEmail(),

    // Phone validation (Thai format)
    phone: () => body('phone')
        .matches(/^[0-9]{9,10}$/)
        .withMessage('เบอร์โทรศัพท์ต้องเป็นตัวเลข 9-10 หลัก'),

    // Required string field
    requiredString: (field, min = 1, max = 255) => body(field)
        .trim()
        .isLength({ min, max })
        .withMessage(`${field} ต้องมีความยาว ${min}-${max} ตัวอักษร`)
        .notEmpty()
        .withMessage(`กรุณากระบุ ${field}`),

    // Optional string field
    optionalString: (field, max = 255) => body(field)
        .optional()
        .trim()
        .isLength({ max })
        .withMessage(`${field} ต้องมีความยาวไม่เกิน ${max} ตัวอักษร`),

    // Numeric ID parameter
    idParam: () => param('id')
        .isInt({ min: 1 })
        .withMessage('ID ต้องเป็นตัวเลขที่มากกว่า 0'),

    // Integer field
    integer: (field, min = 0) => body(field)
        .optional()
        .isInt({ min })
        .withMessage(`${field} ต้องเป็นตัวเลขจำนวนเต็มที่มากกว่าหรือเท่ากับ ${min}`),

    // Boolean field
    boolean: (field) => body(field)
        .optional()
        .isBoolean()
        .withMessage(`${field} ต้องเป็น true หรือ false`)
};

module.exports = {
    validate,
    validators
};
