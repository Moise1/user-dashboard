import axios from 'axios';

export const client = axios.create({
  withCredentials:true,
  baseURL: 'http://dev-app.hustlegotreal.com/Api',
  validateStatus: (status) => (status >= 200 && status <= 404) || status === 500 || status === 452
});

client.interceptors.request.use(config =>{
  //document.cookie = '.AspNetCore.Session=CfDJ8PyoDRlL5htBtZvy1VW6hqBZHDIvXLeWUKD7M%2FnwhwVhuJXrlJeSv1hyZ9LuHYH6cqNd8%2BeBx4JRfnFKPb4nuLG7w3mrjs1Eblyk%2F3ubnTD6piP1jjjRNc8DD0rDSnEdQmk3OyFKGky4LLh1N1%2Fj35XVkeqW%2BZ7NgNoZ42oyLKi7; Path=/; Expires=Sat, 11 Feb 2023 08:33:59 GMT';
  //document.cookie = 'hgr_ss=CfDJ8PyoDRlL5htBtZvy1VW6hqCrN73v1Jom8lJK8lC7ZbwmVBeyvtuhIzpSpuh43X6edG0kmTpVhORk6IiKyO-7RCSlEgAf_wVmW3kPdGfSRJDnvFXrnCrEYHFlS8wnUhcNGDxA51ROUQ8-cUVsCEKOQ90; Path=/; Expires=Sat, 11 Feb 2023 08:33:59 GMT';
  //document.cookie = '_gid=GA1.2.1075893556.1644216987; Path=/; Expires=Sat, 11 Feb 2023 08:33:59 GMT';
  //document.cookie = '_ga=GA1.2.599583628.1642747805; Path=/; Expires=Sat, 11 Feb 2023 08:33:59 GMT';
  //document.cookie = 'ajs_anonymous_id=%22790cfc8f-c87f-4203-9264-feb272f0b4f9%22; Path=/; Expires=Sat, 11 Feb 2023 08:33:59 GMT=value; Path=/; Expires=Sat, 11 Feb 2023 08:33:59 GMT';
  //document.cookie = '__hssrc=1; Path=/; Expires=Sat, 11 Feb 2023 08:33:59 GMT';
  //document.cookie = '.AspNetCore.Identity.Application=CfDJ8PyoDRlL5htBtZvy1VW6hqBqEVQ_-2Mkn-F7j62tQLKNRGPlmQUC1MHrL56VfGzdfSPC6E8V1x7Iq6Oh-NDAUDRT8tn9CwP1kmqLru3KSsyBaISm_Hk_4Ng-ESXdA2Z-dTW0H9nY2WEj3tGgui5_C4DLteSsbv2ldcfIO7UoDx5RVPdllMGk_Z7QYX8OShCN0pu_aocTw8rGfDMpueOuXQv8q-waJf9t3jMF-R2c88SB3HbzEIhuKczlv6sGFzpn_LBvHup5lg-ws3jsSWCBdqula70EyP5CgBXiFtFW2YHAvwNaLcTKZnnt0ZPHx32is2RdliwYb7DGMo0Zi0pJeGq5YzNwitlghCvzcZRaSjLSAPw9qGjWFaJLaHrAYZlX3jJv5xrTvDTKZkZfH8RkwCbhpsMwjnD3D_KOgDqSDm-85BPqFaUd4fFhfaK9chm4CR2PdyRPTAitLkkKJVpXWnyREddORUDeNNuQeoKGqyqTGYrSsV37F9osM1L1siOoE4G8pu7O2VFQpZgAEIVLHvrG8sdN85AVYoFh3Ymy61WeZqiNCxzW-na22HaET3kWe2I54pPSL-MazkaksoqfaHlnEnKgKfYlrvRtS1kCW8cdtr5bvbBWnDQo9UPQxDIT5Z_n2xmt--ZoY0ztSLkx_5HvT0bwEOr0izrXQsT4WJwLpPBlafectxkBXKX37CTXRZFGeL30fQdhMApupyPP8wcPmqRvW6YpKFi5xc63-8ah7eJGNZ1uLxTrtVAWqFwx6VFfkDOsTbg_Ka3MnsKAVxDh0ik5UI1Els3XgatZ2vILwIjBz8nZyojVrxihr1BGsuP8TDZDe-rO8f1D7eXJ2yCcrsloRdQVJmBNh2b7STR0ALUGL_1gxAXHmA7Ht30PnFURf84RjPYORmCc4TQhDFMl-wYv1XYzzHp_eN5YtTqVsbg4Q0GBE6f56P86DxeMPxctH9wmMJxTZwkKkS7E2K6UtCucGbd1Ax4PHs14aOytyyO67SCxBunlFee21f4N4w; Path=/; Expires=Sat, 11 Feb 2023 08:33:59 GMT';
  //document.cookie = 'hubspotutk=43e14e89aecbb43345899fc2ad16042f; Path=/; Expires=Sat, 11 Feb 2023 08:33:59 GMT';
  //document.cookie ='amplitude_idundefinedloom.com=eyJvcHRPdXQiOmZhbHNlLCJzZXNzaW9uSWQiOm51bGwsImxhc3RFdmVudFRpbWUiOm51bGwsImV2ZW50SWQiOjAsImlkZW50aWZ5SWQiOjAsInNlcXVlbmNlTnVtYmVyIjowfQ==; Path=/; Expires=Sat, 11 Feb 2023 08:33:59 GMT';
  //document.cookie ='_gcl_au=1.1.1025817301.1643114136; Path=/; Expires=Sat, 11 Feb 2023 08:33:59 GMT';
  //document.cookie = '_ga=GA1.2.1292306934.1643114136; Path=/; Expires=Sat, 11 Feb 2023 08:33:59 GMT';
  //document.cookie = 'mkjs_group_id=null; Path=/; Expires=Sat, 11 Feb 2023 08:33:59 GMT';
  //document.cookie = 'intercom-id-cgfc6jcc=1eeca772-bdc2-4c9e-b057-17f3b88efa45; Path=/; Expires=Sat, 11 Feb 2023 08:33:59 GMT';
  //document.cookie = '_fbp=fb.1.1643114137205.1387819194; Path=/; Expires=Sat, 11 Feb 2023 08:33:59 GMT';
 
  //   console.log('INTERCEPTOR REQUEST', config);
  return config;
},
(error) => Promise.reject(error)
);


client.interceptors.response.use(config =>{
//   console.log('INTERCEPTOR RESPONSE', config);
  return config;
}, (error) => Promise.reject(error));