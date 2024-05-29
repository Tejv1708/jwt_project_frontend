// src/components/Home/Navbar.js
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../feature/UserContext";

function Navbar() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  function handleClick() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <nav className="bg-teal-500 flex items-center justify-between p-4">
      <div className="text-white text-lg font-bold">
        <a href="#">Logo</a>
      </div>
      <div className="ml-auto">
        {user ? (
          <span className="text-white mr-4">Hello, {user.name}</span>
        ) : (
          <Link
            to="/registration"
            className="bg-white text-teal-500 px-4 py-2 rounded-lg"
          >
            Sign In
          </Link>
        )}
        <button
          className="bg-white text-teal-500 px-4 py-2 rounded-lg"
          onClick={handleClick}
        >
          Log Out
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
