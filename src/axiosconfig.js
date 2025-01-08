import axios from 'axios';

const axiosbase = axios.create({
    baseurl: 'http://localhost:7048/'
});
export default axiosbase;