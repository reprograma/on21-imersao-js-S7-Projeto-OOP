const Account = require('./Account');

describe("Teste da classe Account", () => {
    test("deve verificar se instância do Account é feita corretamente", () => {
        const account = new Account();
        expect(account instanceof Account).toBe(true);
    });

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
        expect(() => account.deposit(true).toThrow("Não é possível depositar valores não numéricos"));
        expect(account.getBalance()).toBe(1000);
    })
});