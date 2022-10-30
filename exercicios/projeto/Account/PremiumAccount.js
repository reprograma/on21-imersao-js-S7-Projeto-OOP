import Account from "./Account";

class PremiumAccount extends Account {
  limiteTransacao = 0;

  createAccount(numeroConta, agencia, saldo) {
    super.createAccount(numeroConta, agencia, saldo);
    return `Conta Premium criada.`;
  }
}

export default PremiumAccount;
