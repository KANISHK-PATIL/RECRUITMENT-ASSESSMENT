import axios from "axios";

// This is your backend URL
const API = axios.create({

    baseURL: "http://localhost:3000/api"

});

export default API;