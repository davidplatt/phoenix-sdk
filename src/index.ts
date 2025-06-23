import { PhoenixClient, PhoenixClientConfig } from './client'
import { PhoenixAPI } from './phoenix-sdk'

/**
 * Creates a new PhoenixAPI instance with the provided configuration.
 * This is a convenience factory function that creates a PhoenixClient and wraps it with PhoenixAPI.
 *
 * @param config - Optional configuration for the Phoenix client
 * @returns A new PhoenixAPI instance
 *
 * @example Local Connection
 * ```typescript
 * const api = createPhoenixAPI()
 * ```
 *
 * @example Remote Connection
 * ```typescript
 * const api = createPhoenixAPI({ baseURL: 'http://remoteHost', port: 8021 })
 * ```
 */
export function createPhoenixAPI(config?: PhoenixClientConfig) {
  const client = new PhoenixClient(config)
  return new PhoenixAPI(client)
}

export {
  PhoenixClient,
  type PhoenixClientConfig,
  type RetryConfig,
} from './client'
export { PhoenixAPI } from './phoenix-sdk'
export * from './types/phoenix-types'
export * from './errors'
