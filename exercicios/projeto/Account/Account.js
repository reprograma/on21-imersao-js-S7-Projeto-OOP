class Account {
  #numeroConta;
  #agencia;
  #saldo;
  chavePix = {
    email: null,
    cpf: null,
    telefone: null,
  };

  // constructor(numeroConta, agencia, saldo) {
  //   this.#numeroConta = numeroConta;
  //   this.#agencia = agencia;
  //   this.#saldo = saldo;
  // }

  createAccount(numeroConta, agencia, saldo) {
    this.#numeroConta = numeroConta;
    this.#agencia = agencia;
    this.#saldo = saldo;
  }

  getBalance() {
    return this.#saldo;
  }

  deposit(value) {
    if (typeof value === "number") {
      if (value > 0) {
        this.#saldo += value;
      } else throw new Error("Não é possível depositar valores negativos.");
    } else throw new Error("Não é possível depositar valores não numéricos.");
  }

  saque(value) {
    if (typeof value === "number") {
      if (this.#saldo > value) {
        this.#saldo = this.#saldo - value;
      } else throw new Error("Valor de saque não permitido.");
    } else throw new Error("Valor de saque inválido.");
  }

  cadastrarChavePix(tipo, chave) {
    let regex = "";
    switch (tipo) {
      case "e-mail":
        regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (regex.test(chave)) {
          this.chavePix.email = chave;
        } else throw new Error(`E-mail inválido`);
        break;
      case "telefone":
        this.chavePix.telefone = chave;
        break;
      case "CPF":
        regex =
          /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
        if (regex.test(chave)) {
          this.chavePix.cpf = chave;
        } else throw new Error(`CPF inválido`);

        break;
      default:
        return `Chave PIX inválida`;
    }
    return `Chave PIX ${tipo} cadastrado.`;
  }
}

export default Account;
