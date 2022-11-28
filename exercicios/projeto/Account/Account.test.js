import Account from "./Account.js";
import Client from "../Client/Client.js";

const account = new Account("10022669", "0001", 1000);
const account2 = new Account("10022669", "0001", 500);

const clientStandard = new Client();
const clientGold = new Client();
const clientPremium = new Client();

clientStandard.registerClient("Xenia", "1234567908", account, 3000);
clientGold.registerClient("Xenia", "1234567908", account, 8000);
clientPremium.registerClient("Xenia", "1234567908", account, 22000);

describe("Teste da classe Account", () => {
  test("verificar se instancia de Account é feita corretamente", () => {
    expect(account instanceof Account).toBe(true);
  });

  test("criar conta com dados válidos", () => {
    expect(account.createAccount("12345", "0001", 500)).toBe(
      "Conta criada com sucesso"
    );
    expect(account.accountNumber).toBe("12345");
    expect(account.agency).toBe("0001");
    expect(account.balance).toBe(500);
  });

  test("criar conta com dados inválidos", () => {
    expect(() => account.createAccount("1234", "0001", 300)).toThrow(
      "Erro no cadastro, dados inválidos."
    );
  });

  test("instanciar conta com dados inválidos", () => {
    const account = new Account("2656265", "0001", 1000);
    expect(account.accountNumber).toBe("2656265");
    expect(account.agency).toBe("0001");
    expect(account.balance).toBe(1000);
  });
});

describe("Teste de depósito", () => {
  test("deposito 200 dentro do limite diário 1000, cliente STANDARD", () => {
    const account = new Account("10022669", "0001", 1000);
    account.deposit(clientStandard, 200);
    expect(account.balance).toBe(1200);
  });

  test("deposito 1500 dentro do limite diário 5000, cliente GOLD", () => {
    const account = new Account("10022669", "0001", 1000);
    account.deposit(clientGold, 1500);
    expect(account.balance).toBe(2500);
  });

  test("deposito 10500 sem limite diário, cliente PREMIUM", () => {
    const account = new Account("10022669", "0001", 1000);
    account.deposit(clientPremium, 10500);
    expect(account.balance).toBe(11500);
  });

  test("deposito 1200 excedendo limite diário 1000, cliente STANDARD", () => {
    const account = new Account("10022669", "0001", 1000);
    expect(() => account.deposit(clientStandard, 1200)).toThrow(
      "Limite diário 1000 excedido."
    );
    expect(account.balance).toBe(1000);
  });

  test("deposito 6700 excedendo limite diário 5000, cliente GOLD", () => {
    const account = new Account("10022669", "0001", 1000);
    expect(() => account.deposit(clientGold, 6700)).toThrow(
      "Limite diário 5000 excedido."
    );
    expect(account.balance).toBe(1000);
  });

  test("deposito com valor de -100", () => {
    const account = new Account("10022669", "0001", 1000);
    expect(() => account.deposit(clientStandard, -100)).toThrow(
      "Não é possível depositar valores negativos"
    );
    expect(account.balance).toBe(1000);
  });

  test("deposito com valor não numérico", () => {
    const account = new Account("10022669", "0001", 1000);
    expect(() => account.deposit(clientStandard, "")).toThrow(
      "Não é possível depositar valores não numéricos"
    );
    expect(account.balance).toBe(1000);
  });
});

describe("Teste de saque", () => {
  test("saque no valor de 200 reais cliente STANDARD", () => {
    const account = new Account("10022669", "0001", 1000);
    expect(account.withdrawal(clientStandard, 200)).toBe(
      "Saque realizado com sucesso."
    );
  });

  test("saque com dados inválidos cliente PREMIUM ", () => {
    const account = new Account("10022669", "0001", 1000);
    expect(() => account.withdrawal(clientPremium, "")).toThrow(
      "Informe um valor de saque inválido."
    );
  });

  test("saque com saldo insuficiente cliente PREMIUM  ", () => {
    const account = new Account("10022669", "0001", 1000);
    expect(() => account.withdrawal(clientPremium, 1300)).toThrow(
      "Você nao possui saldo suficiente para esta operação"
    );
  });
});

describe("Teste criação chave Pix", () => {
  test("criar chave pix cpf com sucesso", () => {
    expect(account.createPixKey("36925814712", "CPF")).toBe(
      "Chave pix cpf criada com sucesso"
    );
    expect(account.pixKeys.cpf).toBe("36925814712");
  });

  test("criar chave pix email com sucesso", () => {
    expect(account.createPixKey("xenia@gmail.com", "EMAIL")).toBe(
      "Chave pix email criada com sucesso"
    );
    expect(account.pixKeys.email).toBe("xenia@gmail.com");
  });

  test("criar chave pix telefone com sucesso", () => {
    expect(account.createPixKey("(11) 95263-8574", "TELEFONE")).toBe(
      "Chave pix telefone criada com sucesso"
    );
    expect(account.pixKeys.telefone).toBe("(11) 95263-8574");
  });

  test("criar chave pix cpf invalido", () => {
    expect(() => account.createPixKey("369251475", "CPF")).toThrow(
      "Erro cpf inválido"
    );
  });
});

