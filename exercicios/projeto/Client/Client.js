import Account from "../Account/Account.js"

class Client {
 name;
 #cpf;
 #account;
 #income;

//  constructor(name, cpf, account, income){
//     this.name = name;
//     this.#cpf = cpf;
//     this.#account = account;
//     this.#income = income;
//  }

   registerClient(name, cpf, account, income ){
      if(account instanceof Account) {
         this.name = name;
         this.#cpf = cpf;
         this.#account = account;
         this.#income = income;

         return "Cliente cadastrado"
      } else {
         throw new Error("Erro no cadastro;dados inválidos")
      }
   }

   totalIncome(){
      if(this.#income <= 4999.99){
         return "Cliente é Standard"
      }
      if(this.#income >= 4999.99 && this.#income <= 17999.99) {
         return "Cliente é Gold"
      }else {
         return "Cliente é Premium"
      }
   }

}

export default Client;
