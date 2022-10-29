class Account {
  #numeroConta;
  #agencia;
  #saldo;
  chavePix;

  constructor(numeroConta, agencia, saldo) {
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
}

export default Account;
