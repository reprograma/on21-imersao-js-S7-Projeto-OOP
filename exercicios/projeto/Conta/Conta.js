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

    transferir(valor, conta, cpf) {
        if (valor < 0) {
            throw new Error('Insira um valor numérico válido.')
        } else if (typeof valor !== 'number') {
            throw new Error('Insira um valor numérico válido.')
        } else if (conta === undefined || cpf === undefined || valor === undefined) {
            throw new Error('Para realizar a transferência é necessário preencher todos os parâmetros com valores válidos.')
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
        if (this.chavePix.cpf === valor || this.chavePix.email === valor || this.chavePix.telefone === valor) {
            throw new Error('Chave pix já cadastrada.')
        } else {
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

    pix(valor, conta, chavePix) {
        if (valor < 0) {
            throw new Error('Insira um valor numérico válido.')
        } else if (typeof valor !== 'number') {
            throw new Error('Insira um valor numérico válido.')
        } else if (conta === undefined || chavePix === undefined || valor === undefined) {
            throw new Error('Para realizar o pix é necessário preencher todos os parâmetros com valores válidos.')
        }

        if (conta instanceof Conta) {
            if (chavePix === conta.chavePix.cpf || chavePix === conta.chavePix.email || chavePix === conta.chavePix.telefone) {
                if (valor <= this.#saldo) {
                    this.sacar(valor)
                    conta.depositar(valor)
                } else {
                    throw new Error('Saldo Insuficiente.')
                }
            } else {
                throw new Error('Não foi possível realizar o pix. Verifique a chave e tente novamente.')
            }
        } else {
            throw new Error('Não foi possível realizar o pix.')
        }
    }


}



