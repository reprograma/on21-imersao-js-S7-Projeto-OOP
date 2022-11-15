import Client from './Cliente.js';

describe("teste da classe Client", () => {
    test("deve verificar se instancia do Client é feita corretamente", () => {
        const client = new Client();
        // instanciaASerVerificada instanceof Classe -> true ou false
        // alternativa: expect(client).toBeInstaceOf(Client);
        expect(client instanceof Client).toBe(true);
    });

    test("deve cadastrar cliente com dados válidos", () => {
        const client = new Client();
        expect(client.registerClient("Bia", "123654",  "conta", 8000)).toBe("Cliente cadastrado");
    });

    test("cadastrar cliente com dados válidos", () => {
        //toThrow(error?)
        const client = new Client();
        expect(() => client.registerClient("Bia", "123654",  "não conta", 8000)).toThrow("Erro no cadastro, dados inválidos");
    });
});

