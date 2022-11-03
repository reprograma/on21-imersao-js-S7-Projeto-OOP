import Conta from '../Conta/Conta.js'

export default class Cliente {
    nome
    #cpf
    #conta
    #renda
    tipoConta
    #limiteTransacao = 0

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

    get tipoConta() {
        return this.tipoConta
    }

}
const conta1 = new Conta('666', '035-5', 300)
const conta2 = new Conta('555', '035-5', 100)

const cliente1 = new Cliente()
const cliente2 = new Cliente()

cliente2.cadastrarCliente('Maria', '12545453', conta2, 1000000)

cliente1.cadastrarCliente('Mylena', '123456789', conta1, 3000)
console.log(cliente1.tipoConta)
console.log(cliente2.tipoConta)
