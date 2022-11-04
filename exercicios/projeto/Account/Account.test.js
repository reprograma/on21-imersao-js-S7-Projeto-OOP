import Account from "./Account.js"

describe("Teste da classe Account", () => {
    test("verificar se instancia de Account é feita corretamente", () => {
      const account = new Account();
      expect(account instanceof Account).toBe(true);
    });
  
    // positivo -> deposito com valor positivo
    test("deposito com valor de 100 reais", () => {
      const account = new Account(1, 1, 1000);
      account.deposit(100);
  
      expect(account.getBalance()).toBe(1100);
    });
  
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

    test("saque no valor de R$100,00", () => {
        const account = new Account("67890", "0001", 800);
        expect(account.withdraw(100)).toBe("Saque realizado com sucesso!");
    });

    test("saque com saldo insuficiente", () => {
        const account = new Account("67890", "0001", 800);
        expect(() => account.withdraw(100)).toThrow("Transação não concluída. Saldo da conta insuficiente!");
    });

    test("instanciar conta com valores válidos", () => {
        const account = new Account("67890", "0001", 1000);
        expect(account.getAccountNumber()).toBe("67890");
        expect(account.getAgency()).toBe("0001");
        expect(account.getBalance()).toBe(1000);
    })

    test("criar conta com dados válidos", () => {
        const account = new Account();
        expect(account.createAccount("67890", "0001", 500)).toBe("Conta criada com sucesso!");
        expect(account.getAccountNumber()).toBe("67890");
        expect(account.getAgency()).toBe("0001");
        expect(account.getBalance()).toBe(500);
    })

    test("criar conta com dados inválidos", () => {
        const account = new Account();
       expect(() => account.createAccount("7890", "0001", 300)).toThrow("Dados inválidos para cadastro!");
    })

    test("criar chave pix cpf com sucesso", () => {
        const account = new Account();
        expect(account.createPixKey("37761514046", "CPF")).toBe("Chave pix cpf criada com sucesso!");
        expect(account.pixKeys.cpf).toBe("37761514046");
    });

    test("criar chave pix email com sucesso", () => {
        const account = new Account();
        expect(account.createPixKey("test@test.com.br", "EMAIL")).toBe("Chave pix email criada com sucesso!");
        expect(account.pixKeys.email).toBe("test@test.com.br");
    });

    test("criar chave pix telefone com sucesso", () => {
        const account = new Account();
        expect(account.createPixKey("11944049367", "TELEFONE")).toBe("Chave pix telefone criada com sucesso!");
        expect(account.pixKeys.telefone).toBe("11944049367");
    });

    test("criar chave pix cpf inválido", () => {
        const account = new Account();
        expect(() => account.createPixKey("3776151404", "CPF")).toThrow("Erro, cpf inválido!");
    });

    test("transferência via chave pix com saldo de R$500,00 reais", () => {
        const account = new Account("67890", "0001", 500);
        expect(account.transferPixKey("EMAIL","test@test.com.br", 250)).toBe("Transferência Pix realizado com sucesso!");
    });

    test("transferência via chave pix com saldo insuficiente", () => {
        const account = new Account("67890", "0001", 0);
        expect(() => account.transferPixKey("EMAIL","test@test.com.br", 250)).toThrow("Transação Pix não concluída. Saldo da conta insuficiente!");
    });
  });