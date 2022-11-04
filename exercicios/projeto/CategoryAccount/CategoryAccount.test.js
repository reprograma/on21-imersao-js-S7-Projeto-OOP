import { Client } from '../Client/Client.js'
import { CategoryAccount } from "./CategoryAccount"

 describe('Category Account', () => {
  test("Check if the Standard Account instance is made correctly.", () => {
    const account1 = new CategoryAccount(new Client('Renata', '37761514046', 456, 2000), '12345', '1313', 700)
    expect(account1.category).toBe('standard')
  })

  test("Check if the Gold Account instance is made correctly.", () => {
    const account1 = new CategoryAccount(new Client('Renata', '37761514046', 456, 9000), '12345', '1313', 700)
    expect(account1.category).toBe('gold')
  })

  test("Check if the Premium Account instance is made correctly.", () => {
    const account1 = new CategoryAccount(new Client('Renata', '37761514046', 456, 900000), '12345', '1313', 700)
    expect(account1.category).toBe('premium')
  })

  test("Deposit of $100.", () => {
    const account1 = new CategoryAccount(new Client('Renata', '37761514046', 456, 900000), '12345', '1313', 700)
    account1.deposit(200)
    expect(account1.getBalance()).toBe(900)
  })

  test("Withdrawal of $100.", () => {
    const account1 = new CategoryAccount(new Client('Renata', '37761514046', 456, 900000), '12345', '1313', 700)
    account1.withdrawal(100)
    expect(account1.getBalance()).toBe(600)
  })

  test("Deposit of -$100.", () => {
    const account = new CategoryAccount(new Client('Renata', '37761514046', 456, 900000), '12345', '1313', 700)
    expect(() => account.deposit(-100)).toThrow("It is not possible to deposit negative values.")
    expect(account.getBalance()).toBe(700)
  })

  test("Deposit with non-numeric value.", () => {
    const account = new CategoryAccount(new Client('Renata', '37761514046', 456, 900000), '12345', '1313', 700)
    expect(() => account.deposit(true)).toThrow("Cannot deposit non-numeric values.")
    expect(account.getBalance()).toBe(700)
  })

  test("Withdrawal over limit.", () => {
    try {
      const account = new CategoryAccount(new Client('Renata', '37761514046', 456, 900000), '12345', '1313', 700)
      account.withdrawal(1100)
    } catch (error) {
      expect(error.message).toEqual('Insufficient balance to perform transaction.')
    }
  })

  test("Should create cpf pix key successfully", () => {
    const account = new CategoryAccount(new Client('Renata', '37761514046', 456, 900000), '12345', '1313', 700)
    account.createPixKey('cpf', '37761514046')
    expect(account.pixKeys).toEqual(['37761514046'])
  });

  test("Should create email pix key successfully", () => {
    const account = new CategoryAccount(new Client('Renata', '37761514046', 456, 900000), '12345', '1313', 700)
    account.createPixKey('email', 'renata@email.com')
    expect(account.pixKeys).toEqual(['renata@email.com'])
  });

  test("Should create tel pix key successfully", () => {
    const account = new CategoryAccount(new Client('Renata', '37761514046', 456, 900000), '12345', '1313', 700)
    account.createPixKey('tel', '44987654321')
    expect(account.pixKeys).toStrictEqual(['44987654321']);
  });

  test("Should not create pix key if invalid cpf is provided", () => {
    try {
        const account1 = new CategoryAccount(new Client('Renata', '37761514046', 456, 7000), '12345', '1313', 700)
  
        account1.createPixKey('cpf', '377615140466')
      } catch (error) {
        expect(error.message).toEqual('Invalid cpf!')
      }
  });

  test("Should not create pix key if invalid email is provided", () => {
    try {
        const account = new CategoryAccount(new Client('Renata', '37761514046', 456, 7000), '12345', '1313', 700)
        account.createPixKey('email', 'renataemail.com')
      } catch (error) {
        expect(error.message).toEqual('Invalid email!')
      }
  });

  test("Should not create pix key if invalid phone is provided", () => {
    try {
        const account = new CategoryAccount(new Client('Renata', '37761514046', 456, 7000), '12345', '1313', 700)
        account.createPixKey('tel', '998765432')
      } catch (error) {
        expect(error.message).toEqual('Invalid tel!')
      }
  });

  test("Should transfer $120.", () => {
    const account1 = new CategoryAccount(new Client('Renata', '37761514046', 456, 7000), '12345', '1313', 700)
    const account2 = new CategoryAccount(new Client('Re', '89756874211', 7898, 5000), '55555', '8989', 500)
    account1.transferTo(account2, '89756874211', 120)
    expect(account1.getBalance()).toBe(460)
    expect(account2.getBalance()).toBe(620)
  })

  test("Should transfer $120 by pix.", () => {
    const account1 = new CategoryAccount(new Client('Renata', '37761514046', 456, 7000), '12345', '1313', 700)
    const account2 = new CategoryAccount(new Client('Mari', '48929529599', 7898, 5000), '55555', '8989', 500)
    account2.createPixKey( 'cpf', '48929529599')
    account1.pixTo(account2, '48929529599', 120)
    expect(account1.getBalance()).toBe(460)
    expect(account2.getBalance()).toBe(620)
  })


  test("Should not transfer $120 due to insufficient balance.", () => {
    const account = new CategoryAccount(new Client('Renata', '37761514046', 456, 900000), '12345', '1313', 70)
    const account2 = new CategoryAccount(new Client('Re', '37761514888', 456, 9000), '12345', '1313', 70)
    expect(() => account.transferTo(account2, '37761514888', 120)).toThrow("Insuficcient funds to transfer");
  })

  test("Should not transfer when non-numeric value is provided.", () => {
    const account1 = new CategoryAccount(new Client('Renata', '37761514046', 456, 900000), '12345', '1313', 700)
    const account2 = new CategoryAccount(new Client('Re', '37761514888', 456, 9000), '12345', '1313', 7000)
    expect(() => account1.transferTo(account2, '37761514888', '120')).toThrow("Non-numeric values ​​not allowed for this transaction.");
  })

  test("Should not transfer when negative value is provided.", () => {
    const account1 = new CategoryAccount(new Client('Renata', '37761514046', 456, 900000), '12345', '1313', 700)
    const account2 = new CategoryAccount(new Client('Re', '37761514888', 456, 9000), '12345', '1313', 7000)
    expect(() => account1.transferTo(account2, '37761514888', -120)).toThrow("It is not possible to deposit negative values.");
  })

  test("Should not transfer when invalid cpf is provided.", () => {
    const account1 = new CategoryAccount(new Client('Renata', '37761514046', 456, 900000), '12345', '1313', 700)
    const account2 = new CategoryAccount(new Client('Re', '37761514888', 456, 9000), '12345', '1313', 7000)
    expect(() => account1.transferTo(account2, '377618', 120)).toThrow("Invalid cpf provided. Please check and try again!");
  })

  test("Should not transfer by pix due to insufficient balance.", () => {
    const account1 = new CategoryAccount(new Client('Renata', '37761514046', 456, 900000), '12345', '1313', 700)
    const account2 = new CategoryAccount(new Client('Mari', '37761514888', 456, 9000), '12345', '1313', 7000)
    account2.createPixKey('tel', '44987654321')
    expect(() => account1.pixTo(account2, '37761514888', 20000)).toThrow('Insuficcient funds to transfer');
  })

  test("Should not transfer by pix when negative value is provided.", () => {
    const account1 = new CategoryAccount(new Client('Renata', '37761514046', 456, 900000), '12345', '1313', 700)
    const account2 = new CategoryAccount(new Client('Re', '37761514888', 456, 9000), '12345', '1313', 7000)
    account2.createPixKey('cpf', '37761514046')
    expect(() => account1.pixTo(account2, '37761514888', -200)).toThrow('It is not possible to deposit negative values.');
  })

  test("Should not transfer by pix when non-numeric value is provided.", () => {
    const account1 = new CategoryAccount(new Client('Renata', '37761514046', 456, 900000), '12345', '1313', 700)
    const account2 = new CategoryAccount(new Client('Re', '37761514888', 456, 9000), '12345', '1313', 7000)
    account2.createPixKey('email', 'renata@email.com')
    expect(() => account1.pixTo(account2, 'renata@email.com', '200')).toThrow('Non-numeric values ​​not allowed for this transaction');
  })


  test("Should not transfer by pix when an invalid key is provided.", () => {
    try {
        const account1 = new CategoryAccount(new Client('Renata', '37761514046', 456, 900000), '12345', '1313', 700)
        const account2 = new CategoryAccount(new Client('Re', '37761514888', 456, 9000), '12345', '1313', 7000)
        account2.createPixKey('coin', 'moeda')
        account1.pixTo(account2, 'moeda', 200)
        } catch (error) {
        expect(error.message).toEqual('Invalid pix type')
        }
  })

  test("Should not allow transaction for Standard Account with no transaction limit available.", () => {
    try {
      const account = new CategoryAccount(new Client('Renata', '37761514046', 456, 2000), '12345', '1313', 5000)
      account.withdrawal(1001)
    } catch (error) {
      expect(error.message).toEqual('Transaction Limit exceeded!')
    }
  })

  test("Should not allow transaction for Gold Account with no transaction limit available.", () => {
    try {
      const account = new CategoryAccount(new Client('Renata', '37761514046', 456, 8000), '12345', '1313', 8000)
      account.withdrawal(5001)
    } catch (error) {
      expect(error.message).toEqual('Transaction Limit exceeded!')
    }
  })

  test("Should always allow transaction for Premium Account.", () => {
    const account = new CategoryAccount(new Client('Renata', '37761514046', 456, 2000000), '12345', '1313', 58000)
    account.withdrawal(50001)
    expect(account.getBalance()).toBe(7999)
  })
})