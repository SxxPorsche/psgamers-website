import axios from 'axios';

function createFormData(data?: object) {
  if(data) {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, (data as any)[key]);
    });
  }
}

class BaseService {
  public get = (url: string, params?: object) => {
    return axios.get(url, {
      params,
    });
  };

  public post = (url: string, data?: object) => {
    return axios.post(url, createFormData(data));
  };

  public delete = (url: string, params?: object) => {
    return axios.delete(url, {
      params,
    });
  };

  public put = (url: string, params?: object) => {
    return axios.put(url, {
      params,
    });
  };
}

export default new BaseService();
