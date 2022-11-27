//import Client from './Client.js';
const Client = require('./Client.js');

describe("Teste da classe Cliente", () => {
    
    test("deve verificar se instância do Cliente é feita corretamente", () =>{
        const client = new Client();
        expect(client instanceof Client).toBe(true);
        //expect(client).toBeInstanceOf(Client);
    })

    test("cadastrar cliente com dados válidos", () => {
        const client = new Client();
        expect(client.registerClient("Ana", "12345678900", "conta", 500)).toBe("Cliente cadastrado")
    });

    test("cadastrar cliente com dados inválidos", () => {
        const client = new Client();
        expect(() => client.registerClient("Ana", 12345678900, "não conta", 50000)).toThrow
        ("Erro no cadastro;dados inválidos")

    });

})
