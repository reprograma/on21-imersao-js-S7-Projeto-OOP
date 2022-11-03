class Account {
  #accountNumber;
  #agency;
  #balance;
  pixKeys;

  constructor(accountNumber, agency, balance) {
    this.#accountNumber = accountNumber;
    this.#agency = agency;
    this.#balance = balance;
    this.pixKeys = {
      cpf: undefined,
      email: undefined,
      telefone: undefined
    }
  }

  createAccount(accountNumber, agency, balance) {
    if (accountNumber.length === 5 && agency.length === 4 && balance > 0) {
      this.#accountNumber = accountNumber;
      this.#agency = agency;
      this.#balance = balance;
      return "Conta criada com sucesso";
    } else {
      throw new Error("Dados inválidos para cadastro");
    }
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

  createPixKey(keyValue, keyType) {
    switch (keyType) {
      case "CPF":
        let regex = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;

        if (regex.test(keyValue)) {
          this.pixKeys.cpf = keyValue;
          return "Chave pix cpf criada com sucesso";
        }
        else {
          throw new Error("Erro, cpf inválido");
        }
      case "EMAIL":
        let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (emailRegex.test(keyValue)) {
          this.pixKeys.email = keyValue;
          return "Chave pix email criada com sucesso";
        }
      case "TELEFONE":
        let phoneRegex = /^(\d{2})\D*(\d{5}|\d{4})\D*(\d{4})$/; // regex para telefone com 9 digitos
        if (phoneRegex.test(keyValue)) {
          this.pixKeys.telefone = keyValue;
          return "Chave pix telefone criada com sucesso";
        }
      default:
        return "Tipo de chave inexistente";
    }
  }
  transfer(value, account) {
    if (typeof value === 'string' || typeof value === 'boolean') {
      throw new Error("Não é possível transferir valores não numéricos");
    }
    
    if (value > 0) {
      if (value <= this.#balance) {
        this.#balance -= value;
        account.deposit(value);
        return "Transferência realizada com sucesso";
      } else {
        throw new Error("Saldo insuficiente");
      }
    } else {
      throw new Error("Não é possível transferir valores negativos");
    }
  }
  withdraw(value) {
    if (typeof value === 'string' || typeof value === 'boolean') {
      throw new Error("Não é possível sacar valores não numéricos");
    }
    if (value > 0) {
      if (value <= this.#balance) {
        this.#balance -= value;
        return "Saque realizado com sucesso";
      } else {
        throw new Error("Saldo insuficiente");
      }
    } else {
      throw new Error("Não é possível sacar valores negativos");
    }
  }
  verifyPixKey(keyValue, keyType) {
    switch (keyType) {
      case "CPF":
        if (this.pixKeys.cpf === keyValue) {
          return true;
        }
        else {
          return false;
        }
      case "EMAIL":
        if (this.pixKeys.email === keyValue) {
          return true;
        }
        else {
          return false;
        }
      case "TELEFONE":
        if (this.pixKeys.telefone === keyValue) {
          return true;
        }
        else {
          return false;
        }
      default:
        return false;
    }
  }
  updateBalance(value) {
    this.#balance += value;
  }
}

export default Account;