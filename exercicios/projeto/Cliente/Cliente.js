import Conta from '../Conta/Conta.js'

export default class Cliente {
    nome
    #cpf
    #conta
    #renda
    tipoConta
    #limiteTransacao

    cadastrarCliente(nome, cpf, conta, renda) {
        if (nome === undefined || cpf === undefined || conta === undefined || renda === undefined) {
            throw new Error('É necessário inserir todas as informações solicitadas.')
        } else if (conta instanceof Conta) {
            this.nome = nome
            this.#cpf = cpf
            this.#conta = conta
            this.#renda = renda

            if (this.#renda > 0 && this.#renda <= 4999.99) {
                this.tipoConta = "STANDARD"
                this.#limiteTransacao = 1000
            } else if (this.#renda > 5000 && this.#renda <= 17999.99) {
                this.tipoConta = "GOLD"
                this.#limiteTransacao = 5000
            } else if (this.#renda >= 18000) {
                this.tipoConta = "PREMIUM"
                this.#limiteTransacao = 999999999.99
            }

            return 'Cliente cadastrado com sucesso!'
        } else {
            throw new Error('Não foi possível realizar o cadastro.')
        }

    }

   

}
