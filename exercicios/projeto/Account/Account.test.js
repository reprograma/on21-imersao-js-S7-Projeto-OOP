import Account from "./Account.js";
import StandardAccount from "./StandardAccount.js";
import GoldAccount from "./GoldAccount.js";
import PremiumAccount from "./PremiumAccount.js";

describe("Teste da classe Account", () => {
  test("Verificar se instância de Account é criada corretamente", () => {
    const account = new Account();
    expect(account).toBeInstanceOf(Account);
  });
});

describe("Teste de depósito", () => {
  test("Depósito com valor de 100 reais", () => {
    const account = new Account();
    account.createAccount(1, 1, 1000);
    account.deposit(100);

    expect(account.getBalance()).toBe(1100);
  });

  test("Depósito com valor de -100", () => {
    const account = new Account();
    account.createAccount(1, 1, 1000);
    expect(() => {
      account.deposit(-100);
    }).toThrow("Não é possível depositar valores negativos.");
    expect(account.getBalance()).toBe(1000);
  });
  test("Depósito com valor não numérico", () => {
    const account = new Account();
    account.createAccount(1, 1, 1000);
    expect(() => {
      account.deposit("invalido");
    }).toThrow("Não é possível depositar valores não numéricos.");
    expect(account.getBalance()).toBe(1000);
  });
});

describe("Teste de saque", () => {
  test("Saque dentro do saldo disponível (100 reais)", () => {
    const account = new Account();
    account.createAccount(1, 1, 1000);
    account.saque(100);

    expect(account.getBalance()).toBe(900);
  });
  test("Saque de valor acima do saldo (2000 reais)", () => {
    const account = new Account();
    account.createAccount(1, 1, 1000);

    expect(() => {
      account.saque(2000);
    }).toThrow("Valor de saque não permitido.");
    expect(account.getBalance()).toBe(1000);
  });
  test("Saque de valor não numérico", () => {
    const account = new Account();
    account.createAccount(1, 1, 1000);

    expect(() => {
      account.saque("valor");
    }).toThrow("Valor de saque inválido.");
    expect(account.getBalance()).toBe(1000);
  });
});

describe("Teste de criar conta", () => {
  test("Criar conta Standard", () => {
    const account = new StandardAccount();
    expect(account.createAccount()).toBe("Conta Standard criada.");
  });
  test("Criar conta Gold", () => {
    const account = new GoldAccount();
    expect(account.createAccount()).toBe("Conta Gold criada.");
  });
  test("Criar conta Premium", () => {
    const account = new PremiumAccount();
    expect(account.createAccount()).toBe("Conta Premium criada.");
  });
});

describe("Teste de criar chave PIX", () => {
  test("Cadastrar PIX e-mail", () => {
    const account = new Account();
    account.cadastrarChavePix("telefone", "(11)12345678");
    expect(account.cadastrarChavePix("e-mail", "email@email.com")).toBe(
      "Chave PIX e-mail cadastrado."
    );
  });
  test("Cadastrar PIX telefone", () => {
    const account = new Account();
    expect(account.cadastrarChavePix("telefone", "(11)12345678")).toBe(
      "Chave PIX telefone cadastrado."
    );
  });
  test("Cadastrar PIX CPF", () => {
    const account = new Account();
    expect(account.cadastrarChavePix("CPF", "71414533004")).toBe(
      "Chave PIX CPF cadastrado."
    );
  });
});
