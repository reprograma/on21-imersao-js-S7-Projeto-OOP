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
    expect(() => client.registerClient('Renata', '111222333-66', null, 7000)).toThrow("Registration error. Invalid data.")
  })
})
// import { Account } from '../Account/Account.js'
// import { Client } from './Client.js'

// describe('Client', () => {
//     test('Check if the client instance is done correctly', () => {
//         const client = new Client()
//         expect(client instanceof Client).toBe(true)
//     })

//     test('register client with valid data', () => {
//         const account = new Account()
//         const client = new Client();
//         console.log(client);
//         expect(client.registerClient('Renata', '11122233344', account, 5000)).toBe('Client registered successfully')
        
//     })

//     test('try to register client with invalid data', () => {
//         try {
//             const client = new Client();
//             expect(client.registerClient('Renata', '123456789', 'not account', 5000))
//           } catch (error) {
//             expect(error.message).toEqual('Registration error: invalid data')
//           }
//         })
    
// })
