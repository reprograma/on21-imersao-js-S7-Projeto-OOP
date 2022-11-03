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
        conta.transferir(500, conta2, '123456789')
        expect(conta.saldo).toEqual(500)
        expect(conta2.saldo).toBe(2500)
    })

    test('Transferência inválida: Saldo insuficiente', () => {
        const conta = new Conta(1, 1, 0)
        const conta2 = new Conta(2, 2, 1000)
        expect(() => conta.transferir(500, conta2, '123456789')).toThrow('Saldo Insuficiente.')
        expect(conta.saldo).toEqual(0)
        expect(conta2.saldo).toBe(1000)
    })

    test('Transferir valor inválido: Valor não numérico', () => {
        const conta = new Conta(7, 7, 1000)
        const conta2 = new Conta(8, 8, 2000)
        expect(() => conta.transferir('banana', conta2, '123456789')).toThrow('Insira um valor numérico válido.')
        expect(conta.saldo).toEqual(1000)
        expect(conta2.saldo).toBe(2000)
    })

    test('Transferir valor inválido: Valor negativo', () => {
        const conta = new Conta(7, 7, 1000)
        const conta2 = new Conta(8, 8, 2000)
        expect(() => conta.transferir(-200, conta2, '123456789')).toThrow('Insira um valor numérico válido.')
        expect(conta.saldo).toEqual(1000)
        expect(conta2.saldo).toBe(2000)
    })
    test('Transferir conta inválida: Conta inexistente', () => {
        const conta = new Conta(9, 9, 3000)
        const contaFake = ''
        expect(() => conta.transferir(500, contaFake, '123456789')).toThrow('Não foi possível realizar a transferência')
        expect(conta.saldo).toEqual(3000)
    })
    test('Transferir conta inválida: Conta que não é instância de Conta', () => {
        const conta = new Conta(1, 1, 2000)
        const contaFake = 'fake'
        expect(() => conta.transferir(500, contaFake, '123456789')).toThrow('Não foi possível realizar a transferência')
        expect(conta.saldo).toBe(2000)
    })

    test('Transferência sem o parâmetro CPF', ()=>{
        const conta = new Conta(7, 7, 1000)
        const conta2 = new Conta(8, 8, 2000)
        expect(() => conta.transferir(100, conta2)).toThrow('Para realizar a transferência é necessário preencher todos os parâmetros com valores válidos.')
        expect(conta.saldo).toEqual(1000)
        expect(conta2.saldo).toBe(2000)
    })
    
    test('Transferência sem o parâmetro Valor', ()=>{
        const conta = new Conta(7, 7, 1000)
        const conta2 = new Conta(8, 8, 2000)
        expect(() => conta.transferir(100, conta2)).toThrow('Para realizar a transferência é necessário preencher todos os parâmetros com valores válidos.')
        expect(conta.saldo).toEqual(1000)
        expect(conta2.saldo).toBe(2000)
    })

    test('Transferência sem o parâmetro Conta do destintário', ()=>{
        const conta = new Conta(7, 7, 1000)
        const conta2 = new Conta(8, 8, 2000)
        expect(() => conta.transferir(100, '12658794')).toThrow('Para realizar a transferência é necessário preencher todos os parâmetros com valores válidos.')
        expect(conta.saldo).toEqual(1000)
        expect(conta2.saldo).toBe(2000)
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
    test('Teste cadastrar a mesma chave pix', ()=>{
        const conta = new Conta(2, 2, 5000)
        conta.criarChavePix('email', 'email@gmail.com')
        expect(()=> conta.criarChavePix('email', 'email@gmail.com')).toThrow('Chave pix já cadastrada.')
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
describe('Testes do método Pix', ()=>{
    test('Pix realizado com sucesso', ()=>{
        const conta = new Conta('3330', '895-89', 6000)
        conta.criarChavePix('cpf', '123456789')
        const conta2 = new Conta('699', '655-6', 3000)
        conta2.pix(50, conta, '123456789' )
        expect(conta.saldo).toBe(6050)
        expect(conta2.saldo).toBe(2950)
    })
    test('Pix faltando o parâmetro: chavePix', ()=>{
        const conta = new Conta('3330', '895-89', 6000)
        conta.criarChavePix('cpf', '123456789')
        const conta2 = new Conta('699', '655-6', 3000)
        expect(()=> conta2.pix(50, conta)).toThrow('Para realizar o pix é necessário preencher todos os parâmetros com valores válidos.')
        expect(conta.saldo).toBe(6000)
        expect(conta2.saldo).toBe(3000)
    })
    test('Pix faltando o parâmetro: conta', ()=>{
        const conta = new Conta('3330', '895-89', 6000)
        conta.criarChavePix('cpf', '123456789')
        const conta2 = new Conta('699', '655-6', 3000)
        expect(()=> conta2.pix(50, '123456789')).toThrow('Para realizar o pix é necessário preencher todos os parâmetros com valores válidos.')
        expect(conta.saldo).toBe(6000)
        expect(conta2.saldo).toBe(3000)
    })
    test('Pix faltando o parâmetro: valor', ()=>{
        const conta = new Conta('3330', '895-89', 6000)
        conta.criarChavePix('cpf', '123456789')
        const conta2 = new Conta('699', '655-6', 3000)
        expect(()=> conta2.pix(conta2, '123456789')).toThrow('Insira um valor numérico válido.')
        expect(conta.saldo).toBe(6000)
        expect(conta2.saldo).toBe(3000)
    })
    test('Pix chave incorreta', ()=>{
        const conta = new Conta('3330', '895-89', 6000)
        conta.criarChavePix('cpf', '12356789')
        const conta2 = new Conta('699', '655-6', 3000)
        expect(()=> conta2.pix(100, conta2, '123')).toThrow('Não foi possível realizar o pix. Verifique a chave e tente novamente.')
        expect(conta.saldo).toBe(6000)
        expect(conta2.saldo).toBe(3000)
    })
    test('Pix sem ser instância de conta', ()=>{
        const conta = ''
        const conta2 = new Conta('9898', '265-7', 3000)
        expect(()=> conta2.pix(1000, conta, '123456789')).toThrow('Não foi possível realizar o pix.')
        expect(conta2.saldo).toBe(3000)
    })

  


})