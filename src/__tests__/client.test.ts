/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { PhoenixClient } from '../client'

vi.mock('axios', () => ({
  default: {
    create: vi.fn(),
  },
}))
const mockedAxios = axios as any

describe('PhoenixClient', () => {
  let client: PhoenixClient

  beforeEach(() => {
    vi.clearAllMocks()
    mockedAxios.create.mockReturnValue({
      request: vi.fn(),
    } as any)
    client = new PhoenixClient()
  })

  it('creates axios instance with default config', () => {
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'http://localhost:8022/phoenix',
      maxBodyLength: Infinity,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })

  it('creates axios instance with custom config', () => {
    new PhoenixClient({
      baseURL: 'https://phoenix-host',
      timeout: 60000,
      headers: { Authorization: 'Bearer token' },
    })

    expect(mockedAxios.create).toHaveBeenLastCalledWith({
      baseURL: 'https://phoenix-host:8022/phoenix',
      maxBodyLength: Infinity,
      timeout: 60000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer token',
      },
    })
  })

  it('makes request without retry', async () => {
    const mockResponse = { data: 'test', status: 200 }
    const mockAxiosInstance = {
      request: vi.fn().mockResolvedValue(mockResponse),
    }
    mockedAxios.create.mockReturnValue(mockAxiosInstance as any)

    client = new PhoenixClient()
    const result = await client.request('GET', '/test')

    expect(mockAxiosInstance.request).toHaveBeenCalledWith({
      method: 'GET',
      url: '/test',
      data: undefined,
    })
    expect(result).toBe(mockResponse)
  })
})
