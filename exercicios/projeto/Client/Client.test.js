import Client from './Client.js';
import Account from '../Account/Account.js';

describe("Teste da classe Cliente", () => {
    it ("deve verificar se as instâncias do Client é feita corretamente", () => {
        const client = new Client();
        //instanciaASerVerificada instanceof Class -> true ou false
        // alternativa 
        //typeof Number -> Number
        expect(client instanceof Client).toBe(true)
    });

    it ("deve cadastrar cliente com dados válidos", () => {
        const client = new Client();
        const account = new Account();
        expect(client.registerClient("ana", "78965412365", account, 5000)).toBe("Cliente cadastrado")
    })

    it ("deve cadastrar cliente com dados inválidos", () => {
        const client = new Client();
        expect(() => client.registerClient("ana", "78965412365", "não conta", 5000)).toThrow("Erro no cadastrado, dados inválidos")

    })

})

