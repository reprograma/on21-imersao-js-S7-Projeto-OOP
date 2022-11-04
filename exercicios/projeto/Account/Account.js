class Account {
  #numeroConta;
  #agencia;
  #saldo;
  chavePix = {
    EMAIL: null,
    CPF: null,
    TELEFONE: null,
  };

  createAccount(numeroConta, agencia, saldo) {
    if (numeroConta.length == 5 && agencia.length == 3 && saldo > 0) {
      this.#numeroConta = numeroConta;
      this.#agencia = agencia;
      this.#saldo = saldo;
    } else throw new Error("Dados inválidos");
  }

  get balance() {
    return this.#saldo;
  }

  getPixKey(type) {
    for (const key in this.chavePix) {
      if (key === type && this.chavePix[type] !== null) {
        return this.chavePix[type];
      }
    }
    return "Chave inexistente.";
  }

  deposit(value) {
    if (typeof value === "number") {
      if (value > 0) {
        this.#saldo += value;
      } else throw new Error("Não é possível depositar valores negativos.");
    } else throw new Error("Não é possível depositar valores não numéricos.");
  }

  withdrawal(value) {
    if (typeof value === "number") {
      if (this.#saldo >= value) {
        this.#saldo = this.#saldo - value;
      } else throw new Error("Valor de saque não permitido.");
    } else throw new Error("Valor de saque inválido.");
  }

  transfer(account, value) {
    if (account instanceof Account && typeof value === "number") {
      if (value <= this.#saldo) {
        this.withdrawal(value);
        account.deposit(value);
      } else throw new Error("Saldo insuficiente para transferência.");
    } else throw new Error("Operação inválida.");
  }

  createPixKey(type, key) {
    let regex = "";
    switch (type) {
      case "EMAIL":
        regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (regex.test(key)) {
          this.chavePix.EMAIL = key;
        } else throw new Error(`E-mail inválido`);
        break;
      case "TELEFONE":
        regex = /^\+?\(?([0-9]{2})?\)?\s?[0-9]{4,5}(-|\s)?[0-9]{4}$/;
        if (regex.test(key)) {
          this.chavePix.TELEFONE = key;
        } else throw new Error(`Telefone inválido`);
        break;
      case "CPF":
        regex =
          /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
        if (regex.test(key)) {
          this.chavePix.CPF = key;
        } else throw new Error(`CPF inválido`);

        break;
      default:
        return `Chave PIX inválida`;
    }
    return `Chave PIX ${type} cadastrado.`;
  }

  transferPIX(account, type, value) {
    if (account instanceof Account && typeof value === "number") {
      if (value <= this.balance) {
        if (account.chavePix[type]) {
          this.withdrawal(value);
          account.deposit(value);
        } else throw new Error("Chave PIX inválida.");
      } else throw new Error("Saldo insuficiente para transferência.");
    } else throw new Error("Operação inválida.");
  }
}

export default Account;
