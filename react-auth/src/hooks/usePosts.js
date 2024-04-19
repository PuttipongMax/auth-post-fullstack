import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const usePosts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const getPosts = async(input) => {

    /* สามารถเข้าถึงค่าดังกล่าวได้โดยตรงโดยใช้ destructuring
    assignment ดึงค่าออกจาก object โดยมีเงื่อนไขว่า
    property ของ object จะต้องตรงกับชื่อตัวแปรที่กำหนดในฟังก์ชันนั้นๆ*/
    const { status, keywords, page } = input;
    try {

      /* URLSearchParam เป้น object ซึ่งใช้สำหรับสร้างและจัดการ
      พารามิเตอร์ของ URL query string โดยสะดวก 
      โดยเราสามารถเพิ่มและลบพารามิเตอร์ได้ตามต้องการ */
      const params = new URLSearchParams();

      /* เพิ่มค่า "" คือ parameter เเละหลัง comma คือ
      ค่าของ parameter นั้น*/
      params.append("status", status);
      params.append("keywords", keywords);
      params.append("page", page);

      /* ห้ setIsError เป็น false
      เเละ setIsLoading เป็น true */
      setIsError(false);
      setIsLoading(true);

      const results = await axios.get(
        `http://localhost:4000/posts?${params.toString()}`
      );
      /* set ค่าที่ได้จาก response ลงใน setState */
      setPosts(results.data.data);
      setTotalPages(results.data.totalPages);

      /* set Loading เป็น false */
      setIsLoading(false);
    }

    /* ถ้าไม่สำเร็จให้ setIsError เป็น true
    เเละ setIsLoading เป็น false */
    catch(error){
      setIsError(true);
      setIsLoading(false);
    }
  }

  const deletePost = async (postId) => {
    try{
      /* setIsError เป็น false */
      setIsError(false);
      /* setIsLoading เป็น true */
      setIsLoading(true);

      /* คือการใช้ function delete ลบ postId
      ตาม url endpoint */
      await axios.delete(
        `http://localhost:4000/posts/${postId}`
      );

      /* คือการหา postId ว่ามีซ้ำกับ param postId หรือไม่
      เก็บเข้าตัวเเปร newPosts*/
      const newPosts = posts.filter((post) => {
        return post._id !== postId;
      });

      /* คือการ set newPosts ลงใน setPosts */
      setPosts(newPosts);
      setIsLoading(false);
    }
    catch(error){
      setIsError(true);
      setIsLoading(false);
    }
  }

  const getPostById = async(postId) => {
    try{
      setIsError(false);
      setIsLoading(true);

      /* คือการใช้ function get ดึงข้อมูลตาม id 
      ที่กำหนด endpoint */
      const result = await axios.get(
        `http://localhost:4000/posts/${postId}`
      );

      /* set post เก็บค่า result ที่ได้ */
      setPost(result.data.data);
      setIsLoading(false);
    }
    catch(error){
      setIsError(true);
      setIsLoading(false);
    }
  }

  const createPost = async(data) => {
    try{
      setIsError(false);
      setIsLoading(true);

      /* ส่ง req method post with 
      data with endpoint for create data*/
      await axios.post(
        `http://localhost:4000/posts`,
        data
      );

      setIsLoading(false);
      navigate("/");
    }
    catch(error){
      setIsError(true);
      setIsLoading(false);
    }
  }

  const updatePostById = async (postId, data) => {
    try {
      setIsError(false);
      setIsLoading(true);

       /* ส่ง req method put with 
      parameter id with endpoint
      for update data*/
      await axios.put(
        `http://localhost:4000/posts/${postId}`,
        data
      );

      setIsLoading(false);
      navigate("/");
    }
    catch(error){
      setIsError(true);
      setIsLoading(false);
    }
  }

  /* คืนค่า  */
  return {
    posts,
    totalPages,
    post,
    getPosts,
    getPostById,
    createPost,
    updatePostById,
    deletePost,
    isError,
    isLoading,
  }
}

export default usePosts;