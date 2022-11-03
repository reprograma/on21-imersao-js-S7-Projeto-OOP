
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
    if(accountNumber.length === 5 && agency.length === 4 && balance > 0){
      this.#accountNumber = accountNumber;
      this.#agency = agency;
      this.#balance = balance;
      return "Conta criada com sucesso!"
    } else {
      throw new Error("Dados inválidos para cadastro");
    }
  }

  get balance() {
    return this.#balance;
  }

  set balance(value) {
    this.#balance = value;
  }

  get pixKeys() {
    return this.pixKeys;
  }

  deposit(value) {
    if (isNaN(value) === true) {
      throw new Error("Não é possível depositar valores não númericos");
    }

    if (value > 0) {
      const newValue = this.balance + value;
      this.balance = newValue;
    } else {
      throw new Error("Não é possível depositar valores negativos.");
    }
  }

  cashWithdraw(value) {
    if (this.balance >= value) {
      const newValue = this.balance - value;
      this.balance = newValue;
    } else {
      throw new Error("Saldo insuficiente");
    }
  }

  transferTo(anotherAccount, value) {
    if (this.balance >= value) {
      const newValue = this.balance - value;
      this.balance = newValue;
      anotherAccount.deposit(value);
    } else {
      throw new Error("Saldo insuficiente");
    }
  }

  registerPixKey(type, key) {
    if (type === "EMAIL") {
      var re = /\S+@\S+\.\S+/;
      let validate = re.test(key);

      if (validate === true) {
        this.pixKeys.email = key;
      } else {
        throw new Error("Email inválido");
      }
    }

    if (type === "CPF") {
      var re = /^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}/;
      let validate = re.test(key);

      if (validate === true) {
        this.pixKeys.cpf = key;
      } else {
        throw new Error("CPF inválido");
      }
    }

    if (type === "TELEFONE") {
      var re =
        /(\+?55)?(0?(([14689][1-9])|(2[12478])|(3[1234578])|(5[1345])|(7[134579])))9[6-9][0-9]{7}/;
      let validate = re.test(key);

      if (validate === true) {
        this.pixKeys.telefone = key;
      } else {
        throw new Error("telefone inválido");
      }
    }
  }

  getPixKey() {
    return this.pixKeys;
  }

  tranferWithPix(anotherAccount, key, value) {
    let validateKey = anotherAccount.pixKeys.email === key || anotherAccount.pixKeys.cpf === key || anotherAccount.pixKeys.telefone === key

    if (anotherAccount instanceof Account && validateKey) {
      if (this.balance >= value) {
        const newValue = this.balance - value;
        this.balance = newValue;
        anotherAccount.deposit(value);
      } else {
        throw new Error("Saldo insuficiente");
      }
    } else {
      throw new Error("Chave pix não cadastrada");
    }
  }

  getBalance() {
    return `Saldo atual: R$${this.balance}`;
  }

}

export default Account;
