/*
Client
-nome
-cpf -> privado
-conta
-renda -> privado
-métodos
-registrar um cliente
 */

import Account from "../Account/Account.js";
//poderia escrever export default Client;
class Client {
    name;
    #cpf; // privado
    #account;
    #income;
    /*
        constructor(name, cpf, account, income) {
            this.name = name;
            this.#cpf = cpf;
            this.#account = account;
            this.#income = income;
        }*/

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

export default Client;