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
    navigate("/login");
  }

  // make a login request
  const login = async (data) => {
    try{
      /* เซตค่า state */
      setState({ ...state, error: null, loading: true });

      /* axios ใช้ method post ส่ง parameter 2 ค่า 
      1. endpoint 2. data คือ ข้อมูลที่ส่ง */
      const result = await axios.post(
        "http://localhost:4000/auth/login", data);

      // เข้าถึงค่า token เเละเก็บไว้ในตัวเเปร token
      const token = result.data.token;

      /* เก็บ token ไว้ใน localStorage */
      localStorage.setItem("token", token);

      // การถอดรหัส token ด้วย jwtDecode
      const userDataFromToken = jwtDecode(token);

      /* การเก็บข้อมูลที่ได้ จาก token ลงใน state */
      setState({ ...state, user: userDataFromToken });

      /* นำไปใน path "/" */
      navigate("/");
    }

    // ถ้า error state คงค่าเดิม เเละส่ง error message เเละ loading false
    catch(error){
      setState({
        ...state,
        error: error.response.data.message,
        loading: false
        
      })
    }
  }

  // clear the token in localStorage and the user data
  const logout = () => {
    localStorage.removeItem("token");
    setState({ ...state, user: null, error: false })
  }

  // ตรวจสอบว่ามีข้อมูล token ใน localStorage หรือไม่ ถ้ามีส่งค่า
  // true ถ้าไม่มี ส่งค่า false
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider
      value={{ state, register, login, logout, isAuthenticated }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };