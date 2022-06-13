import axios, { AxiosRequestConfig } from 'axios';
import { toastAlert } from 'src/utils/toastAlert';
import dotenv from 'dotenv';

dotenv.config();
const url = 'https://hgrapi.hustlegotreal.com';
//export const url = 'https://localhost:5001';
export const client = axios.create({
  baseURL: `${url}/api`,
  validateStatus: (status) => (status >= 200 && status <= 404) || status <= 500
});

client.interceptors.request.use(
  async (req: AxiosRequestConfig) => {
    const channelId = localStorage.getItem('channelId');
    const token = localStorage.getItem('Authorization');
    if (token) {
      req.headers = {
        Authorization: `Bearer ${token}`,
        channel: channelId!,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Expose-Headers': '*',
        ...req.headers
      };
    }
    return req;
  },

  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (res) => {
    if (res.status === 500) {
      toastAlert(res.data.response_errors.error.description, 'error');
    } else if (res.status === 404) {
      toastAlert(res.data.response_errors.error.description, 'error');
    } else if (res.status === 409) {
      toastAlert(res.data.response_errors.error[0].description, 'error');
    }
    return res;
  },
  (error) => Promise.reject(error)
);
