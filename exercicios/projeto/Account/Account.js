import Client from "../Client/Client.js";

class Account {
    #accountNumber;
    #agency;
    #balance;
    //accountType;
    //transactionLimit;
    pixKeys;

    constructor(accountNumber, agency, balance) {
        this.#accountNumber = accountNumber;
        this.#agency = agency;
        this.#balance = balance;
        this.pixKeys = {
            cpf: undefined,
            email: undefined,
            phone: undefined,
        }
    }

    createAccount(accountNumber, agency, balance) {
        if (accountNumber.length === 5 && agency.length === 4 && balance > 0) {
            this.#accountNumber = accountNumber;
            this.#agency = agency;
            this.#balance = balance;

            return "Conta criada com sucesso!"
        } else {
            throw new Error("Error no cadastro, dados invalidos para o cadastro")
        }
   }

   /**
    createAccount(accountNumber, agency, balance) {
        if (!this.Client.cpf) {
            switch (this.income) {
                case this.income <= 4999.99:
                    this.#accountNumber = accountNumber;
                    this.#agency = agency;
                    this.#balance = balance;
                    this.accountType = 'Standard';
                    this.transactionLimit = 1000;

                    console.log("Conta cadastrada no tipo Standard");
                    break;
                
                case this.income >= 5000  && this.income <= 17999.99:
                    this.#accountNumber = accountNumber;
                    this.#agency = agency;
                    this.#balance = balance;
                    this.accountType = 'Gold';
                    this.transactionLimit = 5000;

                    console.log("Conta cadastrada no tipo Gold");
                    break;

                case this.income >18000.00:
                    this.#accountNumber = accountNumber;
                    this.#agency = agency;
                    this.#balance = balance;
                    this.accountType = 'Premium';
    
                    console.log("Conta cadastrada no tipo Premium");
                    break;
            }
                
        } else {
            throw new Error("Erro no cadastro da conta, este cliente já possui uma conta cadastrada")
        }
    }
    */

    getBalance() {
        return this.#balance;
    }

    getAccountNumber() {
        return this.#accountNumber;
    }

    getAgency() {
        return this.#agency;
    }

    deposit(value) {
        if(typeof value === 'string' || typeof value === 'boolean') {
            throw new Error("Não é possivel depositar valores não numericos");
        }
        if (value > 0) {
            this.#balance += value;
        } else {
            throw new Error("Não é possivel depositar valores negativos");
        }
    }

    withdraw(value){
        if (value > this.#balance) {
            throw new Error("Saldo insuficiente")
        } else {
            this.#balance -= value;
        }
    }

    createPixKey(keyValue, keyType) {
        switch (keyType) {
            case "CPF":
                let validacaoCpf = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
                if (validacaoCpf.test(keyValue)) {
                    this.pixKeys.cpf = keyValue

                    return "Chave pix CPF criada com sucesso!"
                } else {
                    throw new Error("Error, CPF invalido");
                }
            case "EMAIL":
                let validacaoEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (validacaoEmail.test(keyValue)) {
                    this.pixKeys.email = keyValue

                    return "Chave pix e-mail criada com sucesso!"
                } else {
                    throw new Error("Error, e-mail invalido")
                }
            case "TELEFONE":
                let validacaoTelefone = /^\+?\(?([0-9]{2})?\)?\s?[0-9]{4,5}(-|\s)?[0-9]{4}$/;
                if (validacaoTelefone.test(keyValue)) {
                    this.pixKeys.phone = keyValue

                    return "Chave pix telefone criada com sucesso!"
                } else {
                    throw new Error("Error, telefone invalido")
                }
            default:
                return "Tipo de chave inexistente"
        }
    }
    
    transfer(value, account) {
        if (account instanceof Account) {
            this.withdraw(value);
            account.deposit(value);
        } else {
            throw new Error("Error, esta conta não existe")
        }
    }

    pix(account, value, pixKey ) {
        //pixKey instanceof Account
        if (account instanceof Account) {
            if (pixKey === account.pixKeys.cpf || pixKey === account.pixKeys.email || pixKey === account.pixKeys.phone ) {
                this.withdraw(value);
                account.deposit(value);
            } else {
                throw new Error("Error, esta chave pix não esta cadastrada")
            }
        } else {
            throw new Error("Error, conta não esta cadastrada")
        }
    }
}

export default Account