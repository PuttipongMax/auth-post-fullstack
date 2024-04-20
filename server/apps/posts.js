import { ObjectId } from "mongodb";
import { Router } from "express";
import { db } from "../utils/db.js";
import { protect } from "../middlewares/protect.js";

const postRouter = Router();

postRouter.use(protect);

postRouter.get("/", async(req, res) => {
  // การดึงค่า status จาก req.query parameters
  const status = req.query.status;

  // การดึงค่า keywords จาก req.query parameters
  const keywords = req.query.keywords;

  // การดึงค่า page จาก req.query parameters
  const page = req.query.page;

  const PAGE_SIZE = 5;

  // skip = 5 * (page - 1)
  const skip = PAGE_SIZE * (page - 1);

  /* สร้างตัวเเปร query เป็น object */
  const query = {};

  /* ถ้ามี status  */
  if(status) {

    /* เก็บค่า status ไว้ใน object query */
    query.status = status;
  }
  /* ถ้ามี keywords */
  else if(keywords){
    /* ตรวจสอบค่า keyword ด้วย RegExp โดย "i" 
    หมายถึงการหาโดยไม่สน case-insensitive */
    query.title = new RegExp(`${keywords}`, "i");
  }

  /* collection คือการเช้า ถึง collection posts */
  const collection = db.collection("posts");
  
  /* ตัวเเปร posts รอค่าจาก collection  */
  const posts = await collection
    .find(query)
    .sort({ published_at: -1 })
    .skip(skip)
    .limit(5)
    .toArray();
  
  /* query ซึ่งเก็บค่า status, title โดย countDocuments
   เป็นวิธีที่มั่นใจได้ว่าจำนวนเอกสารที่ได้นับจะถูกคำนวณอย่างถูกต้องและสมบูรณ์ 
   เนื่องจากมันนับจำนวนเอกสารตรงไปตรงมา โดยไม่ได้ดึงข้อมูลจากเอกสารมาใช้ในระหว่างการนับ
  ซึ่งทำให้การนับนั้นมีประสิทธิภาพมากขึ้น */
  const count = await collection.countDocuments(query);

  /* Math.ceil คือ function ที่ปัดเศษค่าที่ได้ให้เป็น จำนวนเต็ม */
  const totalPages = Math.ceil(count / PAGE_SIZE);

  /* ส่งค่า data, total_pages */
  return res.json({
    data: posts,
    total_pages: totalPages
  });
});

postRouter.get("/:id", async(req, res) => {

  /* เเปลง req.params.id เป็น object Id */
  const postId = new ObjectId(req.params.id); 

  /* collection เท่ากับ collection posts */
  const collection = db.collection("posts"); 

  /* หา id ที่มีค่าเท่ากับ postId เเละให้ส่งค่ากลับมาเป็น array */
  const post = await collection.find({ _id: postId }).toArray();

  /* ส่ง response กลับไปเป็น data ซึ่งเก็บค่า array ตัวเเรก */
  return res.json({
    data: post[0], 
  }); 
});

postRouter.post("/", async(req, res) => {

  /* ครวจสอบค่า status ว่า เป็น published หรือไม่
  หากใช้ คืนค่า ture ถ้าไม่ใช้ คืนค่า false */
  const hasPublished = req.body.status === "published";
  const checkTitle = req.body.title;
  const checkContent = req.body.content;
  
  if(checkTitle !== "" && checkContent !== ""){
    /* สร้าง newPost เป็น object */
    const newPost = {

      /* ...req.body คือ การรับค่าทั้งหมดจาก body */
      ...req.body,

      /* สร้าง created_at ใเก็บค่า new Date() */
      created_at: new Date(),

      /* สร้าง updated_at เก็บค่า new Date() */
      updated_at: new Date(),

      /* published_at เก็บค่า hasPublished ซึ่งต้อง check
      1. ถ้าเป็น true = new Date() 
      2. ถ้าเป็น fales = null */
      published_at: hasPublished ? new Date() : null,
    };

    /* collection เท่ากับ collection posts */
    const collection = db.collection("posts");

    /* ฟังก์ชัน insertOne จะส่งคืน Promise 
    ที่ระบุถึงผลลัพธ์ของการเพิ่มข้อมูล และการใช้ await 
    ในการรอให้ปฏิบัติการเสร็จสมบูรณ์ */
    await collection.insertOne(newPost);

    /* ส่ง response json message */
    return res.json({
      message: "Post has been created.",
    });
  }
  else{
    return res.json({
      message: "Post has not been created."
    })
  }
  
});

postRouter.put("/:id", async(req, res) => {

  /* ครวจสอบค่า status ว่า เป็น published หรือไม่
  หากใช้ คืนค่า ture ถ้าไม่ใช้ คืนค่า false */
  const hasPublished = req.body.status === "published";

  const updatedPost = {

    /* ...req.body คือ การรับค่าทั้งหมดจาก body */
    ...req.body,

    /* สร้าง updated_at เก็บค่า new Date() */
    updated_at: new Date(),

    /* published_at เก็บค่า hasPublished ซึ่งต้อง check
    1. ถ้าเป็น true = new Date() 
    2. ถ้าเป็น fales = null */
    published_at: hasPublished ? new Date() : null,
  }

  /* เเปลง req.params.id เแ้น Object id */
  const postId = new ObjectId(req.params.id);

  /* collection เเทนค่าเป็น collection posts */
  const collection = db.collection("posts");

  /* อัพเดตตาม id ด้วย function updateOne */
  await collection.updateOne(

    /* id ที่จะ update */
    { _id: postId },

    /* ข้อมูลที่ update */
    {
      $set: updatedPost,
    }
  );

  /* ส่ง response json message ว่า updated เสร็จสิ้น */
  return res.json({
    message: `Post ${postId} has been updated.`
  });
});

postRouter.delete("/:id", async(req, res) => {

  /* ครวจสอบค่า status ว่า เป็น published หรือไม่
  หากใช้ คืนค่า ture ถ้าไม่ใช้ คืนค่า false */
  const postId = new ObjectId(req.params.id);

  /* collection เเทนค่าเป็น collection posts */
  const collection = db.collection("posts");

  /* ลบตาม id ด้วย function deleteOne */
  await collection.deleteOne({

    /* id ที่จะ ลบ */
    _id: postId
  });

  /* ส่ง response json message ว่า deleted เสร็จสิ้น */ 
  return res.json({
    message: `Post ${postId} has been deleted.`
  });
});

export default postRouter;
