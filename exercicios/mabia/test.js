test("Categoria STANDARD e limite R$1000,00", () => {
    const client = new Client();
    const account = new Account();
    client.registerClient("Ana", "1234567908", account, 3000);
    expect(client.typeAccount).toBe("STANDARD");
    expect(client.transactionLimit).toBe(1000);
  });

  test("Categoria GOLD e limite R$5000,00", () => {
    const client = new Client();
    const account = new Account();
    client.registerClient("Ana", "1234567908", account, 6000);
    expect(client.typeAccount).toBe("GOLD");
    expect(client.transactionLimit).toBe(5000);
  });

  test("Categoria PREMIUM sem limite de transação", () => {
    const client = new Client();
    const account = new Account();
    client.registerClient("Ana", "1234567908", account, 19000);
    expect(client.typeAccount).toBe("PREMIUM");
  });

  otherDeposit(client, value) {
    if (client instanceof Client) {
      if (typeof value === "string" || typeof value === "boolean") {
        throw new Error("Não é possível depositar valores não numéricos");
      }
      if (value > 0 && value < client.transactionLimit) {
        this.#balance += value;
      } else {
        throw new Error("Não é possível depositar valores negativos");
      }
    }
  }
  test("saque com o limite diario", () => {
    const account = new Account("11121", "1111", 1000);
    const client = new Client();
    client.registerClient("Mabia", "1234567908", account, 3000);
    account.otherDeposit(client, 1500)
    expect(account.balance).toBe(2500)
  });