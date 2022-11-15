class Account {
    #accountNumber;
    #agency;
    #balance;
    pixKey;

    constructor(accountNumber, agency, balance) {
        this.#accountNumber = accountNumber;
        this.#agency = agency;
        this.#balance = balance;
    }
}

export default Account;