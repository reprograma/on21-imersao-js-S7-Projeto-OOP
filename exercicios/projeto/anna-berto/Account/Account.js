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
      cpf: "",
      email: "",
      telefone: "",
    };
  }

  getBalance() {
    return this.#balance;
  }

  getAccountNumber() {
    return this.#accountNumber;
  }

  getAgency() {
    return this.#agency;
  }

  createAccount(accountNumber, agency, balance) {
    if (accountNumber.length == 5 && agency.length == 4 && balance > 0) {
      this.#balance = balance;
      this.#accountNumber = accountNumber;
      this.#agency = agency;
      return "Conta criada com sucesso";
    } else {
      throw new Error("Dados inválidos para cadastro");
    }
  }

  deposit(amount) {
    if (typeof amount === "string" || typeof amount === "boolean") {
      throw new Error("Não é possível depositar valores não numéricos");
    }
    if (amount > 0) {
      this.#balance += amount;
    } else {
      throw new Error("Não é possível depositar valores negativos");
    }
  }
  cashWithdrawal(amount) {
    if (typeof amount === "string" || typeof amount === "boolean") {
      throw new Error("Não é possível depositar valores não numéricos");
    }
    if (amount < 0) {
      throw new Error("Não é possível depositar valores negativos");
    }
    if (this.#balance > amount) {
      this.#balance = this.#balance - amount;
      console.log(`Voce fez uma retirada de ${amount}`);
    } else {
      throw new Error("Você não possui saldo para esta retirada");
    }
  }

  createPixKey(keyValue, keyType) {
    switch (keyType) {
      case "CPF":
        let regexCpf =
          /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
        if (regexCpf.test(keyValue)) {
          this.pixKey.cpf = keyValue;
          return "Chave pix CPF criada com sucesso";
        } else {
          throw new Error("Erro, cpf inválido");
        }

      case "email":
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (regexEmail.test(keyValue)) {
          this.pixKey.email = keyValue;
          return "Chave pix email criada com sucesso";
        } else {
          throw new Error("Erro, email inválido");
        }

      case "telefone":
        let regexTel = /^\+?\(?([0-9]{2})?\)?\s?[0-9]{4,5}(-|\s)?[0-9]{4}$/;
        if (regexTel.test(keyValue)) {
          this.pixKey.telefone = keyValue;
          return "Chave pix telefone criada com sucesso";
        } else {
          throw new Error("Erro, telefone inválido");
        }

      default:
        return "Não reconhecemos esse tipo de chave, ela pode ser o CPF, email ou telefone.";
    }
  }

  transferTo(anotherAccount, amountTransfer) {
    if (anotherAccount instanceof Account && this.#balance > amountTransfer) {
      this.#balance = this.#balance - amountTransfer;
      anotherAccount.#balance = anotherAccount.#balance + amountTransfer;
      console.log(
        `Foi realizada uma transferencias de R$${amountTransfer}, o saldo da conta de origem é de R$${
          this.#balance
        }`
      );

      console.log(
        `O saldo da conta de destino é de R$${anotherAccount.#balance}`
      );
    } else {
      throw new Error("Seu saldo nao é suficiente para esta operacao");
    }
  }

  transferToPix(anotherAccount, pixKey, amountTransfer) {
    if (anotherAccount instanceof Account && this.#balance > amountTransfer) {
      if (
        pixKey === anotherAccount.pixKey.cpf ||
        pixKey === anotherAccount.pixKey.email ||
        pixKey === anotherAccount.pixKey.telefone
      ) {
        // console.log(anotherAccount.email)
        this.#balance = this.#balance - amountTransfer;
        anotherAccount.#balance = anotherAccount.#balance + amountTransfer;
        console.log(
          `Foi realizada um pix de R$${amountTransfer}, o saldo da conta de origem é de R$${
            this.#balance
          }`
        );
        console.log(
          `O saldo da conta de destino é de R$${anotherAccount.#balance}`
        );
      } else {
        throw new Error("Chave pix não reconhecida");
      }
    } else {
      throw new Error("Você nao pode fazer esta operação");
    }
  }
}
export default Account;

