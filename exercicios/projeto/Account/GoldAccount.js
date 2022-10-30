import Account from "./Account";

class GoldAccount extends Account {
  limiteTransacao = 5000;

  createAccount(numeroConta, agencia, saldo) {
    super.createAccount(numeroConta, agencia, saldo);
    return `Conta Gold criada.`;
  }
}

export default GoldAccount;
