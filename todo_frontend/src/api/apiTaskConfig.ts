import axios from 'axios'

const URL = import.meta.env.VITE_URL_API

const api = axios.create( {
    baseURL:`${URL}/tasks`,
    headers: {
        "Content-Type": "application/json",
    }
})

export default api;