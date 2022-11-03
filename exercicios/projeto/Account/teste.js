createPixKey(KeyValue, KeyType){
    switch (KeyType) {
        case "CPF":
            var regex = /([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})/;

            if (regex.test(KeyValue)) {
                this.pixKeys.cpf = KeyValue;
                console.log('oi ');
                return "Chave pix cpf criado com sucesso"
            }
            else {
                throw new Error("Erro, cpf inválido");
            }
            case "TELEFONE":
                let telefoneRegex = /(?:(?([1-9][0-9]))?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/;
                if (telefoneRegex.test(KeyValue)) {
                    this.pixKeys.telefone = KeyValue;
                    return "Chave pix telefone criado com sucesso"
    
                }
       
            case "EMAIL":
            var emailRegex = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+.([a-z]+)?$/i;

            if (emailRegex.test(KeyValue)) {
                this.pixKeys.email = KeyValue;
                return "Chave pix email criado com sucesso"
            }

        default:
            return "Tipo de chave inexistente";

    }


}