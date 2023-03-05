import axios from 'axios'
const API_URL = 'http://localhost:3001';
const token =  localStorage.getItem('token')


const instance = axios.create(
    {
        baseURL:API_URL,
        headers: {
            'Authorization': token ? `Bearer ${ localStorage.getItem('token')}` : null
        }
    }
    
)
export default instance
