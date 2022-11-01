import Conta from './Conta.js'


describe('Testes básicos da classe Conta', () => {
    test('Verifica se a instaância de Conta é feita corretamente', () => {
        const conta = new Conta()
        expect(conta instanceof Conta).toBeTruthy()
    })

})
describe('Testes do método Depositar', () => {
    test('Deposito no valor de 100 reais', () => {
        const conta = new Conta(1, 1, 5000)
        conta.depositar(100)
        expect(conta.saldo).toBe(5100)
    })
    test('Deposito com valor de -100', () => {
        const conta = new Conta(2, 2, 1000)
        expect(() => conta.depositar(-100)).toThrow('Não é possível realizar depósitos com valores negativos.')
        expect(conta.saldo).toBe(1000)
    })
    test('Deposito com valor não numérico', () => {
        const conta = new Conta(3, 3, 1000)
        expect(() => conta.depositar('banana')).toThrow('Não foi possível realizar o depósito. Insira um valor numérico válido.')
        expect(conta.saldo).toBe(1000)
    })
})
describe('Testes do método Sacar', () => {

    test('Sacar 200 reais', () => {
        const conta = new Conta(4, 4, 3000)
        conta.sacar(500)
        expect(conta.saldo).toBe(2500)

    })
    test('Saque inválido: sacar 100 reais porem não há saldo suficiente em conta.', () => {
        const conta = new Conta(5, 5, 0)
        expect(() => conta.sacar(100)).toThrow('Não há saldo suficiente em conta para realizar o saque.')
        expect(conta.saldo).toBe(0)
    })
    test('Saque inválido: Valor não numérico', () => {
        const conta = new Conta(6, 6, 1000)
        expect(() => conta.sacar('banana')).toThrow('Insira um valor numérico válido.')
        expect(conta.saldo).toEqual(1000)
    })
    test('Saque inválido: Valor negativo', () => {
        const conta = new Conta(6, 6, 1000)
        expect(() => conta.sacar(-10)).toThrow('Insira um valor numérico válido.')
        expect(conta.saldo).toEqual(1000)
    })

})
describe('Testes do método Transferir', () => {
    test('Transferir 500 reais', () => {
        const conta = new Conta(7, 7, 1000)
        const conta2 = new Conta(8, 8, 2000)
        conta.transferir(500, conta2)
        expect(conta.saldo).toEqual(500)
        expect(conta2.saldo).toBe(2500)
    })

    test('Transferência inválida: Saldo insuficiente', () => {
        const conta = new Conta(1, 1, 0)
        const conta2 = new Conta(2, 2, 1000)
        expect(() => conta.transferir(500, conta2)).toThrow('Saldo Insuficiente.')
        expect(conta.saldo).toEqual(0)
        expect(conta2.saldo).toBe(1000)
    })

    test('Transferir valor inválido: Valor não numérico', () => {
        const conta = new Conta(7, 7, 1000)
        const conta2 = new Conta(8, 8, 2000)
        expect(() => conta.transferir('banana', conta2)).toThrow('Insira um valor numérico válido.')
        expect(conta.saldo).toEqual(1000)
        expect(conta2.saldo).toBe(2000)
    })

    test('Transferir valor inválido: Valor negativo', () => {
        const conta = new Conta(7, 7, 1000)
        const conta2 = new Conta(8, 8, 2000)
        expect(() => conta.transferir(-200, conta2)).toThrow('Insira um valor numérico válido.')
        expect(conta.saldo).toEqual(1000)
        expect(conta2.saldo).toBe(2000)
    })
    test('Transferir conta inválida: Conta inexistente', () => {
        const conta = new Conta(9, 9, 3000)
        const contaFake = ''
        expect(() => conta.transferir(500, contaFake)).toThrow('Não foi possível realizar a transferência')
        expect(conta.saldo).toEqual(3000)
    })
    test('Transferir conta inválida: Conta que não é instância de Conta', () => {
        const conta = new Conta(1, 1, 2000)
        const contaFake = 'fake'
        expect(() => conta.transferir(500, contaFake)).toThrow('Não foi possível realizar a transferência')
        expect(conta.saldo).toBe(2000)
    })
})
describe('Testes do método criarChavePix', () => {
    test('Criar chave pix to tipo Email', () => {
        const conta = new Conta(1, 1, 5000)
        expect(conta.criarChavePix('email', 'conta@gmail.com')).toBe('conta@gmail.com')
    })
    test('Criar chave pix to tipo CPF', () => {
        const conta = new Conta(1, 1, 5000)
        expect(conta.criarChavePix('cpf', '123456789')).toBe('123456789')
    })
    test('Criar chave pix to tipo Telefone', () => {
        const conta = new Conta(1, 1, 5000)
        expect(conta.criarChavePix('telefone', '8140028922')).toBe('8140028922')
    })
    test('Teste chave pix de tipo inválido', () => {
        const conta = new Conta(1, 1, 5000)
        expect(() => conta.criarChavePix('banana')).toThrow('Não foi possível gerar uma chave pix.')
    })
})
describe('Testes do método verificarChavePix', () => {
    test('Deve retornar a chave pix CPF', () => {
        const conta = new Conta('001', '028-8', 50000)
        conta.criarChavePix('cpf', '123456789')
        expect(conta.verificarChavePix('cpf')).toBe('123456789')
    })
    test('Deve retornar a chave pix Email', () => {
        const conta = new Conta('001', '028-8', 50000)
        conta.criarChavePix('email', 'cliente@gmail.com')
        expect(conta.verificarChavePix('email')).toBe('cliente@gmail.com')
    })
    test('Deve retornar a chave pix Telefone', () => {
        const conta = new Conta('001', '028-8', 50000)
        conta.criarChavePix('telefone', '81900011110')
        expect(conta.verificarChavePix('telefone')).toBe('81900011110')
    })
    test('Verificação sem parâmetro. Deve retornar mensagem de erro', ()=>{
        const conta = new Conta('001', '028-8', 50000)
        expect(() => conta.verificarChavePix()).toThrow('Não foi possível concluir sua solicitação. Tente novamente')
    })
    test('Verificação com parâmetro incorreto. Deve retornar mensagem de erro', ()=>{
        const conta = new Conta('001', '028-8', 50000)
        expect(() => conta.verificarChavePix('banana')).toThrow('Não foi possível concluir sua solicitação. Tente novamente')
    })

})