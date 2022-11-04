import Account from "../Account/Account.js";

class Client {
  name;
  #cpf;
  #account;
  #income;

  registerClient(name, cpf, account, income) {
    if (account instanceof Account) {
      this.name = name;
      this.#cpf = cpf;
      this.#account = account;
      this.#income = income;

      return "Cliente cadastrado."
    } else {
        throw new Error("Erro no cadastro, dados inválidos.");
    }
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
    throw new Error("Valor não númerico");
  }

  if (value > 0) {
    const newValue = this.balance + value;
    this.balance = newValue;
  } else {
    throw new Error("Valor negativo.");
  }
}

const conta1 = new Conta('1234', '5678-5', 500)
const conta2 = new Conta('3467', '0978-0', 100)

const cliente1 = new Cliente()
const cliente2 = new Cliente()

cliente2.cadastrarCliente('Ana', '198765432', conta2, 8000)

cliente1.cadastrarCliente('Mário', '123456789', conta1, 5000)
console.log(cliente1.tipoConta)
console.log(cliente2.tipoConta)

export default Client;