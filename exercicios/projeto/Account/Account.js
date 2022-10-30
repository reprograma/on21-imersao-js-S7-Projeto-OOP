import Client from'../Client/Client';

class Account{
    #accountNumber;
    #agency;
    #balance;
    pixKey;
    constructor(accountNumber, agency, balance){
        this.#accountNumber = accountNumber;
            this.agency = agency;
            this.#balance = balance;
    }

    createAccount(client, accountNumber, agency, balance){
        if(client instanceof Client){
            this.client = client;
            this.#accountNumber = accountNumber;
            this.agency = agency;
            this.#balance = balance
            return `A conta foi criada com sucesso`;
        } else{
            throw new Error("Erro ao criar a conta");
        }
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

    withDraw(value){
        if(typeof value !== "number"){
            throw new Error("Não foi possível realizar o saque");
        }
        if(value > 0 && this.#balance >= value){
            this.#balance -= value;
        } else{
            throw new Error(`Não foi possível realizar o saque`);
        }
    }

    criatePix(){}

}

export default Account;

