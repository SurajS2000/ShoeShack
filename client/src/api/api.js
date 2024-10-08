import axios from 'axios'
import Cookies from 'js-cookie'

const token = Cookies.get('token');

const base_url = process.env.BASE_URL;

const privateInstance = axios.create({
    baseURL: base_url,
    headers:{
        'Authorization': `Bearer ${token}`,
    }
});
const publicInstance = axios.create({
    baseURL: base_url
});

export {privateInstance,publicInstance}