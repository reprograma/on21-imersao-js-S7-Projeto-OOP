import Account from "./Account.js";

describe("Teste da classe Account", () => {
    test("verificar se instacua de Account é feita corretamente", () => {
        const account = new Account();
        expect(account instanceof Account).toBe(true);
    });

    // positivo -> desposito com valor positivo
    test("deposito com valor de 100 reais", () => {
        const account = new Account(1, 1, 1000);
        account.deposit(100);

        expect(account.getBalance()).toBe(1100);
    });

    // negativo -> deposito com valor negativo
    test("deposito com valor de -100", () => {
        const account = new Account();
        expect(() => account.deposit(-100)).toThorow("Não é possível depositar valores negativos");
        expect(account.getBalance()).toBe(1000);
    });

    // negativo -> deposito com valor não numérico
    
});