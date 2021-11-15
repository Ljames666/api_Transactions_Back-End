interface FinancialTransfers {
  id: number;

  title: string;
  value: number;
  type: string;
}

class Transaction implements FinancialTransfers {
  constructor(
    public id: number,

    public title: string,
    public value: number,
    public type: string
  ) {}
}

class ClientGrowBank {
  constructor(
    public id: number,
    public name: string,
    public cpf: number,
    public email: string,
    public age: number,
    public transactions: Array<Transaction>
  ) {}
}

class EmployeeGrowBank {
  constructor(public id: number, public username: string, public password: string) {}
}
export { Transaction, ClientGrowBank, EmployeeGrowBank };
