# King Win Transport - Backend API

Backend API สำหรับระบบจัดการเว็บไซต์ King Win Transport ที่พัฒนาด้วย Node.js, Express และ MySQL

## 🚀 คุณสมบัติ

- ✅ ระบบ Authentication ด้วย JWT
- ✅ จัดการประเภทรถและรูปภาพ
- ✅ จัดการบริการ
- ✅ จัดการข้อมูลลูกค้า
- ✅ จัดการบทความ (Blog) พร้อม pagination
- ✅ รับข้อความจากฟอร์มติดต่อ
- ✅ อัปโหลดไฟล์รูปภาพ
- ✅ Validation ข้อมูล
- ✅ Error handling ที่ครบถ้วน

## 📋 ความต้องการของระบบ

- Node.js >= 14.x
- MySQL >= 5.7
- npm หรือ yarn

## ⚙️ การติดตั้ง

### 1. ติดตั้ง Dependencies

```bash
cd backend
npm install
```

### 2. ตั้งค่า Database

เปิด XAMPP และเริ่ม MySQL server จากนั้นสร้างฐานข้อมูล:

```sql
CREATE DATABASE kingwin_transport;
```

Import schema และข้อมูลตัวอย่าง:

```bash
# ใน MySQL command line หรือ phpMyAdmin
mysql -u root -p kingwin_transport < database/schema.sql
mysql -u root -p kingwin_transport < database/seed.sql
```

### 3. สร้างไฟล์ .env

คัดลอกจาก `.env.example`:

```bash
cp .env.example .env
```

แก้ไขค่าในไฟล์ `.env` ตามการตั้งค่า MySQL ของคุณ:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=kingwin_transport
JWT_SECRET=your-secret-key-change-this
```

### 4. สร้าง Admin User

ขั้นแรกต้องสร้าง password hash สำหรับ admin:

```javascript
// รันใน Node.js REPL
const bcrypt = require('bcryptjs');
console.log(bcrypt.hashSync('admin123', 10));
```

จากนั้นแก้ไข `database/seed.sql` ให้ใส่ hash ที่ได้ลงในตาราง admins หรือใช้ API `/api/auth/register` เพื่อสร้าง admin user

### 5. เริ่มต้น Server

```bash
# Development mode (auto-restart)
npm run dev

# Production mode
npm start
```

Server จะทำงานที่ `http://localhost:5000`

## 📚 API Documentation

### Authentication

#### Register Admin
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "admin",
  "email": "admin@example.com",
  "password": "password123"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "user": { "id": 1, "username": "admin", "email": "..." },
    "token": "eyJhbGc..."
  }
}
```

#### Get Current User (Protected)
```
GET /api/auth/me
Authorization: Bearer {token}
```

### Vehicle Types (ประเภทรถ)

```
GET    /api/vehicle-types          # ดูทั้งหมด (public)
GET    /api/vehicle-types/:id      # ดูรายการเดียว (public)
POST   /api/vehicle-types          # เพิ่มใหม่ (protected)
PUT    /api/vehicle-types/:id      # แก้ไข (protected)
DELETE /api/vehicle-types/:id      # ลบ (protected)
```

### Vehicle Images (รูปภาพรถ)

```
GET    /api/vehicle-images                    # ดูทั้งหมด (public)
       Query: ?vehicle_type_id=1&category=exterior
POST   /api/vehicle-images                    # อัปโหลดรูป (protected)
       Form-data: image (file), vehicle_type_id, category, display_order
DELETE /api/vehicle-images/:id                # ลบรูป (protected)
```

### Services (บริการ)

```
GET    /api/services              # ดูทั้งหมด (public)
GET    /api/services/:id          # ดูรายการเดียว (public)
POST   /api/services              # เพิ่มใหม่ (protected)
PUT    /api/services/:id          # แก้ไข (protected)
DELETE /api/services/:id          # ลบ (protected)
```

### Customers (ลูกค้า)

```
GET    /api/customers             # ดูทั้งหมด (public)
       Query: ?is_active=true
