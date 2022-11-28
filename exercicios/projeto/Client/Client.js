import Account from "../Account/Account.js";

class Client {
  name;
  #cpf;
  #account;
  #income;
  typeAccount;
  transactionLimit;
  
  // constructor(name, cpf, account, income) {
  //   this.name = name;
  //   this.#cpf = cpf;
  //   this.#account = account;
  //   this.#income = income;
  // }


  registerClient(name, cpf, account, income) {
    if (account instanceof Account) {
      this.name = name;
      this.#cpf = cpf;
      this.#account = account;
      this.#income = income;

      if(this.#income > 0 && this.#income <= 4999.99){
        this.typeAccount = "STANDARD"
        this.transactionLimit = 1000
      } else if (this.#income > 5000 && this.#income <= 17999.99){
        this.typeAccount = "GOLD"
        this.transactionLimit = 5000
      } else if (this.#income >= 18000){
        this.typeAccount = "PREMIUM"
        this.transactionLimit = 999999999.99
      }

      return "Cliente cadastrado";
    } else {
      throw new Error("Erro no cadastro, dados inválidos");
    }
  }

  get typeAccount(){
    return this.typeAccount
  }

  get transactionLimit(){
    return this.transactionLimit
  }

}

export default Client
