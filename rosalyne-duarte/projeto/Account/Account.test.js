import Account from "./Account.js";

describe("Teste da classe Account", () => {
  test("1 - verificar se instancia de Account é feita corretamente", () => {
    const account = new Account();
    expect(account instanceof Account).toBe(true);
  });

  // positivo -> deposito com valor positivo
  test("2 - deposito com valor de 100 reais", () => {
    const account = new Account(1, 1, 1000);
    account.deposit(100);

    expect(account.getBalance()).toBe(1100);
  });

  // negativo -> deposito com valor negativo
  test("3 - deposito com valor de -100", () => {
    const account = new Account(1, 1, 1000);
    expect(() => account.deposit(-100)).toThrow(
      "Não é possível depositar valores negativos"
    );
    expect(account.getBalance()).toBe(1000);
  });

  // negativo -> deposito com valor não numérico
  test("4 - deposito com valor não númérico", () => {
    const account = new Account(1, 1, 500);
    expect(() => account.deposit("")).toThrow(
      "Não é possível depositar valores não numéricos"
    );
    expect(account.getBalance()).toBe(500);
  });

  test("5 - instaciar conta com valores válidos", () => {
    const account = new Account("12345", "0001", 1000);
    expect(account.getBalance()).toBe(1000);
    expect(account.getAccountNumber()).toBe("12345");
    expect(account.getAgency()).toBe("0001");
  });

  // caso positivo -> dados válidos
  test("6 - criar conta de com dados válidos", () => {
    // numero conta (5 digitos) agencia (4 digitos) e saldo (numero positivo)
    const account = new Account();
    expect(account.createAccount("12345", "0001", 500)).toBe(
      "Conta criada com sucesso"
    );
    expect(account.getBalance()).toBe(500);
    expect(account.getAccountNumber()).toBe("12345");
    expect(account.getAgency()).toBe("0001");
  });

  // caso negativo -> algum dado inválido
  test("7 - criar conta com dados inválidos", () => {
    const account = new Account();
    expect(() => account.createAccount("1234", "0001", 300)).toThrow(
      "Dados inválidos para cadastro"
    );
  });

  // criar chave pix cpf
  test("8 - criar chave pix cpf com sucesso", () => {
    const account = new Account();
    expect(account.createPixKey("37761514046", "CPF")).toBe(
      "Chave pix cpf criada com sucesso"
    );
    expect(account.pixKeys.cpf).toBe("37761514046");
  });

  // criar chave pix email
  test("9 - criar chave pix email com sucesso", () => {
    const account = new Account();
    expect(account.createPixKey("rosa@gmail.com.br", "EMAIL")).toBe(
      "Chave pix email criada com sucesso"
    );
    expect(account.pixKeys.email).toBe("rosa@gmail.com.br");
  });

  // criar chave pix telefone
  test("10 - criar chave pix telefone com sucesso", () => {
    const account = new Account();
    expect(account.createPixKey("1912345678", "TELEFONE")).toBe(
      "Chave pix criada com sucesso"
    );
  });

  // criar chave pix invalido
  test("11 - criar chave pix cpf inválido", () => {
    const account = new Account();
    expect(() => account.createPixKey("3776", "CPF")).toThrow(
      "Erro, cpf inválido"
    );
  });

  test("12 - Transferir valor via Pix", () => {
    const account = new Account(1, 1, 8500);
    expect(account.transfPix(1000, "email")).toBe(
      "Transferência pix realizada com sucesso"
    );
    expect(account.getBalance()).toBe(7500);
  });

  test("13 - Tentativa de transferir valor via Pix", () => {
    const account = new Account(1, 1, 0);
    expect(() => account.transfPix(300, "email")).toThrow(
      "Você não tem saldo para transferência"
    );
    expect(account.getBalance()).toBe(0);
  });
});
