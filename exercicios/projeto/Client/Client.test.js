import { Account } from '../Account/Account.js'
import { Client } from './Client.js'

describe('Client', () => {
  test('Check if Client instance is done correctly.', () => {
    const client = new Client()
    expect(client instanceof Client).toBe(true)
  })

  test('Should register client with valid data.', () => {
    const client = new Client()
    const account = new Account()
    expect(client.registerClient('Mariana', '111222333-66', account, 7000)).toBe("Registered Client.")
  })

  test('Should not register client with invalid data.', () => {
    const client = new Client()
    expect(() => client.registerClient('Mariana', '111222333-66', null, 7000)).toThrow("Registration error. Invalid data.")
  })
})