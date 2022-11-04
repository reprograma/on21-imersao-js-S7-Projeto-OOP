import Account from "./Account.js"

describe("Teste da classe Account", () => {
    test("verificar se instancia de Account é feita corretamente", () => {
        const account =  new Account();
        expect(account instanceof Account).toBe(true);
    });

    test("instanciar conta com valores válidos ", () => {
        const account = new Account('12345', '0001', 2000);
        expect(account.getAccountNumber()).toBe('12345');
        expect(account.getAgency()).toBe('0001');
        expect(account.getBalance()).toBe(2000);
    })

    // caso positivo -> dados válidos
    test("Criar conta com dados válidos", () => {
        // num conta(5 digitos), agencia(4 digitos) e saldo(numero positivo)
        const account = new Account();
        expect(account.createAccount("12345", "0001", 5000)).toBe("Conta criada com sucesso");
        expect(account.getAgency()).toBe('0001');
        expect(account.getAccountNumber()).toBe("12345");
        expect(account.getBalance()).toBe(5000);
    });

    // caso negativo - algum dado inválido> 
    test ("Criar conta com dados inválidos", () => {
        const account = new Account();
        expect(() => account.createAccount("1234", "0001", 2000)).toThrow("Dados inválidos para cadastro");
    });
    // positivo -> deposito com valor positivo
    test("deposito com o valor de 100 reais", () => {
        const account = new Account(1,1,1000);
        expect(account.deposit(100))
        expect(account.getBalance()).toBe(1100);
    });

    // negativo -> deposito com valor negativo
    test("depósito com valor de -100", () => {
        const account = new Account(1,1,1000);
        expect(() => account.deposit(-100)).toThrow("Não é possível depositar com valores negativos");
        expect(account.getBalance()).toBe(1000);
    });

    //negativo -> deposito com valor não numerico
    test("deposito com valor não numérico", () => {
        const account = new Account(1,1,500);
        expect(() => account.deposit("")).toThrow("Não é possível depositar valores não númericos.");
        expect(account.getBalance()).toBe(500);
    });
    
    // saque -> com valor disponível em conta 
    test("Realizar saque no valor de 200 reais", () => {
        const account = new Account(1,1,5000);
        expect(account.withDraw(200));
        expect(account.getBalance()).toBe(4800)
    })

    // saque -> com valor indisponível

    test("Realizar tentativa de saque sem valor disponível na conta", () => {
        const account = new Account(1,1,0);
        expect(() => account.withDraw(200)).toThrow("Você não tem limite disponível no momento.");
        expect(account.getBalance()).toBe(0)
    })

    // transferir -> com valor disponível 
    
    // criar chave pix cpf
    test("Criar chave pix cpf com sucesso", () => {
        const account = new Account();
        expect(account.createPixKey("12345678910", "CPF")).toBe("Chave pix criada com sucesso");
        expect(account.pixKeys.cpf).toBe("12345678910");
    });
    //criar chave pix email
    test("Criar chave pix email com sucesso", () => {
        const account = new Account();
        expect(account.createPixKey("teste@teste.com.br", "EMAIL")).toBe("Chave pix criada com sucesso");
        expect(account.pixKeys.email).toBe("teste@teste.com.br");
    });

    //criar chave pix telefone
    test("Criar chave pix telefone com sucesso", () => {
        const account = new Account();
        expect(account.createPixKey("7198789787", "TELEFONE")).toBe("Chave pix criada com sucesso");
        expect(account.pixKeys.telefone).toBe("7198789787");
    });

    //criar chave pix cpf invalido
    test("Criar chave pix cpf invalido", () => {
        const account = new Account();
        expect (()=> account.createPixKey("123", "CPF")).toThrow("CPF inválido");
    });
    // o ideal seria criar um todas as possibilidades de valido e invalido para todas as chaves de cadastro 

    // Transferencia PIX
    test("Transferir valor via Pix", () => {
        const account = new Account(1,1,5000);
        expect(account.transfPix(500, "email")).toBe("Transferência pix realizada com sucesso")
        expect(account.getBalance()).toBe(4500);
    })

    test("Tentativa de transferir valor via Pix", () => {
        const account = new Account(1,1,0);
        expect(() => account.transfPix(300, "email")).toThrow("Você não tem saldo para transferência")
        expect(account.getBalance()).toBe(0);
    })

 
});



