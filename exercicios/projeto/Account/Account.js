import { Client } from '../Client/Client.js'

export class Account extends Client {
    #accountNumber
    #agency
    #balance
    pixKeys = []
  
    constructor(name, cpf, accountNumber, agency, balance) {
      super(name, cpf)
      this.#accountNumber = accountNumber
      this.#agency = agency
      this.#balance = balance
    }
  
    get accountNumber() {
      return this.#accountNumber
    }
  
    set accountNumber(newAccountNumber) {
      return this.#accountNumber = newAccountNumber
    }
  
    get agency() {
      return this.#agency
    }
  
    set agency(newAgency) {
      return this.#agency = newAgency
    }
  
    get balance() {
      return this.#balance
    }
  
    set balance(newBalance) {
      return this.#balance = newBalance
    }


    deposit(amount) {
      if (typeof amount !== 'number') {
        throw new Error('Cannot deposit non-numeric values.')
      }
      if (amount > 0) {
        return this.balance += amount
      } else {
        throw new Error("It is not possible to deposit negative values.")
      }
    }

    withdrawal(amount) {
      if (typeof amount !== 'number') {
        throw new Error('Cannot withdrawal non-numeric values.')
      }
      if (this.balance < amount) {
        throw new Error('Insufficient funds!')
      } else {
        return this.balance -= amount
      }
    }
    
    getBalance() {
      return this.balance

    }

    createAccount(accountNumber, agency, balance) {
      if(accountNumber.length === 5 && agency.length === 4 && balance > 0) {
        this.accountNumber = accountNumber
        this.agency = agency
        this.balance = balance
        return  'Account created successfully'
      } else {
        throw new Error('Invalid data for registration')
      }
       
    }
  
    createPixKey(pixType, generatePixKey) {
      const arrPixType = ['cpf', 'tel', 'email']
      let filteredPixType = arrPixType.filter(namePixType => namePixType === pixType)
      // console.log('FILTERED PIX TYPE', filteredPixType)
      if(filteredPixType) {
        if(pixType === filteredPixType[0]) {
          let regex
          switch (pixType) {
            case 'email':
              regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            break;
        
            case 'cpf':
              regex =  /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/
            break;
        
            case 'tel':
              regex = /\d{2}\d{4,5}\d{4}/
            break;
            default:
              return 'Invalid pix type'
             }
          this.validate(generatePixKey, regex, pixType)
  
        } 
        else {
          throw new Error('Invalid pix type')
        }
      } 
  }

  transferTo(anotherAccount, cpf, amount) {
    if (anotherAccount instanceof Client) {
      if (this.balance < amount) {
        throw new Error('Insuficcient funds to transfer')
      } else if (anotherAccount.cpf === cpf) {
        this.withdrawal(amount)
        anotherAccount.deposit(amount)
        console.log(`Sent $${amount} to account with CPF ${cpf} / Current balance: $${this.balance}`)

      } else {
        console.log('Invalid cpf provided. Please check and try again!')
      }
    }
  }

  pixTo(anotherAccount, pixkey, amount) {
    if (anotherAccount instanceof Account) {
      if (this.balance < amount) {
        throw new Error('Insuficcient funds to transfer')
      } else if(anotherAccount.pixKeys.filter(pix => pix === pixkey))
      this.withdrawal(amount)
      anotherAccount.deposit(amount)
      console.log(`Sent $${amount} to PIX:${pixkey} / Current balance: $${this.balance}`)
      

      }
    }


  validate(generatePixKey, regex, pixType) {
    if(generatePixKey.match(regex)) {
      if(this.pixKeys.some(pix => pix === generatePixKey)) {
        throw new Error('Pix already registered')
      } else {
        this.pixKeys.push(generatePixKey) 
         console.log (`Pix ${generatePixKey} created successfully`)
      }
    } else {
      throw new Error(`Invalid ${pixType}!`)
    }
  }
}
 
  const account1 = new Account('Renata', '123456789', '12345', '1234', 1000)
  const account2 = new Account('Re', '00011122233', '00100', '0001', 500)



  //  account2.createPixKey('email', 'renata@gmail.com')
  // account1.createPixKey('tel', '21987654321')

//  account1.transferTo(account2, '00011122233', 200)


  // console.log(account1.balance);
  // console.log(account2.balance);

  
  // account1.createPixKey('cpf', '11111111145')
  // console.log(account1.balance);
  // console.log(account2.balance);
  account1.pixTo(account2, 'renata@gmail.com', 200)


  // console.log(account1.accountNumber);
  // console.log('ACCOUNT 2', account2);
  

// // account1.createPixKey('email', 'renata@gmail.com')
// account1.createPixKey('tel', '21987654321')
// account1.createPixKey('casa', '44987654321')
//  account1.createPixKey('tel', '21999998844')

 



// console.log(account1.pixKeys);



// constructor(name, cpf, accountNumber, agency, balance) {