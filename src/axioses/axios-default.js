import axios from 'axios'

const instance = axios.create({
    // baseURL : process.env.REACT_APP_API_URL
    baseURL : 'http://127.0.0.1:3001'
})

export default instance