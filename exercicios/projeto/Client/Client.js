import Account from "../Account/Account.js";

class Client {
  name;
  #cpf;
  #account;
  #income;
  
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

      return "Cliente cadastrado";
    } else {
      throw new Error("Erro no cadastro, dados inválidos");
    }
  }
}

// export default Client;
// // o dado privado faz parte do  encapsulamento
// //this é uma forma de referenciar oa propria instancia criada  e nao a classe em si 

// import Account from '../Account/Account.js'

// class Client {
//     name
//     #cpf
//     #account
//     #income
//     // constructor(name, cpf, account, income) {
//     //     this.name = name
//     //     this.#account = account
//     //     this.#cpf = cpf
//     //     this.#income = income
//     // }

//     registerClient(name, cpf, account, income){
//         if(account instanceof Account) {
//             this.name = name
//             this.#account = account
//             this.#cpf = cpf
//             this.#income = income
//             return 'cliente cadastrado'
//         }else{
//             throw new Error('erro no cadastro, Dados inválidos')
//         }
//     }
// }

// export default Client;
