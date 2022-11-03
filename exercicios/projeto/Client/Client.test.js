import Client from './Client.js';
import Account from "../Account/Account.js";

const client = new Client();
const account = new Account();
account.createAccount('12334','1234',5000)

//const CLient = require("./Client")
describe("Teste da classe Client", ()=>{
    test("verificar se instancia do Client é feita corretamente", ()=>{
        expect(client instanceof Client).toBe(true);
       //expect(client).toBeInstanceOf(Client);

    })

    test("cadastrar cliente com dados válidos", ()=>{
        expect(client.registerClient("Anna Rodrigues", "12345678902", account, 5000)).toBe("Cliente Cadastrado");

       })
    
    test("cadastrar cliente com dados inválidos", ()=>{
        expect(()=>client.registerClient("Anna Rodrigues" , "22232415151", "nao conta" ,3535).toThrow("Erro no cadastro, dados invalidos"));
       
    })
   
    test("validar tipo cliente Standard R$4999,99 de renda mensal",()=>{
        client.registerClient("Anna Rodrigues", "12345678902", account, 4999.99);
        expect(client.getIncome()).toBe("Cliente Standard")
    })

    test("validar tipo cliente Gold, R$5000,00 até R$17.999,99 de renda mensal",()=>{
        client.registerClient("Anna Rodrigues", "12345678902", account, 6500);
        expect(client.getIncome()).toBe("Cliente Gold")
    })

    test("validar tipo cliente Premium, 18.000,00 de renda mensal",()=>{
        client.registerClient("Anna Rodrigues", "12345678902", account, 19000);
        expect(client.getIncome()).toBe("Cliente Premium")
    })
  
    test("validar tipo cliente Premium, 18.000,00 de renda mensal",()=>{
        client.registerClient("Anna Rodrigues", "12345678902", account, 'xxx');
        expect( ()=>client.getIncome()).toThrow("Não é possível renda com valores não numéricos");
    })
  
    test("validar transações para cliente Standard - R$1.000 diários",()=>{
        client.registerClient("Anna Rodrigues", "12345678902", account, 4999.99);
        expect(account.validateTransaction('withdraw',1000,client.income, 0)).toBe("Operação dentro do limite diário") ;
    })

    test("validar transações para cliente Gold - R$5.000 diários",()=>{
        client.registerClient("Anna Rodrigues", "12345678902", account, 7000.00);
        expect(account.validateTransaction('withdraw',1000,client.income, 0)).toBe("Operação dentro do limite diário") ;
     
    })

    test("validar transações para cliente Premium - sem limite diário",()=>{
        client.registerClient("Anna Rodrigues", "12345678902", account, 20000.00);
        expect(account.validateTransaction('withdraw',1000,client.income, 0)).toBe("Operação dentro do limite diário") ;
     
    })

    test("validar transações para cliente Standard - R$1.000 diários , retirando acima do permitido",()=>{
        client.registerClient("Anna Rodrigues", "12345678902", account, 4999.99);
        expect( ()=> account.validateTransaction('withdraw',6000,client.income, 0)).toThrow("Limite diário excedido") ;
    })

    test("validar transações para cliente Standard - R$1.000 diários , retirando acima do permitido",()=>{
        client.registerClient("Anna Rodrigues", "12345678902", account, 4999.99);
        expect( ()=> account.validateTransaction('withdraw1',2000,client.income, 0)).toThrow("Operação inválida") ;
    })

});