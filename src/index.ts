import { PhoenixClient, PhoenixClientConfig } from './client'
import { PhoenixAPI } from './phoenix-sdk'

// Convenience factory function
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
