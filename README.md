<h1 align="center">
  <img src="assets/reprograma-fundos-claros.png" alt="logo reprograma" width="500">
</h1>

# Tema da Aula

Turma Online 21 - Imersão JavaScript | Semana 7 | 2022 | Professora Ana Morita

### Instruções
Antes de começar, vamos organizar nosso setup.
* Fork esse repositório 
* Clone o fork na sua máquina (Para isso basta abrir o seu terminal e digitar `git clone url-do-seu-repositorio-forkado`)
* Entre na pasta do seu repositório (Para isso basta abrir o seu terminal e digitar `cd nome-do-seu-repositorio-forkado`)
* [Add outras intrucoes caso necessario]

### Objetivo
Praticar os conceitos de OO e TDD aprendidos nas aulas anteriores

### Módulo 7 - Projeto Prático OO
Objetivo: Projeto com foco em design de classes. Iniciar as funcionalidades do zero, pensando em como modelar os objetos e como separar os métodos de forma a aplicar os quatro pilares da POO, podendo também aplicar o padrão de composição em vez de herança se for o caso.

### Orientações
O objetivo do projeto é utilizar o que foi aprendido em OO e em testes. Todas as entregas devem ter minimamente testes unitários e contemplar as funcionalidades essenciais do sistema. Nesse projeto, as alunas não devem se preocupar com casos de borda, implementação de interfaces, nem com autenticação/autorização.
### Sistema Bancário

Você foi contratado para fazer uma versão inicial de um sistema bancário. Nessa versão o sistema conta com as seguintes funcionalidades:
- cadastro de clientes de acordo com a categorização do tipo de conta
- cadastro de chave pix (email, telefone e cpf)
- transações permitidas:
  - saque
  - transferência
  - pix
  - depósito

### Clientes
Os clientes do nosso banco são divididos de acordo com a sua renda mensal em 3 categorias de conta:
#### Standard
Clientes com conta standard são os clientes base do banco, são pessoas com até R$4999,99 de renda mensal. 
Eles também tem limite de transação de 1000 reais por dia.

#### Gold
Clientes com conta Gold são so clientes intermediários do banco com renda mensal de R$5000,00 até R$17.999,99. 
Eles também tem limite de transação de 5000 reais por dia.

#### Premium
Clientes com conta premium são aqueles que possuem renda mensal a partir de R$18.000,00.
Eles não tem limite de transação por dia.

### Operações
As transações permitidas por nosso banco no momento são:
Lembrar que para todas as transações é necessário verificar se o cliente possui saldo disponível para realizá-la.

#### PIX
Podemos cadastrar chaves pix para nossos clientes, no momento apenas chaves de e-mail, telefone e cpf para simplificar nosso exercício. Com as chaves pix é possível transferir dinheiro para outra conta de nosso banco. Para realizar a transação é necessário ter a chave pix de quem irá receber e o valor a ser transferido via pix.

#### Saque
O cliente pode optar por sacar dinheiro em uma dos nossos caixas eletrônicos e para isso basta solicitar o saque e o valor a ser retirado.

#### Transferência
Temos também a opção por transferência, para realizar esta operação é necessário ter a conta do banco do destinatário, CPF e valor a ser transferido.

#### Depósito
O cliente também pode depositar dinheiro em sua conta, passando apenas o valor a ser depositado.

***

### Links Úteis
* 

<p align="center">
Desenvolvido com :purple_heart:  
</p>

