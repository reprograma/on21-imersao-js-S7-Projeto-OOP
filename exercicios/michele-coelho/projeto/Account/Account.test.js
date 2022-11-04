import Account from "./Account.js"

describe("Teste de classe Account", () => {
    test("Verificar se instacia de Account é feita corretamente", () => {
        const account = new Account();
        expect(account instanceof Account).toBe(true);
    });
    test("Deposito com valor de 100 reais", () => {
        const account = new Account();
        account.criarConta("11111", "0101", 200);
        account.deposito(100);
        expect(account.balance).toBe(300);
    });
    test("Deposito com valor de -100 reais", () => {
        const account = new Account();
        account.criarConta("11111", "0101", 8000);
        expect(() => account.deposito(-100)).toThrow("Não é possível depositar valores negativos!");
        expect(account.balance).toBe(8000);
    });
    test("Deposito com valor não númerico", () => {
        const account = new Account();
        account.criarConta("11111", "0101", 8000);
        expect(() => account.deposito("")).toThrow("Não é possível realizar transações com valores não númericos!");
        expect(account.balance).toBe(8000);
    });
    test("Sacar com valor de 100 reais", () => {
        const account = new Account();
        account.criarConta("11111", "0101", 8000);
        account.sacar(100);
        expect(account.balance).toBe(7900)
    })
    test("Sacar com valor de -100 reais", () => {
        const account = new Account();
        account.criarConta("11111", "0101", 8000);
        expect(() => account.sacar(-100)).toThrow("Não é possível sacar valores negativos!!");
        expect(account.balance).toBe(8000);
    });
    test("Sacar com valor não númerico", () => {
        const account = new Account();
        account.criarConta("11111", "0101", 8000)
        expect(() => account.sacar("")).toThrow("Não é possível realizar transações com valores não númericos!");
        expect(account.balance).toBe(8000);
    });

    test("Criar Conta", () => {
        const account = new Account();
        expect(account.criarConta("11111", "1111", 8000)).toBe("Conta criada com sucesso!");
    })
    test("Criar Conta com erro!", () => {
        const account = new Account();
        expect(() => account.criarConta("00011122233", "1", 8000)).toThrow("Dados inválidos.Não foi possível realizar cadastro");
    })

});

describe("Testar transferência", () => {
    test('Transferir o valor de 100 reais para outra conta', () => {
        const account1 = new Account();
        account1.criarConta("11111", "0101", 8000);
        account1.cpf = "000.440.779-12"
        const account2 = new Account();
        account2.criarConta("2222", "0202", 500);

        expect(account1.transferirDinheiro("000.440.779-12", account2, 100)).toBe("Transferência realizada com sucesso!");
        expect(account1.balance).toBe(7900);
        expect(account2.balance).toBe(600);

    });
    test('Testar CPF inválido na tranferência', () => {
        const account1 = new Account(null, "11111", "0101", 8000);
        account1.cpf = "000.440.779-12"
        const account2 = new Account(null, "2222", "0202", 500);

        expect(() => account1.transferirDinheiro("000000000", account2, 100)).toThrow("Cpf inválio!");
        expect(account1.balance).toBe(8000);
        expect(account2.balance).toBe(500);
    })
})
describe("Teste Pix ", () => {
    test('Criando uma chave pix com email', () => {
        const account = new Account();
        account.criarConta("11111", "0101", 8000)
        const novaChave = "michele@coelho.com";
        account.criarChavePix(novaChave, "EMAIL");
        expect(account.pixKey.EMAIL).toBe("michele@coelho.com");
    });
    test('Criando uma chave pix com email errado', () => {
        const account = new Account();
        account.criarConta("11111", "0101", 8000);
        const novaChave = "michelecoelho.com";
        expect(() => account.criarChavePix(novaChave, "EMAIL")).toThrow("Error! Chave pix inválida!");
    });
    test('Criando uma chave pix com telefone', () => {
        const account = new Account();
        account.criarConta("11111", "0101", 8000);
        const novaChave = "81995599577";
        expect(account.criarChavePix(novaChave, "TELEFONE")).toBe("Chave pix criada com sucesso!");
        expect(account.pixKey.TELEFONE).toBe("81995599577");
    });
    test('Criando uma chave pix com CPF', () => {
        const account = new Account();
        account.criarConta("11111", "0101", 8000);
        const novaChave = "030.141.214-12";
        expect(account.criarChavePix(novaChave, "CPF")).toBe("Chave pix criada com sucesso!");
        expect(account.pixKey.CPF).toBe("030.141.214-12");
    });
    test("Verificando se chave pix é válida", () => {
        const account = new Account();
        account.criarConta("11111", "0101", 8000);
        const chavePix = "030.141.214-12";
        expect(account.verificarChavePix(chavePix)).toBe(true);
    })
    test("Verificando error na chave pix", () => {
        const account = new Account();
        account.criarConta("11111", "0101", 8000);
        const chavePix = "030";
        expect(() => account.verificarChavePix(chavePix)).toThrow("Error! Chave pix inválida!");
    })
    test("Fazer pix", () => {
        const account = new Account();
        account.criarConta("11111", "0101", 8000);
        account.cpf = "030.141.214-12";
        const account2 = new Account();
        account2.criarConta("22222", "0202", 2000);

        const novaChave = "eita@pronto.com";
        account.criarChavePix(novaChave, "EMAIL");

        expect(account.fazerPix("eita@pronto.com", "030.141.214-12", account2, 1000)).toBe("Pix realizado com sucesso!");
        expect(account.balance).toBe(7000);
        expect(account2.balance).toBe(3000);
    })
})

describe("Consultar saldo", () => {
    test("Verifiando saldo", () => {
        const account = new Account();
        account.criarConta("22222", "0202", 7000);
        account.cpf = "000111222-33";
        expect(account.consultarSaldo("000111222-33", "22222", "0202")).toBe(7000);
    })
})

describe("atualizar o saldo", () => {
    test("Saldo atualizado positivo", () => {
        const account = new Account();
        account.criarConta("22222", "0202", 7000);
        expect(account.atualizarSaldo()).toBe("Saldo atualizado no valor de R$:7000");
    });
    test("Saldo atualizado negativo", () => {
        const account = new Account();
        account.criarConta("22222", "0202", -7000);
        expect(account.atualizarSaldo()).toBe("Você está no negativo.Saldo atualizado no valor de R$:-7000");
    })
})