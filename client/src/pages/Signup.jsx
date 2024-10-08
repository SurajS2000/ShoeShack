import React from "react";
import { Link } from "react-router-dom";
import { publicInstance } from "../api/api";

const Signup = () => {
  const createuser = (e) => {
    e.preventDefault();
    const payload = {
      name: e.target.name.value,
      email: e.target.email.value,
      number: e.target.number.value,
      password: e.target.password.value,
      state: e.target.state.value,
      city: e.target.city.value,
      house: e.target.house.value,
      pincode: e.target.pincode.value,
      landmark: e.target.landmark.value,
    };
    publicInstance.post("create", payload).then((response) => {
      console.log(response);
    });
  };
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <form
        className="flex flex-col gap-5 p-10 items-center border-2 border-green-400 rounded-md"
        onSubmit={createuser}
      >
        <h1 className="text-2xl text-green-400 text">Create an Account</h1>
        <input
          className="createinput"
          name="name"
          required
          type="text"
          placeholder="Name"
        />
        <input
          className="createinput"
          name="email"
          required
          type="email"
          placeholder="Email"
        />
        <input
          className="createinput"
          name="number"
          required
          type="tel"
          placeholder="Mobile"
        />
        <input
          className="createinput"
          name="password"
          required
          type="text"
          placeholder="Password"
        />
        <div className="flex gap-5">
          <input
            name="state"
            required
            className="createinput"
            type="text"
            placeholder="State"
          />
          <input
            className="createinput"
            required
            name="city"
            type="text"
            placeholder="City"
          />
        </div>
        <div className="flex gap-5">
          <input
            name="house"
            required
            className="createinput"
            type="text"
            placeholder="House Name"
          />
          <input
            className="createinput"
            name="pincode"
            required
            type="text"
            placeholder="Pincode"
          />
        </div>
        <input
          className="createinput"
          name="landmark"
          type="text"
          placeholder="Landmark"
        />
        <button
          className="py-3 px-10 text-white bg-green-400 font-bold w-fit rounded-md border border-green-400 hover:text-green-400 hover:bg-white"
          type="submit"
        >
          Create
        </button>
        <Link to='/login' className="text-sm text-green-400">
          already have an account
        </Link>
      </form>
    </div>
  );
};

export default Signup;
