const { pool } = require('../config/database');
const fs = require('fs').promises;
const path = require('path');

// Get all vehicle images
exports.getAll = async (req, res) => {
    try {
        const { vehicle_type_id, category } = req.query;

        let query = 'SELECT * FROM vehicle_images WHERE 1=1';
        const params = [];

        if (vehicle_type_id) {
            query += ' AND vehicle_type_id = ?';
            params.push(vehicle_type_id);
        }

        if (category) {
            query += ' AND category = ?';
            params.push(category);
        }

        query += ' ORDER BY display_order ASC, id DESC';

        const [images] = await pool.query(query, params);

        res.json({
            success: true,
            count: images.length,
            data: images
        });

    } catch (error) {
        console.error('Get vehicle images error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการดึงข้อมูลรูปภาพ'
        });
    }
};

// Get single vehicle image
exports.getById = async (req, res) => {
    try {
        const { id } = req.params;

        const [images] = await pool.query(
            'SELECT * FROM vehicle_images WHERE id = ?',
            [id]
        );

        if (images.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'ไม่พบข้อมูลรูปภาพ'
            });
        }

        res.json({
            success: true,
            data: images[0]
        });

    } catch (error) {
        console.error('Get vehicle image error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการดึงข้อมูล'
        });
    }
};

// Upload vehicle image
exports.upload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'กรุณาเลือกไฟล์รูปภาพ'
            });
        }

        const { vehicle_type_id, category, display_order } = req.body;
        const image_url = `/uploads/${req.file.filename}`;

        const [result] = await pool.query(
            'INSERT INTO vehicle_images (vehicle_type_id, image_url, category, display_order) VALUES (?, ?, ?, ?)',
            [vehicle_type_id || null, image_url, category || 'gallery', display_order || 0]
        );

        res.status(201).json({
            success: true,
            message: 'อัปโหลดรูปภาพสำเร็จ',
            data: {
                id: result.insertId,
                vehicle_type_id,
                image_url,
                category,
                display_order
            }
        });

    } catch (error) {
        // Delete uploaded file if database insert fails
        if (req.file) {
            await fs.unlink(req.file.path).catch(console.error);
        }

        console.error('Upload vehicle image error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ'
        });
    }
};

// Update vehicle image metadata
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { vehicle_type_id, category, display_order } = req.body;

        const [result] = await pool.query(
            'UPDATE vehicle_images SET vehicle_type_id = ?, category = ?, display_order = ? WHERE id = ?',
            [vehicle_type_id, category, display_order, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'ไม่พบข้อมูลรูปภาพ'
            });
        }

        res.json({
            success: true,
            message: 'อัปเดตข้อมูลรูปภาพสำเร็จ'
        });

    } catch (error) {
        console.error('Update vehicle image error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล'
        });
    }
};

// Delete vehicle image
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        // Get image info first
        const [images] = await pool.query(
            'SELECT image_url FROM vehicle_images WHERE id = ?',
            [id]
        );

        if (images.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'ไม่พบข้อมูลรูปภาพ'
            });
        }

        // Delete from database
        await pool.query('DELETE FROM vehicle_images WHERE id = ?', [id]);

        // Delete file from disk
        const filePath = path.join(__dirname, '..', images[0].image_url);
        await fs.unlink(filePath).catch(err => {
            console.error('File deletion error:', err);
            // Continue even if file deletion fails
        });

        res.json({
            success: true,
            message: 'ลบรูปภาพสำเร็จ'
        });

    } catch (error) {
        console.error('Delete vehicle image error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการลบรูปภาพ'
        });
    }
};
