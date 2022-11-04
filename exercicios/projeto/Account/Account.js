class Account {
    #accountNumber;
    #agency;
    #balance;
    pixKeys;

    constructor(accountNumber, agency, balance) {
        this.#accountNumber = accountNumber;
        this.#agency = agency;
        this.#balance = balance;
        this.pixKeys = {
            cpf: undefined,
            email: undefined,
            telefone: undefined
        }
    }

    createAccount(accountNumber, agency, balance) {
        if (accountNumber.length === 5 && agency.length === 4 && balance > 0) {
            this.#accountNumber = accountNumber;
            this.#agency = agency;
            this.#balance = balance;
            return "Conta criada com sucesso!"
        } else {
            throw new Error("Dados inválidos para cadastro!")
        }
    }

    getAgency() {
        return this.#agency
    }

    getAccountNumber() {
        return this.#accountNumber
    }

    getBalance() {
        return this.#balance;
    }

    deposit(value) {
        if (typeof value === 'string' || typeof value === 'boolean') {
            throw new Error("Não é possível depositar valores não numéricos");
        }
        if (value > 0) {
            this.#balance += value;
        } else {
            throw new Error("Não é possível depositar valores negativos");
        }
    }

    withdraw(withdrawValue) {
        if (this.#balance >= withdrawValue) {
            this.#balance -= withdrawValue;
            return "Saque realizado com sucesso!"
        } else {
            throw new Error("Transação não concluída. Saldo da conta insuficiente!")
        }
    }

    createPixKey(keyValue, keyType) {
        switch (keyType) {
            case "CPF":
                let regex = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
                if (regex.test(keyValue)) {
                    this.pixKeys.cpf = keyValue;
                    return "Chave pix cpf criada com sucesso!";
                } else {
                    throw new Error("Erro, cpf inválido!")
                }
            case "EMAIL": 
              let emailRegex = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+.([a-z]+)?$/i;
               if (emailRegex.test(keyValue)) {
                    this.pixKeys.email = keyValue;
                    return "Chave pix email criada com sucesso!"
                }
            case "TELEFONE":
                let telefoneRegex = /^\+?\(?([0-9]{2})?\)?\s?[0-9]{4,5}(-|\s)?[0-9]{4}$/;
                if (telefoneRegex.test(keyValue)) {
                  this.pixKeys.telefone = keyValue;
                  return "Chave pix telefone criada com sucesso!"
                } 
            default:
                return "Tipo de chave inexistente";
        }
    }

    transferPixKey(keyType, keyValue, transferValue) {
        if (this.#balance >= transferValue) {
            this.#balance -= transferValue;
            return "Transferência Pix realizado com sucesso!"
        } else {
            throw new Error("Transação Pix não concluída. Saldo da conta insuficiente!")
        }
    }
}

export default Account;