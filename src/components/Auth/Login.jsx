import { useState } from "react";
import instance from "../../utils/configAxios";
import Spinner from "../Page/Spinner";
import { Link } from "react-router-dom";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await instance.post("/user/login", { email, password });
      console.log(data);
      localStorage.setItem("token", JSON.stringify(data.token));
      setLoading(false);
    } catch (err) {
      setError(err);
      console.log(err);
    }
  }

  function handleResetPassword() {
    // Add logic here for resetting password
    console.log("Resetting password...");
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label className="mb-2">Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 px-3 py-2 border border-gray-300 rounded"
        />
        <label className="mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 px-3 py-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md mb-2"
        >
          Submit
        </button>
        <div className="mb-4">
          <Link
            to="/login/forgetpassword"
            className="text-blue-500 hover:underline"
          >
            Forgot Password
          </Link>
        </div>
        <button
          type="button"
          onClick={handleResetPassword}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded shadow-md"
        >
          Update Password
        </button>
        {error?.response.data.status === "fail" ||
        error?.response.data.status === "error" ? (
          <div className="text-red-500 mt-2">
            {error?.response.data.message}
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default Login;
