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

  getBalance() {
    return this.#balance;
  }

  getAgency() {
    return this.#agency;
  }

  getAccountNumber() {
    return this.#accountNumber;
  }

  createAccount(accountNumber, agency, balance) {
    if (accountNumber.length === 5 && agency.length === 4 && balance > 0) {
      this.#accountNumber = accountNumber;
      this.#agency = agency;
      this.#balance = balance;
      return 'Conta criada com sucesso';
    } else {
      throw new Error('Dados inválidos para cadastro');
    }
  }

  deposit(value) {
    if (typeof value === 'string' || typeof value === 'boolean') {
      throw new Error('Não é possível depositar valores não numéricos');
    }
    if (value > 0) {
      this.#balance += value;
    } else {
      throw new Error('Não é possível depositar valores negativos');
    }
  }

  createPixKey(keyValue, keyType) {
    switch (keyType) {
      case 'CPF':
        let regex =
          /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
        if (regex.test(keyValue)) {
          this.pixsKeys.cpf = keyValue;
          return 'Chave pix cpf criada com sucesso';
        } else {
          throw new Error('Erro, cpf inválido');
        }
      case 'EMAIL':
      case 'TELEFONE':
      default:
        return 'Tipo de chave inválida';
    }
  }
}

export default Account;
