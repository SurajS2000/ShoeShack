import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { publicInstance } from "../api/api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/UserContext";
import { check } from "../api/managetoken";

const Login = () => {
  const [visibility, setvisiblity] = useState(false);
  const {setauth} = useContext(AuthContext);
  const navigate = useNavigate();
  const gettoken = (e) =>{
    e.preventDefault();
    const payload = {
      email: e.target.email.value,
      password: e.target.password.value
    }
    publicInstance.post('login',payload).then((response) =>{
      Cookies.set('token',response.data.accessToken);
        setauth();
      navigate("/");
      console.log(response);
    })
  }
  return (
    <div className="h-screen flex items-center justify-center wallpaper">
      <div>
        <div></div>
        <form onSubmit={gettoken} className="p-10 border-2 border-green-400 flex flex-col gap-5 rounded-md items-center text-white bg-black bg-opacity-50">
          <h1 className="text-2xl text-green-400">Login</h1>
          <input
            className="border-b border-green-400 outline-none w-full bg-transparent"
            name="email"
            placeholder="Email"
            type="email"
          />
          <div className="border-b border-green-400">
            <input
              className="outline-none bg-transparent"
              placeholder="Password"
              //pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              name="password"
              required
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              type={visibility ? "text" : "password"}
            />
            <div
              className="inline-block"
              onClick={() => {
                setvisiblity(!visibility);
              }}
            >
              <i
                className={`fa-solid ${
                  visibility ? "fa-eye" : "fa-eye-slash"
                } text-slate-500 text-center w-5`}
              ></i>
            </div>
          </div>
          <button className="py-3 px-10 text-white bg-green-400 font-bold w-fit rounded-md border border-green-400 hover:text-green-400 hover:bg-transparent">
            Login
          </button>
          <Link to='/signup' className="text-sm text-green-400">
            don't have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
