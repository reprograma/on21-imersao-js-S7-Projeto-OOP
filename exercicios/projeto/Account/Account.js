import Pix from "../Pix/Pix.js";

class Account {
  #numeroConta;
  #agencia;
  #saldo;
  chavePix;

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
    this.chavePix = new Pix();
    if (tipo === "email") {
      return this.chavePix.cadastrarChaveEmail(chave);
    } else if (tipo === "telefone") {
      return this.chavePix.cadastrarChaveTelefone(chave);
    } else if (tipo === "cpf") {
      return this.chavePix.cadastrarChaveCPF(chave);
    }
  }
}

export default Account;
