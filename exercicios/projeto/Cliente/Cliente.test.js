import Cliente from './Cliente.js'
import Conta from '../Conta/Conta.js'
describe('Testes da classe Cliente', () => {

    test('Verificar se instância da classe Cliente é feita corretamente', () => {
        const cliente = new Cliente()
        expect(cliente).toBeInstanceOf(Cliente);
    })


    test('Cadastrar um cliente com dados válidos', () => {
        const conta = new Conta()
        const cliente = new Cliente()
        expect(cliente.cadastrar('Mylena', '123456', conta , 5_000)).toBe('Cliente cadastrado com sucesso!')

    })

    test('Cadastrar um cliente com dados inválidos', () => {
        const cliente = new Cliente()
        expect(() => cliente.cadastrar('Mylena', '123456', 'não conta', 5_000)).toThrow('Não foi possível realizar o cadastro. Dados inválidos.')
        //como é retorno de erro, tem que colocar uma arrow function 
    })
})

