import Account from './Account.js';

describe('Teste da classe Account', () => {
  test('verificar se instancia de Account é feita corretamente ', () => {
    const account = new Account();
    expect(account instanceof Account).toBe(true);
  });

  // positivo -> depósito com valor positivo
  test('depósito com valor de 100 reais ', () => {
    const account = new Account(1, 1, 1000);
    account.deposit(100);
    expect(account.getBalance()).toBe(1100);
  });

  // negativo -> deposito com valor negativo
  test('depósito com valor de -100 ', () => {
    const account = new Account(1, 1, 1000);
    expect(() => account.deposit(-100)).toThrow(
      'Não é possível depositar valores negativos'
    );
    expect(account.getBalance()).toBe(1000);
  });

  // negativo -> deposito com valor não numérico
  test('depósito com valor não numérico ', () => {
    const account = new Account(1, 1, 1000);
    expect(() => account.deposit('')).toThrow(
      'Não é possível depositar valores não numéricos'
    );
    expect(account.getBalance()).toBe(1000);
  });
});
