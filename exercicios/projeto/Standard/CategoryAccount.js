import { Account } from "../Account/Account.js";
import { Client } from '../Client/Client.js'

export class CategoryAccount extends Account {
  #transactionLimit
  category

  constructor(client, accountNumber, agency, balance) {
    super(client, accountNumber, agency, balance)
    if (client instanceof Client) {
      if (client.income < 5000) {
        this.category = 'standard'
        this.transactionLimit = 1000
      } else if (client.income > 5000 && client.income < 18000) {
        this.category = 'gold'
        this.transactionLimit = 5000
      } else if (client.income > 18000) {
        this.category = 'premium'
        console.log("Your'e a Premium Client and doesn't have transaction limit.")
      }
    } else {
      throw new Error('Not an instance of Client!')
    }
  }

  get transactionLimit() {
    return this.#transactionLimit
  }

  set transactionLimit(newTransactionLimit) {
    return this.#transactionLimit = newTransactionLimit
  }

  deposit(amount) {
    if (typeof amount !== 'number') {
      throw new Error('Non-numeric values ​​not allowed for deposit.')
    }
    if (amount > 0) {
      this.balance += amount
      return `New Balance after deposit: ${this.balance}`
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
    }
    if ((this.category === 'standard' || this.category === 'gold') && this.transactionLimit > 0) {
      this.balance -= amount
      this.transactionLimit -= amount
      if (this.#transactionLimit < 0) {
        throw new Error('Transaction Limit exceeded!')
      }
    }
    this.balance -= amount
    this.transactionLimit -= amount
  }

  transferTo(anotherAccount, cpf, amount) {
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

