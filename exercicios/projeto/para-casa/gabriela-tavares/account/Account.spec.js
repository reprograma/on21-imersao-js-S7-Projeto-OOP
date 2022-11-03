import Client from "../client/Client.js";
import Account from "./Account.js";

describe("Account -createAccount ", () => {
  const account = new Account();
  it("Should verify that the account instance was made correctly", () => {
    expect(account instanceof Account).toBe(true);
  });

  it("Should create an account with valid values", () => {
    expect(account.createAccount("12345", "0001", 500)).toBe(
      "Conta criada com sucesso"
    );
    expect(account.getBalance()).toBe(500);
    expect(account.getAccountNumber()).toBe("12345");
    expect(account.getAgency()).toBe("0001");
  });

  // caso negativo -> algum dado inválido
  it("Should return error to create an account with invalid values", () => {
    expect(() => account.createAccount("1234", "0001", 300)).toThrow(
      "Dados inválidos para cadastro"
    );
  });
});

describe("Account - Deposit", () => {
  it("Should make a deposit of R$ 100,00", () => {
    const account = new Account(123, 1456, 1000);
    const value = 100;
    account.deposit(value);
    expect(account.getBalance()).toEqual(1100);
  });

  it("Should return error for deposit of R$ -100,00", () => {
    const account = new Account(123, 1456, 1000);
    const value = -100;
    expect(() => account.deposit(value)).toThrow(
      "Transação não é possível para valores negativos"
    );
    expect(account.getBalance()).toEqual(1000);
  });

  // negativo --> depositar com valor não numérico
  it("Should return error for deposit of 'Banana'", () => {
    const account = new Account(123, 1456, 1000);
    expect(() => account.deposit(true)).toThrow(
      "Transação não é possível para valores não numéricos"
    );
    expect(account.getBalance()).toEqual(1000);
  });
});

describe("Account - Withdraw", () => {
  it("Should make withdraw of R$ 50,00", () => {
    const account = new Account(123, 1456, 1000);
    expect(account.saque(100)).toBe(
      "O saque foi realizado com sucesso! Seu saldo atual é de 900"
    );
  });

  it("Should return Erro to withdraw unavailable value  ", () => {
    const account = new Account(123, 1456, 1000);
    expect(() => account.saque(1500)).toThrow(
      "Não foi possível realizar o saque, saldo infuficiente!"
    );
    expect(account.getBalance()).toEqual(1000);
  });
});

describe("Account - pixKey", () => {
  it("Should register email as pixKey", () => {
    const account = new Account(123, 1456, 1000);
    const chaveEmail = "email";
    const email = "gabriela@gmail.com";
    expect(account.createPixKey(chaveEmail, email)).toBe(
      "Chave pix email foi criada com sucesso"
    );
  });

  it("Should register telephone as pixKey", () => {
    const account = new Account(123, 1456, 1000);
    const chaveTelefone = "telefone";
    const telefone = "+55 (55) 23321-5454";
    expect(account.createPixKey(chaveTelefone, telefone)).toBe(
      "Chave pix telefone foi criada com sucesso"
    );
  });

  it("Should register cpf as pixKey", () => {
    const account = new Account(123, 1456, 1000);
    const chaveCpf = "cpf";
    const cpf = "82262662380";
    expect(account.createPixKey(chaveCpf, cpf)).toBe(
      "Chave pix cpf criada com sucesso"
    );
  });
});

describe("Account - transferTo", () => {
  const account = new Account("11121", "1111", 500);
  const account1 = new Account("22221", "222", 100);
  it("Should transfer to anotherAccount", () => {
    const client1 = new Client("Gabriela", "82262662380", account1, 2500);
    expect(account.transferTo(account1, 200, client1.cpf)).toBe(
      "Transferência feita com sucesso"
    );
    expect(account.getBalance()).toBe(300);
    expect(account1.getBalance()).toBe(300);
  });

  it("Should return an error for transfer with insufficient balance ", () => {
    expect(() => account.transferTo(account1, 600)).toThrow(
      "Saldo insuficiente para prosseguir operação"
    );
  });

  it("Should return transfer Erro ", () => {
    const account = new Account("11121", "1111", 500);
    expect(() => account.transferTo("account", 200)).toThrow("Conta inválida!");
  });
});

describe("Account - otherDeposit", () => {

  const account = new Account("45689", "1111", 1000);
  const client = new Client();
  it("Should make the deposit for a value smaller than the limit", () => {
    client.registerClient("Xenia", "1234567908", account, 3000);
    account.otherDeposit(client, 100);
    expect(account.getBalance()).toBe(1100);
  });

  it("Should return an error for deposit greater than limit ", () => {
    client.registerClient("José Alfredo", "1234567908", account, 3000);
    expect(() =>
    account.otherDeposit(client, 1500)
    ).toThrow(`Excedido limite de transações diárias!`);
   
  });

})

describe("Account - transferToPix", () => {

  const account = new Account("58968", "1215", 1000);
  const account2 = new Account("98653", "1345", 500);
  const clientStandard = new Client();

  it("Should make the transfer successfully by phone pixKey (client STANDARD) ", () => {
    clientStandard.registerClient("Jose Alfredo", "82262662380", account, 3000);
    expect(
      account.transferByPix(
        clientStandard,
        account2,
        account2.pixKey.telefone,
        200
      )
    ).toBe("Transferência feita com sucesso");
    expect(account.getBalance()).toBe(800);
    expect(account2.getBalance()).toBe(700);
  });

  it("Should return an error for transfer over daily limit", () => {
    const account = new Account("58968", "1215", 1500);
    clientStandard.registerClient("Jose Alfredo", "82262662380", account, 3000);
    expect(() =>
      account.transferByPix(
        clientStandard,
        account2,
        account2.pixKey.email,
        1200
      )
    ).toThrow(`Excedido limite de transações diárias!`);
   
  });

  it("Should return an error for insufficient balance", () => {
    expect(() =>
      account.transferByPix(
        clientStandard,
        account2,
        account2.pixKey.email,
        1800
      )
    ).toThrow(`Saldo insuficiente para prosseguir operação`);
   
  });

  it("Should return an error for invalid pixKey", () => {
    expect(() =>
      account.transferByPix(clientStandard, account2, "account2.pixKeys", 700)
    ).toThrow(`Chave pix inválida`);
   
  });

  it("Should return an error for invalid account", () => {
    expect(() =>
      account.transferByPix(
        clientStandard,
        "account2",
        account2.pixKey.email,
        700
      )
    ).toThrow(`Conta inválida!`);
  
  });
});
