const { pool } = require('../config/database');

// Get all services
exports.getAll = async (req, res) => {
    try {
        const [services] = await pool.query(
            'SELECT * FROM services ORDER BY id ASC'
        );

        res.json({
            success: true,
            count: services.length,
            data: services
        });

    } catch (error) {
        console.error('Get services error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการดึงข้อมูลบริการ'
        });
    }
};

// Get single service
exports.getById = async (req, res) => {
    try {
        const { id } = req.params;

        const [services] = await pool.query(
            'SELECT * FROM services WHERE id = ?',
            [id]
        );

        if (services.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'ไม่พบข้อมูลบริการ'
            });
        }

        res.json({
            success: true,
            data: services[0]
        });

    } catch (error) {
        console.error('Get service error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการดึงข้อมูล'
        });
    }
};

// Create service
exports.create = async (req, res) => {
    try {
        const { title, description, icon } = req.body;

        const [result] = await pool.query(
            'INSERT INTO services (title, description, icon) VALUES (?, ?, ?)',
            [title, description, icon || 'fas fa-shuttle-van']
        );

        res.status(201).json({
            success: true,
            message: 'เพิ่มบริการสำเร็จ',
            data: {
                id: result.insertId,
                title,
                description,
                icon
            }
        });

    } catch (error) {
        console.error('Create service error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการเพิ่มบริการ'
        });
    }
};

// Update service
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, icon } = req.body;

        const [result] = await pool.query(
            'UPDATE services SET title = ?, description = ?, icon = ? WHERE id = ?',
            [title, description, icon, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'ไม่พบข้อมูลบริการ'
            });
        }

        res.json({
            success: true,
            message: 'อัปเดตบริการสำเร็จ'
        });

    } catch (error) {
        console.error('Update service error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการอัปเดตบริการ'
        });
    }
};

// Delete service
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query(
            'DELETE FROM services WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'ไม่พบข้อมูลบริการ'
            });
        }

        res.json({
            success: true,
            message: 'ลบบริการสำเร็จ'
        });

    } catch (error) {
        console.error('Delete service error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการลบบริการ'
        });
    }
};
