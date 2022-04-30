import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Access-Control-Allow-Origin": "http://localhost:8080",
        "Access-Control-Allow-Credentials": true,
        "Content-type": "application/json"
    },
    withCredentials: true
});