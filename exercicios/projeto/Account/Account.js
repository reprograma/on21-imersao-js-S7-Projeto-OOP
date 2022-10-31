class Account {
    #accountNumber;
    #agency;
    #balance;
    pixKey;

    constructor(accountNumber, agency, balance) {
        this.#accountNumber = accountNumber;
        this.#agency = agency;
        this.#balance = balance
    }

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
}

export default Account