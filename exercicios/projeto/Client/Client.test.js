import Account from "../Account/Account";
import Client from "./Client";

const client = new Client();
const account = new Account();

describe("Teste da classe Client", () => {
  test("verificar se instancia do Client é feita corretamente", () => {
   
    // instanciaASerVerificada instanceof Classe -> true ou false
    // alternativa: expect(client).toBeInstanceOf(Client);
    expect(client instanceof Client).toBe(true);
  });

  test("cadastrar cliente com dados válidos", () => {
    expect(client.registerClient("Iza", "1234567908", account, 3000)).toBe(
      "Cliente cadastrado"
    );
  });

  test("cadastrar cliente com dados inválidos", () => {
    expect(() =>
     client.registerClient("Iza", "1234567908", "não conta", 3000)
    ).toThrow("Erro no cadastro, dados inválidos");
  });

  test("registrar categoria STANDARD e limite R$1000,00", () => {
    client.registerClient("Maria", "1234567908", account, 3000);
    expect(client.typeAccount).toBe("STANDARD");
    expect(client.transactionLimit).toBe(1000);
  });

  test("registrar categoria GOLD excedida ", () => {
    client.registerClient("Maria", "1234567908", account, 15000);
    expect(client.typeAccount).toBe("GOLD");
    expect(client.transactionLimit).toBe(5000);
  });


  test("registrar categoria PREMIUM sem limite de transação", () => {
   
    client.registerClient("Maria", "1234567908", account, 19000);
    expect(client.typeAccount).toBe("PREMIUM");
  });
});
