import { describe, it, expect } from 'vitest'
import { createPhoenixAPI, PhoenixClient, PhoenixAPI } from '../index'

describe('Package exports', () => {
  it('exports createPhoenixAPI function', () => {
    expect(typeof createPhoenixAPI).toBe('function')
  })

  it('exports PhoenixClient class', () => {
    expect(typeof PhoenixClient).toBe('function')
  })

  it('exports PhoenixAPI class', () => {
    expect(typeof PhoenixAPI).toBe('function')
  })

  it('createPhoenixAPI returns PhoenixAPI instance', () => {
    const api = createPhoenixAPI()
    expect(api).toBeInstanceOf(PhoenixAPI)
  })

  it('createPhoenixAPI accepts config', () => {
    const config = { baseURL: '192.168.1.100' }
    const api = createPhoenixAPI(config)
    expect(api).toBeInstanceOf(PhoenixAPI)
  })
})
