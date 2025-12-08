const { pool } = require('../config/database');
const slugify = require('../utils/slugify');

// Get all articles with pagination
exports.getAll = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const { is_featured } = req.query;

        let countQuery = 'SELECT COUNT(*) as total FROM articles WHERE 1=1';
        let query = 'SELECT * FROM articles WHERE 1=1';
        const params = [];

        if (is_featured !== undefined) {
            const condition = ' AND is_featured = ?';
            countQuery += condition;
            query += condition;
            params.push(is_featured === 'true' || is_featured === '1');
        }

        // Get total count
        const [countResult] = await pool.query(countQuery, params);
        const total = countResult[0].total;

        // Get articles
        query += ' ORDER BY published_at DESC, created_at DESC LIMIT ? OFFSET ?';
        const [articles] = await pool.query(query, [...params, limit, offset]);

        res.json({
            success: true,
            count: articles.length,
            total,
            page,
            totalPages: Math.ceil(total / limit),
            data: articles
        });

    } catch (error) {
        console.error('Get articles error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการดึงข้อมูลบทความ'
        });
    }
};

// Get single article by ID
exports.getById = async (req, res) => {
    try {
        const { id } = req.params;

        const [articles] = await pool.query(
            'SELECT * FROM articles WHERE id = ?',
            [id]
        );

        if (articles.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'ไม่พบข้อมูลบทความ'
            });
        }

        res.json({
            success: true,
            data: articles[0]
        });

    } catch (error) {
        console.error('Get article error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการดึงข้อมูล'
        });
    }
};

// Get single article by slug
exports.getBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        const [articles] = await pool.query(
            'SELECT * FROM articles WHERE slug = ?',
            [slug]
        );

        if (articles.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'ไม่พบข้อมูลบทความ'
            });
        }

        res.json({
            success: true,
            data: articles[0]
        });

    } catch (error) {
        console.error('Get article by slug error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการดึงข้อมูล'
        });
    }
};

// Create article
exports.create = async (req, res) => {
    try {
        const { title, content, excerpt, featured_image, is_featured, published_at } = req.body;

        // Generate slug from title
        const slug = slugify(title);

        // Check if slug already exists
        const [existing] = await pool.query('SELECT id FROM articles WHERE slug = ?', [slug]);
        if (existing.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'มีบทความที่มีชื่อคล้ายกันอยู่แล้ว'
            });
        }

        const [result] = await pool.query(
            'INSERT INTO articles (title, slug, content, excerpt, featured_image, is_featured, published_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [title, slug, content, excerpt, featured_image, is_featured || false, published_at || new Date()]
        );

        res.status(201).json({
            success: true,
            message: 'เพิ่มบทความสำเร็จ',
            data: {
                id: result.insertId,
                title,
                slug,
                content,
                excerpt,
                featured_image,
                is_featured,
                published_at
            }
        });

    } catch (error) {
        console.error('Create article error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการเพิ่มบทความ'
        });
    }
};

// Update article
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, excerpt, featured_image, is_featured, published_at } = req.body;

        // Generate new slug if title changed
        let slug = req.body.slug;
        if (title) {
            slug = slugify(title);

            // Check if new slug conflicts with other articles
            const [existing] = await pool.query(
                'SELECT id FROM articles WHERE slug = ? AND id != ?',
                [slug, id]
            );

            if (existing.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: 'มีบทความที่มีชื่อคล้ายกันอยู่แล้ว'
                });
            }
        }

        const [result] = await pool.query(
            'UPDATE articles SET title = ?, slug = ?, content = ?, excerpt = ?, featured_image = ?, is_featured = ?, published_at = ? WHERE id = ?',
            [title, slug, content, excerpt, featured_image, is_featured, published_at, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'ไม่พบข้อมูลบทความ'
            });
        }

        res.json({
            success: true,
            message: 'อัปเดตบทความสำเร็จ'
        });

    } catch (error) {
        console.error('Update article error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการอัปเดตบทความ'
        });
    }
};

// Delete article
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query(
            'DELETE FROM articles WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'ไม่พบข้อมูลบทความ'
            });
        }

        res.json({
            success: true,
            message: 'ลบบทความสำเร็จ'
        });

    } catch (error) {
        console.error('Delete article error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการลบบทความ'
        });
    }
};
