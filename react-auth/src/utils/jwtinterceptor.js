import axios from "axios";

function jwtInterceptor(){
  /* การใช้ middleware ของ axios ชื่อว่า interceptors 
  นการตรวจจับและปรับปรุง HTTP requests ก่อนที่พวกมันจะถูกส่งไปยังเซิร์ฟเวอร์ */
  axios.interceptors.request.use((req) => {

    /* ตรวจสอบว่ามี token ใน localstorage หรือไม่
      โดยเก็บค่า true หรือ false ในตัวเเปร hasToken */
    const hasToken = Boolean(window.localStorage.getItem("token"))

    /* ถ้ามี token ให้เพิ่ม Authorization เข้าไปใน headers */
    if(hasToken){
      req.headers = {
        ...req.headers,
        Authorization: `Bearer ${window.localStorage.getItem("token")}`
      }
    }

    return req;
  });

  /* interceptors นี้ รอรับ response จาก server โดยมีค่า parameter
  2 ค่า คือ req, error หากไม่มี error จะคืนค่า req ไปที่ caller
  เเต่ถ้ามี error ตาม if-condition จะลบ token ออกจาก localstorage
  เเละ link ไปที่ หน้า homepage */
  axios.interceptors.response.use((req) => {
    return req;
  }, (error) => {
    if(
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ){
      window.localStorage.removeItem("token");
      window.location.replace("/");
    }
    return Promise.reject(error);
  });
}

export default jwtInterceptor;