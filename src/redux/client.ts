import axios from 'axios';

const localhostUrl = 'http://localhost:3000';
const productionUrl = 'https://newweb.hustlegotreal.net';
const originalUrl = process.env.NODE_ENV === 'production' ? productionUrl : localhostUrl;
export const client = axios.create({
  withCredentials:true,
  baseURL: `${originalUrl}`,
  validateStatus: (status) => (status >= 200 && status <= 404) || status === 500 || status === 452
});

client.interceptors.request.use(config =>{
  return config;
},
(error) => Promise.reject(error)
);

client.interceptors.response.use(config =>{
  return config;
}, (error) => Promise.reject(error));