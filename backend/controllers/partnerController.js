const { pool } = require('../config/database');

// Get all partners
exports.getAll = async (req, res) => {
    try {
        const { is_active } = req.query;

        let query = 'SELECT * FROM partners WHERE 1=1';
        const params = [];

        if (is_active !== undefined) {
            query += ' AND is_active = ?';
            params.push(is_active === 'true' || is_active === '1');
        }

        query += ' ORDER BY display_order ASC, id ASC';

        const [partners] = await pool.query(query, params);

        res.json({
            success: true,
            count: partners.length,
            data: partners
        });

    } catch (error) {
        console.error('Get partners error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการดึงข้อมูลพาร์ทเนอร์'
        });
    }
};

// Get single partner
exports.getById = async (req, res) => {
    try {
        const { id } = req.params;

        const [partners] = await pool.query(
            'SELECT * FROM partners WHERE id = ?',
            [id]
        );

        if (partners.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'ไม่พบข้อมูลพาร์ทเนอร์'
            });
        }

        res.json({
            success: true,
            data: partners[0]
        });

    } catch (error) {
        console.error('Get partner error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการดึงข้อมูล'
        });
    }
};

// Create partner
exports.create = async (req, res) => {
    try {
        const { name, logo_url, display_order, is_active } = req.body;

        const [result] = await pool.query(
            'INSERT INTO partners (name, logo_url, display_order, is_active) VALUES (?, ?, ?, ?)',
            [name, logo_url, display_order || 0, is_active !== undefined ? is_active : true]
        );

        res.status(201).json({
            success: true,
            message: 'เพิ่มพาร์ทเนอร์สำเร็จ',
            data: {
                id: result.insertId,
                name,
                logo_url,
                display_order,
                is_active
            }
        });

    } catch (error) {
        console.error('Create partner error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการเพิ่มพาร์ทเนอร์'
        });
    }
};

// Update partner
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, logo_url, display_order, is_active } = req.body;

        const [result] = await pool.query(
            'UPDATE partners SET name = ?, logo_url = ?, display_order = ?, is_active = ? WHERE id = ?',
            [name, logo_url, display_order, is_active, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'ไม่พบข้อมูลพาร์ทเนอร์'
            });
        }

        res.json({
            success: true,
            message: 'อัปเดตพาร์ทเนอร์สำเร็จ'
        });

    } catch (error) {
        console.error('Update partner error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการอัปเดตพาร์ทเนอร์'
        });
    }
};

// Delete partner
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query(
            'DELETE FROM partners WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'ไม่พบข้อมูลพาร์ทเนอร์'
            });
        }

        res.json({
            success: true,
            message: 'ลบพาร์ทเนอร์สำเร็จ'
        });

    } catch (error) {
        console.error('Delete partner error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการลบพาร์ทเนอร์'
        });
    }
};
