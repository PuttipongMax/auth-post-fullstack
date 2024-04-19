// การ import ด้วย ecma script
import jwt from "jsonwebtoken";

export const protect = async(req, res, next) => {
  // ตัวเเปร token มีค่า token โดยรับค่าจาก 
  // req.headers.authorization
  const token = req.headers.authorization;

  // การตรวจสอบ token
  // 1.token ที่ได้มาว่ามีอยู่หรือไม่ 
  // 2.token มีคำว่า "Bearer" นำหน้าหรือไม่
  // ถ้าตรงตามเงื่อนไข คืนค่า 2 ค่า
  // 1. status 401 
  // 2. ข้อความ "Token has invalid format"
  if(!token || !token.startsWith("Bearer ")){
    return res.status(401).json({
      message: "Token has invalid format",
    });
  }

  // tokenWithoutBearer เก็บค่าหลังช่องว่างเเรก
  const tokenWithoutBearer = token.split(" ")[1];

  // การตรวจสอบ token = tokenWithoutBearer
  // process.env.SECRET_KEY สำหรับการถอดรหัส
  // (err, payload) คือ callback function
  jwt.verify(tokenWithoutBearer, 
    process.env.SECRET_KEY,
    (err, payload) => {
      // ถ้า err ส่งคืนค่า 
      // 1. status 401 
      // 2. ข้อความ "Token is invalid"
      if(err){
        return res.status(401).json({
          message: "Token is invalid"
        });
      }
      // เก็บข้อมูลผู้ใช้ที่ถูกถอดรหัสมาจากโทเค็นในตัวแปร
      req.user = payload;
      
      // เป็นฟังก์ชันที่ใช้สำหรับเรียก middleware ถัดไปในลำดับการประมวลผลของคำขอ 
      // หรือส่งคำขอไปยังเส้นทางการประมวลผลถัดไป ในที่นี้ใช้เพื่อทำให้ Express.js 
      // ทำงานต่อไปหลังจากที่โทเค็นได้ถูกยืนยันแล้ว
      next();
    });
}