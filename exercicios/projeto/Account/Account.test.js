import Account from "./Account.js";

describe("Teste de classe Account", () => {
  test("Verificar se instancia de Account é feita corretamente", () => {
    const account = new Account();
    expect(account instanceof Account).toBe(true);
  });

  test("deposito com valor positivo de 100 reais", () => {
    const account = new Account(1, 1, 1000);
    account.deposit(100);

    expect(account.getBalance()).toBe(1100);
  });

  test("deposito com valor negativo de -100", () => {
    const account = new Account(1, 1, 1000);
    expect(() => account.deposit(-100)).toThrow(
      "Não é possível depositar valores negativos"
    );
    expect(account.getBalance()).toBe(1000);
  });

  test("deposito com valor não númérico", () => {
    const account = new Account(1, 1, 500);
    expect(() => account.deposit("")).toThrow(
      "Não é possível depositar valores não numéricos"
    );
    expect(account.getBalance()).toBe(500);
  });

  test("criar conta com dados válidos", () => {
    const account = new Account();
    expect(account.createAccount("12345", "0001", 500)).toBe(
      "Conta criada com sucesso"
    );
    expect(account.getAccountNumber()).toBe("12345");
    expect(account.getAgency()).toBe("0001");
    expect(account.getBalance()).toBe(500);
  });

  test("criar chave pix com cpf com sucesso", () => {
    const account = new Account();
    expect(account.createPixKey("54521309003", "CPF")).toBe(
      "Chave pix criada com sucesso"
    );
    expect(account.pixKey.cpf).toBe("54521309003");
  });

  test("criar chave pix cpf inválido", () => {
    const account = new Account();
    expect(() => account.createPixKey("3776", "CPF")).toThrow(
      "Erro, ao criar chave pix"
    );
  });

  test("criar chave pix com email com sucesso", () => {
    const account = new Account();
    expect(account.createPixKey("teste@gmail.com", "EMAIL")).toBe(
      "Chave pix criada com sucesso"
    );
    expect(account.pixKey.email).toBe("teste@gmail.com");
  });

  test("criar chave pix email inválido", () => {
    const account = new Account();
    expect(() => account.createPixKey("testegmailcom", "EMAIL")).toThrow(
      "Erro, ao criar chave pix"
    );
  });

  test("criar chave pix telefone com sucesso", () => {
    const account = new Account();
    expect(account.createPixKey("11912345678", "PHONE")).toBe(
      "Chave pix criada com sucesso"
    );
    expect(account.pixKey.phone).toBe("11912345678");
  });

  test("criar chave pix telefone inválido", () => {
    const account = new Account();
    expect(() => account.createPixKey("1191", "PHONE")).toThrow(
      "Erro, ao criar chave pix"
    );
  });

  test("Realizar transferência com saldo positivo", () => {
    const account1 = new Account("12345", "0001", 400);
    const account2 = new Account("12345", "0001", 200);
    expect(() =>
      account1
        .transfer(account2, 200, "54521309003")
        .toBe("Transferência realizada com sucesso")
    );
  });

  test("Realizar transferência com saldo negativo", () => {
    const account1 = new Account("12345", "0001", 400);
    const account2 = new Account("12345", "0001", 200);
    expect(() =>
      account1
        .transfer(account2, 500, "54521309003")
        .toThrow("Você não possui saldo suficiente para realizar essa operação")
    );
  });
  test("Realizar transferência com chave pix válida", () => {
    const account1 = new Account("12345", "0001", 400);
    const account2 = new Account("12345", "0001", 200);
    account2.createPixKey("teste@gmail.com", "EMAIL");
    expect(() =>
      account1
        .transferPix(account2, 200, "teste@gmail.com")
        .toBe("Transferência realizada com sucesso")
    );
  });

  test("Realizar transferência com chave pix inválida", () => {
    const account1 = new Account("12345", "0001", 400);
    const account2 = new Account("12345", "0001", 200);
    account2.createPixKey("teste@gmail.com", "EMAIL");
    expect(() =>
      account1
        .transfer(account2, 200, "teste@gmail")
        .toThrow("Chave pix inválida")
    );
  });

  test("Atualizar novo saldo", () => {
    const account1 = new Account("12345", "0001", 400);
    account1.updateBalance(700);
    expect(account1.getBalance()).toBe(700);
  });
});
