import Account from "./Account.js";

describe("Teste da classe Account", () => {
  test("verificar se instancia de Account é feita corretamente", () => {
    const account = new Account();
    expect(account instanceof Account).toBe(true);
  });

  // positivo -> deposito com valor positivo
  test("deposito com valor de 100 reais", () => {
    const account = new Account();
    account.createAccount("12345", "0001", 1000);
    account.deposit(100);

    expect(account.getBalance()).toBe(1100);
  });

  // negativo -> deposito com valor negativo
  test("deposito com valor de -100", () => {
    const account = new Account();
    account.createAccount("12345", "0001", 1000);
    expect(() => account.deposit(-100)).toThrow(
      "Não é possível depositar valores negativos"
    );
    expect(account.getBalance()).toBe(1000);
  });

  // negativo -> deposito com valor não numérico
  test("deposito com valor não numérico", () => {
    const account = new Account();
    account.createAccount("12345", "0001", 500);

    expect(() => account.deposit("")).toThrow(
      "Não é possível depositar valores não numéricos"
    );
    expect(account.getBalance()).toBe(500);
  });

  test("instanciar conta com valores válidos", () => {
    const account = new Account();
    account.createAccount("12345", "0001", 1000);

    expect(account.getBalance()).toBe(1000);
    expect(account.getAccountNumber()).toBe("12345");
    expect(account.getAgency()).toBe("0001");
  });

  // caso positivo -> dados válidos
  test("criar conta de com dados válidos", () => {
    // numero conta (5 dígitos) agencia (4 dígitos) e saldo (numero positivo)
    const account = new Account();
    expect(account.createAccount("12345", "0001", 500)).toBe(
      "Conta criada com sucesso"
    );
    expect(account.getBalance()).toBe(500);
    expect(account.getAccountNumber()).toBe("12345");
    expect(account.getAgency()).toBe("0001");
  });

  // caso negativo -> algum dado inválido
  test("criar conta com dados inválidos", () => {
    const account = new Account();
    expect(() => account.createAccount("1234", "0001", 300)).toThrow(
      "Dados inválidos para cadastro"
    );
  });

  // criar chave pix cpf
  test("criar chave pix cpf com sucesso", () => {
    const account = new Account();
    expect(account.createPixKey("37761514046", "CPF")).toBe(
      "Chave pix cpf criada com sucesso"
    );
    expect(account.pixKeys.cpf).toBe("37761514046");
  });

  // criar chave pix cpf invalido
  test("criar chave pix cpf inválido", () => {
    const account = new Account();
    expect(() => account.createPixKey("3776", "CPF")).toThrow(
      "Erro, cpf inválido"
    );
  });
  // criar chave pix email
  test("criar chave pix email com sucesso", () => {
    const account = new Account();
    expect(account.createPixKey("teste@reprograma.com.br", "EMAIL")).toBe(
      "Chave pix email criada com sucesso"
    );
    expect(account.pixKeys.email).toBe("teste@reprograma.com.br");
  });

  // criar chave pix email invalido
  test("criar chave pix e-mail inválido", () => {
    const account = new Account();
    expect(() => account.createPixKey("teste@.com", "EMAIL")).toThrow(
      "Erro, e-mail inválido"
    );
  });
  // criar chave pix telefone
  test("criar chave pix telefone com sucesso", () => {
    const account = new Account();
    expect(account.createPixKey("(11) 92222-2222", "TELEFONE")).toBe(
      "Chave pix telefone criada com sucesso"
    );
  });
  // criar chave pix telefone invalido
  test("criar chave pix telefone inválido", () => {
    const account = new Account();
    expect(() => account.createPixKey("1192222-2222", "TELEFONE")).toThrow(
      "Erro, telefone inválido"
    );
  });

  //sacar dinheiro
  test("sacar dinheiro", () => {
    const account = new Account();
    expect(account.createAccount("12345", "0001", 500)).toBe(
      "Conta criada com sucesso"
    );
    account.cashWithdrawal(100);
    expect(account.getBalance()).toBe(400);
  });
  test("sacar dinheiro sem saldo", () => {
    const account = new Account();
    expect(account.createAccount("12345", "0001", 500)).toBe(
      "Conta criada com sucesso"
    );
    expect(() =>
      account.cashWithdrawal(600).toThrow("Não possui saldo para sacar")
    );
  });
  // negativo -> sacar com valor negativo
  test("sacar com valor de -100", () => {
    const account = new Account();
    account.createAccount("12345", "0001", 1000);
    expect(() => account.cashWithdrawal(-100)).toThrow(
      "Não é possível sacar valores negativos"
    );
    expect(account.getBalance()).toBe(1000);
  });

  // negativo -> sacar com valor não numérico
  test("sacar com valor não numérico", () => {
    const account = new Account();
    account.createAccount("12345", "0001", 500);
    expect(() => account.cashWithdrawal("")).toThrow(
      "Não é possível sacar valores não numéricos"
    );
    expect(account.getBalance()).toBe(500);
  });

  test("transferir para outra pessoa", () => {
    const account1 = new Account();
    account1.createAccount("12345", "0001", 500);
    const account2 = new Account();
    account2.createAccount("56789", "0001", 500);
    account1.transferToAnotherAccount(account2, 50);
    expect(account1.getBalance()).toBe(450);
    expect(account2.getBalance()).toBe(550);
  });
  test("transferir para outra pessoa sem saldo", () => {
    const account1 = new Account();
    account1.createAccount("12345", "0001", 500);
    const account2 = new Account();
    account2.createAccount("56789", "0001", 500);

    expect(() => account1.transferToAnotherAccount(account2, 600)).toThrow(
      "Não possui saldo para transferência"
    );
    expect(account1.getBalance()).toBe(500);
    expect(account2.getBalance()).toBe(500);
  });

  test("transferir para chave pix", () => {
    // const account1 = new Account();
    // account1.createAccount("12345", "0001", 500);
    // const account2 = new Account();
    // account2.createAccount("56789", "0001", 500);
    // expect(account2.createPixKey("37761514046", "CPF")).toBe(
    //   "Chave pix cpf criada com sucesso"
    // );
    // account1.transferToPix("37761514046", "cpf", 50);
    // expect(account1.getBalance()).toBe(450);
    // expect(account2.getBalance()).toBe(550);
  });
});
