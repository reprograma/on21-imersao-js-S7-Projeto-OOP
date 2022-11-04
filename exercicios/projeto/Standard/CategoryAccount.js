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
}

