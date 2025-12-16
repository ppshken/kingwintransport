const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { testConnection } = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const vehicleTypeRoutes = require('./routes/vehicleTypes');
const vehicleImageRoutes = require('./routes/vehicleImages');
const serviceRoutes = require('./routes/services');
const partnerRoutes = require('./routes/partners');
const customerRoutes = require('./routes/customers');
const articleRoutes = require('./routes/articles');
const contactRoutes = require('./routes/contacts');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/vehicle-types', vehicleTypeRoutes);
app.use('/api/vehicle-images', vehicleImageRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/contacts', contactRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'King Win Transport API Server',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            vehicleTypes: '/api/vehicle-types',
            vehicleImages: '/api/vehicle-images',
            services: '/api/services',
            partners: '/api/partners',
            customers: '/api/customers',
            articles: '/api/articles',
            contacts: '/api/contacts'
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'ไม่พบ endpoint ที่ต้องการ'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);

    // Multer error handling
    if (err.name === 'MulterError') {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'ไฟล์มีขนาดใหญ่เกินไป (สูงสุด 5MB)'
            });
        }
        return res.status(400).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการอัปโหลดไฟล์'
        });
    }

    res.status(500).json({
        success: false,
        message: err.message || 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์'
    });
});

// Start server
const startServer = async () => {
    try {
        // Test database connection
        await testConnection();

        // Start listening
        app.listen(PORT, () => {
            console.log('=================================');
            console.log(`🚀 Server is running on port ${PORT}`);
            console.log(`📍 API: http://localhost:${PORT}`);
            console.log(`📁 Uploads: http://localhost:${PORT}/uploads`);
            console.log('=================================');
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
