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
      throw new Error("Dados inválidos");
    }
  }

  getBalance() {
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

// corrigir antes de subir:
// transferTo(cpf, othercount, valor) {
//   if (this.cpf === cpf) {
//       this.verificarValor(valor);
//       if (this.#balance >= valor) {
//           this.#balance -= valor;
//           othercount.deposito(valor);
//           return "Transferência realizada com sucesso!"
//       } else {
//           throw new Error("Saldo insuficiente!");
//       }
//   } else {
//       throw Error('Cpf inválido!')
//   }
// }

export default Account;