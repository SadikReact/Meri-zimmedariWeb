import axios from "axios";

const instance = axios.create({
  baseURL: "https://face-auth.merizimmedari.com/",
});

export default instance;