GET    /api/customers/:id         # ดูรายการเดียว (public)
POST   /api/customers             # เพิ่มใหม่ (protected)
PUT    /api/customers/:id         # แก้ไข (protected)
DELETE /api/customers/:id         # ลบ (protected)
```

### Articles (บทความ)

```
GET    /api/articles              # ดูทั้งหมด (public)
       Query: ?page=1&limit=10&is_featured=true
GET    /api/articles/:id          # ดูรายการเดียว (public)
GET    /api/articles/slug/:slug   # ดูจาก slug (public)
POST   /api/articles              # เพิ่มใหม่ (protected)
PUT    /api/articles/:id          # แก้ไข (protected)
DELETE /api/articles/:id          # ลบ (protected)
```

### Contacts (ติดต่อเรา)

```
POST   /api/contacts              # ส่งฟอร์มติดต่อ (public)
GET    /api/contacts              # ดูทั้งหมด (protected)
       Query: ?status=new
GET    /api/contacts/:id          # ดูรายการเดียว (protected)
PUT    /api/contacts/:id/status   # เปลี่ยนสถานะ (protected)
DELETE /api/contacts/:id          # ลบ (protected)
```

## 🔐 Protected Routes

Endpoints ที่มีป้าย (protected) ต้องส่ง JWT token ใน header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📁 โครงสร้างโปรเจกต์

```
backend/
├── config/
│   └── database.js           # การเชื่อมต่อ MySQL
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── vehicleTypeController.js
│   ├── vehicleImageController.js
│   ├── serviceController.js
│   ├── customerController.js
│   ├── articleController.js
│   └── contactController.js
├── middleware/
│   ├── auth.js               # JWT authentication
│   └── upload.js             # File upload (Multer)
├── routes/
│   ├── auth.js
│   ├── vehicleTypes.js
│   ├── vehicleImages.js
│   ├── services.js
│   ├── customers.js
│   ├── articles.js
│   └── contacts.js
├── utils/
│   ├── validators.js         # ฟังก์ชัน validation
│   └── slugify.js            # แปลง Thai text เป็น slug
├── database/
│   ├── schema.sql            # Database schema
│   └── seed.sql              # ข้อมูลตัวอย่าง
├── uploads/                  # โฟลเดอร์เก็บไฟล์อัปโหลด
├── .env                      # Environment variables
├── .gitignore
├── package.json
└── server.js                 # Main entry point
```

## 🧪 การทดสอบ API

แนะนำให้ใช้:
- **Thunder Client** (VS Code Extension)
- **Postman**
- **Insomnia**

### ตัวอย่างการทดสอบ

1. **Login เพื่อรับ token**
```bash
POST http://localhost:5000/api/auth/login
{
  "username": "admin",
  "password": "admin123"
}
```

2. **ใช้ token ที่ได้ในการเรียก protected endpoints**
```bash
GET http://localhost:5000/api/vehicle-types
Authorization: Bearer <your-token>
```

3. **Upload รูปภาพ**
```bash
POST http://localhost:5000/api/vehicle-images
Authorization: Bearer <your-token>
Content-Type: multipart/form-data

image: [เลือกไฟล์]
vehicle_type_id: 1
category: exterior
display_order: 1
```

## 🛠️ การ Debug

- ดู logs ใน console
- ตรวจสอบ MySQL logs
- ใช้ `console.log()` ใน controllers
- ตรวจสอบว่า MySQL server ทำงานอยู่

## 🔧 การแก้ไขปัญหาที่พบบ่อย

### ❌ Database connection failed
- ตรวจสอบว่า MySQL server เปิดอยู่ (XAMPP)
- ตรวจสอบ credentials ใน `.env`
- ตรวจสอบว่าสร้าง database แล้ว

### ❌ Token invalid
- ตรวจสอบว่าส่ง `Authorization: Bearer <token>` ถูกต้อง
- Token อาจหมดอายุ (24 ชั่วโมง) ให้ login ใหม่

### ❌ File upload error
- ตรวจสอบว่าโฟลเดอร์ `uploads/` ถูกสร้างแล้ว
- ตรวจสอบขนาดไฟล์ (สูงสุด 5MB)
- ตรวจสอบว่าเป็นไฟล์รูปภาพ

## 📝 License

ISC

## 👨‍💻 Developer

King Win Transport Development Team
