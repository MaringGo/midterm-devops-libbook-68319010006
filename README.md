# 📚 ระบบบันทึกข้อมูลหนังสือห้องสมุด (Project: libbook)

### รายชื่อผู้จัดทำ: นายชลิต กำแก้ว รหัสนักศึกษา: 68319010006

![CI Status](https://github.com/MaringGo/midterm-devops-libbook-68319010006/actions/workflows/ci.yml/badge.svg)

ระบบ CRUD สำหรับบันทึกและจัดการข้อมูลทะเบียนหนังสือของห้องสมุดวิทยาลัย สร้างด้วย Express.js + PostgreSQL + HTML/CSS/JS (Vanilla)

## Tech Stack
- **Backend:** Node.js + Express.js + PostgreSQL
- **Frontend:** HTML5 + CSS3 + Javascript (Vanilla)
- **Container:** Docker + Docker Compose
- **CI/CD:** GitHub Actions

## วิธีการรันระบบ (Local)

### 🛠️ สำหรับการพัฒนา (Development Mode)
```bash
# คัดลอกไฟล์ environment
cp .env.example .env

# สั่งรันระบบผ่าน Docker Compose สำหรับ Dev (Build สดในเครื่อง)
docker-compose up --build
```
เข้า [http://localhost](http://localhost) เพื่อดู Frontend (หรือ [http://localhost:3000](http://localhost:3000) ตามการ map พอร์ต)

### 🚀 สำหรับการรันบนโปรดักชัน (Production Mode)
```bash
# คัดลอกไฟล์ environment (ถ้ายังไม่มี)
cp .env.example .env

# รันด้วย Docker Compose แบบ Production (ดึง Image จาก Docker Hub)
docker-compose -f docker-compose.prod.yml up -d
```

## API Endpoints
| Method | Path | คำอธิบาย |
|--------|------|----------|
| GET | /health | Health check ตรวจสอบการเชื่อมต่อ API และ Database |
| GET | /api/books | ดึงข้อมูลหนังสือทั้งหมด (รองรับการค้นหาและฟิลเตอร์) |
| POST | /api/books | บันทึกข้อมูลหนังสือใหม่ (ตรวจสอบ ISBN ซ้ำและปีที่พิมพ์) |
| PUT | /api/books/:isbn | แก้ไขข้อมูลหนังสือและสถานะการยืมคืน |
| DELETE | /api/books/:isbn | ลบข้อมูลหนังสือออกจากคลัง |

