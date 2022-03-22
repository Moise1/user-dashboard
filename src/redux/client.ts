import axios, { AxiosRequestConfig } from 'axios';
import { toastAlert } from 'src/utils/toastAlert';

const localhostUrl = 'http://localhost:3000';
const productionUrl = 'https://dev-app.hustlegotreal.com';
const url = process.env.NODE_ENV === 'production' ? productionUrl : localhostUrl;

export const client = axios.create({
  baseURL: `${url}/Api`,
  validateStatus: (status) => (status >= 200 && status <= 404) || status <= 500,
});
client.interceptors.request.use(
  async (req: AxiosRequestConfig) => {
    const channelId = localStorage.getItem('channelId');
    req.headers = {
      channel: channelId!,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
      'Accept': 'application/json',
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/json',
      'Access-Control-Expose-Headers': '*',
      ...req.headers
    };
    return req;
  },

  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (res) => {
    if (res.status === 500) {
      toastAlert(res.statusText, 'error');
    } else if (res.status === 404) {
      toastAlert(res.data.response_errors.error.description, 'error');
    } else if (res.status === 409) {
      toastAlert(res.data.response_errors.error[0].description, 'error');
    }
    return res;
  },
  (error) => Promise.reject(error)
);
