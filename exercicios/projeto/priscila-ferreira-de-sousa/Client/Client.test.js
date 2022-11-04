import Account from '../Account/Account.js';
import Client from './Client.js';

describe("Teste da classe Client", () => {
    test("verificar se instância do Client é feita corretament", () => {
        const client = new Client();
        //instanciaAserVerificada instanceof Classe
        //typeof Number -> Number
        expect(client instanceof Client).toBe(true);
        //poderia usar expect(client).toBeInstanceOf(Client);

    })

    test("cadastrar cliente com dados válidos", () => {
        const client = new Client();
        const account = new Account();
        expect(client.registerClient("Ana", "12345678900", account, 500)).toBe("Cliente cadastrado")
    });

    test("cadastrar cliente com dados inválidos", () => {
        const client = new Client();        
        expect(() => client.registerClient("Ana", 12345678900, "não conta", 50000)).toThrow
            ("Erro no cadastro, dados inválidos")

    });
})