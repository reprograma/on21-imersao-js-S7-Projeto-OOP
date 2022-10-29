class Account{
    #accountNumber;
    #agency;
    #balance;
    pixKey;
    constructor(accountNumber, agency, balance){
        this.#accountNumber = accountNumber;
        this.#agency = agency;
        this.#balance = balance;
    }

    getBalance(){
       return this.#balance;
    }

    deposit(value){
        if(typeof value !== "number"){
            throw new Error("Não é possível depositar valores não numéricos");
        } else{
            if(value > 0){
                this.#balance += value;
            } else {
                throw new Error("Não é possível depositar valores negativos");
            }
        }
    }
}

module.exports = Account;