import Account from "./Account.js";

describe("Teste da classe Account", () => {
  test("verificar se instancia de Account é feita corretamente", () => {
    const account = new Account();
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
    expect(() => account.deposit(-100)).toThrow("Não é possível depositar valores negativos");
    expect(account.getBalance()).toBe(1000);
  });

  // negativo -> deposito com valor não numérico
  test("deposito com valor não númérico", () => {
    const account = new Account(1, 1, 500);
    expect(() => account.deposit("")).toThrow("Não é possível depositar valores não numéricos");
    expect(account.getBalance()).toBe(500);
  });

  test("instaciar conta com valores válidos", () => {
    const account = new Account('12345', '0001', 1000);
    expect(account.getBalance()).toBe(1000);
    expect(account.getAccountNumber()).toBe('12345');
    expect(account.getAgency()).toBe('0001');
  });

  // caso positivo -> dados válidos
  test("criar conta de com dados válidos", () => {
    // numero conta (5 digitos) agencia (4 digitos) e saldo (numero positivo)
    const account = new Account();
    expect(account.createAccount("12345", "0001", 500)).toBe("Conta criada com sucesso");
    expect(account.getBalance()).toBe(500);
    expect(account.getAccountNumber()).toBe('12345');
    expect(account.getAgency()).toBe('0001');
  });

  // caso negativo -> algum dado inválido
  test("criar conta com dados inválidos", () => {
    const account = new Account();
    expect(() => account.createAccount("1234", "0001", 300)).toThrow("Dados inválidos para cadastro");
  });

  // criar chave pix cpf
  test("criar chave pix cpf com sucesso", () => {
    const account = new Account();
    expect(account.createPixKey("37761514046", "CPF")).toBe("Chave pix cpf criada com sucesso");
    expect(account.pixKeys.cpf).toBe("37761514046");
  });

  // criar chave pix email
  test("criar chave pix email com sucesso", () => {
    const account = new Account();
    expect(account.createPixKey("teste@reprograma.com.br", "EMAIL")).toBe("Chave pix email criada com sucesso");
    expect(account.pixKeys.email).toBe("teste@reprograma.com.br");
  });

  // criar chave pix telefone
  test("criar chave pix telefone com sucesso", () => {
    const account = new Account();
    expect(account.createPixKey("11912345678", "TELEFONE")).toBe("Chave pix telefone criada com sucesso");
  });

  // criar chave pix invalido
  test("criar chave pix cpf inválido", () => {
    const account = new Account();
    expect(() => account.createPixKey("3776", "CPF")).toThrow("Erro, cpf inválido");
  });
});
