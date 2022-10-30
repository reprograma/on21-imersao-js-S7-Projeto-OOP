import Account from'./Account';
import Client from'../Client/Client';

describe("Teste da classe Account", () => {
    test("deve verificar se instância do Account é feita corretamente", () => {
        const account = new Account();
        expect(account instanceof Account).toBe(true);
    });

    //criar conta
    test("deve verificar o método criar conta", () => {
        const account = new Account();
        const client = new Client();
        expect(account.createAccount(client, 3, 3, 300)).toBe("A conta foi criada com sucesso");
    });

    test("deve retornar erro ao criar a conta", () => {
        const account = new Account();
        expect(() => account.createAccount(client, 3, 3, 300).toThrow("Erro ao criar a conta"));
    })

    //depósito
    test("deve verificar o depósito no valor de 100 reais", () => {
        const account = new Account("1234", "0001", 500);
        account.deposit(100);
        expect(account.getBalance()).toBe(600);
    });

    test("depósito com valor negativo", () => {
        const account = new Account(1, 1, 500);
        expect(() => account.deposit(-200)).toThrow("Não é possível depositar valores negativos");
        expect(account.getBalance()).toBe(500);
    });

    test("deve verificar depósito com valor não numérico", () => {
        const account = new Account(2, 2, 1000);
        expect(() => account.verifyValue(true).toThrow("Não é possível depositar valores não numéricos"));
        expect(account.getBalance()).toBe(1000);
    })

    //saque
    test("deve verificar o método saque com sucesso", () => {
        const account = new Account(4, 4, 400);
        account.withDraw(400);
        expect(account.getBalance()).toBe(0);

    });

    test("deve verificar erro ao realizar saque maior que o saldo", () => {
        const account = new Account(4, 4, 400);
        expect(() => account.withDraw(700).toTrow("Não foi possível realizar o saque"));
        expect(account.getBalance()).toBe(400);
    });
});