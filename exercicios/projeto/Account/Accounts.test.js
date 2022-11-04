import Account from "./Account.js";

describe("Teste da classe Account", ()=> {
    test("Verificaar se instancia de Account é feita corretamente", () => {
        const account = new Account();
        expect(account instanceof Account).toBe(true);
    });

    test("deposito com valor de 100 reais", ()=>{
        const account  = new Account(1, 1, 1000);
        account.deposit(100);
        expect(account.getBalance()).toBe(1100);
    });
    
    test("deposito com valor de -100 reais", ()=>{
        const account  = new Account(1, 1, 1000);
        
        expect(() => account.deposit(-100)).toThrow("Não é possível depositar valores negativos");
        expect(account.getBalance()).toBe(1000);
    });
    
    test("deposito com valor não numérico", () => {
        const account = new Account(1, 1, 500);
        expect(() => account.deposit("")).toThrow("Não é possível depositar valores não numéricos")
        expect(account.getBalance()).toBe(500);
    })
    
    test("instanciar conta conta com valores válidos",() => {
        const account = new Account("12345", "1234", 1000);
        expect(account.getBalance()).toBe(1000);
        expect(account.getAccountNumber()).toBe("12345");
        expect(account.getAgency()).toBe("1234")
    });
   
   
    test("criar conta conta com dados válidos",() => {
        const account = new Account();
        expect(account.createAccount("12345", "0001", 500)).toBe("Conta criada com sucesso");
        expect(account.getBalance()).toBe(500);
        expect(account.getAccountNumber()).toBe("12345");
        expect(account.getAgency()).toBe("0001")
    }); 

    test("criar conta com dados inválidos", () => {
        const account = new Account();
        expect(() => account.createAccount("1234", "0001", 300)).toThrow("Dados inválidos para cadastro");
    })

    test("criar chave pix com cpf com sucesso", () => {
        const account = new Account();
        expect(account.createPixKey("09876543210", "CPF")).toBe("Chave pix cpf criada com sucesso");
        expect(account.pixKeys.cpf).toBe("09876543210");
    })

    test("criar chave pix email com sucesso", () => {
        const account = new Account();
        expect(account.createPixKey("teste@testando.com", "EMAIL")).toBe("Chave pix email criada com sucesso");
        expect(account.pixKeys.email).toBe("teste@testando.com");
    })

    test("sacar 200 reais com sucesso", () => {
        const account = new Account("54321", "0001", 1000);
        expect(account.withdraw(200)).toBe("Saque de 200 reais  realizado com sucesso");
        expect(account.getBalance()).toBe(800);
    })

    test("sacar 600 reais , saldo insuficiente", () => {
        const account = new Account("54321", "0002", 500);
        expect(() => account.withdraw(600)).toThrow("Saldo insuficiente");
        expect(account.getBalance()).toBe(500);
    })

    test("transferir 100 reais com sucesso", () => {
        const account1 = new Account("65432", "0003", 900);
        const account2 = new Account("98765", "3456", 0);
        expect(account1.transferTo(account2, 100)).toBe("Transferencia feita com sucesso")
        expect(account1.getBalance()).toBe(800);
        expect(account2.getBalance()).toBe(100);
    })

});