import axios from "axios";

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    timeout: 3000
})

// let refreshTokenPromise = Promise<

export default api