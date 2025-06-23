/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AxiosError } from 'axios'
import { components } from './types/phoenix-types'

/**
 * Base class for all Phoenix SDK errors
 */
export class PhoenixError extends Error {
  public readonly code: string
  public readonly statusCode?: number
  public readonly details?: unknown

  constructor(
    message: string,
    code: string,
    statusCode?: number,
    details?: unknown
  ) {
    super(message)
    this.name = 'PhoenixError'
    this.code = code
    this.statusCode = statusCode
    this.details = details
  }
}

/**
 * Error thrown when a project already exists
 */
export class ProjectExistsError extends PhoenixError {
  constructor(projectId: string) {
    super(`Project already exists with ID: ${projectId}`, 'PROJECT_EXISTS', 409)
    this.name = 'ProjectExistsError'
  }
}

/**
 * Error thrown when a resource is not found
 */
export class ResourceNotFoundError extends PhoenixError {
  constructor(resource: string, id: string) {
    super(`${resource} not found: ${id}`, 'RESOURCE_NOT_FOUND', 404)
    this.name = 'ResourceNotFoundError'
  }
}

/**
 * Error thrown when validation fails
 */
export class ValidationError extends PhoenixError {
  constructor(message: string, details?: unknown) {
    super(message, 'VALIDATION_ERROR', 400, details)
    this.name = 'ValidationError'
  }
}

/**
 * Error thrown when server is unavailable or overloaded
 */
export class ServiceUnavailableError extends PhoenixError {
  public readonly retryAfter?: number

  constructor(retryAfter?: number) {
    super(
      retryAfter
        ? `Service unavailable. Retry after ${retryAfter} seconds.`
        : 'Service unavailable',
      'SERVICE_UNAVAILABLE',
      503
    )
    this.name = 'ServiceUnavailableError'
    this.retryAfter = retryAfter
  }
}

/**
 * Error thrown when request times out
 */
export class TimeoutError extends PhoenixError {
  constructor(timeoutMinutes: number) {
    super(`Request timeout exceeded: ${timeoutMinutes} minutes`, 'TIMEOUT', 408)
    this.name = 'TimeoutError'
  }
}

/**
 * Error thrown when authentication fails
 */
export class AuthenticationError extends PhoenixError {
  constructor(message = 'Authentication failed') {
    super(message, 'AUTHENTICATION_ERROR', 401)
    this.name = 'AuthenticationError'
  }
}

/**
 * Error thrown when authorization fails
 */
export class AuthorizationError extends PhoenixError {
  constructor(message = 'Access denied') {
    super(message, 'AUTHORIZATION_ERROR', 403)
    this.name = 'AuthorizationError'
  }
}

/**
 * Error thrown when rate limit is exceeded
 */
export class RateLimitError extends PhoenixError {
  public readonly retryAfter?: number

  constructor(retryAfter?: number) {
    super(
      retryAfter
        ? `Rate limit exceeded. Retry after ${retryAfter} seconds.`
        : 'Rate limit exceeded',
      'RATE_LIMIT_ERROR',
      429
    )
    this.name = 'RateLimitError'
    this.retryAfter = retryAfter
  }
}

/**
 * Converts an Axios error to a Phoenix SDK error
 */
export function handleAxiosError(error: AxiosError): PhoenixError {
  const response = error.response
  const status = response?.status
  const data = response?.data as
    | components['schemas']['ResponseEntity']
    | undefined

  // Extract error message from Phoenix API response
  const phoenixErrors = data?.errors
  const primaryError = phoenixErrors?.[0]
  const errorMessage = primaryError?.text || error.message

  // Handle specific HTTP status codes
  switch (status) {
    case 400:
      return new ValidationError(errorMessage, phoenixErrors)

    case 401:
      return new AuthenticationError(errorMessage)

    case 403:
      return new AuthorizationError(errorMessage)

    case 404:
      return new ResourceNotFoundError('Resource', errorMessage)

    case 409:
      // Check if it's a project exists error
      if (errorMessage.includes('Project already exists')) {
        const projectIdMatch = errorMessage.match(/ID\s+(\S+)/)
        const projectId = projectIdMatch?.[1] || 'unknown'
        return new ProjectExistsError(projectId)
      }
      return new PhoenixError(errorMessage, 'CONFLICT', 409, phoenixErrors)

    case 429:
      const retryAfter = response?.headers?.['retry-after']
      const retrySeconds = retryAfter ? parseInt(retryAfter, 10) : undefined
      return new RateLimitError(retrySeconds)

    case 503:
      const serviceRetryAfter = response?.headers?.['retry-after']
      const serviceRetrySeconds = serviceRetryAfter
        ? parseInt(serviceRetryAfter, 10)
        : undefined
      return new ServiceUnavailableError(serviceRetrySeconds)

    case undefined:
      return new PhoenixError(
        errorMessage,
        'CONNECTION_ERROR',
        undefined,
        phoenixErrors
      )

    default:
      console.log('status:', error.status)
      console.log('Unhandled error:', error)
      return new PhoenixError(
        errorMessage,
        `HTTP_${status || 'UNKNOWN'}`,
        status,
        phoenixErrors
      )
  }
}

/**
 * Type guard to check if an error is a Phoenix SDK error
 */
export function isPhoenixError(error: unknown): error is PhoenixError {
  return error instanceof PhoenixError
}

/**
 * Type guard to check if an error is a specific Phoenix SDK error type
 */
export function isProjectExistsError(
  error: unknown
): error is ProjectExistsError {
  return error instanceof ProjectExistsError
}

export function isResourceNotFoundError(
  error: unknown
): error is ResourceNotFoundError {
  return error instanceof ResourceNotFoundError
}

export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError
}

export function isServiceUnavailableError(
  error: unknown
): error is ServiceUnavailableError {
  return error instanceof ServiceUnavailableError
}

export function isTimeoutError(error: unknown): error is TimeoutError {
  return error instanceof TimeoutError
}

export function isAuthenticationError(
  error: unknown
): error is AuthenticationError {
  return error instanceof AuthenticationError
}

export function isAuthorizationError(
  error: unknown
): error is AuthorizationError {
  return error instanceof AuthorizationError
}

export function isRateLimitError(error: unknown): error is RateLimitError {
  return error instanceof RateLimitError
}
