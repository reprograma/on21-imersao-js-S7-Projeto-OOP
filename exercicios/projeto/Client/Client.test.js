import Account from "../Account/Account.js";
import Client from "./Client.js";

const client = new Client();
const account = new Account();

describe("Teste da classe Client", () => {
  test("verificar se instancia do Client é feita corretamente", () => {
    // instanciaASerVerificada instanceof Classe -> true ou false
    // alternativa: expect(client).toBeInstanceOf(Client);
    expect(client instanceof Client).toBe(true);
  });

  test("cadastrar cliente com dados válidos", () => {
    expect(client.registerClient("Ana", "1234567908", account, 5000)).toBe(
      "Cliente cadastrado"
    );
  });

  test("cadastrar cliente com dados inválidos", () => {
    expect(() =>
      client.registerClient("Ana", "1234567908", "não conta", 5000)
    ).toThrow("Erro no cadastro, dados inválidos");
  });

  test("regsitrar categoria STANDARD e limite R$1000,00", () => {
    client.registerClient("Ana", "1234567908", account, 3000);
    expect(client.typeAccount).toBe("STANDARD");
    expect(client.transactionLimit).toBe(1000);
  });

  test("regsitrar categoria GOLD e limite R$5000,00", () => {
    client.registerClient("Ana", "1234567908", account, 6000);
    expect(client.typeAccount).toBe("GOLD");
    expect(client.transactionLimit).toBe(5000);
  });

  test("regsitrar categoria PREMIUM sem limite de transação", () => {
    client.registerClient("Ana", "1234567908", account, 19000);
    expect(client.typeAccount).toBe("PREMIUM");
  });


});