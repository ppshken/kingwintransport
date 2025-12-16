-- ขั้นตอนที่ 1: เปลี่ยนชื่อตาราง customers เดิมเป็น partners
RENAME TABLE customers TO partners;

-- ขั้นตอนที่ 2: สร้างตาราง customers ใหม่สำหรับข้อมูลลูกค้า
CREATE TABLE IF NOT EXISTS customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    logo_url VARCHAR(500),
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- สร้าง index สำหรับตาราง customers
CREATE INDEX idx_customers_display_order ON customers(display_order);
CREATE INDEX idx_customers_is_active ON customers(is_active);
