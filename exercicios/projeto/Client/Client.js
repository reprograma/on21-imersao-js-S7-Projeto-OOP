class Client {
    name;
    #cpf;
    #account;
    #income;
   
    constructor(name, cpf, account, income){
       this.name = name;
       this.#cpf = cpf;
       this.#account = account;
       this.#income = income;
    }
   }
   
   export default Client;