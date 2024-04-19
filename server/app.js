import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import cloudinary from "cloudinary";

import { client } from "./utils/db.js";
import authRouter from "./apps/auth.js";
import postRouter from "./apps/posts.js";

async function init(){
  // dotenv ใช้เพื่อโหลดค่าจากไฟล์ .env 
  // เเละกำหนดค่า เพื่อใช้งานได้
  dotenv.config();
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
        secure: true, 
  });

  const app = express();
  const port = 4000;

  // เชื่อมต่อ database
  await client.connect();

  // การเรียกใช้ app.use(cors()) ในแอพพลิเคชัน Express.js 
  // จะทำให้ Express.js ใช้งาน middleware สำหรับการจัดการ 
  // CORS ซึ่งจะเพิ่มหัวข้อ Access-Control-Allow-Origin 
  // ในการตอบกลับของเซิร์ฟเวอร์ เพื่อช่วยให้เบราว์เซอร์สามารถทำ
  // คำขอไปยังเซิร์ฟเวอร์ที่ต่างกันได้โดยไม่มีปัญหาการโพสต์ข้ามโดเมน 
  // (cross-domain POST) และข้อจำกัดอื่น ๆ ของการใช้งานจากโดเมนอื่น ๆ
  app.use(cors());

  // เเปลงข้อมูลที่ถูกส่งเข้ามาในรูปเเบบ JSON เป็น javascript object
  app.use(bodyParser.json());

  // กำหนด router localhost://5000/auth endpoint สำหรับ auth
  app.use("/auth", authRouter);
  app.use("/posts", postRouter);

  app.get("/", (req, res) => {
    res.send("Hello World")
  });

  app.get("*", (req, res) => {
    res.status(404).send("Not found") 
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
  });
}

init();

// import crypto from "crypto";
// const key1 = crypto.randomBytes(64).toString("ascii");
// const key2 = crypto.randomBytes(64).toString("base64");
// const key3 = crypto.randomBytes(64).toString("base64url")

// console.table({ key1, key2, key3 })


