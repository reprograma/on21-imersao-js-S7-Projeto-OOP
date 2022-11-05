import Account from "./Account";
describe("Teste da classe Account", () => {
    const account = new Account();
    const account2 = new Account("111", "111", 500);
    account2.createPixKey("raphaela@gmail.com", "email");
    const account1 = new Account("111", "111", 500);
    account1.createPixKey("anna@gmail.com", "email");

  describe("Tranferencia entre contas", () => {});

  test("verificar se instancia de Account é feita corretamente", () => {
    expect(account instanceof Account).toBe(true);
  });

  // positivo -> deposito com valor positivo
  test("deposito com valor de 100 reais", () => {
    const account = new Account(1, 1, 1000);
    account.deposit(100);

    expect(account.getBalance()).toBe(1100);
  });

  // negativo -> deposito com valor negativo
  test("deposito com valor de -100", () => {
    const account = new Account(1, 1, 1000);
    expect(() => account.deposit(-100)).toThrow(
      "Não é possível depositar valores negativos"
    );
    expect(account.getBalance()).toBe(1000);
  });

  // negativo -> deposito com valor não numérico
  test("deposito com valor não númérico", () => {
    const account = new Account(1, 1, 500);
    expect(() => account.deposit("")).toThrow(
      "Não é possível depositar valores não numéricos"
    );
    expect(account.getBalance()).toBe(500);
  });
  test("criar conta passando dados validos", () => {
    expect(account.createAccount("12345", "0001", 500)).toBe(
      "Conta criada com sucesso"
    );
    expect(account.getBalance()).toBe(500);
    expect(account.getAccountNumber()).toBe("12345");
    expect(account.getAgency()).toBe("0001");
  });
  test("criar conta passando dados inválidos", () => {
    expect(() => account.createAccount("1234", "0001", 300)).toThrow(
      "Dados inválidos para cadastro"
    );
  });

  test("criar chave pix CPF com sucesso", () => {
    expect(account.createPixKey("37761514046", "CPF")).toBe(
      "Chave pix CPF criada com sucesso"
    );
    expect(account.pixKey.cpf).toBe("37761514046");
  });
  test("criar chave pix email com sucesso", () => {
    expect(account.createPixKey("nome@gmail.com", "email")).toBe(
      "Chave pix email criada com sucesso"
    );
    expect(account.pixKey.email).toBe("nome@gmail.com");
  });

  test("criar chave pix telefone com sucesso", () => {
    expect(account.createPixKey("2199999999", "telefone")).toBe(
      "Chave pix telefone criada com sucesso"
    );
    expect(account.pixKey.telefone).toBe("2199999999");
  });
  test("criar chave pix email sem sucesso", () => {
    expect(() => account.createPixKey("atat", "email")).toThrow(
      "Erro, email inválido"
    );
  });

  test("criar chave pix cpf inválido", () => {
    const account = new Account();
    expect(() => account.createPixKey("3776151404", "CPF")).toThrow(
      "Erro, cpf inválido"
    );
  });

  test("saque com valor de 100 reais", () => {
    const account = new Account(1, 1, 1000);
    account.cashWithdrawal(100);
    expect(account.getBalance()).toBe(900);
  });

  test("saque com valor de -100", () => {
    const account = new Account(1, 1, 1000);
    expect(() => account.cashWithdrawal(-100)).toThrow(
      "Não é possível depositar valores negativos"
    );
    expect(account.getBalance()).toBe(1000);
  });

  test("saque com valor não númérico", () => {
    const account = new Account(1, 1, 500);
    expect(() => account.cashWithdrawal("")).toThrow(
      "Não é possível depositar valores não numéricos"
    );
    expect(account.getBalance()).toBe(500);
  });

  describe("Testes transacoes de PIX", () => {
    test("transferencia pix com valor de 100 reais", () => {
      account1.transferToPix(account2, "raphaela@gmail.com", 100);
      expect(account1.getBalance()).toBe(400);
      expect(account2.getBalance()).toBe(600);
    });

    test("transferencia pix com chave não reconhecida", () => {
      expect(() => account1.transferToPix(account2, "214897087", 100)).toThrow(
        "Chave pix não reconhecida"
      );
    });
  });
  describe("Tranferencia entre contas", () => {
    test("transferencia com valor de 100 reais", () => {
      account1.transferTo(account2, 100);
      expect(account1.getBalance()).toBe(300);
      expect(account2.getBalance()).toBe(700);
    });
    test("transferencia pix com chave não reconhecida", () => {
      expect(() => account1.transferTo(account2, 1000)).toThrow(
        "Seu saldo nao é suficiente para esta operacao"
      );
    });
  });
});
