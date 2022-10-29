import Account from "./Account.js";

describe("Teste da classe Account", () => {
  test("Verificar se instância de Account é criada corretamente", () => {
    const account = new Account();
    expect(account).toBeInstanceOf(Account);
  });
  test("Depósito com valor de 100 reais", () => {
    const account = new Account(1, 1, 1000);
    account.deposit(100);

    expect(account.getBalance()).toBe(1100);
  });

  test("Depósito com valor de -100", () => {
    const account = new Account(1, 1, 1000);
    expect(() => {
      account.deposit(-100);
    }).toThrow("Não é possível depositar valores negativos.");
    expect(account.getBalance()).toBe(1000);
  });
  test("Depósito com valor não numérico", () => {
    const account = new Account(1, 1, 1000);
    expect(() => {
      account.deposit("invalido");
    }).toThrow("Não é possível depositar valores não numéricos.");
    expect(account.getBalance()).toBe(1000);
  });
});
