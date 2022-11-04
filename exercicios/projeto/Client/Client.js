import { Account } from '../Account/Account.js'

export class Client {
  name
  _cpf
  #account
  #income

  constructor(name, cpf, account, income) {
    this.name = name
    this._cpf = cpf
    this.#account = account
    this.#income = income
  }

  get cpf() {
    return this._cpf
  }

  get account() {
    return this.#account
  }
  set account(account) {
    return this.#account = account
  }

  get income() {
    return this.#income
  }
  set income(income) {
    return this.#income = income
  }


  registerClient(name, cpf, account, income) {
    if (account instanceof Account) {
      this.name = name
      this._cpf = cpf
      this.account = account
      this.income = income
      return "Registered Client."
    } else {
      throw new Error('Registration error. Invalid data.')
    }
  }
}