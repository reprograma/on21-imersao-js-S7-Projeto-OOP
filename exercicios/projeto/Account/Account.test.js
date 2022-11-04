import Account from "./Account";
import Client from "../Client/Client";

const account = new Account("22200131", "0001", 1000);
const account2 = new Account("22200131", "0001", 500);

const clientStandard = new Client();
const clientGold = new Client();
const clientPremium = new Client()

clientStandard.registerClient("Artemiza", "1234567908", account, 3000);
clientGold.registerClient("Artemiza", "1234567908", account, 8000);
clientPremium.registerClient("Artemiza", "1234567908", account, 22000);
describe("Teste da classe Account", () => {
  test("verificar se instancia de Account é feita corretamente", () => {
     expect(account instanceof Account).toBe(true);
  });

  test("criar conta com dados válidos", () => {
    expect(account.createAccount("25487", "0001", 500)).toBe(
      "Conta criada com sucesso"
    );

    expect(account.accountNumber).toBe("25487");
    expect(account.agency).toBe("0001");
    expect(account.balance).toBe(500);
  });

  test("Criar conta com dados inválidos", () => {
    expect(() => account.createAccount("2548", "0001", 200)).toThrow(
      "Dados inválidos para conta"
    );
  
  });
  test("instanciar conta com dados inválidos", () => {
    const account = new Account("233214", "0001", 1000);
    expect(account.accountNumber).toBe("233214");
    expect(account.agency).toBe("0001");
    expect(account.balance).toBe(1000);
  });
});

