import axios from "axios";

const API = axios.create({

    baseURL: "https://recruitment-assessment-main.vercel.app/api/"

});

export default API;
