import Account from "../Account/Account.js";

class Client {
  name;
  #cpf;
  #account;
  #income;
  accountCategory;

  registerClient(name, cpf, account, income) {
    if (account instanceof Account) {
      this.name = name;
      this.#cpf = cpf;
      this.#account = account;

      if (income <= 4999.99) {
        this.accountCategory = "standard";
      } else if (income > 4999.99 && income <= 17999.99) {
        this.accountCategory = "gold";
      } else if (income > 17999.99) {
        this.accountCategory = "premium";
      }

      this.#income = income;
      return "Cliente cadastrado";
    } else {
      throw new Error("Erro no cadastro, dados inválidos");
    }
  }
}

export default Client;
