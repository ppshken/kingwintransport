-- ===================================================================
-- King Win Transport - Complete Database Setup Script
-- ===================================================================
-- This script will:
-- 1. Drop and recreate all tables (WARNING: This deletes all data!)
-- 2. Insert seed data for all tables
-- ===================================================================

-- ===================================================================
-- STEP 1: CREATE SCHEMA
-- ===================================================================

-- Drop tables if exists (for clean recreation)
DROP TABLE IF EXISTS vehicle_images;
DROP TABLE IF EXISTS vehicle_types;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS partners;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS contacts;
DROP TABLE IF EXISTS admins;

-- Admins Table
CREATE TABLE admins (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Vehicle Types Table
CREATE TABLE vehicle_types (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(100) DEFAULT 'fas fa-bus',
    capacity INT,
    size VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Vehicle Images Table
CREATE TABLE vehicle_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    vehicle_type_id INT,
    image_url VARCHAR(500) NOT NULL,
    category ENUM('interior', 'exterior', 'facility', 'gallery') DEFAULT 'gallery',
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vehicle_type_id) REFERENCES vehicle_types(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Services Table
CREATE TABLE services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(100) DEFAULT 'fas fa-shuttle-van',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Customers Table (Activity Gallery)
CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    subtitle VARCHAR(200),
    description TEXT,
    image VARCHAR(500),
    tags TEXT,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Partners Table (separate from Customers)
CREATE TABLE partners (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    logo_url VARCHAR(500),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Articles Table (Blog)
CREATE TABLE articles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt VARCHAR(500),
    featured_image VARCHAR(500),
    is_featured BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contacts Table (Form Submissions)
CREATE TABLE contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('new', 'read', 'replied') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create indexes for better performance
CREATE INDEX idx_vehicle_type_id ON vehicle_images(vehicle_type_id);
CREATE INDEX idx_category ON vehicle_images(category);
CREATE INDEX idx_slug ON articles(slug);
CREATE INDEX idx_published_at ON articles(published_at);
CREATE INDEX idx_status ON contacts(status);
CREATE INDEX idx_is_active ON customers(is_active);
CREATE INDEX idx_partners_is_active ON partners(is_active);

-- ===================================================================
-- STEP 2: INSERT SEED DATA
-- ===================================================================

-- Insert default admin user (Username: admin, Password: admin123)
INSERT INTO admins (username, email, password) VALUES
('admin', 'admin@kingwintransport.com', '$2a$10$Pb9UP9sGf44pipUye2QSs.57FZqYGw0w89AhytvQqNMQ.BapD9Fmq');

-- Insert Vehicle Types
INSERT INTO vehicle_types (name, description, icon, capacity, size) VALUES
('รถบัส VIP ขนาด 8 เมตร', 'เบาะโซฟารถบัสขนาดใหญ่ นุ่มสบาย 4 ที่นั่ง ด้านหลังมีโต๊ะ โซฟารับรองสำหรับการสังสรรค์ ด้วยอัจฉริยะที่ล้ำสมัยของเบาะนั่ง VIP ห้องสันทนาการที่ล้ำนำสมัย มั่นใจและปลอดภัยทุกการเดินทาง', 'fas fa-bus', 4, '8'),
('รถบัส ขนาด 9 เมตร จำนวณ 33 ที่นั่ง', 'รถขนาด city bus กะทัดรัดเหมาะสำหรับการเดินทางกลุ่มเล็ก เบาะเป็นหนังผสมผ้ากำมะหยี่ สวย หรูหรา เบาะกว้างนั่งสบาย ปรับเอนได้ 45-90 องศา', 'fas fa-industry', 33, '9'),
('รถบัส ขนาด 10.5 เมตร จำนวน 39 ที่นั่ง', 'รถขนาดกลาง รถสีขาว สบายตา เบาะด้านในเป็นหนังทั้งหมด สวย หรูหรา เบาะกว้างนั่งสบาย เหมาะกับการเดินทางเป็นหมู่คณะ', 'fas fa-shuttle-van', 39, '10.5'),
('รถบัส ขนาด 12 เมตร จำนวน 43-45 ที่นั่ง', 'รถขนาดใหญ่ ชั้นเดียว เหมาะกับการเดินทางเป็นหมู่คณะใหญ่ เบาะด้านในกว้าง นั่งสบาย ปรับเอนได้45-90องศา มีเข็ดขัดนิรภัยทุกที่นั่ง ได้รับมาตรฐานด้านความปลอดภัยสูง และผ่านมาตรฐานของกรมการขนส่ง บริการทุกระดับประทับใจ อุ่นใจและปลอดภัย', 'fas fa-shuttle-van', 45, '12'),
('รถตู้โตโยต้า อัลพาร์ด', 'ค่าเช่าไม่รวมน้ำมัน/ทางด่วน/จอดรถ ทำงาน 10 ชม. (ล่วงเวลา 300 บ./ชม.) มีค่าที่พักคนขับ 800 บ./คืน', 'fas fa-shuttle-van', 7, 'Van'),
('รถยนต์ส่วนบุคคล โตโยต้า คัมรี่', 'รถคันนี้มาพร้อมระบบอัจฉริยะครบครัน ทั้งสตาร์ทอัจฉริยะ ไฟหน้าอัตโนมัติ HUD, MID และระบบขับขี่หลายโหมด (EV/ECO/Normal/Sport)อำนวยความสะดวกสูงสุดด้วยเบาะคู่หน้า Seat Ventilator, ระบบบันทึกตำแหน่งเบาะพวงมาลัย, Wireless Charger และระบบกรองอากาศ Nanoeปลอดภัยและใช้งานง่ายด้วยสัญญาณเตือนกะระยะรอบคัน, EPB, ABH, กระจกมองหลังลดแสงอัตโนมัติ และม่านบังแดดรอบคัน', 'fas fa-car', 4, 'Sedan');

-- Insert Services
INSERT INTO services (title, description, icon) VALUES
('รถบัส VIP ขนาด 8 เมตร', 'เบาะโซฟารถบัสขนาดใหญ่ นุ่มสบาย 4 ที่นั่ง ด้านหลังมีโต๊ะ โซฟารับรองสำหรับการสังสรรค์', 'fas fa-bus'),
('รถบัส ขนาด 9 เมตร จำนวณ 33 ที่นั่ง', 'รถขนาด city bus กะทัดรัดเหมาะสำหรับการเดินทางกลุ่มเล็ก', 'fas fa-industry'),
('รถบัส ขนาด 10.5 เมตร จำนวน 39 ที่นั่ง', 'รถขนาดกลาง รถสีขาว สบายตา เบาะด้านในเป็นหนังทั้งหมด', 'fas fa-shuttle-van'),
('รถบัส ขนาด 12 เมตร จำนวน 43-45 ที่นั่ง', 'รถขนาดใหญ่ ชั้นเดียว เหมาะกับการเดินทางเป็นหมู่คณะใหญ่', 'fas fa-shuttle-van'),
('รถตู้โตโยต้า อัลพาร์ด', 'ค่าเช่าไม่รวมน้ำมัน/ทางด่วน/จอดรถ ทำงาน 10 ชม.', 'fas fa-shuttle-van'),
('รถยนต์ส่วนบุคคล โตโยต้า คัมรี่', 'รถคันนี้มาพร้อมระบบอัจฉริยะครบครัน ทั้งสตาร์ทอัจฉริยะ ไฟหน้าอัตโนมัติ', 'fas fa-car');

-- Insert Customer Activities (NEW STRUCTURE)
INSERT INTO customers (title, subtitle, description, image, tags, display_order, is_active) VALUES
('พาน้องๆไปทัศนศึกษา', 'โรงเรียนเตรียมอุดมศึกษาพัฒนาการ', 'พี่หมวยขาว พาน้องๆ เตรียมพัฒน์ เดินทางไปเรียนรู้นอกห้องเรียน ณ พิพิธภัณฑ์วิทยาศาสตร์ อพวช.', 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=800', 'ทัศนศึกษา,โรงเรียน', 1, 1),
('พานักศึกษาวิชาทหารไปเขาชนไก่', 'มหาวิทยาลัยราชภัฏราชนครินทร์', 'พี่หมวยขาว พาน้องๆ ออกเดินทางไป ยังองค์การพิพิธภัณฑ์วิทยาศาสตร์แห่งชาติ จ.ปทุมธานี มั่นใจ ปลอดภัย', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800', 'มหาวิทยาลัย,วิชาทหาร', 2, 1),
('พานักเรียนไปทัศนศึกษา', 'ณ ราชบุรี', 'พานักเรียนไปทัศนศึกษา ความสุขมาพร้อมความรู้ ปลายทาง ณ ราชบุรี', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800', 'ทัศนศึกษา,ราชบุรี', 3, 1),
('รับส่งพนักงาน', 'บริษัทชั้นนำ', 'บริการรับส่งพนักงานประจำ ตรงเวลา ปลอดภัย สะดวกสบาย', 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=800', 'รับส่งพนักงาน,ประจำ', 4, 1),
('บริการเหมาเดินทางท่องเที่ยว', 'กรุ๊ปทัวร์', 'บริการรถตู้และรถบัสสำหรับกรุ๊ปท่องเที่ยว พร้อมคนขับมืออาชีพ', 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800', 'ท่องเที่ยว,กรุ๊ปทัวร์', 5, 1),
('บริการงานสัมมนา', 'องค์กรภาครัฐและเอกชน', 'รองรับงานสัมมนา ประชุม อบรม ทั้งในและนอกสถานที่', 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800', 'สัมมนา,ประชุม', 6, 1);

-- Insert Partners (Logo Showcase)
INSERT INTO partners (name, logo_url, display_order, is_active) VALUES
('MBUS', 'https://www.adt.or.th/image/ADT3%20-%201096%20-%201162.jpg', 1, 1),
('THAILUX', 'http://localhost:5000/uploads/logo/LOGO THAILUX.jpg', 2, 1),
('KINGWIN', 'https://kingwintransport.com/wp-content/uploads/2025/10/cropped-LOGO_KW.png', 3, 1),
('OK BUS', 'http://localhost:5000/uploads/logo/LOGO OK BUS.jpg', 4, 1),
('ABC JOURNEYS', 'https://abcjourneys.co/images/upload/editor/source/abc-logo.png', 5, 1),
('MEATONG', 'http://localhost:5000/uploads/logo/LOGO MEATONG.png', 6, 1),
('CHANGSAIRUNG', 'http://localhost:5000/uploads/logo/LOGO CHANGSAIRUNG.png', 7, 1);

-- Insert Sample Blog Articles
INSERT INTO articles (title, slug, content, excerpt, featured_image, is_featured, published_at) VALUES
('5 เทคนิคเลือกรถบัสรับส่งพนักงาน', '5-techniques-choosing-employee-shuttle', 
'การเลือกผู้ให้บริการรถรับส่งพนักงานมีความสำคัญอย่างไรต่อองค์กร และมีวิธีพิจารณาอย่างไรบ้าง ในบทความนี้เราจะมาแนะนำ 5 เทคนิคสำคัญในการเลือกรถบัสรับส่งพนักงานที่จะช่วยให้องค์กรของคุณได้บริการที่ดีที่สุด',
'การเลือกผู้ให้บริการรถรับส่งพนักงานมีความสำคัญอย่างไรต่อองค์กร และมีวิธีพิจารณาอย่างไรบ้าง...',
'https://images.unsplash.com/photo-1557223562-6c77ef16210f?q=80&w=1000&auto=format&fit=crop',
TRUE, NOW()),

('เตรียมตัวก่อนไปทัศนศึกษา', 'prepare-before-study-trip',
'เช็คลิสต์สิ่งของที่ต้องเตรียมเมื่อต้องเดินทางไกลด้วยรถบัส เพื่อความสะดวกสบายตลอดการเดินทาง การเตรียมตัวที่ดีจะช่วยให้การเดินทางของคุณราบรื่นและสนุกสนานมากยิ่งขึ้น',
'เช็คลิสต์สิ่งของที่ต้องเตรียมเมื่อต้องเดินทางไกลด้วยรถบัส เพื่อความสะดวกสบายตลอดการเดินทาง...',
'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=1000&auto=format&fit=crop',
FALSE, NOW()),

('มาตรฐานความปลอดภัย King Win', 'king-win-safety-standards',
'เปิดบ้านดูมาตรฐานการดูแลรถและพนักงานขับรถของเรา ที่ทำให้ลูกค้ามั่นใจมาตลอด 10 ปี King Win Transport ให้ความสำคัญกับความปลอดภัยเป็นอันดับหนึ่ง ด้วยการตรวจสอบรถอย่างสม่ำเสมอและการฝึกอบรมพนักงานขับรถอย่างเข้มงวด',
'เปิดบ้านดูมาตรฐานการดูแลรถและพนักงานขับรถของเรา ที่ทำให้ลูกค้ามั่นใจมาตลอด 10 ปี...',
'https://images.unsplash.com/photo-1542259681-d2a9c34d8e59?q=80&w=1000&auto=format&fit=crop',
FALSE, NOW());

-- ===================================================================
-- VERIFICATION
-- ===================================================================
SELECT 'Database setup complete!' as Status;
SELECT 'Admins:' as Table_Name, COUNT(*) as Record_Count FROM admins
UNION ALL SELECT 'Vehicle Types:', COUNT(*) FROM vehicle_types
UNION ALL SELECT 'Services:', COUNT(*) FROM services
UNION ALL SELECT 'Customers (Activities):', COUNT(*) FROM customers
UNION ALL SELECT 'Partners:', COUNT(*) FROM partners
UNION ALL SELECT 'Articles:', COUNT(*) FROM articles;
