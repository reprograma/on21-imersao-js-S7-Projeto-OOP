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
    };

  }

  createAccount(accountNumber, agency, balance) {
    if (accountNumber.length === 5 && agency.length === 4 && balance > 0) {
      this.#accountNumber = accountNumber;
      this.#agency = agency;
      this.#balance = balance;

      return "Conta criada com sucesso";
    }
    else {
      throw new Error("Dados inválidos para cadastro");
    }

  }

  validatePix(pix, KeyType) {
    switch(KeyType) {
    case 'cpf' :
      let regex = /([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})/;

      if (regex.test(pix)) {

        return true;
      }
      else { return false; }
    
    case 'email' :
      let emailRegex = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+.([a-z]+)?$/i;
      if (emailRegex.test(pix)) {
        return true;
      }
      else {
        return false;
      }
    
    case 'telefone':
      let telefoneRegex = /(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
      if (telefoneRegex.test(pix)) {

        return true;
      }
      else { return false; }

      default:
        return false;
 

  }
}

  createPixKey(KeyValue, KeyType) {
    
     if (this.validatePix(KeyValue, KeyType))
     {
      switch(KeyType){
        case 'email' :
          this.pixKeys.email = KeyValue;
       return `Chave pix  ${KeyType} criado com sucesso.`;
        case 'cpf':
          this.pixKeys.cpf = KeyValue;
          return `Chave pix  ${KeyType} criado com sucesso.`;
      case 'telefone':
        this.pixKeys.telefone = KeyValue;
        return `Chave pix  ${KeyType} criado com sucesso.`;
        default:
          return "Tipo de chave inexistente";
     
      }
    }
     else
     { return "Tipo de chave inexistente"; }
   
  }

  
  validatePixKeys(pixKeys) {
    if (pixKeys.cpf != undefined) {
      if (this.validatePix(pixKeys.cpf, 'cpf')) {
          return 'Chave pix válida';
      }
      else { return 'Chave pix inválida'; }
    }
    else if (pixKeys.email != undefined) {
      if (this.validatePix(pixKeys.email, 'email')) {
        return 'Chave pix válida';
      }
      else { return 'Chave pix inválida'; }
    }
    else if (pixKeys.telefone != undefined) {
      if (this.validatePix(pixKeys.telefone , 'telefone')) {

        return 'Chave pix válida';
      }
      else { return 'Chave pix inválida'; }

    }
    else { return 'Chave pix inválida'; }

  }
  
  pixTrasferTo(pix, type, value) {
    if (this.validatePix(pix, type)) {
       if(value <= this.#balance) 
       {
        this.#balance -= value;
        return 'Pix feito'
       }
       else { throw new Error("Pix não realizado, saldo insuficiente");}
    }
    else { throw new Error("Pix não realizado"); }
  }

  getBalance() {
    const value = this.#balance;
    if (typeof value === 'string' || typeof value === 'boolean') {
      throw new Error("Saldo da conta não é numérico");
    }
    else { return this.#balance; }
  }

  getAccountNumber() {
    const value = this.#accountNumber;
    if (typeof value === 'string' || typeof value === 'boolean') {
      throw new Error("Número da conta não é numérico");
    }
    else { return this.#accountNumber; }
  }

  getAgency() {
    const value = this.#agency;
    if (typeof value === 'string' || typeof value === 'boolean') {
      throw new Error("Número da agência não é numérico");
    }
    else { return this.#agency; }
  }


  get accountNumber() {
    return this.#accountNumber;
  }
  get agency() {
    return this.#agency;
  }

  get balance() {
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

  withdraw(value) {
    if (typeof value === 'string' || typeof value === 'boolean') {
      throw new Error("Não é possível sacar valores não numéricos");
    }
    if (value <= this.#balance) {
      if (value > 0) {
        this.#balance -= value;
      } else {
        throw new Error("Não é possível sacar valores negativos");
      }
    } else {
      throw new Error("Não é possível sacar valor maior que o saldo");
    }

  }

  validateAccount(account) {
   if (!(account.accountNumber.length === 5 && account.agency.length === 4 && account.balance > 0)) {
   // if(account instanceof Account){
    throw new Error("Conta inválida");

    }
    else {
      return "Conta válida"
    }
  }

  transferTo(accountAnother, value) {
    if (this.validateAccount(accountAnother)) {
      if (this.#balance >= value) {
        this.#balance -= value;
        accountAnother.#balance += value;

        return "Transferência feita com sucesso"

      } else if (this.#balance < value) {
        throw new Error('Saldo insuficiente para prosseguir operação');
      }

    } else {
      throw new Error(`outra Conta não é uma instância de Account`);
    }
  }

  validateTransaction(transaction, value, income, accountAnother) {
    if (value <= income) {
      switch (transaction) {
        case "withdraw":
          this.withdraw(value);
          return "Operação dentro do limite diário";

        case "deposit":
          this.deposit(value);
          return "Operação dentro do limite diário";

        case "transferTo":
          this.transferTo(accountAnother, value);
          return "Operação dentro do limite diário";

        default:
          throw new Error(`Operação inválida`);

      }
    }
    else {
      throw new Error(`Limite diário excedido`);
    }
  }
}



export default Account;
