class Account {
  #accountNumber;
  #agency;
  #balance;
  pixKeys = {
    cpf: undefined,
    email: undefined,
    telefone: undefined,
  };

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
  cashWithdrawal(value) {
    if (typeof value === "string" || typeof value === "boolean") {
      throw new Error("Não é possível sacar valores não numéricos");
    }
    if (value > 0) {
      if (value < this.getBalance()) {
        this.#balance -= value;
      } else {
        throw new Error("Não possui saldo para sacar");
      }
    } else {
      throw new Error("Não é possível sacar valores negativos");
    }
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

  createPixKey(keyValue, keyType) {
    switch (keyType) {
      case "CPF":
        let regexCPF =
          /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;

        if (regexCPF.test(keyValue)) {
          this.pixKeys.cpf = keyValue;
          return "Chave pix cpf criada com sucesso";
        } else {
          throw new Error("Erro, cpf inválido");
        }
      case "EMAIL":
        let regexEmail = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+.([a-z]+)?$/i;

        if (regexEmail.test(keyValue)) {
          this.pixKeys.email = keyValue;
          return "Chave pix email criada com sucesso";
        } else {
          throw new Error("Erro, e-mail inválido");
        }
      case "TELEFONE":
        let regexTelefone = /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/;
        if (regexTelefone.test(keyValue)) {
          this.pixKeys.telefone = keyValue;
          return "Chave pix telefone criada com sucesso";
        } else {
          throw new Error("Erro, telefone inválido");
        }
      default:
        return "Tipo de chave inexistente";
    }
  }

  transferToAnotherAccount(anotherAccount, amount) {
    if (amount < this.getBalance()) {
      this.#balance -= amount;
      anotherAccount.deposit(amount);
    } else {
      throw new Error("Não possui saldo para transferência");
    }
  }

  transferToPix(pixKey, typeOfKey, amount) {
    //.
  }
}

export default Account;
