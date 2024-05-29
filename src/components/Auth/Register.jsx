// src/components/Register.js
import { useState, useContext } from "react";
import instance from "../../utils/configAxios";
import { useNavigate } from "react-router";
import Navbar from "../Home/Navbar";
import UserContext from "../feature/UserContext.jsx";

const Register = ({ setToken }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  async function handleClick(e) {
    try {
      e.preventDefault();
      const { data } = await instance.post("/user/signup", {
        name,
        email,
        password,
        passwordConfirm,
      });
      console.log(data.token);
      localStorage.setItem("token", JSON.stringify(data.token));
      setError(false);
      setUser({ name }); // Update user context
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err);
    }
  }

  return (
    <>
      <Navbar />
      <h1 className="flex items-center justify-center">Registration Form</h1>
      <form className="flex flex-col items-center justify-center h-screen">
        <label htmlFor="name" className="mb-2">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-center border border-gray-300 rounded px-3 py-2 mb-4"
        />
        <label htmlFor="email" className="mb-2">
          Email
        </label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mb-4"
        />
        <label htmlFor="password" className="mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mb-4"
        />
        <label htmlFor="passwordConfirm" className="mb-2">
          Confirm Password
        </label>
        <input
          id="passwordConfirm"
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mb-4"
        />
        <button
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
        <p className="text-red-800">
          {error?.response.data.status === "error" &&
            error?.response.data.message}
        </p>
      </form>
    </>
  );
};

export default Register;
