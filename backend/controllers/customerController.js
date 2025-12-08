const { pool } = require('../config/database');

// Get all customers
exports.getAll = async (req, res) => {
    try {
        const { is_active } = req.query;

        let query = 'SELECT * FROM customers WHERE 1=1';
        const params = [];

        if (is_active !== undefined) {
            query += ' AND is_active = ?';
            params.push(is_active === 'true' || is_active === '1');
        }

        query += ' ORDER BY display_order ASC, id ASC';

        const [customers] = await pool.query(query, params);

        res.json({
            success: true,
            count: customers.length,
            data: customers
        });

    } catch (error) {
        console.error('Get customers error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการดึงข้อมูลลูกค้า'
        });
    }
};

// Get single customer
exports.getById = async (req, res) => {
    try {
        const { id } = req.params;

        const [customers] = await pool.query(
            'SELECT * FROM customers WHERE id = ?',
            [id]
        );

        if (customers.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'ไม่พบข้อมูลลูกค้า'
            });
        }

        res.json({
            success: true,
            data: customers[0]
        });

    } catch (error) {
        console.error('Get customer error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการดึงข้อมูล'
        });
    }
};

// Create customer
exports.create = async (req, res) => {
    try {
        const { name, logo_url, display_order, is_active } = req.body;

        const [result] = await pool.query(
            'INSERT INTO customers (name, logo_url, display_order, is_active) VALUES (?, ?, ?, ?)',
            [name, logo_url, display_order || 0, is_active !== undefined ? is_active : true]
        );

        res.status(201).json({
            success: true,
            message: 'เพิ่มลูกค้าสำเร็จ',
            data: {
                id: result.insertId,
                name,
                logo_url,
                display_order,
                is_active
            }
        });

    } catch (error) {
        console.error('Create customer error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการเพิ่มลูกค้า'
        });
    }
};

// Update customer
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, logo_url, display_order, is_active } = req.body;

        const [result] = await pool.query(
            'UPDATE customers SET name = ?, logo_url = ?, display_order = ?, is_active = ? WHERE id = ?',
            [name, logo_url, display_order, is_active, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'ไม่พบข้อมูลลูกค้า'
            });
        }

        res.json({
            success: true,
            message: 'อัปเดตลูกค้าสำเร็จ'
        });

    } catch (error) {
        console.error('Update customer error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการอัปเดตลูกค้า'
        });
    }
};

// Delete customer
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query(
            'DELETE FROM customers WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'ไม่พบข้อมูลลูกค้า'
            });
        }

        res.json({
            success: true,
            message: 'ลบลูกค้าสำเร็จ'
        });

    } catch (error) {
        console.error('Delete customer error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการลบลูกค้า'
        });
    }
};
