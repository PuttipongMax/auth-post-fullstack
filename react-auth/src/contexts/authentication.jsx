import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
// import jwtDecode from "jwt-decode"

// สร้าง useContext
const AuthContext = React.createContext();

function AuthProvider(props){
  const [ state, setState ] = useState({ 
    loading: null,
    error: null,
    user: null
  });

  const navigate = useNavigate();

  // function register เป็น async function ซึ่งรอ response จาก server
  const register = async(data) => {

    // request ข้อมูล ไปที่ endpoint พร้อม post data เเนบ headers
    await axios.post("http://localhost:4000/auth/register", data,

      // ใข้ในกรณีที่มีการโหลด ไฟล์ต่างๆ ใน form 
      { headers: { "Content-Type": "multipart/form-data"}}
    )

    //  link ไป login page
    // navigate("/login");
  }

  // make a login request
  // const login = async (data) => {
  //   try{

  //   }
  //   catch(error){
  //     setState({
  //       ...State,
  //       error: error.response.data.message,
  //       l
  //     })
  //   }
  // }

  // ตรวจสอบว่ามีข้อมูล token ใน localStorage หรือไม่ ถ้ามีส่งค่า
  // true ถ้าไม่มี ส่งค่า false
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider
      value={{ state, register, isAuthenticated }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };