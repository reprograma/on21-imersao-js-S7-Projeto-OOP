import Client from './Client';
import Account from '../Account/Account'

describe("Teste da classe Client", () => {
    test("verificar se instancia do Client é feita corretamente", () => {
        const client = new Client();
        expect(client instanceof Client).toBe(true);
    });

    test("cadastrar cliente com dados válidos", () => {
        const client = new Client();
        const account = new Account();
        expect(client.registerClient("Ana", "12345234567", account, 5000)).toBe("Cliente cadastrado.");
        
    })

    test("cadastrar cliente com dados inválidos", () => {
        const client = new Client();
        expect(() => client.registerClient("Ana", "12345234567", "não onta", 5000)).toThrow("Erro no cadastro, dados inválidos.");
    })

})