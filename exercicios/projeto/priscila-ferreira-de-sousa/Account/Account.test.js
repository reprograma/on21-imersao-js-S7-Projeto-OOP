import Account from "./Account.js";

describe("Teste da classe Account", () => {
    const tiposChavePix = ['TELEFONE', "EMAIL, CPF"];
    test("verificar se instância de Account é feita corretamente", () => {
        const account = new Account();
        expect(account instanceof Account).toBe(true);
    })

    //positivo -> deposito com valor positivo
    test("deposito com valor de 100 reais", () => {
        const account = new Account(1, 1, 1000);
        account.deposit(100);

        expect(account.getBalance()).toBe(1100);
    })

    //negativo -> deposito com valor negativo
    test("deposito com valor de -100", () => {
        const account = new Account(1, 1, 1000);
        expect(() => account.deposit(-100)).toThrow("Não é possível depositar valores negativos");
        expect(account.getBalance()).toBe(1000);
    })

    //negativo -> deposito com valor não numérico
    test("deposito com valor não númérico", () => {
        const account = new Account(1, 1, 500);
        expect(() => account.deposit("")).toThrow("Não é possível depositar valores não numéricos");
        expect(account.getBalance()).toBe(500);
    })

    test("instanciar conta com valores válidos", () => {
        const account = new Account("12345", "0001", 1000);
        expect(account.getBalance()).toBe(1000);
        expect(account.getAccountNumber()).toBe("12345");
        expect(account.getAgency()).toBe("0001");
    })

    test("Criar conta com dados válidos", () => {
        //numero conta(5 digitos) agencia(4 digitos) e saldo(numero positivo)
        const account = new Account();
        expect(account.createAccount("12345", "0001", 500)).toBe("Conta criada com sucesso.");
        expect(account.getBalance()).toBe(500);
        expect(account.getAccountNumber()).toBe("12345");
        expect(account.getAgency()).toBe("0001");
    })

    test("Criar conta com dados inválidos", () => {
        //numero conta(5 digitos) agencia(4 digitos) e saldo(numero positivo)
        const account = new Account();
        expect(() => account.createAccount("1234", "0001", 300)).toThrow("Dados inválidos para cadastro");
    })

    //criar chave pix com cpf
    test("Criar chave pix com cfp com sucesso", () => {
        const account = new Account();
        expect(account.createPix("37761514046", "CPF")).toBe("Chave pix cpf criada com sucesso");
        expect(account.pixKeys.cpf).toBe("37761514046");
    })

    //criar chave pix email
    test("criar chave pix email com sucesso", () => {
        const account = new Account();
        expect(account.createPix("teste@reprograma.com.br", "EMAIL")).toBe("Chave pix email criada com sucesso");
        expect(account.pixKeys.email).toBe("teste@reprograma.com.br");
    })

    //criar chave pix telefone
    test("criar chave pix telefone com sucesso", () => {
        const account = new Account();
        expect(account.createPix("11912345678", "TELEFONE")).toBe("Chave pix telefone criada com sucesso");
        //expect(account.pixKeys.email).toBe("11912345678");
    })

    //criar chave pix inválido
    test("Criar chave pix com cfp inválido", () => {
        const account = new Account();
        expect(() => account.createPix("3776", "CPF")).toThrow("Erro, cpf inválido");
    })

    //MEUS TESTES

    // *** Testes de saque
    test("saque de valor maior do que o saldo da conta", () => {
        const account = new Account(2, 2345, 50);
        expect(() => account.withdraw(500)).toThrow(`Não é possível sacar valor maior que o saldo. Saldo atual: RS${50}`);
        expect(account.getBalance()).toBe(50);
    })

    test("saque sem informar o valor a ser sacado", () => {
        const account = new Account(2, 2345, 50);
        expect(() => account.withdraw()).toThrow("Não é possível realizar o saque, o valor informado é inválido.");
        expect(account.getBalance()).toBe(50);
    })

    test("saque com valor válido, menor que o saldo atual", () => {
        const account = new Account(2, 2345, 1000);
        expect(account.withdraw(300)).toBe(`Saque de R$300 realizado com sucesso. Saldo atual:${account.getBalance()}`);
        expect(account.getBalance()).toBe(700);
    })

    //testes de transferência
    test("transferência para conta que não seja instância de Account", () => {
        const account = new Account(3, 2345, 50000);

        expect(() => account.transferTo("anotherCount", 300)).toThrow("Não é possível realizar a transferência, a conta selecionada para o recebimento é inválida.");
        expect(account.getBalance()).toBe(50000);
    })

    test("tranferência de valor maior do que o saldo atual da conta de origem", () => {
        const account = new Account(4, 6985, 600);
        const anotherAccount = new Account(5, 8741, 200);

        expect(() => account.transferTo(anotherAccount, 1200)).toThrow(`Não é possível transferir valor maior que o saldo. Saldo atual: R$${600}`);
        expect(account.getBalance()).toBe(600);
        expect(anotherAccount.getBalance()).toBe(200);
    })

    test("tranferência de valor negativo", () => {
        const account = new Account(4, 6985, 800);
        const anotherAccount = new Account(5, 8741, 400);

        expect(() => account.transferTo(anotherAccount, -30)).toThrow(`Não é possível transferir valores negativos/zero.`);
        expect(account.getBalance()).toBe(800);
        expect(anotherAccount.getBalance()).toBe(400);
    })

    test("tranferência com sucesso de 150 reais", () => {
        const account = new Account(4, 6985, 800);
        const anotherAccount = new Account(5, 8741, 400);
        expect(account.transferTo(anotherAccount, 150)).toBe(`Transferência de R$150 realizada com sucesso. Saldo atual:${account.getBalance()}`);

        expect(account.getBalance()).toBe(650);
        expect(anotherAccount.getBalance()).toBe(550);
    })

    // *** Testes de pix
    test("pix de chave de conta inexistente ", () => {
        const account = new Account("11", "2456", 1800);
        expect(() => account.makePix("11987451124", 300)).toThrow(`Não é possível realizar o pix. Chave inexistente.`);
        expect(account.getBalance()).toBe(1800);
    })

    test("pix de valor maior que o saldo atual", () => {
        const account = new Account("47", "7845", 1800);
        const anotherAccount = new Account("33", "3333", 200);
        anotherAccount.createPix("reprograma@teste.com.br", "EMAIL");

        expect(() => account.makePix("reprograma@teste.com.br", 2000)).toThrow(`Não é possível realizar pix de valor maior que o saldo. Saldo atual: ${account.getBalance()}`);
        expect(account.getBalance()).toBe(1800);
        expect(anotherAccount.getBalance()).toBe(200);
    })
})

test("pix de valor negativo", () => {
    const account = new Account("47", "7845", 1800);
    const anotherAccount = new Account("33", "3333", 200);
    anotherAccount.createPix("11958742214", "TELEFONE");

    expect(() => account.makePix("11958742214", -20)).toThrow(`Não é possível realizar pix de valores negativos/zero.`);
    expect(account.getBalance()).toBe(1800);
    expect(anotherAccount.getBalance()).toBe(200);
})

test("pix com sucesso de 90 reais", () => {
    const account = new Account("47", "7845", 1800);
    const anotherAccount = new Account("33", "3333", 200);
    anotherAccount.createPix("11958742214", "TELEFONE");
    expect(account.makePix("11958742214", 90)).toBe(`Pix de R$90 enviado para a conta: ${anotherAccount.getAccountNumber()}-${anotherAccount.getAgency()} com sucesso!`);

    expect(account.getBalance()).toBe(1710);
    expect(anotherAccount.getBalance()).toBe(290);
})