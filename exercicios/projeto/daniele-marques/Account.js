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
      phone: null,
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

  withdraw(value) {
    if (this.#balance >= value) {
      const newBalance = (this.#balance -= value);
      return `O saque foi realizado com sucesso! Seu saldo atual é de ${newBalance}`;
    } else {
      throw new Error("Não foi possível realizar o saque, saldo infuficiente!");
    }
  }

  createAccount(accountNumber, agency, balance) {
    if (accountNumber.length === 5) {
      if (agency.length === 4) {
        if (balance > 0) {
          this.#accountNumber = accountNumber;
          this.#agency = agency;
          this.#balance = balance;
          return "A conta foi criada com sucesso";
        }
      }
    } else {
      throw new Error(
        "Informe os dados novamente, não foi possivel completar cadastro"
      );
    }
  }

  deposit(value) {
    if (typeof value === "string" || typeof value === "boolean") {
      throw new Error("Digite somente numeros");
    }
    if (value > 0) {
      this.#balance += value;
    }
  }

  createPixKey(keyValue, keyType) {
    switch (keyType) {
      case "CPF":
        let regex =
          /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
        if (regex.test(keyValue)) {
          this.pixsKeys.cpf = keyValue;
          return "Chave pix cpf criada com sucesso";
        } else {
          throw new Error("Erro, cpf inválido");
        }
      case "EMAIL":
      case "TELEFONE":
      default:
        return "Chave inválida";
    }
  }
}

export default Account;

// Account
// - atributos
//   - accountNumber -> privado
//   - agency -> privado
//   - balance  -> privado
//   - pixKey
// - metodos
//   - depositar OK
//   - sacar ENTREGAR NA QUINTA
//   - tranferir ENTREGAR NA QUINTA
//   - pix ENTREGAR NA QUINTA
//   - criar conta OK
//   - verificar saldo OK
//   - verificar chave pix (se possivel ENTREGAR NA QUINTA)
//   - atualizar saldo (se possivel ENTREGAR NA QUINTA)
//   - criar chave pix OK

//   pix
//   - createPix
//     - todas chaves são de texto
//     - chave ser email
//     - chave ser um telefone
//     - chave ser cpf
