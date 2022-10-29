import Account from "../Account/Account.js";

class Client {
  nome;
  #cpf;
  #conta;
  #renda;

  //   constructor(nome, cpf, conta, renda) {
  //     this.nome = nome;
  //     this.#cpf = cpf;
  //     this.#conta = conta;
  //     this.#renda = renda;
  //   }

  registerClient(nome, cpf, conta, renda) {
    if (conta instanceof Account) {
      this.nome = nome;
      this.#cpf = cpf;
      this.#conta = conta;
      this.#renda = renda;
      return "Cliente cadastrado.";
    } else throw new Error("Dados inválidos.");
  }
}

export default Client;
