import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { publicInstance } from "../api/api";
import { check, resettoken } from "../api/managetoken";
import { AuthContext } from "../context/UserContext";

const Navbar = () => {
  const navigation = useNavigate();
  const [value, setvalue] = useState();
  const [data, setdata] = useState();
  const [user, setuser] = useState();
  const {isLoggedIn,logout} = useContext(AuthContext);
  const navigate = useNavigate();
  
  const search = (e) => {
    e.preventDefault();
    navigation("/searchresult", { state: { search: value } });
    setvalue();
  };
  const getresults = (e) => {
    setvalue(e.target.value);
    publicInstance
      .get(`searchnav?search=${e.target.value}`)
      .then((response) => {
        setdata(response.data);
      });
  };
  const redirect = (id) => {
    console.log(id);
    navigation("/product", { state: { id } });
  };
  return (
    <div
      className="w-full px-10 py-3 text-white bg-green-300 justify-center gap-10 items-center fixed z-10 flex"
    >
      <Link to="/" className="text-2xl font-serif font-bold">
        ShoeShack
      </Link>
      <div className="w-96">
        <form
          onSubmit={search}
          className="bg-white py-1 px-4 rounded-md shadow-sd text-black flex items-center w-full"
        >
          <input
            onChange={getresults}
            name="search"
            className="outline-none bg-transparent w-full "
            type="text"
          />
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass ml-4"></i>
          </button>
        </form>
        <div
          className={`p-5 bg-green-50 absolute flex-col gap-3 shadow-md rounded-sm w-96 ${
            value ? "flex" : "hidden"
          }`}
        >
          {data && data[0] ? (
            data.map((v) => (
              <div
                key={v.product_id}
                className="p-2 bg-white rounded-md text-green-400 flex items-center gap-2 hover:cursor-pointer hover:text-red-400"
                onClick={() => {
                  redirect(v.product_id);
                }}
              >
                <img
                  className="h-10 w-10 object-contain"
                  src={`/images/${v.image_name.split(",")[0]}`}
                  alt=""
                />
                <p>
                  {v.name} from {v.brand} for {v.category}
                </p>
              </div>
            ))
          ) : (
            <p className="text-green-400">NO RESULT FOUND</p>
          )}
        </div>
      </div>
      <span
        onClick={() =>
          navigation("/searchresult", { state: { search: "kids" } })
        }
        className="hover:cursor-pointer hover:border-b-2 border-white"
      >
        Kids
      </span>
      <span
        onClick={() =>
          navigation("/searchresult", { state: { search: "womens" } })
        }
        className="hover:cursor-pointer hover:border-b-2 border-white"
      >
        Womens
      </span>
      <span
        onClick={() =>
          navigation("/searchresult", { state: { search: "mens" } })
        }
        className="hover:cursor-pointer hover:border-b-2 border-white"
      >
        Mens
      </span>
      {isLoggedIn ? (
        <div className="group hover:cursor-pointer">
          <div className="flex gap-2 justify-center items-center py-1 w-40 bg-white text-green-300 rounded-md">
            {isLoggedIn && isLoggedIn}
          </div>
          <div className={`absolute bg-green-50 w-40 text-green-400 flex-col items-start rounded-md hidden group-hover:flex`}>
            <button className="border-b-2 w-full p-3 text-left border-green-300"><i className="fa-solid fa-user w-7"></i> My Profile</button>
            <button className="border-b-2 w-full p-3 text-left border-green-300"><i className="fa-solid fa-basket-shopping w-7"></i> Orders</button>
            <button onClick={()=>{resettoken(); logout();}} className="w-full p-3 text-left"><i className="fa-solid fa-power-off w-7"></i> Log Out</button>
          </div>
        </div>
      ) : (
        <Link
          to="/login"
          className="flex gap-2 justify-center items-center py-1 w-40 bg-white text-green-300 rounded-md"
        >
          <i className="fa-solid fa-user"></i>
          <span>Login</span>
        </Link>
      )}
      <Link
        to="/cart"
        className="flex gap-2 justify-center items-center py-1 w-40  bg-white text-green-300 rounded-md"
      >
        <i className="fa-solid fa-cart-shopping"></i>
        <span>Cart</span>
      </Link>
    </div>
  );
};

export default Navbar;