describe("Teste de depósito", () => {
  test("deposito 300 dentro do limite diário 1000, cliente STANDARD", () => {
    const account = new Account("22200131", "0001", 1000);
    account.deposit(clientStandard, 300);
    expect(account.balance).toBe(1300);
  });

  test("deposito 1500 dentro do limite diário 5000, cliente GOLD", () => {
    const account = new Account("22200131", "0001", 1000);
    account.deposit(clientGold, 1500);
    expect(account.balance).toBe(2500);
  });

  test("deposito 10500 sem limite diário, cliente PREMIUM", () => {
    const account = new Account("22200131", "0001", 1000);
    account.deposit(clientPremium, 10500);
    expect(account.balance).toBe(11500);
  });

  test("deposito 1200 excedendo limite diário 1000, cliente STANDARD", () => {
    const account = new Account("22200131", "0001", 1000);
    expect(() => account.deposit(clientStandard, 1200)).toThrow(
      "Limite diário 1000 excedido."
    );
    expect(account.balance).toBe(1000);
  });

  test("deposito 6700 excedendo limite diário 5000, cliente GOLD", () => {
    const account = new Account("22200131", "0001", 1000);
    expect(() => account.deposit(clientGold, 6700)).toThrow(
      "Limite diário 5000 excedido."
    );
    expect(account.balance).toBe(1000);
  });
  
 // negativo -> deposito com valor negativo
  test("deposito com valor de -100", () => {
    const account = new Account("22200131", "001", 1000);
    expect(() => account.deposit(clientStandard, -100)).toThrow(
      "Não é possível depositar valores negativos"
    );
    expect(account.balance).toBe(1000);
  });

  // negativo -> deposito com valor não numérico
  test("deposito com valor não numérico", () => {
    const account = new Account("22200131", "0001", 1000);
    expect(() => account.deposit(clientStandard, "")).toThrow(
      "Não é possível depositar valores não numéricos"
    );
    expect(account.balance).toBe(1000);
  
  });

  describe("Teste de saque", () => {
    test("saque no valor de 200 reais cliente STANDARD", () => {
      const account = new Account("22200131", "0001", 1000);
      expect(account.withdrawal(clientStandard, 200)).toBe(
        "Saque realizado com sucesso."
      );
    });
  
    test("saque com dados inválidos cliente PREMIUM ", () => {
      const account = new Account("22200131", "0001", 1000);
      expect(() => account.withdrawal(clientPremium, "")).toThrow(
        "Informe um valor de saque inválido."
      );
    
    });
    test("saque com saldo insuficiente cliente PREMIUM  ", () => {
      const account = new Account("222001319", "0001", 1000);
      expect(() => account.withdrawal(clientPremium, 1300)).toThrow(
        "Você nao possui saldo suficiente para esta operação"
      );
    });
  });
    
 test("criar chave pix cpf com sucesso", () => {
   
    expect(account.createPixKey("37761514046", "CPF")).toBe(
      "Chave pix cpf criada com sucesso"
    );
    expect(account.pixKeys.cpf).toBe("37761514046");
  });

  // criar chave pix email
  test("criar chave pix email com sucesso", () => {
  expect(account.createPixKey("iza@gmail.com.br", "EMAIL")).toBe(
      "Chave pix email criada com sucesso"
    );
    expect(account.pixKeys.email).toBe("iza@gmail.com.br");
  });

  // criar chave pix telefone
  test("criar chave pix telefone com sucesso", () => {
   expect(account.createPixKey("(11) 99123-4567", "TELEFONE")).toBe(
      "Chave pix telefone criada com sucesso"
    );
    expect(account.pixKeys.telefone).toBe("(11) 99123-4567");
  });

  // criar chave pix invalido
  test("criar chave pix cpf inválido", () => {
    expect(() =>account.createPixKey("37761514042", "CPF")).toThrow(
      "Erro, cpf inválido"
    );
    
  
  });

  

test("Verificar saldo", () =>{
const account = new Account("22200131", "0001", 1500);
expect(account.balance).toBe(1500)

});
test('verificar chave pix', () => {
  account.createPixKey('37761514046', "CPF");
  account.createPixKey('iza@gmail.com', "EMAIL");
  account.createPixKey('(11) 99123-4567', "TELEFONE");
  expect(account.getPixKey("CPF")).toBe('37761514046');
  expect(account.getPixKey("EMAIL")).toBe('iza@gmail.com');
  expect(account.getPixKey("TELEFONE")).toBe('(11) 99123-4567');
});
test('verificar chave pix nao cadastrada', () => {
  account.createPixKey('37761514046', "CPF");
  expect(account.getPixKey("CPPF")).toBe("Não temos essa opção de chave cadastrada.");
});


test("transferência entre contas" , () =>{
  const account = new Account("22200131","0001", 1000);
  const account2 = new Account("22200131","0001", 500);
   expect(account.transferTo(account2, 200, clientStandard.cpf)).toBe(
      "Transferência feita com sucesso"
    );
    expect(account.transferTo(account2, 200, clientStandard.cpf)).toBe(
      "Transferência feita com sucesso"
    );
    expect(account.balance).toBe(600);
    expect(account2.balance).toBe(900);
  });


test("Deve retornar um erro saldo insuficiente ", () => {
  expect(() => account.transferTo(account2, 600)).toThrow(
    `Saldo insuficiente para prosseguir a operação`
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
    const account = new Account("22200131", "0001", 1000);
    const account2 = new Account("22200131", "0001", 500);
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
    const account = new Account("22200131", "0001", 1500);
    const account2 = new Account("22200131", "0001", 500);
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
    const account = new Account("22200131", "0001", 600);
    const account2 = new Account("22200131", "0001", 500);
    expect(() =>
      account.transferByPix(
        clientStandard,
        account2,
        account2.pixKeys.email,
        700
      )
    ).toThrow(`Saldo insuficiente para prosseguir a operação`);
    expect(account.balance).toBe(600);
    expect(account2.balance).toBe(500);
  });

  test("transferencia via pix negada, chave pix invalida", () => {
    const account = new Account("22200131", "0001", 1000);
    const account2 = new Account("22200131", "0001", 500);
    expect(() =>
      account.transferByPix(clientStandard, account2, "account2.pixKeys", 700)
    ).toThrow(`Chave pix inválida`);
    expect(account.balance).toBe(1000);
    expect(account2.balance).toBe(500);
  });

  test("transferencia via pix negada, conta inválida", () => {
    const account = new Account("22200131", "0001", 1000);
    const account2 = new Account("22200131", "0001", 500);
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
