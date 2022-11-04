import Account from "../Account/Account.js"

class Client {
    name;
    #cpf;
    #account;
    #income;

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

    getIncome() {
        if (typeof this.#income === 'string' || typeof this.#income === 'boolean') {
            throw new Error("Não é possível registrar renda com valores não numéricos");
        } else if (this.#income <= 4999.99){
            return "Cliente Standard";
        } else if (this.#income >= 4999.99 && this.#income <= 17999.99) {
            return "Cliente Gold";
        } else {
            return "Cliente Premium";
        }
    }
}

export default Client;