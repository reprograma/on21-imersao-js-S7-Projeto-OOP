import Account from "../Account/Account.js";

class Client {
  name;
  #cpf;
  account;
  #income;

  constructor(name, cpf, account, income) {
    // setar o estado inicial do nosso objeto
    this.name = name;
    this.#cpf = cpf;
    this.account = account;
    this.#income = income;
  }

  registerClient(name, cpf, account, income) {
    if (account instanceof Account) {
      this.name = name;
      this.#cpf = cpf;
      this.account = account;
      this.#income = income;
      return "Cliente cadastrado";
    } else {
      throw new Error("Erro no cadastro, dados inválidos");
    }
  }

  customerCategory() {
    if (this.#income <= 4999.99) {
      console.log ("Cliente Standard");
    } else if (this.#income >= 4999.99 && this.#income <= 17999.99) {
      console.log("Cliente Gold");
    } else {
      console.log ("Cliente Premium");
    }
  };
};

export default Client;