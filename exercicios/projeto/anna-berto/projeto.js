import Account from "./Account/Account.js";
import Client from "./Client/Client.js";

// testando client
const client1 = new Client("Anna", "128988262", "001", 19000)
client1.customerCategory();



// testando criacao de conta
const bankAccount1 = new Account("222", "000", 500);
const bankAccount2 = new Account("222", "000", 500);

// testando saque e deposito
bankAccount1.cashWithdrawal(200);
bankAccount1.deposit(100);

// testando transferencia
bankAccount1.transferTo(bankAccount2, 200);

// testando criacao de chave pix e transferencia pix
bankAccount1.createPixKey("anna@gmail.com", "email");
bankAccount2.createPixKey("raphaela@gmail.com", "email");
bankAccount2.transferToPix(bankAccount1, "anna@gmail.com", 100);

console.log("bank 1:", bankAccount1);
console.log("bank2:", bankAccount2);
