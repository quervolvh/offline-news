import Axios from 'axios';
const axios = Axios.create({
  withCredentials: true,
});


axios.interceptors.request.use(function (config) {

  return config;

});

export default axios;
