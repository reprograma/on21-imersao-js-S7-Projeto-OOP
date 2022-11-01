export default class Conta {
    #numeroDaconta
    #agencia
    #saldo
    chavePix = { email: '', cpf: '', telefone: '' }


    constructor(numeroDaConta, agencia, saldo) {
        this.#numeroDaconta = numeroDaConta
        this.#agencia = agencia
        this.#saldo = saldo
        this.constructor.listaContasCriadas.push({ numeroDaConta: numeroDaConta, agencia: agencia, saldo: saldo })
    }

    static listaContasCriadas = []

    get numeroDaConta() {
        return this.#numeroDaconta
    }

    get agencia() {
        return this.#agencia
    }


    get saldo() {
        return this.#saldo;
    }

    depositar(valor) {
        if (valor < 0) {
            throw new Error('Não é possível realizar depósitos com valores negativos.')
        } else if (typeof valor !== 'number') {
            throw new Error('Não foi possível realizar o depósito. Insira um valor numérico válido.')
        } else {
            this.#saldo += valor
        }
    }

    sacar(valor) {
        if (valor < 0) {
            throw new Error('Insira um valor numérico válido.')
        } else if (valor <= this.#saldo) {
            this.#saldo -= valor
        }
        else if (typeof valor !== 'number') {
            throw new Error('Insira um valor numérico válido.')
        } else {
            throw new Error('Não há saldo suficiente em conta para realizar o saque.')
        }
    }

    transferir(valor, conta) {
        if (valor < 0) {
            throw new Error('Insira um valor numérico válido.')
        } else if (typeof valor !== 'number') {
            throw new Error('Insira um valor numérico válido.')
        } 
        
        
        if (conta instanceof Conta) {
            if (valor <= this.#saldo) {
                this.sacar(valor)
                conta.depositar(valor)
            } else {
                throw new Error('Saldo Insuficiente.')
            }
        } else {
            throw new Error('Não foi possível realizar a transferência.')
        }
    }

    criarChavePix(tipo, valor) {
        if (tipo === 'cpf') {
            return this.chavePix.cpf = valor
        } else if (tipo === 'email') {
            return this.chavePix.email = valor
        } else if (tipo === 'telefone') {
            return this.chavePix.telefone = valor
        } else {
            throw new Error('Não foi possível gerar uma chave pix.')
        }
    }

    verificarChavePix(tipo) {
        if (tipo === 'cpf') {
            return this.chavePix.cpf;
        } else if (tipo === 'email') {
            return this.chavePix.email
        } else if (tipo === 'telefone') {
            return this.chavePix.telefone
        } else {
            throw new Error('Não foi possível concluir sua solicitação. Tente novamente')
        }
    }

    atualizarSaldo() {
        // codigo
    }

    pix(valor, chavePix) {

    }


}



const contaMaria = new Conta('001', '052-2', 10_000)
