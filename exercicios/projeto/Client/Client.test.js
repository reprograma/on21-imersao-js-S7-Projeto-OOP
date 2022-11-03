// import Account from '../Account/Account.js';
// import Client from './Client.js';

// describe("Teste da classe Client", () => {
//   test("verificar se instancia do Client é feita corretamente", () => {
//     const client = new Client();
//     // instanciaASerVerificada instanceof Classe -> true ou false
//     // alternativa: expect(client).toBeInstanceOf(Client);
//     expect(client instanceof Client).toBe(true);
//   });

//   test("cadastrar cliente com dados válidos", () => {
//     const client = new Client();
//     const account = new Account();
//     expect(client.registerClient("Ana", "1234567908", account, 5000)).toBe("Cliente cadastrado");
//   });

//   test("cadastrar cliente com dados inválidos", () => {
//     const client = new Client();
//     expect(() => client.registerClient("Ana", "1234567908", "não conta", 5000)).toThrow("Erro no cadastro, dados inválidos");
//   });
// });
//nome, cpf - privado, conta - privado, renda -privado, métodos(registrar cliente)
//classes, atributos, métodos

import Client from './Client.js';
import Account from '../Account/Account.js'

describe('Teste da classe Client', () => {
    test('verificar se instância do Client é feita corretamente', () => {
        const client = new Client('raissa',1059173738, 123, 10000);
        //instaceof - variavelDaInstancai intanceof ClasseEmQuestao / retorna true ou false 
        //typeof - ambos são metododos que devolvem se ou aquilo é uma instancia de algo ou o tipo de algo
        //https://jestjs.io/pt-BR/docs/using-matchers   
        //expect(client).toBeInstanceOf(Client); essa aqui é uma outro matcher de opção 
        expect(client instanceof Client).toBe(true)
    });
        //caso positivo e caso negativo(sem foco nos casos de borda dessa vez)
    test('cadastrar cliente com dados válidos', () => {
        const client = new Client();
        const account = new Account()
        //metodo que eu quero testar
        expect(client.registerClient('raissa', 1059173738, account, 10000)).toBe('cliente cadastrado')
        
    });
    test('cadastrar cliente com dados inválidos', () => {
        const client = new Client();
        //quando vamos retornar um throw error no nosso método precisamos colocar nosso expect uma arrow function
        expect(() => client.registerClient('raissa', 1059173738, 'nao conta', 10000)).toThrow('erro no cadastro, Dados inválidos')      
    })
})
