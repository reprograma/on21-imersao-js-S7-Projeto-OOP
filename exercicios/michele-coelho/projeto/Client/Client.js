import Account from "../Account/Account.js"

class Client {
    nome;
    #cpf;
    #conta;
    #renda;

    registerClient(nome, cpf, conta, renda) {
        if (conta instanceof Account) {
            this.nome = nome;
            this.#cpf = cpf;
            this.#conta = conta;
            this.#renda = renda;
            return "Cliente cadastrado!"
        } else {
            throw new Error("Error no cadastrado, dados inválidos!")
        }
    }
    get cpf() {
        return this.#cpf;
    }
    set cpf(novoCpf) {
        this.#cpf = novoCpf;
    }
    get conta() {
        return this.#conta;
    }
    set conta(novaConta) {
        this.#conta = novaConta;
    }
    get renda() {
        return this.#renda;
    }
    set renda(novaRenda) {
        this.#renda = novaRenda;
    }
}

export default Client;