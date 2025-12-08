const { pool } = require('../config/database');

// Get all vehicle types
exports.getAll = async (req, res) => {
    try {
        const [vehicleTypes] = await pool.query(
            'SELECT * FROM vehicle_types ORDER BY id ASC'
        );

        res.json({
            success: true,
            count: vehicleTypes.length,
            data: vehicleTypes
        });

    } catch (error) {
        console.error('Get vehicle types error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการดึงข้อมูลประเภทรถ'
        });
    }
};

// Get single vehicle type
exports.getById = async (req, res) => {
    try {
        const { id } = req.params;

        const [vehicleTypes] = await pool.query(
            'SELECT * FROM vehicle_types WHERE id = ?',
            [id]
        );

        if (vehicleTypes.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'ไม่พบข้อมูลประเภทรถ'
            });
        }

        res.json({
            success: true,
            data: vehicleTypes[0]
        });

    } catch (error) {
        console.error('Get vehicle type error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการดึงข้อมูล'
        });
    }
};

// Create vehicle type
exports.create = async (req, res) => {
    try {
        const { name, description, icon, capacity, size } = req.body;

        const [result] = await pool.query(
            'INSERT INTO vehicle_types (name, description, icon, capacity, size) VALUES (?, ?, ?, ?, ?)',
            [name, description, icon || 'fas fa-bus', capacity, size]
        );

        res.status(201).json({
            success: true,
            message: 'เพิ่มประเภทรถสำเร็จ',
            data: {
                id: result.insertId,
                name,
                description,
                icon,
                capacity,
                size
            }
        });

    } catch (error) {
        console.error('Create vehicle type error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการเพิ่มประเภทรถ'
        });
    }
};

// Update vehicle type
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, icon, capacity, size } = req.body;

        const [result] = await pool.query(
            'UPDATE vehicle_types SET name = ?, description = ?, icon = ?, capacity = ?, size = ? WHERE id = ?',
            [name, description, icon, capacity, size, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'ไม่พบข้อมูลประเภทรถ'
            });
        }

        res.json({
            success: true,
            message: 'อัปเดตประเภทรถสำเร็จ'
        });

    } catch (error) {
        console.error('Update vehicle type error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการอัปเดตประเภทรถ'
        });
    }
};

// Delete vehicle type
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query(
            'DELETE FROM vehicle_types WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'ไม่พบข้อมูลประเภทรถ'
            });
        }

        res.json({
            success: true,
            message: 'ลบประเภทรถสำเร็จ'
        });

    } catch (error) {
        console.error('Delete vehicle type error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการลบประเภทรถ'
        });
    }
};
