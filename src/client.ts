/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios, { AxiosInstance, AxiosResponse } from 'axios'

export interface PhoenixClientConfig {
  baseURL?: string
  port?: number
  timeout?: number
  headers?: Record<string, string>
}

export interface RetryConfig {
  maxRetries?: number
  timeoutMinutes?: number
}

export class PhoenixClient {
  private client: AxiosInstance

  constructor(config: PhoenixClientConfig = {}) {
    const port = config.port || 8022
    const url = config.baseURL || `http://localhost`
    this.client = axios.create({
      baseURL: `${url}:${port}/phoenix`,
      maxBodyLength: Infinity,
      timeout: config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    })
  }

  async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    url: string,
    data?: any,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<T>> {
    const apiCall = () => this.client.request<T>({ method, url, data })

    if (retryConfig) {
      return this.retryRequest(apiCall, retryConfig)
    }

    return apiCall()
  }

  private async retryRequest<T>(
    apiCall: () => Promise<AxiosResponse<T>>,
    config: RetryConfig
  ): Promise<AxiosResponse<T>> {
    const start = Date.now()
    const timeoutMs = (config.timeoutMinutes || 10) * 60 * 1000

    while (true) {
      try {
        const response = await apiCall()

        if (response.status !== 503) {
          return response
        }

        const retryAfter = response.headers['retry-after']
        if (!retryAfter) {
          return response
        }

        const retrySeconds = parseInt(retryAfter, 10) || 30
        const elapsed = Date.now() - start

        if (elapsed >= timeoutMs) {
          throw new Error(
            `Request timeout exceeded: ${config.timeoutMinutes} minutes`
          )
        }

        const remainingMs = timeoutMs - elapsed
        const sleepMs = Math.min(remainingMs, retrySeconds * 1000)

        await this.wait(sleepMs)
      } catch (error: any) {
        if (error.response?.status === 503) {
          continue
        }
        throw error
      }
    }
  }

  private wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
