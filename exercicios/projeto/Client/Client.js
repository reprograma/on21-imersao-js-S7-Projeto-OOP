import Account from "../Account/Account.js";

class Client{
    name;
    #cpf;
    #account;
    #income;
    // constructor(nome, cpf, account,income){
    //     this.name = name;
    //     this.#income= income;
    //     this.#cpf = cpf;
    //     this.#account = account;
    // }

    registerClient(name, cpf , account, income){
        if(account instanceof Account){
            this.name = name;
            this.#income= income;
            this.#cpf = cpf;
            this.#account = account;
 
            return "Cliente Cadastrado"
    }else{
        throw new Error("Erro no cadastro, dados invalidos");
    }
  }
  getIncome(){

    if (typeof this.#income === 'string' || typeof this.#income === 'boolean') {
        throw new Error("Não é possível renda com valores não numéricos");
    }else if (this.#income <= 4999.99){
        return "Cliente Standard"
    }
    else if(this.#income >= 4999.99 && this.#income <=17999.99){
        return "Cliente Gold"
    } 
    else
    {return "Cliente Premium"}
  }

  get income(){
    return this.#income;
  }
 
}

export default Client
//module.exports = Client;