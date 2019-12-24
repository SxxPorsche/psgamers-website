import axios, {AxiosRequestConfig} from "axios"
import {object} from "prop-types";


interface ServiceProps {
    host: string
}

export default class BaseService {
    config: AxiosRequestConfig;

    constructor(props: ServiceProps) {
        this.config = new class implements AxiosRequestConfig {
            baseURL: string = props.host;
        };
    }

    protected get = (uri : string) => {
        return axios.get(uri, this.config)
    };

    protected post = (uri: string, data? : object) => {
        return axios.post(uri, object, this.config)
    };

    protected delete = (uri: string) => {
        return axios.delete(uri);
    };

    protected put = (uri: string, data?: object) => {
        return axios.put(uri, data);
    }
}