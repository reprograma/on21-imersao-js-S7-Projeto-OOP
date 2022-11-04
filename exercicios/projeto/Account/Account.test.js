import Account from './Account.js';
//import Client from '../Client/Client.js';

describe("teste da classe account", () => {
    it ("deve verificar se a instância de account é feita corretamente", () => {
        const account = new Account();
        expect(account instanceof Account).toBe(true)
    })

    //criar conta
    //positivo
    it ('inicialização conta com dados validos', () => {
        //numero da conta (5 digitos) agencia (4 digitos) e saldo numero positivo
        const account = new Account("98745", "0005", 1000 )

        expect(account.getBalance()).toBe(1000)
        expect(account.getAccountNumber()).toBe("98745")
        expect(account.getAgency()).toBe("0005")
    })

    it ('Criar conta com dados validos', () => {
        //numero da conta (5 digitos) agencia (4 digitos) e saldo numero positivo
        const account = new Account()
        
        expect(account.createAccount("98745", "0005", 500)).toBe("Conta criada com sucesso!")
        expect(account.getBalance()).toBe(500)
        expect(account.getAccountNumber()).toBe("98745")
        expect(account.getAgency()).toBe("0005")
    })    

    it ('Criar conta com dados invalidos', () => {
        //numero da conta (5 digitos) agencia (4 digitos) e saldo numero positivo
        const account = new Account()
        
        expect(() => account.createAccount("98745", "005", 500)).toThrow("Error no cadastro, dados invalidos para o cadastro")
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

    // criar chave pix cpf
    it ('Criar chave pix cpf com sucesso', () => {
        const account = new Account();
        expect(account.createPixKey("19281105098", "CPF")).toBe("Chave pix CPF criada com sucesso!");
        expect(account.pixKeys.cpf).toBe("19281105098")
    })

    // criar chave pix cpf invalida
    it ('Criar chave cpf invalido', () => {
        const account = new Account();
        expect(() => account.createPixKey("1928180598", "CPF")).toThrow("Error, CPF invalido");
    })

    // criar chave pix email
    it ('Criar chave pix email com sucesso', () => {
        const account = new Account();
        expect(account.createPixKey("meuemail@mail.com", "EMAIL")).toBe("Chave pix e-mail criada com sucesso!");
        expect(account.pixKeys.email).toBe("meuemail@mail.com")
    })

    // criar chave pix email invalido
    it ('Criar chave pix email invalido', () => {
        const account = new Account();
        expect(() => account.createPixKey("meuemailmail.com", "EMAIL")).toThrow("Error, e-mail invalido");
    })
    
    // criar chave pix telefone
    it ('Criar chave pix telefone com sucesso', () => {
        const account = new Account();
        expect(account.createPixKey("(77)98847-4775", "TELEFONE")).toBe("Chave pix telefone criada com sucesso!");
        expect(account.pixKeys.phone).toBe("(77)98847-4775")
    })

    // criar chave pix telefone invalido
    it ('Criar chave pix telefone invalido', () => {
        const account = new Account();
        expect(() =>account.createPixKey("(77)47-4775", "TELEFONE")).toThrow("Error, telefone invalido");
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
    it ('transferir valor de uma conta para outra', () => {
        const account = new Account(1, 1, 100);
        const account2 = new Account(2, 2, 50);
        account.transfer(50, account2, "19281105098");

        expect(account.getBalance()).toBe(50)
        expect(account2.getBalance()).toBe(100)
    })

    // negativo => tranferir com valor maior que o saldo
    it ('tranferir valor maior que o saldo da conta', () => {
        const account = new Account(1, 1, 100);
        const account2 = new Account(2, 2, 50, "19281105098");

        expect(() => account.transfer(150, account2)).toThrow('Saldo insuficiente');
        expect(account.getBalance()).toBe(100)
        expect(account2.getBalance()).toBe(50)
    })

    // negativo => transferir dinheiro para uma conta não existente
    it ('tranferir valor para uma conta não existente', () => {
        const account = new Account(1, 1, 100);

        expect(() => account.transfer(150, "account2", "19281105098")).toThrow('Error, esta conta não existe');
        expect(account.getBalance()).toBe(100)
    });

    it ('chave pix CPF invalido e valor menor que saldo', () => {
        const account = new Account(1, 1, 100)
        const account2 = new Account(2, 2, 50);
        account2.createPixKey("19281105098", "CPF")

        expect(() => account.pix(account2, 50, "19281105091")).toThrow("Error, esta chave pix não esta cadastrada")
        expect(account.getBalance()).toBe(100)
        expect(account2.getBalance()).toBe(50) 
    })

    it ('chave pix CPF invalido e valor menor que saldo', () => {
        const account = new Account(1, 1, 100)
        const account2 = new Account(2, 2, 50);
        account2.createPixKey("19281105098", "CPF")

        expect(() => account.pix("account", 50, "19281105091")).toThrow("Error, conta não esta cadastrada")
        expect(account.getBalance()).toBe(100)
        expect(account2.getBalance()).toBe(50) 
    })

    it ('chave pix e-mail e valor menor que saldo', () => {
        const account = new Account(1, 1, 100)
        const account2 = new Account(2, 2, 50);
        account2.createPixKey("meuemail@mail.com", "EMAIL")
        account.pix(account2, 50, "meuemail@mail.com")

        expect(account.getBalance()).toBe(50)
        expect(account2.getBalance()).toBe(100) 
    })

    it ('chave pix e-mail invalido e valor menor que saldo', () => {
        const account = new Account(1, 1, 100)
        const account2 = new Account(2, 2, 50);
        account2.createPixKey("meuemail@mail.com", "EMAIL")

        expect(() => account.pix(account2, 50, "seuemail@mail.com")).toThrow("Error, esta chave pix não esta cadastrada")
        expect(account.getBalance()).toBe(100)
        expect(account2.getBalance()).toBe(50) 
    })

    it ('chave pix telefone e valor menor que saldo', () => {
        const account = new Account(1, 1, 100)
        const account2 = new Account(2, 2, 50);
        account2.createPixKey("(77)98847-4775", "TELEFONE")
        account.pix(account2, 50, "(77)98847-4775")

        expect(account.getBalance()).toBe(50)
        expect(account2.getBalance()).toBe(100) 
    })

    it ('chave pix e-mail invalido e valor menor que saldo', () => {
        const account = new Account(1, 1, 100)
        const account2 = new Account(2, 2, 50);
        account2.createPixKey("(77)98847-4775", "TELEFONE")

        expect(() => account.pix(account2, 50, "(77)98847-4778")).toThrow("Error, esta chave pix não esta cadastrada")
        expect(account.getBalance()).toBe(100)
        expect(account2.getBalance()).toBe(50) 
    })
})
