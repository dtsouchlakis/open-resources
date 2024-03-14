import axios, { AxiosRequestConfig } from "axios";

class ServiceBase {
  constructor(public name: string, public baseUrl: string) {}

  async get<T>(config?: AxiosRequestConfig<T>) {
    let res = await axios.get<T[]>(this.baseUrl, config);
    return res.data;
  }

  async post<T>(config?: AxiosRequestConfig<T>, data?: T) {
    let res = await axios.post<T>(this.baseUrl, data, config);
    return res.data;
  }

  async put<T>(config?: AxiosRequestConfig<T>, data?: T) {
    let res = await axios.put<T>(this.baseUrl, data, config);
    return res.data;
  }

  async delete<T>(config?: AxiosRequestConfig<T>) {
    let res = await axios.delete<T>(this.baseUrl, config);
    return res.data;
  }
}

export default ServiceBase;
