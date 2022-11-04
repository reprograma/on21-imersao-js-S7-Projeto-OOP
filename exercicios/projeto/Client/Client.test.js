import Account from '../Account/Account.js';
import Client from "../Client/Client"
describe("Teste da classe Cliente", () => {  
    test("deve verificar se instância do Cliente é feita corretamente", () =>{
        const client = new Client();
        expect(client instanceof Client).toBe(true);
        //expect(client).toBeInstanceOf(Client);
    });

    test("cadastrar cliente com dados válidos", () => {
        const client = new Client();
        const account = new Account();
        expect(client.registerClient("Ana", "12345678900", account, 500)).toBe("Cliente cadastrado")
    });

    test("cadastrar cliente com dados inválidos", () => {
        const client = new Client();
        expect(() => client.registerClient("Ana", 12345678900, "não conta", 50000)).toThrow
        ("Erro no cadastro;dados inválidos")
    });
    // caso positivo
    //caso negativo

    // test("Validar cliente como categoria Standard", () => {
    //     const account = new Account("12345", "3457", );
    //     const client = new Client("Flávia Rodrigues","12345678900", account, 4999.99);
    //     expect(client.totalIncome()).toBe("Cliente é Standard")
    // });

    
        test("Validar clienta na categoria Standard", () => {
        const account = new Account();
        const client = new Client();    
        client.registerClient("Flávia Rodrigues","12345678900", account, 4999.99);
        expect(client.totalIncome()).toBe("Cliente Standard");
    });

    test("Validar cliente como categoria Gold", () => {
        const account = new Account();
        const client = new Client();
        client.registerClient("Sandra Regina","12345678910", account, 6500);
        expect(client.totalIncome()).toBe("Cliente é Gold")
    });

    test("Validar cliente como categoria Premium", () => {
        const account = new Account();
        const client = new Client();
        client.registerClient("Samara Vitória","12345678911", account, 19000);
        expect(client.totalIncome()).toBe("Cliente é Premium")
    });
});

