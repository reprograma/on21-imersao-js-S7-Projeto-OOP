class Pix {
  email;
  telefone;
  cpf;

  cadastrarChaveEmail(email) {
    this.email = email;
    return `Chave PIX e-mail cadastrado.`;
  }
  cadastrarChaveTelefone(telefone) {
    this.telefone = telefone;
    return `Chave PIX telefone cadastrado.`;
  }
  cadastrarChaveCPF(cpf) {
    this.cpf = cpf;
    return `Chave PIX CPF cadastrado.`;
  }
}
export default Pix;
