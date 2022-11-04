import { Account } from './Account.js'

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
    const account = new Account("Renata", "11122233344", '12345', '1234', 1000)
    account.deposit(100)
    expect(account.getBalance()).toBe(1100)
  })

  test("Deposit of -$100.", () => {
    const account = new Account("Renata", "11122233344", '12345', '1234', 1000)
    expect(() => account.deposit(-100)).toThrow("It is not possible to deposit negative values.")
    expect(account.getBalance()).toBe(1000)
  })

  test("Deposit with non-numeric value.", () => {
    const account = new Account("Renata", "11122233344", '12345', '1234', 1000)
    expect(() => account.deposit(true)).toThrow("Cannot deposit non-numeric values.")
    expect(account.getBalance()).toBe(1000)
  })

  test("Withdrawal of $100.", () => {
    const account = new Account("Renata", "11122233344", '12345', '1234', 1000)
    account.withdrawal(100)
    expect(account.getBalance()).toBe(900)
  })

  test("Withdrawal over limit.", () => {
    try {
      const account = new Account(1, 1, 1000)
      account.withdrawal(1100)
    } catch (error) {
      expect(error.message).toEqual('Insufficient funds!')
    }
  })

  test("Transfer to another account with success.", () => {
    const account1 = new Account("Renata", "11122233344", '12345', '1234', 1000)
    const account2 = new Account("Re", "11122233345", '12346', '1233', 2000)

      account1.transferTo(account2, '11122233345', 100)
      expect(account2.getBalance()).toBe(2100)
  })

  test("Should return error with if transfer with insufficient funds", () => {
    try {
      const account1 = new Account("12345", '0001', 1000)
      const account2 = new Account('54321', '0013', 2000)
      account1.transferTo(account2, 1500)
    } catch (error) {
      expect(error.message).toEqual('Insuficcient funds to transfer')
    }
  })

  test("Transfer to another account with success.", () => {
    const account1 = new Account("Renata", "11122233344", '12345', '1234', 1000)
    const account2 = new Account("Re", "11122233345", '12346', '1233', 2000)
    account2.createPixKey('email', 'renata@email.com')
    account1.pixTo(account2, 'renata@email.com', 100)
    expect(account2.getBalance()).toBe(2100)
})

  test("Create pix key with cpf.", () => {
    const account = new Account(1, 1, 1000)
   account.createPixKey('cpf', '111.222.333-44')
   expect(account.pixKeys).toEqual(['111.222.333-44'])
  })

  test("Create pix key with invalid cpf", () => {
    try {
      const account = new Account(1, 1, 1000)
      account.createPixKey('cpf', '111.222.33344')
    } catch (error) {
      expect(error.message).toEqual('Invalid cpf!')
    }
  })

  test("Create pix key with email.", () => {
    const account = new Account(1, 1, 1000)
   account.createPixKey('email', 'renata@email.com')
   expect(account.pixKeys).toEqual(['renata@email.com'])
  })

  test("Create pix key with invalid email", () => {
    try {
      const account = new Account(1, 1, 1000)
      account.createPixKey('email', 'renataemail.com')
    } catch (error) {
      expect(error.message).toEqual('Invalid email!')
    }
  })

  test("Create pix key with tel.", () => {
    const account = new Account(1, 1, 1000)
   account.createPixKey('tel', '44998765432')
   expect(account.pixKeys).toEqual(['44998765432'])
  })

  test("Create pix key with invalid tel", () => {
    try {
      const account = new Account(1, 1, 1000)
      account.createPixKey('tel', '998765432')
    } catch (error) {
      expect(error.message).toEqual('Invalid tel!')
    }
  })
})