import { useState } from "react";
import { useAuth } from "../contexts/authentication";

function LoginPage(){
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");

  const { login, state } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      username,
      password
    })
  }

  return (
    <div
    className="w-full h-screen bg-[cornflowerblue]"
    >
      <div className="w-full mx-auto px-4 sm:px-12 md:px-20 lg:px-40">
        <form
        onSubmit={handleSubmit}
        >
          <div className="text-white flex flex-col space-y-6 
          space-x-12 lg:space-x-28">
            <h1 className="mx-12 lg:mx-28 mt-12 text-3xl">Login</h1>
           
            <div className="flex flex-col space-y-2">
              <label className="text-2xl">
                username
              </label>
              <div className="">
                <input 
                type="text"
                placeholder="Enter username here"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="text-stone-700 py-2 rounded-lg 
                  outline-transparent border-[2px] w-[88%] 
                  pl-4 lg:w-4/5"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-2xl">
                password
              </label>
              <div className="">
                <input 
                type="text"
                placeholder="Enter password here"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="text-stone-700 py-2 rounded-lg 
                  outline-transparent border-[2px] w-[88%] 
                  pl-4 lg:w-4/5"
                />
              </div>
            </div>

            {state.error && 
              <h1 className="error-message">Error: {state.error}</h1>
            }
            <div className="form-action">
              <button 
              className="bg-red-400 px-6 py-2 rounded-lg"
              type="submit"
              >
                Login
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage;