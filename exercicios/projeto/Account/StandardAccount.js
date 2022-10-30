import Account from "./Account";

class StandardAccount extends Account {
  limiteTransacao = 1000;

  createAccount(numeroConta, agencia, saldo) {
    super.createAccount(numeroConta, agencia, saldo);
    return `Conta Standard criada.`;
  }
}

export default StandardAccount;
