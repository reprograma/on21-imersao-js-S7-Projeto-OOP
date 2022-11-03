import Account from "../Account/Account.js";
import Client from "./Client.js";

describe("Teste da classe Client", () => {
  test("verificar se instancia do Cliente é feita corretamente", () => {
    const client = new Client();
    //instanciaASerVerificada instaceof Classe -> true ou false
    // alternantiva: expect(client). toBeInstaceOf(Client)
    expect(client instanceof Client).toBe(true);
  });
  test("cadastrar cliente com dados válidos", () => {
    const client = new Client();
    const account = new Account();
    expect(client.registerClient("Ana", "04049292", account, 4000)).toBe(
      "Cliente cadastrado"
    );
  });

  test("cadastrar cliente com dados inválidos", () => {
    const client = new Client();
    expect(() =>
      client.registerClient("Beatriz", "12345678902", "não conta", 5000)
    ).toThrow("Erro no cadastro, dados inválidos");
  });
  //caso positivo
  //caso negativo
  // casos de borda
});
