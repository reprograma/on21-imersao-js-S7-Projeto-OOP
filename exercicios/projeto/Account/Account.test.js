import Account from './Account.js'

describe("teste da classe account", () => {
    it ("deve verificar se a instância de account é feita corretamente", () => {
        const account = new Account();
        expect(account instanceof Account).toBe(true)
    })

    // positivo => deposito com valor positivo
    it ("deposito com valor de 100 reais", () => {
        const account = new Account(1, 1, 1000)
        account.deposit(100);

        expect(account.getBalance()).toBe(1100)
    })

    // negativo => deposito com valor negativo

    it ('deposito com o valor de -100', () => {
        const account = new Account(1, 1, 1000);
        expect(() => account.deposit(-100)).toThrow('Não é possivel depositar valores negativos');
        expect(account.getBalance()).toBe(1000)

    })

    // negativo => deposito com valor não numerico
    it ('deposito com valor numerico', () => {
        const account = new Account(1, 1, 1000)
        expect(() => account.deposit("")).toThrow('Não é possivel depositar valores não numericos');
        expect(account.getBalance()).toBe(1000)
    })
});