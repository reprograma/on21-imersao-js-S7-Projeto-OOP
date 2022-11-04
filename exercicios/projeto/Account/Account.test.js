import Account from "./Account.js";

describe("Teste da classe Account", () => {
    test("verificar se instancia de Account é feita corretamente", () => {
        const account = new Account();
        expect(account instanceof Account).toBe(true);
    })

    test("deposito com valor de 100 reais", () => {
        const account = new Account(1, 1, 100);
        account.deposit(100);

        expect(account.getBalance()).toBe(200);
    })
    // negativo -> deposito com valor negativo
    test("deposito com valor de -100", () => {
        const account = new Account(1, 1, 1000);
        expect(() => account.deposit(-100)).toThrow("Não é possível depositar valores negativos");
        expect(account.getBalance()).toBe(1000);
    });

    // negativo -> deposito com valor não numérico
    test("deposito com valor não númérico", () => {
        const account = new Account(1, 1, 500);
        expect(() => account.deposit("")).toThrow("Não é possível depositar valores não numéricos");
        expect(account.getBalance()).toBe(500);
    });


    test("saque com valor não númérico", () => {
        const account = new Account(1, 1, 500);
        expect(() => account.withdraw("")).toThrow("Não é possível sacar valores não numéricos");
        expect(account.getBalance()).toBe(500);
    });

    test("saque no valor de 100", () => {
        const account = new Account(1, 1, 500);
        account.withdraw(100);
        expect(account.getBalance()).toBe(400);
    });

    test("verificar se o método withdraw tem um Throw", () => {
        const account = new Account(1, 1, 500);
        expect(account.withdraw).toThrow();
    });

    test("saque com valor maior que o saldo da conta", () => {
        const account = new Account(1, 1, 500);
        expect(() => account.withdraw(600)).toThrow("Não é possível sacar valor maior que o saldo");
        expect(account.getBalance()).toBe(500);
    });

    test("verificar os valores da class account", () => {
        const account = new Account(1, 1, 500);
        expect(account.getAccountNumber()).toBe(1);
        expect(account.getAgency()).toBe(1);
    });

    
    test("verificar os valores da class account com a validação do createAccount", () => {
        const account = new Account();
        expect(account.createAccount("11121","1111",500)).toBe("Conta criada com sucesso");
        expect(account.accountNumber).toBe('11121');
        expect(account.agency).toBe('1111');
        expect(account.balance).toBe(500);
    });

    test("verificar os valores da class account com a validação do createAccount", () => {
        const account = new Account();
        expect(() => account.createAccount("111231","1111",500)).toThrow("Dados inválidos para cadastro");
      
    });
  
    test("verificar os valores da class account com os getter de atributos", () => {
        const account = new Account(1, 1, 500);
        expect(account.accountNumber).toBe(1);
        expect(account.agency).toBe(1);
    });

    test("verificar a conta criada, retornando conta inválida", () => {
        const account = new Account(1, 1, 500);
        expect(()=>account.validateAccount(account)).toThrow("Conta inválida");
    
    });

    test("verificar a conta criada, retornando conta válida", () => {
        const account = new Account('11111', '1234', 500);
        expect(account.validateAccount(account)).toBe("Conta válida");
    
    });


    test("verificar os valores da class account não numéricos", () => {
        const account = new Account("x", "d", "Y");
        expect(() => account.getBalance()).toThrow("Saldo da conta não é numérico");
        expect(() => account.getAccountNumber()).toThrow("Número da conta não é numérico");
        expect(() => account.getAgency()).toThrow("Número da agência não é numérico");
    });


    test("verificar se o atributo chave pix foi preenchido com um CPF", ()=>{
        const account = new Account(1,1,5000);
        expect(account.createPixKey('50989336093','CPF')).toBe("Chave pix cpf criado com sucesso");
        expect(account.pixKeys.cpf).toBe('50989336093');
    });

    test("verificar se o atributo chave pix foi preenchido com um email", ()=>{
        const account = new Account(1,1,5000);
        expect(account.createPixKey('annyrural@hotmail.com','EMAIL')).toBe("Chave pix email criado com sucesso");
        expect(account.pixKeys.email).toBe('annyrural@hotmail.com');
    });

    test("verificar se o atributo chave pix foi preenchido com um celular", ()=>{
        const account = new Account(1,1,5000);
        expect(account.createPixKey('2193456402', 'TELEFONE')).toBe("Chave pix telefone criado com sucesso");
        expect(account.pixKeys.telefone).toBe('2193456402');
    });

    test("verificar se o atributo chave pix foi preenchido com um CPF invalido", ()=>{
        const account = new Account(1,1,5000);
        expect( account.createPixKey('cccccc','CPF')).toBe("Tipo de chave inexistente");
    });

    test("verificar se o atributo chave pix foi preenchido com um email invalido", ()=>{
        const account = new Account(1,1,5000);
        expect( account.createPixKey('annyruralhotmail.com','EMAIL')).toBe("Tipo de chave inexistente");
    });

    test("verificar se o atributo chave pix foi preenchido com um celular invalido", ()=>{
        const account = new Account(1,1,5000);
        expect( account.createPixKey('994x056402', 'TELEFONE')).toBe("Tipo de chave inexistente");
    });

    test("validar chave pix ", ()=>{
        const account = new Account("11121","1111",500);
        account.createPixKey('annyrural23@hotmail.com','EMAIL');
        expect(account.validatePixKey(account.pixKeys)).toBe("Chave pix válida");
    })

    test("validar chave pix , com retorno de chave inválida", ()=>{
        const account = new Account("11121","1111",500);
        expect(account.validatePixKey(account.pixKeys)).toBe("Chave pix inválida");
    })

    test("fazer o pix, retorna pix realizado" , () =>{
        const account = new Account("11121","1111",500);
        expect(account.pixTrasferTo("annyrural123@hotmail.com", "EMAIL", 100)).toBe("Pix feito");
        expect(account.getBalance()).toBe(400)
    })

    test("fazer o pix, passando chave inválida , pix não realizado" , () =>{
        const account = new Account("11121","1111",500);
        expect(()=> account.pixTrasferTo("annyrural123hotmail.com","EMAIL", 100)).toThrow("Pix não realizado");
    })

    test("fazer o pix com valor acima do saldo, retorna pix não realizado" , () =>{
        const account = new Account("11121","1111",500);
        expect(()=> account.pixTrasferTo("annyrural123@hotmail.com", "EMAIL", 600)).toThrow("Pix não realizado, saldo insuficiente");
    })

    test("transferência entre contas" , () =>{
        const account = new Account("11121","1111",500);
        const account1 = new Account("22221","1222",100);
        expect(account.transferTo(account1 , 200)).toBe("Transferência feita com sucesso");
        expect(account.getBalance()).toBe(300);
        expect(account1.getBalance()).toBe(300);
         
    });

    test("transferência entre contas com conta inexistente" , () =>{
        const account = new Account("11121","1111",500);
        const account1 = new Account("222",100);
        expect( ()=>account.transferTo(account1 , 200)).toThrow("Conta inválida");
         
    });
    test("transferência entre contas com valor maior que o permitido" , () =>{
        const account = new Account("11121","1111",500);
        const account1 = new Account("22221","2242",100);
        expect( ()=>account.transferTo(account1 , 600)).toThrow("Saldo insuficiente para prosseguir operação");
         
    });
  
    
});
