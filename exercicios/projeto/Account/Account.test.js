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
  const account = new Account();
  beforeEach(() => {
    account.createAccount("12345", "123", 1000);
  });

  test("Depósito com valor de 100 reais", () => {
    account.deposit(100);
    expect(account.balance).toBe(1100);
  });

  test("Depósito com valor de -100", () => {
    expect(() => {
      account.deposit(-100);
    }).toThrow("Não é possível depositar valores negativos.");
    expect(account.balance).toBe(1000);
  });

  test("Depósito com valor não numérico", () => {
    expect(() => {
      account.deposit("invalido");
    }).toThrow("Não é possível depositar valores não numéricos.");
    expect(account.balance).toBe(1000);
  });
});

describe("Teste de saque", () => {
  const account = new Account();
  beforeEach(() => {
    account.createAccount("12345", "123", 1000);
  });

  test("Saque dentro do saldo disponível (100 reais)", () => {
    account.withdrawal(100);

    expect(account.balance).toBe(900);
  });

  test("Saque de valor acima do saldo (2000 reais)", () => {
    expect(() => {
      account.withdrawal(2000);
    }).toThrow("Valor de saque não permitido.");
    expect(account.balance).toBe(1000);
  });

  test("Saque de valor não numérico", () => {
    expect(() => {
      account.withdrawal("valor");
    }).toThrow("Valor de saque inválido.");
    expect(account.balance).toBe(1000);
  });
});

describe("Teste de criar conta", () => {
  const account = new StandardAccount();
  test("Criar conta Standard", () => {
    expect(account.createAccount("12345", "123", 1000)).toBe(
      "Conta Standard criada."
    );
  });

  test("Criar conta Gold", () => {
    const account = new GoldAccount();
    expect(account.createAccount("12345", "123", 1000)).toBe(
      "Conta Gold criada."
    );
  });

  test("Criar conta Premium", () => {
    const account = new PremiumAccount();
    expect(account.createAccount("12345", "123", 1000)).toBe(
      "Conta Premium criada."
    );
  });
});

describe("Teste de criar chave PIX", () => {
  const account = new Account();
  beforeEach(() => {
    account.createAccount("12345", "123", 1000);
  });
  test("Cadastrar PIX e-mail", () => {
    expect(account.createPixKey("EMAIL", "email@email.com")).toBe(
      "Chave PIX EMAIL cadastrado."
    );
  });

  test("Cadastrar PIX telefone", () => {
    expect(account.createPixKey("TELEFONE", "(11)12345678")).toBe(
      "Chave PIX TELEFONE cadastrado."
    );
  });

  test("Cadastrar PIX CPF", () => {
    expect(account.createPixKey("CPF", "71414533004")).toBe(
      "Chave PIX CPF cadastrado."
    );
  });

  test("Cadastrar chave inválida", () => {
    expect(account.createPixKey("invalido", "71414533004")).toBe(
      "Chave PIX inválida"
    );
  });
});

describe("Teste de transferência de valores", () => {
  const account1 = new Account();
  const account2 = new Account();
  beforeEach(() => {
    account1.createAccount("12345", "123", 1000);
    account2.createAccount("12333", "123", 1000);
  });

  test("Tranferência válida de 500", () => {
    account1.transfer(account2, 500);
    expect(account1.balance).toBe(500);
    expect(account2.balance).toBe(1500);
  });

  test("Transferência com valor indisponível", () => {
    expect(() => account1.transfer(account2, 2000)).toThrow(
      "Saldo insuficiente para transferência."
    );
    expect(account1.balance).toBe(1000);
    expect(account2.balance).toBe(1000);
  });

  test("Transferência com valor inválido", () => {
    expect(() => account1.transfer(account2, "valor inválido")).toThrow(
      "Operação inválida."
    );
    expect(account1.balance).toBe(1000);
    expect(account2.balance).toBe(1000);
  });
});

describe("Teste de transferência PIX", () => {
  const account1 = new Account();
  const account2 = new Account();
  beforeEach(() => {
    account1.createAccount("12345", "123", 1000);
    account1.createPixKey("TELEFONE", "(11)123456789");
    account2.createAccount("12333", "123", 1000);
    account2.createPixKey("TELEFONE", "(11)123456789");
  });

  test("Transferência PIX válida de 500", () => {
    account1.transferPIX(account2, "TELEFONE", 500);
    expect(account1.balance).toBe(500);
    expect(account2.balance).toBe(1500);
  });

  test("Transferência para chave inválida", () => {
    expect(() => account1.transferPIX(account2, "EMAIL", 500)).toThrow(
      "Chave PIX inválida."
    );
    expect(account1.balance).toBe(1000);
    expect(account2.balance).toBe(1000);
  });

  test("Tranferência para conta inválida", () => {
    expect(() => {
      account1.transferPIX("conta inválida", "TELEFONE", 500);
    }).toThrow("Operação inválida.");
  });
});

describe("Teste de verificação de PIX", () => {
  test("Verificar chave TELEFONE", () => {
    const account1 = new Account();
    account1.createAccount("12345", "123", 1000);
    account1.createPixKey("TELEFONE", "(11)123456789");
    expect(account1.getPixKey("TELEFONE")).toBe("(11)123456789");
  });

  test("Verificar chave inexistente", () => {
    const account1 = new Account();
    account1.createAccount("12345", "123", 1000);
    expect(account1.getPixKey("TELEFONE")).toBe("Chave inexistente.");
  });
});
