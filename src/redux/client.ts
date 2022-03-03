import axios from 'axios';

const localhostUrl = 'http://localhost:3000/Api';
const productionUrl = 'https://dev-app.hustlegotreal.com/Api';
const baseURL = process.env.NODE_ENV === 'production' ? productionUrl : localhostUrl;

export const client = axios.create({
  baseURL,
  validateStatus: (status) => (status >= 200 && status <= 404) || status === 500 || status === 452
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

client.interceptors.response.use(config =>{
  return config;
}, (error) => Promise.reject(error));