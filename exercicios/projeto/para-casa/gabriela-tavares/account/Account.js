import Client from "../client/Client";

class Account {
  #accountNumber;
  #agency;
  #balance;
  pixKey;

  constructor(accountNumber, agency, balance) {
    this.#accountNumber = accountNumber;
    this.#agency = agency;
    this.#balance = balance;
    this.pixKey = {
      cpf: null,
      email: null,
      telefone: null,
    };
  }

  getBalance() {
    return this.#balance;
  }

  getAgency() {
    return this.#agency;
  }

  getAccountNumber() {
    return this.#accountNumber;
  }

  createAccount(accountNumber, agency, balance) {
    if (accountNumber.length === 5 && agency.length === 4 && balance > 0) {
      this.#accountNumber = accountNumber;
      this.#agency = agency;
      this.#balance = balance;
      return "Conta criada com sucesso";
    } else {
      throw new Error("Dados inválidos para cadastro");
    }
  }

  deposit(value) {
    if (typeof value === "string" || typeof value === "boolean") {
      throw new Error("Transação não é possível para valores não numéricos");
    }
    if (value > 0) {
      this.#balance += value;
    } else {
      throw new Error("Transação não é possível para valores negativos");
    }
  }

  otherDeposit(client, value) {
    if (client instanceof Client) {
      if (typeof value === "string" || typeof value === "boolean") {
        throw new Error("Não é possível depositar valores não numéricos");
      }
      if (value > 0 && value < client.transactionLimit) {
        this.#balance += value;
      } else {
        throw new Error("Excedido limite de transações diárias!");
      }
    }
  }

  saque(value) {
    if (this.#balance >= value) {
      const newBalance = (this.#balance -= value);
      return `O saque foi realizado com sucesso! Seu saldo atual é de ${newBalance}`;
    } else {
      throw new Error("Não foi possível realizar o saque, saldo infuficiente!");
    }
  }

  createPixKey(type, value) {
    switch (type) {
      case "cpf":
        let regexCpf =
          /([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})/;
        let validCpf = regexCpf.test(value);

        if (type == "cpf" && validCpf === true) {
          this.pixKey.cpf = value;
          return "Chave pix cpf criada com sucesso";
        } else {
          throw new Error("Erro, cpf inválido");
        }

      case "email":
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let validEmail = regexEmail.test(value);

        if (type == "email" && validEmail === true) {
          this.pixKey.email = value;
          return "Chave pix email foi criada com sucesso";
        } else {
          throw new Error("Erro, email inválido");
        }

      case "telefone":
        let regexTelefone = /^\+?\d{2}?\s*\(\d{2}\)?\s*\d{4,5}\-?\d{4}$/g;
        let validTelefone = regexTelefone.test(value);
        //'+55 (55) 23321-5454'

        if (type == "telefone" && validTelefone === true) {
          this.pixKey.telefone = value;
          return "Chave pix telefone foi criada com sucesso";
        } else {
          throw new Error("Erro, telçefone inválido");
        }
      default:
        return "Tipo de chave inexistente";
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
      if (
        pixKeyAnotherAccount == anotherAccount.pixKey.telefone ||
        pixKeyAnotherAccount == anotherAccount.pixKey.cpf ||
        pixKeyAnotherAccount == anotherAccount.pixKey.email
      ) {
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
