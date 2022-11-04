import Account from "../Account/Account.js";
import Client from "../Client/Client.js"

describe("Teste da classe Client", () => {
    const client = new Client();
    const account = new Account();
    test("verificar se instancia do Cliente é feita corretamente", () =>{
        expect(client instanceof Client).toBe(true);
    });

    test("cadastrar cliente com dados válidos", () => {
        expect(client.registerClient("Beatriz", "12345678902", account, 5000)).toBe("Cliente cadastrado");
    });

    test("cadastrar cliente com dados inválidos", () => {
        expect(() => client.registerClient("Beatriz", "12345678902", "não conta", 5000)).toThrow("Erro no cadastro, dados inválidos");
    });

    test("validar se cliente com renda até R$4999,99 está na categoria Standard", () => {
        client.registerClient("Beatriz", "12345678902", account, 4999.99);
        expect(client.getIncome()).toBe("Cliente Standard");
    });

    test("validar se cliente com renda de R$5000,00 até R$17.999,99 está na categoria Gold", () => {
        client.registerClient("Beatriz", "12345678902", account, 7350.00);
        expect(client.getIncome()).toBe("Cliente Gold");
    });

    test("validar se cliente com renda acima de R$18000,00 está na categoria Premium", () => {
        client.registerClient("Beatriz", "12345678902", account, 28000.00);
        expect(client.getIncome()).toBe("Cliente Premium");
    });
});