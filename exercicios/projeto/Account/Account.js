
class Account {
    #accountNumber;
    #agency;
    #balance;
    pixKeys;

    constructor(accountNumber, agency, balance){
        this.#accountNumber = accountNumber;
        this.#agency = agency;
        this.#balance = balance;
        this.pixKeys = {
            cpf: undefined,
            email: undefined,
            telefone: undefined,
        }
    }

    createAccount(accountNumber, agency, balance){
        if (accountNumber.length === 5 &&  agency.length === 4 && balance > 0) {
            this.#accountNumber = accountNumber;
            this.#agency = agency;
            this.#balance = balance;
            
            return "Conta criada com sucesso";
        } else {
            throw new Error("Dados inválidos para cadastro");
        }
    }

    getAccountNumber() {
        return this.#accountNumber;
      }
    
    getAgency() {
        return this.#agency;
      }
    
    // verificar o saldo da conta
    getBalance(){
        return this.#balance;
    }
    
    deposit(value){
        if(typeof value === 'string' || typeof value === 'boolean') {
            throw new Error ("Não é possível depositar valores não númericos.");
        }
        if(value > 0 ) {
            this.#balance += value;
        }else {
            throw new Error ("Não é possível depositar com valores negativos.")
        }
    }

    withDraw(valueWithDraw){
        if(this.#balance > valueWithDraw) {
            this.#balance -= valueWithDraw
            return "Saque realizado com sucesso"
        }else {
            throw new Error ("Você não tem limite disponível no momento.")
        }
    }

    createPixKey(keyValue, keyType) {
        switch(keyType) {
            case "CPF":
                let regex = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
                
                if (regex.test(keyValue)){
                    this.pixKeys.cpf = keyValue;
                    return "Chave pix criada com sucesso"
                } else {
                    throw new Error ("CPF inválido")
                }
            case "EMAIL":
                let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

                if (emailRegex.test(keyValue)) {
                    this.pixKeys.email = keyValue;
                    return "Chave pix criada com sucesso"
                } else { 
                    throw new Error ("E-mail inválido")
                }
            case "TELEFONE":
                let telefoneRegex = /^\+?\(?([0-9]{2})?\)?\s?[0-9]{4,5}(-|\s)?[0-9]{4}$/;

                if (telefoneRegex.test(keyValue)) {
                    this. pixKeys.telefone = keyValue
                    return "Chave pix criada com sucesso"
                } else { 
                    throw new Error ("Telefone inválido")
                }
            default: 
                return "Tipo de chave inexistente"    
        }
    }

    transfPix(valuePix, keyPix){
        if(this.#balance > valuePix){
            this.#balance -= valuePix;
            return "Transferência pix realizada com sucesso"
        }else{
            throw new Error ("Você não tem saldo para transferência")
        }
    }

 
    
}

export default Account;
