import { Account } from './Account.js'
import { Client } from '../Client/Client.js'

describe('Account', () => {
  test("Check if the Account instance is made correctly.", () => {
    const account = new Account()
    expect(account instanceof Account).toBe(true)
  })

  test("Create account with valid data", () => {
    // Account number (5 digits), agency(4 digits), balance (positive value)
    const account = new Account()
    expect(account.createAccount('12345', '1313', 500)).toBe('Account created successfully')
    expect(account.getBalance()).toBe(500)
  })

  test("Create account with invalid data", () => {
    try {
      const account = new Account()
      account.createAccount('1234', '1313', 500)
    } catch (error) {
      expect(error.message).toEqual('Invalid data for registration')
    }
  })

  test("Deposit of $100.", () => {
    const account = new Account(new Client('Renata', '37761514046', 456, 7000), '12345', '1313', 700)
    account.deposit(100)
    expect(account.getBalance()).toBe(800)
  })

  test("Deposit of -$100.", () => {
    const account = new Account(new Client('Renata', '37761514046', 456, 7000), '12345', '1313', 700)
    expect(() => account.deposit(-100)).toThrow("It is not possible to deposit negative values.")
    expect(account.getBalance()).toBe(700)
  })

  test("Deposit with non-numeric value.", () => {
    const account = new Account(new Client('Renata', '37761514046', 456, 7000), '12345', '1313', 700)
    expect(() => account.deposit(true)).toThrow("Cannot deposit non-numeric values.")
    expect(account.getBalance()).toBe(700)
  })

  test("Withdrawal of $100.", () => {
    const account = new Account(new Client('Renata', '37761514046', 456, 7000), '12345', '1313', 700)
    account.withdrawal(100)
    expect(account.getBalance()).toBe(600)
  })

  test("Withdrawal over limit.", () => {
    try {
      const account = new Account(new Client('Renata', '37761514046', 456, 7000), '12345', '1313', 700)
      account.withdrawal(1100)
    } catch (error) {
      expect(error.message).toEqual('Insufficient funds!')
    }
  })

  test("Transfer to another account with success.", () => {
    const account1 = new Account(new Client('Renata', '37761514046', 456, 7000), '12345', '1313', 700)
    const account2 = new Account(new Client('Sayuri', '48929529599', 7898, 5000), '55555', '8989', 500)
    account1.transferTo(account2, '48929529599', 120)


      expect(account2.getBalance()).toBe(620)
  })

  test("Should return error with if transfer with insufficient funds", () => {
    try {
      const account1 = new Account(new Client('Renata', '37761514046', 456, 7000), '12345', '1313', 700)
      const account2 = new Account(new Client('Sayuri', '48929529599', 7898, 5000), '55555', '8989', 500)
      account1.transferTo(account2, 1500)
    } catch (error) {
      expect(error.message).toEqual('Insuficcient funds to transfer')
    }
  })

  test("Transfer to another account with success.", () => {
    const account1 = new Account(new Client('Renata', '37761514046', 456, 7000), '12345', '1313', 700)
    const account2 = new Account(new Client('Sayuri', '48929529599', 7898, 5000), '55555', '8989', 500)
    account2.createPixKey('email', 'renata@email.com')
    account1.pixTo(account2, 'renata@email.com', 100)
    expect(account2.getBalance()).toBe(600)
})

  test("Create pix key with cpf.", () => {
    const account1 = new Account(new Client('Renata', '37761514046', 456, 7000), '12345', '1313', 700)
   account1.createPixKey('cpf', '37761514046')
   expect(account1.pixKeys).toEqual(['37761514046'])
  })

  test("Create pix key with invalid cpf", () => {
    try {
      const account1 = new Account(new Client('Renata', '37761514046', 456, 7000), '12345', '1313', 700)

      account1.createPixKey('cpf', '377615140466')
    } catch (error) {
      expect(error.message).toEqual('Invalid cpf!')
    }
  })

  test("Create pix key with email.", () => {
    const account = new Account(new Client('Renata', '37761514046', 456, 7000), '12345', '1313', 700)
    account.createPixKey('email', 'renata@email.com')
   expect(account.pixKeys).toEqual(['renata@email.com'])
  })

  test("Create pix key with invalid email", () => {
    try {
      const account = new Account(new Client('Renata', '37761514046', 456, 7000), '12345', '1313', 700)
      account.createPixKey('email', 'renataemail.com')
    } catch (error) {
      expect(error.message).toEqual('Invalid email!')
    }
  })

  test("Create pix key with tel.", () => {
    const account = new Account(new Client('Renata', '37761514046', 456, 7000), '12345', '1313', 700)
    account.createPixKey('tel', '44998765432')
   expect(account.pixKeys).toEqual(['44998765432'])
  })

  test("Create pix key with invalid tel", () => {
    try {
      const account = new Account(new Client('Renata', '37761514046', 456, 7000), '12345', '1313', 700)
      account.createPixKey('tel', '998765432')
    } catch (error) {
      expect(error.message).toEqual('Invalid tel!')
    }
  })
})