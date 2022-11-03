import Account from './Account.js';

describe("Teste da classe Account", () => {
    test("verificar se instancia do Account é feita corretamente.", () => {
        const account = new Account();
        expect(account instanceof Account).toBe(true);
    });

    test("criar conta com dados válidos", () => {
        const account = new Account();
        expect(account.createAccount("12345", "0001", 500)).toBe("Conta criada com sucesso!")
    })

    test("deposito com valor de 100 reais", () => {
        const account = new Account(1, 1, 1000);
        account.deposit(100);

        expect(account.balance).toBe(1100);
    })

    test("deposito com valor de -100", () => {
        const account = new Account(1, 1, 1000);
        expect(() => account.deposit(-100)).toThrow("Não é possível depositar valores negativos.");
        expect(account.balance).toBe(1000);
    })

    test("deposito com valor não numérico", () => {
        const account = new Account(1, 1, 500);
        expect(() => account.deposit("valor")).toThrow("Não é possível depositar valores não númericos");
        expect(account.balance).toBe(500);
    })

    test("saque com valor de 100 reais", () => {
        const account = new Account(1, 1, 1000);
        account.cashWithdraw(100);

        expect(account.balance).toBe(900);
    })

    test("tentativa de saque superior não valor disponível na conta", () => {
        const account = new Account(1, 1, 1000);
        expect(() => account.cashWithdraw(1700)).toThrow("Saldo insuficiente");
    })

    test("tranferencia com o valor de 200 reais", () => {
        const account1 = new Account(1, 1, 1000);
        const account2 = new Account(2, 2, 500);

        account1.transferTo(account2, 200)

        expect(account1.balance).toBe(800);
        expect(account2.balance).toBe(700);
    })

    test("cria chave pix do tipo e-mail", () => {
        const account1 = new Account(1, 1, 1000);

        account1.registerPixKey('EMAIL', 'teste@email.com')

        expect(account1.pixKeys.email).toContain('teste@email.com')
    })

    test("cadastro e-mail inválido", () => {
        const account1 = new Account(1, 1, 1000);

        expect(() => account1.registerPixKey('EMAIL', '11912345678')).toThrow("Email inválido") 
    })

    test("cria chave pix do tipo cpf", () => {
        const account1 = new Account(1, 1, 1000);

        account1.registerPixKey('CPF', '38494802909')

        expect(account1.pixKeys.cpf).toContain('38494802909')
    })

    test("cadastro cpf inválido", () => {
        const account1 = new Account(1, 1, 1000);

        expect(() => account1.registerPixKey('CPF', '273849a820b')).toThrow("CPF inválido") 
    })

    test("cria chave pix do tipo telefone", () => {
        const account1 = new Account(1, 1, 1000);

        account1.registerPixKey('TELEFONE', '11976871667')

        expect(account1.pixKeys.telefone).toContain('11976871667')
    })

    test("cadastro telefone inválido", () => {
        const account1 = new Account(1, 1, 1000);

        expect(() => account1.registerPixKey('TELEFONE', '33398492019')).toThrow("telefone inválido") 
    })

    test("apresenta chaves pix cadastradas", () => {
        const account1 = new Account(1, 1, 1000);
        account1.registerPixKey('EMAIL', 'teste@email.com')
        account1.registerPixKey('CPF', '38494802909')
        account1.registerPixKey('TELEFONE', '11976871667')
        

        expect(account1.pixKeys).toEqual({cpf: '38494802909', email: 'teste@email.com',  telefone: '11976871667'})
       
    })

    test("tranferir 100 reais com chave pix", () => {
        const account1 = new Account(1, 1, 1000);
        const account2 = new Account(2, 2, 500);

        account2.registerPixKey('EMAIL', 'account2@email.com')
        account1.tranferWithPix(account2, 'account2@email.com', 100)

        expect(account1.balance).toBe(900);
        expect(account2.balance).toBe(600);
    })

    test("retorna saldo atual para cliente", () => {
        const account = new Account(1, 1, 1000);

        expect(account.getBalance()).toEqual("Saldo atual: R$1000")
    })



})