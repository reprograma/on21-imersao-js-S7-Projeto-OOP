import Client from "../Client/Client.js";
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
      cpf: null,
      email: null,
      telefone: null,
    };
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

  createAccount(accountNumber, agency, balance) {
    if (accountNumber.length === 5 && agency.length === 4 && balance > 0) {
      this.#accountNumber = accountNumber;
      this.#agency = agency;
      this.#balance = balance;
      return "Conta criada com sucesso";
    } else {
      throw new Error("Erro no cadastro, dados inválidos.");
    }
  }

  createPixKey(keyValue, keyType) {
    switch (keyType) {
      case "CPF":
        let regex =
          /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
        if (regex.test(keyValue)) {
          this.pixKeys.cpf = keyValue;
          return "Chave pix cpf criada com sucesso";
        } else {
          throw new Error("Erro cpf inválido");
        }

      case "EMAIL":
        let regexEmail = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+.([a-z]+)?$/i;
        if (regexEmail.test(keyValue)) {
          this.pixKeys.email = keyValue;
          return "Chave pix email criada com sucesso";
        }

      case "TELEFONE": // regex do telefone
        let regexTelefone = /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/;
        if (regexTelefone.test(keyValue)) {
          this.pixKeys.telefone = keyValue;
          return "Chave pix telefone criada com sucesso";
        }

      default:
        return "Tipo de chave inexistente";
    }
  }
  deposit(client, value) {
    if (client instanceof Client) {
      if (typeof value === "string" || typeof value === "boolean") {
        throw new Error("Não é possível depositar valores não numéricos");
      }
      if (value > client.transactionLimit){
        throw new Error(`Limite diário ${client.transactionLimit} excedido.`)
      }
      if (value > 0 && value < client.transactionLimit) {
        this.#balance += value;
      } else {
        throw new Error("Não é possível depositar valores negativos");
      }
    }
  }

  withdrawal(client, value) {
    if (typeof value === "string" || typeof value === "bolean") {
      throw new Error("Informe um valor de saque inválido.");
    }
    if (value > client.transactionLimit){
      throw new Error(`Limite diário ${client.transactionLimit} excedido.`)
    }

    if (this.#balance >= value && value < client.transactionLimit) {
      this.#balance -= value;
      return "Saque realizado com sucesso.";
    } else {
      throw new Error("Você nao possui saldo suficiente para esta operação");
    }
  }

  getPixKey(key) {
    if (key === "CPF") {
      return this.pixKeys.cpf;
    } else if (key === "EMAIL") {
      return this.pixKeys.email;
    } else if (key === "TELEFONE") {
      return this.pixKeys.telefone;
    } else {
      return "Não temos essa opção de chave cadastrada.";
    }
  }

  transferTo(accountanother, value, cpf) {
    if (
      accountanother instanceof Account &&
      this.#balance >= value &&
      accountanother.cpf === cpf
    ) {
      this.#balance -= value;
      accountanother.#balance += value;
      return "Transferência feita com sucesso";
    } else if (!(accountanother instanceof Account)) {
      throw new Error(`Conta inválida!`);
    } else if (this.#balance < value) {
      throw new Error(`Saldo insuficiente para prosseguir operação`);
    }
  }
  transferByPix(client, anotherAccount, pixKeyAnotherAccount, value) {
    if (anotherAccount instanceof Account) {
      if (pixKeyAnotherAccount == anotherAccount.pixKeys.telefone || pixKeyAnotherAccount == anotherAccount.pixKeys.cpf || pixKeyAnotherAccount == anotherAccount.pixKeys.email) {
        if (this.#balance >= value) {
          if (value < client.transactionLimit) {
            this.#balance -= value;
            anotherAccount.#balance += value;

            return "Transferência feita com sucesso";
          } else {
            throw new Error(`Excedido limite de transações diárias!`);
          }
        } else {
          throw new Error(`Saldo insuficiente para prosseguir operação`);
        }
      } else {
        throw new Error(`Chave pix inválida`);
      }
    } else {
      throw new Error(`Conta inválida!`);
    }
  }
  

}

export default Account;