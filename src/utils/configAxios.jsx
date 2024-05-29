import axios from "axios";

const instance = axios.create({
  baseURL: "https://jwt-project-5.onrender.com/api/",
});

export default instance;
