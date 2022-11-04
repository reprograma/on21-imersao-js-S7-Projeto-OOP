import Account from "../Account/Account";
import Client from "./Client";

describe("Client", () => {
  it("Should instantiate a client correctly ", () => {
    const client = new Client("Gabriela", 40177443898, "Itaú", 6800);
    expect(client instanceof Client).toBe(true);
  });

  it("Should register a client with valid data ", () => {
    const client = new Client();
    const account = new Account();
    expect(client.registerClient("Gabriela", 40177443898, account, 6800)).toBe(
      "Cliente cadastrado"
    );
  });

  it("Should return an error for client registration with invalid data ", () => {
    const client = new Client();
    expect(() =>
      client.registerClient("Gabriela", 40177443898, "Itaú", 6800)
    ).toThrow("Erro no cadastro, dados inválidos");
  });

  it("Should register category STANDARD and limit R$1000,00", () => {
    const client = new Client();
    const account = new Account();
    client.registerClient("Ana", "1234567908", account, 3000);
    expect(client.typeAccount).toBe("STANDARD");
    expect(client.transactionLimit).toBe(1000);
  });
  
  it("Should register category GOLD and limit R$5000,00", () => {
    const client = new Client();
    const account = new Account();
    client.registerClient("Ana", "1234567908", account, 6000);
    expect(client.typeAccount).toBe("GOLD");
    expect(client.transactionLimit).toBe(5000);
  });
  
  it("Should register category PREMIUM no limite of transação", () => {
    const client = new Client();
    const account = new Account();
    client.registerClient("Ana", "1234567908", account, 19000);
    expect(client.typeAccount).toBe("PREMIUM");
  });
});


