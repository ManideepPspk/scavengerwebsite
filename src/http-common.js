import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4500",
  //baseURL: "https://warm-island-56693.herokuapp.com",
  headers: {
    "Content-type": "application/json"
  }
});
