import Client from "./Client";
import Account from "../Account/Account.js";

const client = new Client();
const account = new Account();


describe("Teste da classe client", () => {
  test("Verificar se instancia do Client é feita corretamente", () => {
    const client = new Client(); // criando uma instancia da classe
    expect(client instanceof Client).toBe(true);
  });

  test("Cadastrar cliente com dados válidos", () => {
    const client = new Client();
    expect(client.registerClient("Raphaela", "12937892", account, 5000)).toBe(
      "Cliente cadastrado"
    );
  });

  test("validar se cliente com renda até R$4999,99 está na categoria Standard", () => {
    client.registerClient("Anna", "1830278777", account, 4999.99);
    expect(client.customerCategory()).toBe("Cliente Standard");
  });

  test("validar se cliente com renda de R$5000,00 até R$17.999,99 está na categoria Gold", () => {
    client.registerClient("Raphaela", "1830278777", account, 7350.0);
    expect(client.customerCategory()).toBe("Cliente Gold");
  });

  test("validar se cliente com renda acima de R$18000,00 está na categoria Premium", () => {
    client.registerClient("Pedro", "1830278777", account, 28000.0);
    expect(client.customerCategory()).toBe("Cliente Premium");
  });
});
