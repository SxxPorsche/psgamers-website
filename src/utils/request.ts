import axios from 'axios';

class BaseService {
  public get = (url: string, params?: object) => {
    return axios.get(url, {
      params,
    });
  };

  public post = (url: string, data?: object) => {
    const formData = new FormData();
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, (data as any)[key]);
      })
    }
    return axios.post(url, formData);
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
