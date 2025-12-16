-- เพิ่มข้อมูล Partners ตัวอย่าง
-- (ถ้ามีข้อมูลเดิมในตารางอื่น ให้ใช้คำสั่ง INSERT INTO ... SELECT แทน)

-- Option 1: ถ้าข้อมูลเดิมอยู่ในตาราง customers_backup หรือตารางอื่น
-- INSERT INTO partners (name, logo_url, display_order, is_active, created_at, updated_at)
-- SELECT name, logo_url, display_order, is_active, created_at, updated_at FROM customers_backup;

-- Option 2: เพิ่มข้อมูลใหม่ทีละรายการ
INSERT INTO partners (name, logo_url, display_order, is_active) VALUES
('MBUS', 'https://www.adt.or.th/image/ADT3%20-%201096%20-%201162.jpg', 1, 1),
('THAILUX', 'http://localhost:5000/uploads/logo/LOGO THAILUX.jpg', 2, 1),
('KINGWIN', 'https://kingwintransport.com/wp-content/uploads/2025/10/cropped-LOGO_KW.png', 3, 1),
('OK BUS', 'http://localhost:5000/uploads/logo/LOGO OK BUS.jpg', 4, 1),
('ABC JOURNEYS', 'https://abcjourneys.co/images/upload/editor/source/abc-logo.png', 5, 1),
('MEATONG', 'http://localhost:5000/uploads/logo/LOGO MEATONG.png', 6, 1),
('CHANGSAIRUNG', 'http://localhost:5000/uploads/logo/LOGO CHANGSAIRUNG.png', 7, 1);

-- ตรวจสอบข้อมูลที่เพิ่มเข้าไป
SELECT * FROM partners ORDER BY display_order;
