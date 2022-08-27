import type { AxiosError, Method, ResponseType } from 'axios'
import requests from '@/api/request'

export interface HTTPConfig {
  url: string
  method: Method
  data?: Record<string, any>
  params?: Record<string, any>
  headers?: Record<string, any>
  responseType?: ResponseType
}

const useHttp = <T>(config: HTTPConfig): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    requests({
      url: config.url,
      method: config.method,
      data: config.data,
      params: config.params,
      headers: config.headers,
      responseType: config.responseType,
    })
      .then((resp) => {
        resolve(resp.data)
      })
      .catch((err: AxiosError) => {
        reject(err)
      })
  })
}

export default useHttp