describe("Verificar Chave Pix", () => {
  test("verificar chave pix cadastrada", () => {
    account.createPixKey("36925814712", "CPF");
    account.createPixKey("xenia@gmail.com", "EMAIL");
    account.createPixKey("(11) 95263-8574", "TELEFONE");
    expect(account.getPixKey("CPF")).toBe("36925814712");
    expect(account.getPixKey("EMAIL")).toBe("xenia@gmail.com");
    expect(account.getPixKey("TELEFONE")).toBe("(11) 95263-8574");
  });

  test("verificar chave pix nao cadastrada", () => {
    account.createPixKey("36925814712", "CPF");
    expect(account.getPixKey("CPPF")).toBe(
      "Não temos essa opção de chave cadastrada."
    );
  });
});

describe("Teste Saldo", () => {
  test("verificar saldo", () => {
    const account = new Account("10022669", "0001", 1000);
    expect(account.balance).toBe(1000);
  });
});

describe("Teste Transferências", () => {
  test("transferência entre contas", () => {
    const account = new Account("10022669", "0001", 1000);
    const account2 = new Account("10022669", "0001", 500);
    expect(account.transferTo(account2, 200)).toBe(
      "Transferência feita com sucesso"
    );
    expect(account.transferTo(account2, 200, clientStandard.cpf)).toBe(
      "Transferência feita com sucesso"
    );
    expect(account.balance).toBe(600);
    expect(account2.balance).toBe(900);
  });

  test("deve retornar erro por saldo insuficiente ", () => {
    expect(() => account.transferTo(account2, 1100)).toThrow(
      `Saldo insuficiente para prosseguir operação`
    );
  });

  test("retornar erro de conta invalida ", () => {
    const account = new Account("11121", "1111", 500);
    expect(() => account.transferTo("account", 200)).toThrow("Conta inválida!");
  });

  test("retornar erro de conta invalida ", () => {
    expect(() => account.transferTo("account", 200)).toThrow("Conta inválida!");
  });

  describe("Teste Transferencias via Pix", () => {
    test("transferência com sucesso mediante chave Pix correta", () => {
      const account = new Account("10022669", "0001", 1000);
      const account2 = new Account("10022669", "0001", 500);
      expect(
        account.transferByPix(
          clientStandard,
          account2,
          account2.pixKeys.telefone,
          100
        )
      ).toBe("Transferência feita com sucesso");
      expect(account.balance).toBe(900);
      expect(account2.balance).toBe(600);
    });

    test("transferencia via pix negada por limite  diario excedido, cliente STANDARD", () => {
      const account = new Account("10022669", "0001", 1500);
      const account2 = new Account("10022669", "0001", 500);
      expect(() =>
        account.transferByPix(
          clientStandard,
          account2,
          account2.pixKeys.email,
          1200
        )
      ).toThrow(`Excedido limite de transações diárias!`);
      expect(account.balance).toBe(1500);
      expect(account2.balance).toBe(500);
    });

    test("transferencia via pix negada saldo insuficiente", () => {
      const account = new Account("10022669", "0001", 600);
      const account2 = new Account("10022669", "0001", 500);
      expect(() =>
        account.transferByPix(
          clientStandard,
          account2,
          account2.pixKeys.email,
          700
        )
      ).toThrow(`Saldo insuficiente para prosseguir operação`);
      expect(account.balance).toBe(600);
      expect(account2.balance).toBe(500);
    });

    test("transferencia via pix negada, chave pix invalida", () => {
      const account = new Account("10022669", "0001", 1000);
      const account2 = new Account("10022669", "0001", 500);
      expect(() =>
        account.transferByPix(clientStandard, account2, "account2.pixKeys", 700)
      ).toThrow(`Chave pix inválida`);
      expect(account.balance).toBe(1000);
      expect(account2.balance).toBe(500);
    });

    test("transferencia via pix negada, conta inválida", () => {
      const account = new Account("10022669", "0001", 1000);
      const account2 = new Account("10022669", "0001", 500);
      expect(() =>
        account.transferByPix(
          clientStandard,
          "account2",
          account2.pixKeys.email,
          700
        )
      ).toThrow(`Conta inválida!`);
      expect(account.balance).toBe(1000);
      expect(account2.balance).toBe(500);
    });
  });
});