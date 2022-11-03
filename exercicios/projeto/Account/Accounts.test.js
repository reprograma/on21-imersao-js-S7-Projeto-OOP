import Account from "./Account.js";

describe("Teste da classe Account", ()=> {
    test("Verificaar se instancia de Account é feita corretamente", () => {
        const account = new Account();
        expect(account instanceof Account).toBe(true);
    });

    //positivo -> deposito com valor positivo
    test("deposito com valor de 100 reais", ()=>{
        const account  = new Account(1, 1, 1000);
        account.deposit(100);
        expect(account.getBalance()).toBe(1100);
    });
    //negativo -> depositar com valor negativo
    test("deposito com valor de -100 reais", ()=>{
        const account  = new Account(1, 1, 1000);
        
        expect(() => account.deposit(-100)).toThrow("Não é possível depositar valores negativos");
        expect(account.getBalance()).toBe(1000);
    });
    
    //negativo -> deposito com valor numérico
    test("deposito com valor não numérico", () => {
        const account = new Account(1, 1, 500);
        expect(() => account.deposit("")).toThrow("Não é possível depositar valores não numéricos")
        expect(account.getBalance()).toBe(500);
    })
    
    //caso positivo dados válidos
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
    
    //caso negativo 
    test("criar conta com dados inválidos", () => {
        const account = new Account();
        expect(() => account.createAccount("1234", "0001", 300)).toThrow("Dados inválidos para cadastrar");
    })

    //criar chave pix cpf
    test("criar chave pix com cpf com sucesso", () => {
        const account = new Account();
        expect(account.createPixKey("09876543210")).toBe("Chave pix criada com sucesso");
        expect(account.pixKeys.cpf).toBe("09876543210");
    })

    //criar chave pix email
    test("criar chave pix email com sucesso", () => {
        const account = new Account();
        expect(account.createPixKey("teste@testando.com")).toBe("Chave pix criada com sucesso");
        expect(account.pixKeys.email).toBe("teste@testando.com");
    })
});