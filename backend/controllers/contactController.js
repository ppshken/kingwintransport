const { pool } = require('../config/database');

// Submit contact form
exports.submit = async (req, res) => {
    try {
        const { name, phone, subject, message } = req.body;

        const [result] = await pool.query(
            'INSERT INTO contacts (name, phone, subject, message, status) VALUES (?, ?, ?, ?, ?)',
            [name, phone, subject, message, 'new']
        );

        res.status(201).json({
            success: true,
            message: 'ส่งข้อความติดต่อสำเร็จ เราจะติดต่อกลับโดยเร็วที่สุด',
            data: {
                id: result.insertId
            }
        });

    } catch (error) {
        console.error('Submit contact error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการส่งข้อความ'
        });
    }
};

// Get all contacts (admin only)
exports.getAll = async (req, res) => {
    try {
        const { status } = req.query;

        let query = 'SELECT * FROM contacts WHERE 1=1';
        const params = [];

        if (status) {
            query += ' AND status = ?';
            params.push(status);
        }

        query += ' ORDER BY created_at DESC';

        const [contacts] = await pool.query(query, params);

        res.json({
            success: true,
            count: contacts.length,
            data: contacts
        });

    } catch (error) {
        console.error('Get contacts error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการดึงข้อมูล'
        });
    }
};

// Get single contact (admin only)
exports.getById = async (req, res) => {
    try {
        const { id } = req.params;

        const [contacts] = await pool.query(
            'SELECT * FROM contacts WHERE id = ?',
            [id]
        );

        if (contacts.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'ไม่พบข้อมูล'
            });
        }

        res.json({
            success: true,
            data: contacts[0]
        });

    } catch (error) {
        console.error('Get contact error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการดึงข้อมูล'
        });
    }
};

// Update contact status (admin only)
exports.updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['new', 'read', 'replied'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'สถานะไม่ถูกต้อง'
            });
        }

        const [result] = await pool.query(
            'UPDATE contacts SET status = ? WHERE id = ?',
            [status, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'ไม่พบข้อมูล'
            });
        }

        res.json({
            success: true,
            message: 'อัปเดตสถานะสำเร็จ'
        });

    } catch (error) {
        console.error('Update contact status error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการอัปเดตสถานะ'
        });
    }
};

// Delete contact (admin only)
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query(
            'DELETE FROM contacts WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'ไม่พบข้อมูล'
            });
        }

        res.json({
            success: true,
            message: 'ลบข้อมูลสำเร็จ'
        });

    } catch (error) {
        console.error('Delete contact error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการลบข้อมูล'
        });
    }
};
