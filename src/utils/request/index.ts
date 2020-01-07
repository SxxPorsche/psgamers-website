import axios from 'axios';

class BaseService {
  public get = (uri: string, params?: object) => {
    return axios.get(uri, {
      params,
    });
  };

  public post = (uri: string, params?: object) => {
    return axios.post(uri, {
      params,
    });
  };

  public delete = (uri: string, params?: object) => {
    return axios.delete(uri, {
      params,
    });
  };

  public put = (uri: string, params?: object) => {
    return axios.put(uri, {
      params,
    });
  };
}

export default new BaseService();
