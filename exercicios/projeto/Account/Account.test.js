import Account from './Account.js'

describe("teste da classe account", () => {
    it ("deve verificar se a instância de account é feita corretamente", () => {
        const account = new Account();
        expect(account instanceof Account).toBe(true)
    })

    //deposito
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

    // saque
    // positivo => saque com valor menor que o saldo
    it ('sacar com valor menor que saldo', () => {
        const account = new Account(1, 1, 1000)
        account.withdraw(150);

        expect(account.getBalance()).toBe(850)
    })

    // negativo => saque com valor maior que o saldo
    it ('sacar com valor maior que saldo', () => {
        const account = new Account(1, 1, 1000)
        expect(() => account.withdraw(1500)).toThrow('Saldo insuficiente');
        expect(account.getBalance()).toBe(1000)
    })

    // transferencia
    // positivo => transferir dinheiro de uma conta para outra

    // negativo => transferir dinheiro para uma conta não existente

    // negativo => tranferir com valor maior que o saldo
})
//sacar -> OK
//cria chave pix
//criar conta