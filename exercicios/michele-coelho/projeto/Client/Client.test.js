import Account from '../Account/Account.js';
import Client from './Client';

describe("Teste da classe Client", ()=>{
    test("Verificar se instacia do Client é feita corretamente", ()=>{
        const client= new Client();
        expect(client instanceof Client).toBe(true);
    });
    test("Cadastrar cliente com dados válidos", ()=>{
        const client=new Client();
        const account=new Account()
        expect(client.registerClient("Maria", "093232",account,5000)).toBe("Cliente cadastrado!");
    });
    test("Cadastrar cliente com dados inválidos", ()=>{
        const client=new Client();
        expect (()=>client.registerClient("Maria", "093232","não conta",5000)).toThrow("Error no cadastrado, dados inválidos!");
    });
})