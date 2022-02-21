import axios from 'axios';

// const {REACT_APP_HOST} = process.env;
const {host} = window.location;
// console.log('WINDOW LOCATION', window.location.host);
export const client = axios.create({
  withCredentials:true,
  baseURL: `${host}/Api`,
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