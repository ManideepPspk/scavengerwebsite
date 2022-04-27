import axios from "axios";

export default axios.create({
  baseURL: "https://warm-island-56693.herokuapp.com",
  headers: {
    "Content-type": "application/json"
  }
});
