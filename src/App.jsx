import { useState } from "react";
import "./App.css";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Home from "./components/Home/Home";
import SingleTour from "./components/Home/SingleTour";
import Reviews from "./components/Home/Reviews";
import ForgotPassword from "./components/Auth/forgotPassword";

function App() {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token")) || ""
  );

  console.log(token);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/registration"
          element={
            !token ? <Register setToken={setToken} /> : <Navigate to="/" />
          }
        />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/" element={<Home setToken={setToken} />} />
        <Route path="/:id" element={<SingleTour token={token} />} />
        <Route path="/:id/reviews" element={<Reviews token={token} />} />
        <Route
          path="/login/forgetpassword"
          element={<ForgotPassword token={token} />}
        />
      </Routes>

      {/* <Routes>
        <Route element={token ? <Home /> : <Navigate to="/login" />} path="/" />
      </Routes> */}
    </BrowserRouter>
  );
}

export default App;
