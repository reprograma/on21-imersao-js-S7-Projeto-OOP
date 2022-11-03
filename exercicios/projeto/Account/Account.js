class Account {
  #accountNumber;
  #agency;
  #balance;
  pixKey;

  constructor(accountNumber, agency, balance) {
    this.#accountNumber = accountNumber;
    this.#agency = agency;
    this.#balance = balance;
  }

  constructor(accountNumber, agency, balance){
    this.#accountNumber = accountNumber;
    this.#agency = agency;
    this.#balance = balance;
    this.pixKeys = {
      cpf: undefined,
      email: undefined,
      telefone: undefined,
    }
  }

  createAccount(accountNumber, agency, balance){
    if(accountNumber.length === 5 && agency.length === 4 && balance > 0){
      this.#accountNumber = accountNumber;
      this.#agency = agency;
      this.#balance = balance;
      return "Conta criada com sucesso!"
    } else {
      throw new Error("Dados inválidos");
    }
  }

  getBalance() {
    return this.#balance;
  }

  deposit(value) {
    if (typeof value === 'string' || typeof value === 'boolean') {
      throw new Error("Não é possível depositar valores não numéricos");
    }
    if (value > 0) {
      this.#balance += value;
    } else {
      throw new Error("Não é possível depositar valores negativos");
    }
  }
}

transferTo(anotherAccount, value) {
  if (this.balance >= value) {
    const newValue = this.balance - value;
    this.balance = newValue;
    anotherAccount.deposit(value);
  } else {
    throw new Error("Saldo insuficiente");
  }
}

export default Account;