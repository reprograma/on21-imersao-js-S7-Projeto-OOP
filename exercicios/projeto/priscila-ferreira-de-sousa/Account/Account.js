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
        this.constructor.createdAccounts.push(this);
    }

    static createdAccounts = [];

    static getAccountIndexByPixKey(pixKey) {
        return Account.createdAccounts.findIndex(ac => ac.pixKeys !== undefined
            && (ac.pixKeys.cpf === pixKey || ac.pixKeys.email === pixKey || ac.pixKeys.telefone === pixKey));
    }

    static getCreatedAccountIndex(account) {
        return Account.createdAccounts.findIndex(ac => ac.getAccountNumber() === account.getAccountNumber()
            && ac.getAgency() === account.getAgency());
    }

    getBalance() {
        return this.#balance;
    }

    setBalance(balance) {
        this.#balance = balance;
    }

    getAgency() {
        return this.#agency;
    }

    getAccountNumber() {
        return this.#accountNumber;
    }

    createAccount(accountNumber, agency, balance) {
        if (accountNumber.length === 5 && agency.length === 4 && balance > 0) {
            this.#accountNumber = accountNumber;
            this.#agency = agency;
            this.#balance = balance;
            this.pixKeys = {
                cpf: undefined,
                email: undefined,
                telefone: undefined
            }
            this.constructor.createdAccounts.push(this);
            return "Conta criada com sucesso.";
        } else {
            throw new Error("Dados inválidos para cadastro.");
        }
    }

    deposit(value) {
        if (typeof value === "string" || typeof value === "boolean") {
            throw new Error("Não é possível depositar valores não numéricos");
        }
        if (value > 0) {
            this.#balance += value;
        } else {
            throw new Error("Não é possível depositar valores negativos");
        }
    }

    createPix(keyValue, keyType) {
        switch (keyType) {
            case "CPF":
                let regexCpf = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
                if (regexCpf.test(keyValue)) {
                    this.pixKeys.cpf = keyValue;
                    let accountIndex = Account.getCreatedAccountIndex(this);
                    Account.createdAccounts[accountIndex] = this;
                    return "Chave pix cpf criada com sucesso";
                } else {
                    throw new Error("Erro, cpf inválido");
                }
            case "EMAIL":
                let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (regexEmail.test(keyValue)) {
                    this.pixKeys.email = keyValue;
                    let accountIndex = Account.getCreatedAccountIndex(this);
                    Account.createdAccounts[accountIndex] = this;
                    return "Chave pix email criada com sucesso";
                } else {
                    throw new Error("Erro, email inválido")
                }
            case "TELEFONE":
                let regexTelefone = /^\+?\(?([0-9]{2})?\)?\s?[0-9]{4,5}(-|\s)?[0-9]{4}$/;
                if (regexTelefone.test(keyValue)) {
                    this.pixKeys.telefone = keyValue;
                    let accountIndex = Account.getCreatedAccountIndex(this);
                    Account.createdAccounts[accountIndex] = this;
                    return "Chave pix telefone criada com sucesso";
                } else {
                    throw new Error("Erro, telefone inválido")
                }
            default:
                throw new Error("Erro, tipo de chave pix inválido");
        }
    }

    //MEUS MÉTODOS
    withdraw(value) {
        if (value === undefined || value === null) {
            throw new Error("Não é possível realizar o saque, o valor informado é inválido.");
        }
        if (typeof value === "string" || typeof value === "boolean") {
            throw new Error("Não é possível depositar valores não numéricos");
        }
        if (value > this.#balance) {
            throw new Error(`Não é possível sacar valor maior que o saldo. Saldo atual: RS${this.#balance}`);
        }
        if (value < 0) {
            throw new Error("Não é possível sacar valores negativos");

        }
        this.#balance -= value;
        console.log(`Saque de RS${value} realizado com sucesso! Saldo atual ${this.#balance}`);
    }

    transferTo(anotherAccount, value) {
        if (!(anotherAccount instanceof Account)) {
            throw new Error("Não é possível realizar a transferência, a conta selecionada para o recebimento é inválida.");
        }
        if (value <= 0) {
            throw new Error(`Não é possível transferir valores negativos/zero.`);
        }
        if (value > this.#balance) {
            throw new Error(`Não é possível transferir valor maior que o saldo. Saldo atual: R$${this.#balance}`);
        }
        anotherAccount.deposit(value);
        this.withdraw(value);

    }
}

export default Account;

//entregar o método sacar
// entregar o método fazer pix
//entregart o método transferir 