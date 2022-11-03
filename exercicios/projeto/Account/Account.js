class Account {
  #accountNumber;
  #agency;
  #balance;
  pixKey;

  constructor(accountNumber, agency, balance) {
    this.#accountNumber = accountNumber;
    this.#agency = agency;
    this.#balance = balance;
    this.pixKey = {
      cpf: undefined,
      email: undefined,
      phone: undefined,
    };
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

  getPixKey() {
    return this.pixKey;
  }

  deposit(value) {
    if (typeof value === "string" || typeof value === "boolean") {
      throw new Error("Não é possível depositar valores não numéricos");
    }

    if (value > 0) {
      this.#balance += value;
    } else {
      throw new Error("Não é possível depositar valores negativos");
    }
  }

  withdraw(valueWithdraw) {
    this.#balance -= valueWithdraw;
    return "Saque realizado";
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

  createPixKey(keyValue, keyType) {
    if (this.checkPixKey(keyValue, keyType)) {
      this.pixKey[keyType.toLowerCase()] = keyValue;
      return "Chave pix criada com sucesso";
    } else {
      throw new Error("Erro, ao criar chave pix");
    }
  }

  checkPixKey(keyValue, keyType) {
    const regex = {
      CPF: /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/,
      EMAIL:
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      PHONE:
        /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
    };

    if (regex[keyType.toUpperCase()].test(keyValue)) {
      return true;
    } else {
      return false;
    }
  }

  transfer(anotherAccount, valueTransfer, cpf) {
    if (this.#balance >= valueTransfer) {
      this.#balance -= valueTransfer;
      anotherAccount.deposit(valueTransfer);
      return "Transferência realizada com sucesso";
    } else {
      throw new Error(
        "Você não possui saldo suficiente para realizar essa operação"
      );
    }
  }

  transferPix(anotherAccount, valueTransfer, pix) {
    const { cpf, email, phone } = anotherAccount.getPixKey();
    if (cpf === pix || email === pix || phone === pix) {
      if (this.#balance >= valueTransfer) {
        this.#balance -= valueTransfer;
        anotherAccount.deposit(valueTransfer);
        return "Transferência realizada com sucesso";
      } else {
        throw new Error(
          "Você não possui saldo suficiente para realizar essa operação"
        );
      }
    } else {
      throw new Error("Chave pix inválida");
    }
  }

  updateBalance(newBalance) {
    this.#balance = newBalance;
  }
}

export default Account;
