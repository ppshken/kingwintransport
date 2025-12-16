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

        // Parse tags from comma-separated string to array
        const customersWithTags = customers.map(customer => ({
            ...customer,
            tags: customer.tags ? customer.tags.split(',') : []
        }));

        res.json({
            success: true,
            count: customersWithTags.length,
            data: customersWithTags
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

        // Parse tags from comma-separated string to array
        const customer = {
            ...customers[0],
            tags: customers[0].tags ? customers[0].tags.split(',') : []
        };

        res.json({
            success: true,
            data: customer
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
        const { title, subtitle, description, image, tags, display_order, is_active } = req.body;

        // Convert tags array to comma-separated string
        const tagsString = Array.isArray(tags) ? tags.join(',') : tags || '';

        const [result] = await pool.query(
            'INSERT INTO customers (title, subtitle, description, image, tags, display_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [title, subtitle, description, image, tagsString, display_order || 0, is_active !== undefined ? is_active : true]
        );

        res.status(201).json({
            success: true,
            message: 'เพิ่มกิจกรรมสำเร็จ',
            data: {
                id: result.insertId,
                title,
                subtitle,
                description,
                image,
                tags: Array.isArray(tags) ? tags : tagsString.split(','),
                display_order,
                is_active
            }
        });


    } catch (error) {
        console.error('Create customer error:', error);
        console.error('SQL Error:', error.sqlMessage);
        console.error('Request body:', req.body);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการเพิ่มกิจกรรม',
            error: error.sqlMessage || error.message
        });
    }
};


// Update customer
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, subtitle, description, image, tags, display_order, is_active } = req.body;

        // Convert tags array to comma-separated string
        const tagsString = Array.isArray(tags) ? tags.join(',') : tags || '';

        const [result] = await pool.query(
            'UPDATE customers SET title = ?, subtitle = ?, description = ?, image = ?, tags = ?, display_order = ?, is_active = ? WHERE id = ?',
            [title, subtitle, description, image, tagsString, display_order, is_active, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'ไม่พบข้อมูลกิจกรรม'
            });
        }

        res.json({
            success: true,
            message: 'อัปเดตกิจกรรมสำเร็จ'
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
            message: 'ลบกิจกรรมสำเร็จ'
        });

    } catch (error) {
        console.error('Delete customer error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการลบลูกค้า'
        });
    }
};
