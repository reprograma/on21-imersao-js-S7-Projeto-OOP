import Client from './Client';
import Account from '../Account/Account'

describe("Teste da classe Cliente", () => {
    
    it("deve verificar se instância do Cliente é feita corretamente", () =>{
        const client = new Client();
        expect(client instanceof Client).toBe(true);
    });

    test("deve cadastrar Cliente com dados válidos", () => {
        const client = new Client();
        const account = new Account();
        expect(client.registerClient("Bárbara", "11122233344", account, 5000)).toBe("Cliente cadastrado");
    });

    test("deve cadastrar Cliente com dados inválidos", () => {
        const client = new Client();
        expect(() => client.registerClient("Bárbara", "11122233344", "0001", 5000).toThrow("Erro no cadastro, dados inválidos"));
    })
});