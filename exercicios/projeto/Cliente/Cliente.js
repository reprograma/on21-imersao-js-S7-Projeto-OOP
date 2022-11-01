import Conta from '../Conta/Conta.js'

export default class Cliente{
nome
#cpf
#conta
#renda

constructor(nome, cpf, conta, renda){
if(conta instanceof Conta){
    this.nome = nome
    this.#cpf = cpf 
    this.#conta = conta 
    this.#renda = renda
    return 'Cliente cadastrado com sucesso!'
}else{
throw new Error('Não foi possível realizar o cadastro. Dados inválidos.')
}

}



}


// const contaMaria = new Conta('001', '052-2', 1000)
// const contaJose = new Conta('002','052-2', 100)

// const clienteMaria = new Cliente('Maria', '123456789', contaMaria, 50000)

// const clienteJose = new Cliente('Jose', '123456789', contaMaria, 3000)
// console.log(clienteMaria);
// console.log(clienteJose);

