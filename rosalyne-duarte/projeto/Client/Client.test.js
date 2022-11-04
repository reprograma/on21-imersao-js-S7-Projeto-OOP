import Client from './Client.js';
import Account from '../Account/Account.js';

describe('Teste da classe Client', () => {
    test(' 1 - verificar se instancia do Cliente e feita corretamente', () => {
        const client = new Client('ana'); 
        
        // .toBe(true) é similar a .toBeTruthy() ambos funcionam
        expect(client instanceof Client).toBe(true)
    })

    test("2 - cadastrar cliente com dados validos", () => {
        const client = new Client(); 
        const account = new Account();
        expect(client.registerClient("Ana", "15625586", account, 5000))
        .toBe("Cliente Cadastrado")
    });

    test("3 - cadastrar cliente com dados invalidos", () => {
        const client = new Client(); 
        expect(() => client.registerClient("Ana", "15625586", "nao conta", 5000))
        .toThrow("Erro no cadastro, dados invalidos")
    });

    test("4 - Validar clienta na categoria Standard", () => {
        const account = new Account();
        const client = new Client();    
        client.registerClient("Beatriz Moema","11122233344", account, 4999.99);
        expect(client.totalIncome()).toBe("Cliente Standard");
    });

    test("5 - Validar cliente como categoria Gold", () => {
        const account = new Account();
        const client = new Client();
        client.registerClient("André Duarte","22233344455", account, 6500);
        expect(client.totalIncome()).toBe("Cliente Gold")
    });

    test("6 - Validar cliente como categoria Premium", () => {
        const account = new Account();
        const client = new Client();
        client.registerClient("Nícolas Duarte","33344455566", account, 19000);
        expect(client.totalIncome()).toBe("Cliente Premium")
    });

})