-- King Win Transport Seed Data
-- This file contains sample data for testing

-- Insert default admin user
-- Username: admin, Password: admin123
INSERT INTO admins (username, email, password) VALUES
('admin', 'admin@kingwintransport.com', '$2a$10$Pb9UP9sGf44pipUye2QSs.57FZqYGw0w89AhytvQqNMQ.BapD9Fmq');

-- Insert Vehicle Types (from frontend data)
INSERT INTO vehicle_types (name, description, icon, capacity, size) VALUES
('รถบัส VIP ขนาด 8 เมตร', 'เบาะโซฟารถบัสขนาดใหญ่ นุ่มสบาย 4 ที่นั่ง ด้านหลังมีโต๊ะ โซฟารับรองสำหรับการสังสรรค์ ด้วยอัจฉริยะที่ล้ำสมัยของเบาะนั่ง VIP ห้องสันทนาการที่ล้ำนำสมัย มั่นใจและปลอดภัยทุกการเดินทาง', 'fas fa-bus', 4, '8'),

('รถบัส ขนาด 9 เมตร จำนวณ 33 ที่นั่ง', 'รถขนาด city bus กะทัดรัดเหมาะสำหรับการเดินทางกลุ่มเล็ก เบาะเป็นหนังผสมผ้ากำมะหยี่ สวย หรูหรา เบาะกว้างนั่งสบาย ปรับเอนได้ 45-90 องศา', 'fas fa-industry', 33, '9'),

('รถบัส ขนาด 10.5 เมตร จำนวน 39 ที่นั่ง', 'รถขนาดกลาง รถสีขาว สบายตา เบาะด้านในเป็นหนังทั้งหมด สวย หรูหรา เบาะกว้างนั่งสบาย เหมาะกับการเดินทางเป็นหมู่คณะ', 'fas fa-shuttle-van', 39, '10.5'),

('รถบัส ขนาด 12 เมตร จำนวน 43-45 ที่นั่ง', 'รถขนาดใหญ่ ชั้นเดียว เหมาะกับการเดินทางเป็นหมู่คณะใหญ่ เบาะด้านในกว้าง นั่งสบาย ปรับเอนได้45-90องศา มีเข็ดขัดนิรภัยทุกที่นั่ง ได้รับมาตรฐานด้านความปลอดภัยสูง และผ่านมาตรฐานของกรมการขนส่ง บริการทุกระดับประทับใจ อุ่นใจและปลอดภัย', 'fas fa-shuttle-van', 45, '12'),

('รถตู้โตโยต้า อัลพาร์ด', 'ค่าเช่าไม่รวมน้ำมัน/ทางด่วน/จอดรถ ทำงาน 10 ชม. (ล่วงเวลา 300 บ./ชม.) มีค่าที่พักคนขับ 800 บ./คืน', 'fas fa-shuttle-van', 7, 'Van'),

('รถยนต์ส่วนบุคคล โตโยต้า คัมรี่', 'รถคันนี้มาพร้อมระบบอัจฉริยะครบครัน ทั้งสตาร์ทอัจฉริยะ ไฟหน้าอัตโนมัติ HUD, MID และระบบขับขี่หลายโหมด (EV/ECO/Normal/Sport)อำนวยความสะดวกสูงสุดด้วยเบาะคู่หน้า Seat Ventilator, ระบบบันทึกตำแหน่งเบาะพวงมาลัย, Wireless Charger และระบบกรองอากาศ Nanoeปลอดภัยและใช้งานง่ายด้วยสัญญาณเตือนกะระยะรอบคัน, EPB, ABH, กระจกมองหลังลดแสงอัตโนมัติ และม่านบังแดดรอบคัน', 'fas fa-car', 4, 'Sedan');

-- Insert Services (same as vehicle types for now)
INSERT INTO services (title, description, icon) VALUES
('รถบัส VIP ขนาด 8 เมตร', 'เบาะโซฟารถบัสขนาดใหญ่ นุ่มสบาย 4 ที่นั่ง ด้านหลังมีโต๊ะ โซฟารับรองสำหรับการสังสรรค์', 'fas fa-bus'),
('รถบัส ขนาด 9 เมตร จำนวณ 33 ที่นั่ง', 'รถขนาด city bus กะทัดรัดเหมาะสำหรับการเดินทางกลุ่มเล็ก', 'fas fa-industry'),
('รถบัส ขนาด 10.5 เมตร จำนวน 39 ที่นั่ง', 'รถขนาดกลาง รถสีขาว สบายตา เบาะด้านในเป็นหนังทั้งหมด', 'fas fa-shuttle-van'),
('รถบัส ขนาด 12 เมตร จำนวน 43-45 ที่นั่ง', 'รถขนาดใหญ่ ชั้นเดียว เหมาะกับการเดินทางเป็นหมู่คณะใหญ่', 'fas fa-shuttle-van'),
('รถตู้โตโยต้า อัลพาร์ด', 'ค่าเช่าไม่รวมน้ำมัน/ทางด่วน/จอดรถ ทำงาน 10 ชม.', 'fas fa-shuttle-van'),
('รถยนต์ส่วนบุคคล โตโยต้า คัมรี่', 'รถคันนี้มาพร้อมระบบอัจฉริยะครบครัน ทั้งสตาร์ทอัจฉริยะ ไฟหน้าอัตโนมัติ', 'fas fa-car');

-- Insert Sample Customers
INSERT INTO customers (name, logo_url, display_order, is_active) VALUES
('MBUS', 'https://via.placeholder.com/150x80?text=MBUS', 1, TRUE),
('THAILUX', 'https://via.placeholder.com/150x80?text=THAILUX', 2, TRUE),
('KINGWIN', 'https://via.placeholder.com/150x80?text=KINGWIN', 3, TRUE),
('OK BUS', 'https://via.placeholder.com/150x80?text=OK+BUS', 4, TRUE),
('ABC JOURNEYS', 'https://via.placeholder.com/150x80?text=ABC', 5, TRUE),
('มือทอง', 'https://via.placeholder.com/150x80?text=มือทอง', 6, TRUE),
('CHANGSAIRUNG', 'https://via.placeholder.com/150x80?text=CHANGSAIRUNG', 7, TRUE);

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

-- Note: Admin password hash needs to be generated properly
-- Run this in Node.js to generate:
-- const bcrypt = require('bcryptjs');
-- console.log(bcrypt.hashSync('admin123', 10));
