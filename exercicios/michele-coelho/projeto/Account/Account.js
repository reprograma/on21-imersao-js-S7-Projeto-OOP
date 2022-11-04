import Client from '../Client/Client.js'

class Account extends Client {

    #accountNumber;
    #agency;
    #balance;
    pixKey;

    constructor(cpf) {
        super(cpf)
        this.pixKey = { 'CPF': null, 'EMAIL': null, 'TELEFONE': null };
    }

    get balance() {
        return this.#balance;
    }
    get accountNumber() {
        return this.#accountNumber;
    }
    get agency() {
        return this.#agency;
    }

    verificarValor(valor) {
        if (typeof valor === 'string' || typeof valor === 'boolean') {
            throw new Error("Não é possível realizar transações com valores não númericos!");
        }
    }
    sacar(valor) {
        this.verificarValor(valor);
        if (valor > 0 && this.#balance >= valor) {
            this.#balance -= valor;
        } else {
            throw new Error("Não é possível sacar valores negativos!!");
        }
    }

    deposito(valor) {
        this.verificarValor(valor);
        if (valor > 0) {
            this.#balance += valor;
        } else {
            throw new Error("Não é possível depositar valores negativos!!");
        }
    }
    transferirDinheiro(cpf, outraConta, valor) {
        if (this.cpf === cpf) {
            this.verificarValor(valor);
            if (this.#balance >= valor) {
                this.#balance -= valor;
                outraConta.deposito(valor);
                return "Transferência realizada com sucesso!"
            } else {
                throw new Error("Saldo insuficiente para realizar o depósito!");
            }
        } else {
            throw Error('Cpf inválio!')
        }
    }

    criarConta(accountNumber, agency, balance) {
        if (accountNumber.length === 5 && agency.length === 4 && balance > 0) {
            this.#accountNumber = accountNumber;
            this.#agency = agency;
            this.#balance = balance;
            return "Conta criada com sucesso!"
        }
    }
    verificarChavePix(chavePix) {
        let verificarEmail = /\S+@\S+\.\S+/;
        let verificarCpf = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;

        if (verificarEmail.test(chavePix) || (chavePix.length === 11) || (verificarCpf.test(chavePix))) {
            return true;
        } else {
            throw new Error("Error! Chave pix inválida!");
        }
    }

    criarChavePix(novaChave, tipoChave) {
        switch (tipoChave) {
            case 'CPF':
                if (this.verificarChavePix(novaChave)) {
                    this.pixKey.CPF = novaChave;
                    return ("Chave pix criada com sucesso!");
                }
            case 'EMAIL':
                if (this.verificarChavePix(novaChave)) {
                    this.pixKey.EMAIL = novaChave;
                    return ("Chave pix criada com sucesso!");
                }
            case 'TELEFONE':
                if (this.verificarChavePix(novaChave)) {
                    this.pixKey.TELEFONE = novaChave;
                    return ("Chave pix criada com sucesso!");
                }
            default: throw new Error("Tipo de chave inválida!")
        }
    }

    fazerPix(chave, cpf, outraConta, valor) {
        if (this.verificarChavePix(chave)) {
            this.transferirDinheiro(cpf, outraConta, valor);
            return "Pix realizado com sucesso!";
        } else {
            console.log("Error! Não foi possível fazer o pix!")
        }
    }
    consultarSaldo(cpf, accountNumber, agency) {
        if (this.cpf === cpf && this.accountNumber === accountNumber && this.agency === agency) {
            return this.balance;
        } else {
            throw new Error("Dados incorretos, entre com os dados certos!")
        }
    }

    atualizarSaldo() {
        if (this.balance >= 0) {
            return `Saldo atualizado no valor de R$:${this.balance}`
        } else {
            return `Você está no negativo.Saldo atualizado no valor de R$:${this.balance}`
        }
    }

}

export default Account;
