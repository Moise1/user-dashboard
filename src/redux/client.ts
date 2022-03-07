import axios from 'axios';
import { toastAlert } from 'src/utils/toastAlert';

const localhostUrl = 'http://localhost:3000';
const productionUrl = 'https://dev-app.hustlegotreal.com';
const url = process.env.NODE_ENV === 'production' ? productionUrl : localhostUrl;

export const client = axios.create({
  baseURL: `${url}/Api`,
  validateStatus: (status) => (status >= 200 && status <= 404) || status <= 500
});

client.interceptors.request.use(config =>{

  config.headers = {    
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  return config;
},

(error) => Promise.reject(error)
);

client.interceptors.response.use(res =>{
  if(res.status === 500){
    toastAlert(res.statusText, 'error');
  }else if(res.status === 404){
    toastAlert(res.data.response_errors.error, 'error');
  }
  return res;
}, (error) => Promise.reject(error)); 