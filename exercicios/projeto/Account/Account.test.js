import { Account } from './Account.js'

describe('Account', () => {
  test("Check if the Account instance is made correctly.", () => {
    const account = new Account()
    expect(account instanceof Account).toBe(true)
  })

  test("Should create account with valid data", () => {
    const account = new Account()
    expect(account.createAccount('12345', '1313', 500)).toBe('Account created.')
    expect(account.getBalance()).toBe(500)
  })

  test("Should create account with invalid data", () => {
    try {
      const account = new Account()
      account.createAccount('1234', '1313', 500)
    } catch (error) {
      expect(error.message).toEqual('Invalid data. Please check information provided and try again.')
    }
  })

  test("Deposit of $100.", () => {
    const account = new Account('Mari', '355689785-22', 1, 1, 1000)
    account.deposit(100)
    expect(account.getBalance()).toBe(1100)
  })

  test("Deposit of -$100.", () => {
    const account = new Account('Mari', '355689785-22', 1, 1, 1000)
    expect(() => account.deposit(-100)).toThrow("It is not possible to deposit negative values.")
    expect(account.getBalance()).toBe(1000)
  })

  test("Deposit with non-numeric value.", () => {
    const account = new Account('Mari', '355689785-22', 1, 1, 500)
    expect(() => account.deposit(true)).toThrow("Non-numeric values ​​not allowed for deposit.")
    expect(account.getBalance()).toBe(500)
  })

  test("Withdrawal of $100.", () => {
    const account = new Account('Mari', '355689785-22', 1, 1, 1000)
    account.withdrawal(100)
    expect(account.getBalance()).toBe(900)
  })

  test("Withdrawal over limit.", () => {
    try {
      const account = new Account('Mari', '355689785-22', 1, 1, 1000)
      account.withdrawal(1100)
    } catch (error) {
      expect(error.message).toEqual('Insufficient balance to perform transaction.')
    }
  })

  test("Should create cpf pix key successfully", () => {
    const account = new Account();
    expect(account.createPixKey('37761514046', 'cpf')).toBe("Pix cpf 37761514046 created successfully.");
    expect(account.pixKeys.cpf).toBe('37761514046');
  });

  test("Should create email pix key successfully", () => {
    const account = new Account();
    expect(account.createPixKey('any_email@email.com', 'email')).toBe("Pix email any_email@email.com created successfully.");
    expect(account.pixKeys.email).toBe('any_email@email.com');
  });

  test("Should create phone pix key successfully", () => {
    const account = new Account();
    expect(account.createPixKey('44987654321', 'phone')).toBe("Pix phone 44987654321 created successfully.");
    expect(account.pixKeys.phone).toBe('44987654321');
  });

  test("Should not create pix key if invalid cpf is provided", () => {
    const account = new Account();
    expect(() => account.createPixKey('312.455.687-9', 'cpf')).toThrow("Invalid CPF Pix Key: 312.455.687-9.");
  });

  test("Should not create pix key if invalid email is provided", () => {
    const account = new Account();
    expect(() => account.createPixKey('any_emailemail.com', 'email')).toThrow("Invalid email Pix Key: any_emailemail.com.");
  });

  test("Should not create pix key if invalid phone is provided", () => {
    const account = new Account();
    expect(() => account.createPixKey('87654321', 'phone')).toThrow("Invalid phone Pix Key: 87654321.");
  });

  test("Should transfer $120.", () => {
    const account = new Account('Mari', '355689785-22', 1, 1, 1000)
    const account2 = new Account('Mariana', '856482178-44', 2, 2, 2000)
    account.transferTo(account2, '856482178-44', 120)
    expect(account.getBalance()).toBe(880)
    expect(account2.getBalance()).toBe(2120)
  })

  test("Should not transfer $120 due to insufficient balance.", () => {
    const account = new Account('Mari', '355689785-22', 1, 1, 100)
    const account2 = new Account('Mariana', '856482178-44', 2, 2, 2000)
    expect(() => account.transferTo(account2, '856482178-44', 120)).toThrow("Error!!! Insufficient balance to perform transfer transaction.");
  })

  test("Should not transfer when non-numeric value is provided.", () => {
    const account = new Account('Mari', '355689785-22', 1, 1, 500)
    const account2 = new Account('Mariana', '856482178-44', 2, 2, 2000)
    expect(() => account.transferTo(account2, '856482178-44', '120')).toThrow("Non-numeric values ​​not allowed for transfer.");
  })

  test("Should not transfer when negative value is provided.", () => {
    const account = new Account('Mari', '355689785-22', 1, 1, 500)
    const account2 = new Account('Mariana', '856482178-44', 2, 2, 2000)
    expect(() => account.transferTo(account2, '856482178-44', -120)).toThrow("Error!!! It is not possible to transfer negative values.");
  })

  test("Should not transfer when invalid cpf is provided.", () => {
    const account = new Account('Mari', '355689785-22', 1, 1, 500)
    const account2 = new Account('Mariana', '856482178-44', 2, 2, 2000)
    expect(() => account.transferTo(account2, '856482178', 120)).toThrow("Invalid cpf provided. Please check and try again!");
  })

  test("Should not transfer by pix due to insufficient balance.", () => {
    const account = new Account('Mariana', '37761514444', '12345', '1313', 7000)
    const account2 = new Account('Mari', '37761514046', '12345', '1313', 5000)
    account2.createPixKey("44987654321", 'phone')
    expect(() => account.transferByPixTo(account2, '44987654321', 20000)).toThrow('Error!!! Insufficient balance to perform pix transaction.');
  })
  test("Should not transfer by pix when negative value is provided.", () => {
    const account = new Account('Mariana', '37761514444', '12345', '1313', 7000)
    const account2 = new Account('Mari', '37761514046', '12345', '1313', 5000)
    account2.createPixKey('37761514046', 'cpf')
    expect(() => account.transferByPixTo(account2, '37761514046', -200)).toThrow('Pix Error!!! It is not possible to transfer negative values.');
  })
  test("Should not transfer by pix when non-numeric value is provided.", () => {
    const account = new Account('Mariana', '37761514444', '12345', '1313', 7000)
    const account2 = new Account('Mari', '37761514046', '12345', '1313', 5000)
    account2.createPixKey('any_email@email.com', 'email')
    expect(() => account.transferByPixTo(account2, 'any_email@email.com', '200')).toThrow('Non-numeric values ​​not allowed for transfer.');
  })
  test("Should not transfer by pix when an invalid key is provided.", () => {
    const account = new Account('Mariana', '37761514444', '12345', '1313', 7000)
    const account2 = new Account('Mari', '37761514046', '12345', '1313', 5000)
    account2.createPixKey("crypto", 'moeda')
    expect(() => account.transferByPixTo(account2, '44987654321', 200)).toThrow('Invalid key provided. Please check and try again!');
  })
})