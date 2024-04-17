import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

const cloudinaryUpload = async (files) => {
  const fileUrl = [];

  // 
  for(let file of files.avatar){
    // const file = files.avatar[i];
    const result = await cloudinary.uploader.upload(
      file.path, {
        folder: "avatar/demo-file",
        type: "private",
    })
    fileUrl.push({
      urls: result.secure_url,
      publicIds: result.public_id
    })
    await fs.unlink(file.path)
  }
  return fileUrl;
}

// console.log(cloudinaryUpload());

export { cloudinaryUpload };