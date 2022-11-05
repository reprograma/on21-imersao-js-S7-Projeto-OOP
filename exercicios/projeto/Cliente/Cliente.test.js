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
        expect(cliente.cadastrarCliente('Mylena', '123456', conta, 5_000)).toBe('Cliente cadastrado com sucesso!')
    })
    test('Cadastrar um cliente com dados inválidos: sem passar a conta', () => {
        const cliente = new Cliente()
        expect(() => cliente.cadastrarCliente('Mylena', '123456', 5_000)).toThrow('É necessário inserir todas as informações solicitadas.')
    })
    test('Cadastrar um cliente com dados inválidos: sem passar o nome', () => {
        const cliente = new Cliente()
        const conta = new Conta()
        expect(() => cliente.cadastrarCliente('123456', conta, 5_000)).toThrow('É necessário inserir todas as informações solicitadas.')
    })
    test('Cadastrar um cliente com dados inválidos: sem passar o CPF', () => {
        const cliente = new Cliente()
        const conta = new Conta()
        expect(() => cliente.cadastrarCliente('Mylena', conta, 5_000)).toThrow('É necessário inserir todas as informações solicitadas.')
    })
    test('Cadastrar um cliente com dados inválidos: sem passar a renda', () => {
        const cliente = new Cliente()
        const conta = new Conta()
        expect(() => cliente.cadastrarCliente('Mylena', '123456789', conta)).toThrow('É necessário inserir todas as informações solicitadas.')
    })
    test('Verificar tipo de conta: Standard', () => {
        const conta = new Conta()
        const cliente = new Cliente()
        cliente.cadastrarCliente('Mylena', '123456789', conta, 3000.00)
        expect(cliente.tipoConta).toBe('STANDARD')
    })
    test('Verificar tipo de conta: Gold', () => {
        const cliente = new Cliente()
        const conta = new Conta()
        cliente.cadastrarCliente('Mylena', '123456789', conta, 7000.00)
        expect(cliente.tipoConta).toBe('GOLD')
    })
    test('Verificar tipo de conta: Premium', () => {
        const cliente = new Cliente()
        const conta = new Conta()
        cliente.cadastrarCliente('Mylena', '123456789', conta, 5000000)
        expect(cliente.tipoConta).toEqual('PREMIUM')
    })
})
