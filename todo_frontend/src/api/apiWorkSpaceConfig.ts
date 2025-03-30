import axios from 'axios'

const URL = import.meta.env.VITE_URL_API

const api = axios.create( {
    baseURL:`${URL}/workspaces`,
    headers: {
        "Content-Type": "application/json",
    }
})

export default api;