/* Client
  atributos: 
    - nome
    - cpf -> privado
    - conta -> privado
    - renda -> privado
  métodos:
    -registrar um cliente


classes:
- atributos (propriedade)
- métodos (funções)
*/

import Account from '../Account/Account.js';

class Client {
  name;
  #cpf;
  #account;
  #income;

//   constructor(name, cpf, account, income) {
//     this.name = name;
//     this.#cpf = cpf;
//     this.#account = account;
//     this.#income = income;
//   }

  registerClient(name, cpf, account, income) {
    if (account instanceof Account) {
      this.name = name;
      this.#cpf = cpf;
      this.#account = account;
      this.#income = income;

      return "Cliente Cadastrado";
    } else {
      throw new Error("Erro no cadastro, dados invalidos");
    }
  }

  totalIncome(){
    if(this.#income <= 4999.99){
       return "Cliente Standard"
    }
    if(this.#income >= 4999.99 && this.#income <= 17999.99) {
       return "Cliente Gold"
    }else {
       return "Cliente Premium"
    }
 }

}

export default Client