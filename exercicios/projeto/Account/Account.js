import { Client } from '../Client/Client.js'

export class Account {

  #accountNumber
  #agency
  #balance
  pixKeys

  constructor(client, accountNumber, agency, balance) {
    if (client instanceof Client) {
      this.client = client
    }
    this.#accountNumber = accountNumber
    this.#agency = agency
    this.#balance = balance
    this.pixKeys = {
      cpf: '',
      email: '',
      phone: ''
    }
  }

  get accountNumber() {
    return this.#accountNumber
  }

  set accountNumber(newAccountNumber) {
    return this.#accountNumber = newAccountNumber
  }

  get agency() {
    return this.#agency
  }

  set agency(newAgency) {
    return this.#agency = newAgency
  }

  get balance() {
    return this.#balance
  }

  set balance(newBalance) {
    return this.#balance = newBalance
  }

  getBalance() {
    return this.balance
  }

  getPixKeys() {
    return this.pixKeys
  }

  createAccount(accountNumber, agency, balance) {
    if (accountNumber.length === 5 && agency.length === 4 && balance > 0) {
      this.accountNumber = accountNumber
      this.agency = agency
      this.balance = balance
      return 'Account created.'
    } else {
      throw new Error('Invalid data. Please check information provided and try again.')
    }
  }

  deposit(amount) {
    if (typeof amount !== 'number') {
      throw new Error('Non-numeric values ​​not allowed for deposit.')
    }
    if (amount > 0) {
      this.balance += amount
      return `New Balance after deposit: ${this.getBalance()}`
    } else {
      throw new Error("It is not possible to deposit negative values.")
    }
  }

  withdrawal(amount) {
    if (typeof amount !== 'number') {
      throw new Error('Non-numeric values ​​not allowed for withdrawal.')
    }
    if (this.balance < amount) {
      throw new Error('Insufficient balance to perform transaction.')
    } else {
      return this.balance -= amount
    }
  }

  createPixKey(keyValue, pixType) {
    const existKey = Object.values(this.pixKeys).find(key => key === keyValue)
    if (existKey) {
      throw new Error(`Key ${keyValue} already exists!`)
    }

    let regex
    switch (pixType) {
      case 'cpf':
        regex = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/
        if (regex.test(keyValue)) {
          this.pixKeys.cpf = keyValue;
          return `Pix ${pixType} ${keyValue} created successfully.`
        } else {
          throw new Error(`Invalid CPF Pix Key: ${keyValue}.`);
        }
      case 'email':
        regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (regex.test(keyValue)) {
          this.pixKeys.email = keyValue;
          return `Pix ${pixType} ${keyValue} created successfully.`
        } else {
          throw new Error(`Invalid email Pix Key: ${keyValue}.`);
        }
      case 'phone':
        regex = /\d{2}\d{4,5}\d{4}/
        if (regex.test(keyValue)) {
          this.pixKeys.phone = keyValue;
          return `Pix ${pixType} ${keyValue} created successfully.`
        } else {
          throw new Error(`Invalid phone Pix Key: ${keyValue}.`);
        }
      default:
        return 'Non-existent key type'
    }
  }


  transferTo(anotherAccount, cpf, amount) {
    console.log('another account', anotherAccount);
    if (this.balance < amount) {
      throw new Error('Error!!! Insufficient balance to perform transfer transaction.')
    }
    if (amount < 0) {
      throw new Error('Error!!! It is not possible to transfer negative values.')
    }
    if (typeof amount !== 'number') {
      throw new Error('Non-numeric values ​​not allowed for transfer.')
    }
    if (anotherAccount.client.cpf === cpf) {
      this.withdrawal(amount)
      console.log(`Origin account balance: $ ${this.balance}`)
      anotherAccount.deposit(amount)
      console.log(`Destination account balance: $ ${anotherAccount.balance}`)
    } else {
      throw new Error('Invalid cpf provided. Please check and try again!')
    }
  }

  transferByPixTo(anotherAccount, pixKey, amount) {
    if (this.balance < amount) {
      throw new Error('Error!!! Insufficient balance to perform pix transaction.')
    }
    if (amount < 0) {
      throw new Error('Pix Error!!! It is not possible to transfer negative values.')
    }
    if (typeof amount !== 'number') {
      throw new Error('Non-numeric values ​​not allowed for transfer.')
    }
    const existKey = Object.values(anotherAccount.pixKeys).find(key => key === pixKey)
    if (existKey) {
      this.withdrawal(amount)
      console.log(`Origin account balance after pix transaction: $ ${this.balance}`)
      anotherAccount.deposit(amount)
      console.log(`Destination account balance after pix transaction: $ ${anotherAccount.balance}`)
    } else {
      throw new Error('Invalid key provided. Please check and try again!')
    }
  }
}
