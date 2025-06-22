/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { PhoenixAPI } from '../phoenix-sdk'
import type { PhoenixClient } from '../client'

const mockRequest = vi.fn()
const mockClient = {
  request: mockRequest,
} as any as PhoenixClient

describe('PhoenixAPI', () => {
  let api: PhoenixAPI

  beforeEach(() => {
    vi.clearAllMocks()
    api = new PhoenixAPI(mockClient)
  })

  it('calls getJobs with correct parameters', async () => {
    const mockResponse = { data: [], status: 200 }
    mockRequest.mockResolvedValue(mockResponse)

    const result = await api.getJobs()

    expect(mockRequest).toHaveBeenCalledWith('GET', '/jobs/')
    expect(result).toBe(mockResponse)
  })

  it('calls createJob with correct parameters', async () => {
    const mockResponse = { data: { success: true }, status: 200 }
    const jobRequest = { id: 'test-job', name: 'Test Job' }
    mockRequest.mockResolvedValue(mockResponse)

    const result = await api.createJob(jobRequest)

    expect(mockRequest).toHaveBeenCalledWith(
      'POST',
      '/jobs',
      jobRequest,
      undefined
    )
    expect(result).toBe(mockResponse)
  })

  it('calls getJob with correct parameters', async () => {
    const mockResponse = { data: { success: true }, status: 200 }
    mockRequest.mockResolvedValue(mockResponse)

    const result = await api.getJob('project-123')

    expect(mockRequest).toHaveBeenCalledWith('GET', '/jobs/project-123')
    expect(result).toBe(mockResponse)
  })

  it('calls exportJson with retry config', async () => {
    const mockResponse = { data: { success: true }, status: 200 }
    const exportRequest = { path: '~/Desktop/project.json' }
    const retryConfig = { timeoutMinutes: 10 }
    mockRequest.mockResolvedValue(mockResponse)

    const result = await api.exportJson(
      'project-123',
      exportRequest,
      retryConfig
    )

    expect(mockRequest).toHaveBeenCalledWith(
      'POST',
      '/jobs/project-123/export/report/json',
      exportRequest,
      retryConfig
    )
    expect(result).toBe(mockResponse)
  })
})
