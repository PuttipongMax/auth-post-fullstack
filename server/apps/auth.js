import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../utils/db.js";
import multer from "multer";
import { cloudinaryUpload } from "../uploads/upload.js";

// สร้าง router กำหนด endpoint api
const authRouter = Router();

// multerUpload ใช้ Multer middleware เพื่อจัดการการอัปโหลดไฟล์ 
// โดยการกำหนด Multer ด้วยค่า dest: "uploads/" จะทำให้
// Multer บันทึกไฟล์ที่อัปโหลดลงในโฟลเดอร์ "uploads/" บนเซิร์ฟเวอร์
const multerUpload = multer({ dest: "uploads/" });

  // variable avartarUpload เพื่อกำหนดการอัปโหลดไฟล์โดยใช้ 
  // Multer middleware ที่มีชื่อว่า multerUpload โดยมีขื่อ
  // fields'name : "avatar" เเละ 
  // maxCount: 2 คือกำหนดจำนวนไฟล์เเต่ละครั้งเท่ากับ 2 ไฟล์
  const avatarUpload = multerUpload.fields([
    { name: "avatar", maxCount: 2 }
  ]);

  // authRouter.post("register", avartarUpload, async(req, res)
  // จะเป็นการรับข้อมูลของผู้ใช้ที่ส่งมาผ่าน request เเละรับ Multer middleware
  // และสร้างผู้ใช้ใหม่โดยใช้ข้อมูลนั้นในตัวแปร user
  authRouter.post("/register", avatarUpload, async(req, res) => {
    const user = {
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName, 
      lastName: req.body.lastName,
  }

  // การส้งข้อมูลไปที่บัญชี cloudinary ด้วย 
  // function cloudinaryUpload
  const avatarUrl = await cloudinaryUpload(req.files);

  // นำ avatarUrl เข้า object user { avatars: avatarsUrl }
  user["avatars"] = avatarUrl;

  // สร้าง salt เเละกำหนดความปลอดภัยระดับปลานกลางซี่งใข้เวลามากกว่าตาม number
  const salt = await bcrypt.genSalt(10);

  // เข้ารหัสผ่าน ตัวเเปร user.password
  user.password = await bcrypt.hash(user.password, salt);

  // collection variable ถูกกำหนดให้มีค่า เท่ากับ collection users
  const collection = db.collection("users");

  // รอ response จาก database โดยเพิ่ม user variable เข้าไปใน collection
  // ด้วย command insertOne ของ mongodb
  await collection.insertOne(user);

  // endpoint authRouter หากทำสำเร็จ คืนค่า 
  // ข้อความ User has been created successfully
  return res.json({
    message: "User has been created successfully"
  });

});

export default authRouter;