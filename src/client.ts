/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import { handleAxiosError, TimeoutError } from './errors'

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

/**
 * HTTP client for communicating with the Phoenix API.
 * Provides automatic retry logic and comprehensive error handling.
 */
export class PhoenixClient {
  private client: AxiosInstance

  /**
   * Creates a new PhoenixClient instance.
   *
   * @param config - Configuration options for the client
   * @param config.baseURL - Base URL for the Phoenix server (default: 'http://localhost')
   * @param config.port - Port number for the Phoenix server (default: 8022)
   * @param config.timeout - Request timeout in milliseconds (default: 30000)
   * @param config.headers - Additional headers to include with requests
   */
  constructor(config: PhoenixClientConfig = {}) {
    const port = config.port || 8022
    let url = config.baseURL || `http://localhost`

    // Ensure protocol is included
    if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
      url = `http://${url}`
    }
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

  /**
   * Makes an HTTP request to the Phoenix API.
   *
   * @template T - The expected response data type
   * @param method - HTTP method to use
   * @param url - API endpoint URL (relative to base URL)
   * @param data - Request payload data
   * @param retryConfig - Optional retry configuration for handling 503 responses
   * @returns Promise resolving to the HTTP response
   *
   * @example
   * ```typescript
   * const response = await client.request('GET', '/jobs')
   * const jobs = response.data
   * ```
   */
  async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    url: string,
    data?: any,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<T>> {
    const apiCall = () => this.client.request<T>({ method, url, data })

    try {
      if (retryConfig) {
        return await this.retryRequest(apiCall, retryConfig)
      }

      return await apiCall()
    } catch (error: any) {
      // Convert Axios errors to Phoenix errors
      if (axios.isAxiosError(error)) {
        throw handleAxiosError(error as AxiosError)
      }

      throw error
    }
  }

  /**
   * Handles automatic retry logic for API requests that return 503 (Service Unavailable).
   * Respects the 'retry-after' header and implements timeout handling.
   *
   * @template T - The expected response data type
   * @param apiCall - Function that makes the API call
   * @param config - Retry configuration
   * @param config.maxRetries - Maximum number of retry attempts
   * @param config.timeoutMinutes - Total timeout in minutes (default: 10)
   * @returns Promise resolving to the HTTP response
   * @throws TimeoutError when timeout is exceeded
   * @throws PhoenixError for other API errors
   *
   * @private
   */
  private async retryRequest<T>(
    apiCall: () => Promise<AxiosResponse<T>>,
    config: RetryConfig
  ): Promise<AxiosResponse<T>> {
    const start = Date.now()
    const timeoutMs = (config.timeoutMinutes || 10) * 60 * 1000
    const maxRetries = config.maxRetries ?? Infinity
    let retries = 0

    while (true) {
      try {
        const response = await apiCall()

        if (response.status !== 503) {
          return response
        }

        if (retries >= maxRetries) {
          return response
        }

        const retryAfterHeader = response.headers['retry-after']
        const retrySeconds = parseInt(retryAfterHeader, 10)
        const waitMs = isNaN(retrySeconds)
          ? Math.min(30000, 2000 * 2 ** retries + Math.random() * 1000)
          : retrySeconds * 1000

        const elapsed = Date.now() - start
        if (elapsed + waitMs >= timeoutMs) {
          throw new TimeoutError(config.timeoutMinutes || 10)
        }

        retries++
        await this.wait(waitMs)
      } catch (error: any) {
        if (error.response?.status === 503) {
          if (retries >= maxRetries) {
            throw error
          }

          const elapsed = Date.now() - start
          if (elapsed >= timeoutMs) {
            throw new TimeoutError(config.timeoutMinutes || 10)
          }

          const waitMs = Math.min(
            30000,
            2000 * 2 ** retries + Math.random() * 1000
          )
          retries++
          await this.wait(waitMs)
          continue
        }

        if (axios.isAxiosError(error)) {
          throw handleAxiosError(error as AxiosError)
        }

        throw error
      }
    }
  }

  /**
   * Utility method to wait for a specified number of milliseconds.
   *
   * @param ms - Number of milliseconds to wait
   * @returns Promise that resolves after the specified delay
   *
   * @private
   */
  private wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
