class Account {
    #accountNumber;
    #agency;
    #balance;
    pixKey;

    constructor(accountNumber, agency, balance){
        this.#accountNumber = accountNumber;
        this.#agency = agency;
        this.#balance = balance;
        this.pixKeys ={
            cpf: null,
            email: null,
            telefone: null
        }
    }
    
    createAccount(accountNumber,  agency, balance){
        if(accountNumber.length === 5 && agency.length === 4 && balance > 0){
            this.#accountNumber = accountNumber;
            this.#agency = agency;
            this.#balance = balance;

            return "Conta criada com sucesso";
        } else {
            throw new Error("Dados inválidos para cadastro");
        }
    }

    getBalance(){
        return this.#balance;
    }

    getAgency(){
        return this.#agency;
    }

    getAccountNumber() {
        return this.#accountNumber;
    }


    deposit(value){
        if(typeof value === 'string' || typeof value === 'boolean'){
            throw new Error("Não é possível depositar valores não numéricos");
        }
        if(value > 0){
            this.#balance += value;
        } else {
            throw new Error("Não é possível depositar valores negativos");
        }
    }

    withdraw(value){
        if(typeof value === 'string' || typeof value === 'boolean'){
            throw new Error("Não é possível depositar valores não numéricos");
        }
        if(value > 0){
            if(value <= this.#balance){
                this.#balance -= value;
                return `Saque de ${value} reais  realizado com sucesso`;
            } else {
                throw new Error("Saldo insuficiente")
            }
        } else { 
            throw new Error("Não é possível sacar valores negativos")
        }
    }

    createPixKey(keyValue, keyType){
        switch(keyType){
            case "CPF":
                let regex = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/
                if(regex.test(keyValue)){
                    this.pixKeys.cpf = keyValue;
                    return "Chave pix cpf criada com sucesso";
                }else {
                    throw new Error("Erro CPF inválido");
                }
            case "EMAIL":
                this.pixKeys.email = keyValue;
                return "Chave pix email criada com sucesso";
            case "TELEFONE":
                this.pixKeys.telefone = keyValue;
                return "Chave pix telefone criada com sucesso";
            default:
                return "Tipo de chave inexistente"
        }
    }

    transferTo(anotherAccount, value){
        if(this.#balance >= value){
            this.#balance -= value;
            anotherAccount.deposit(value);
            return "Transferencia feita com sucesso";
        } else {
            throw new Error("saldo insuficiente");
        }
    }
}

export default Account;