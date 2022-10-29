import Client from "./Client.js";
import Account from "../Account/Account.js";

describe("Teste da classe Client", () => {
  test("Verificar se instância do Client é criada corretamente", () => {
    const client = new Client();
    expect(client).toBeInstanceOf(Client);
  });

  test("Deve cadastrar client com dados válidos", () => {
    const client = new Client();
    const account = new Account();

    expect(client.registerClient("Ana", "12345678", account, 2000)).toBe(
      "Cliente cadastrado."
    );
  });
  test("Deve retornar erro ao cadastrar client com dados inválidos", () => {
    const client = new Client();
    expect(() => {
      client.registerClient("Ana", "12345678", "Não conta", 2000);
    }).toThrow("Dados inválidos.");
  });
});
