
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

/*const account = new Account("1552652", "23526", 500)

const client1 = new Client()
client1.registerClient("Artemiza", "1234567908", account, 19000)
client1.registerClient("Artemiza", "1234567908", account, 5000)
client1.registerClient("Artemiza", "1234567908", account, 1000)

console.log(client1.typeAccount);
console.log(client1.transactionLimit);*/

export default Client;