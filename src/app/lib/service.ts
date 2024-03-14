import axios, { AxiosRequestConfig } from "axios";
import ServiceBase from "../models/ServiceBase";

class RequestsService {
  private service: {
    [name: string]: ServiceBase;
  } = {};

  constructor() {
    this.setService(new ServiceBase("users", "/api/user"));
    this.setService(new ServiceBase("holidays", "/api/holiday"));
    this.setService(new ServiceBase("employees", "/api/employee"));
  }

  protected setService(service: ServiceBase) {
    this.service[service.name] = service;
  }

  protected getService(name: string): ServiceBase {
    return this.service[name];
  }

  async getRequest<T>(name: string, config?: AxiosRequestConfig<T>) {
    const service = this.getService(name);
    return await service.get<T>(config);
  }

  async postRequest<T>(name: string, config?: AxiosRequestConfig<T>, data?: T) {
    const service = this.getService(name);
    return await service.post<T>(config, data);
  }

  async putRequest<T>(name: string, config?: AxiosRequestConfig<T>, data?: T) {
    const service = this.getService(name);
    return await service.put<T>(config, data);
  }

  async deleteRequest<T>(name: string, config?: AxiosRequestConfig<T>) {
    const service = this.getService(name);
    return await service.delete<T>(config);
  }
}

export default new RequestsService();
