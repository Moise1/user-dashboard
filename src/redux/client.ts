import axios from 'axios';
const origin = (process.env.NODE_ENV !== 'development') ? process.env.REACT_APP_HGR_WEB_URL as string : window.location.origin;

export const client = axios.create({
  withCredentials:true,
  baseURL: `${origin}/Api`,
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