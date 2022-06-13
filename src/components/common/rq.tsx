import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import { CreateCheckoutSessionRequest } from '../subscriptions/models/types';
import { url } from '../../redux/client';
const toastEl = document.createElement('div');
toastEl.id = 'toast-injected-container';
document.body.appendChild(toastEl);
ReactDOM.render(<ToastContainer enableMultiContainer={false} containerId="rq-toast-container" />, toastEl);

export class rq {
  public state;

  constructor(baseUrl: string) {
    this.state = {
      base: baseUrl
    };
  }

  //#region Static / helpers
  static wait = (ms: number) =>
    new Promise<string>((res) => {
      return setTimeout(res, ms, 'timeout');
    });
  static timeoutCall = (url: string, rs: Promise<Response>, timeoutMs: number) => {
    const timeout = rq.wait(timeoutMs);
    return Promise.race([rs, timeout]).then((result) => {
      if (typeof result === 'string') {
        // rs.cancel  es6 cannot cancel a promise chain...
        throw `Timeout calling ${url} after ${timeoutMs}ms`;
      }
      if (!result.ok) {
        throw { message: 'Status code not ok', result: result };
      }
      return result;
    });
  };
  public static getJson<T>(url: string, timeoutMs = 60000): Promise<T> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    const rs = fetch(url, { method: 'get', headers: headers });

    try {
      return rq.timeoutCall(url, rs, timeoutMs).then((result) => (result.json()) as unknown as T);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  public static postJson<TResponse>(Url: string, bodyObject: CreateCheckoutSessionRequest, timeoutMs = 60000): Promise<TResponse> {
    const headers = new Headers();
    const channelId = localStorage.getItem('channelId');
    const token = localStorage.getItem('Authorization');
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
      headers.append('channel', channelId!);
    }

    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', '*');
    headers.append('Access-Control-Expose-Headers', '*');
    headers.append('Access-Control-Allow-Methods', '*');
    headers.append('Access-Control-Allow-Methods', '*');
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    console.log('bodyObject');
    console.log(bodyObject);
    Url = `${url}/api/` + Url;
    const rs = fetch(Url, { method: 'post', headers: headers, body: JSON.stringify(bodyObject) });

    try {
      return rq.timeoutCall(Url, rs, timeoutMs).then((result) => (result.json()) as unknown as TResponse);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  //#endregion

}
