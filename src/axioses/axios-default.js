import axios from 'axios'

const instance = axios.create({
    baseURL : process.env.REACT_APP_API_URL,
    withCredentials : true
})

instance.interceptors.response.use(function (response) {
    // sukses sini
    return response;
  }, function (err) {
    if(err.response.data.message==='jwt expired'){
        window.location.href = '/logout'
    }
    return Promise.reject(err);
  });

export default instance