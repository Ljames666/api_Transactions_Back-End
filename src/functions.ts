import { Transaction, ClientGrowBank } from "./Class";
import { clientsGrowBank, employeesGrowBank } from "./arrays";
import { Response, Request } from "express";

let eId: number = 3;

let readEmployees = (req: Request, res: Response) => {
  let { username, password } = req.body;
  const index = employeesGrowBank.findIndex((employee) => employee.id);
  if (
    employeesGrowBank[index].username == username &&
    employeesGrowBank[index].password == password
  ) {
    res
      .status(200)
      .send({ message: `${employeesGrowBank[index].username} Welcome to GrowBank Transactions!` });
  }
};
let cliId: number = 1;
let addClients = (req: Request, res: Response) => {
  let { name, cpf, email, age } = req.body;
  if (!name || !cpf || !email || !age) {
    res.status(418).send({ message: "Inform name, cpf and email" });
  } else {
    let verifiedUser = clientsGrowBank.findIndex((item) => item.cpf == cpf || item.email == email);
    if (verifiedUser >= 0) {
      res.status(418).send({ message: "Existing user, create a new one!" });
    } else {
      let transArray: Array<Transaction> = [];
      const client: ClientGrowBank = new ClientGrowBank(cliId, name, cpf, email, age, transArray);
      cliId++; // increment
      clientsGrowBank.push(client);
      return res.status(200).send({ client, clientsGrowBank });
    }
  }
};
let readClientList = (res: Response) => {
  const list = clientsGrowBank.map((user) => {
    return { id: user.id, name: user.name, cpf: user.cpf, email: user.email, age: user.age };
  });
  res.status(200).send({ list });
};
let thisClient = (req: Request, res: Response) => {
  let id = Number(req.params.id);
  let index = clientsGrowBank.findIndex((user) => user.id == id);
  if (index < 0) {
    res.status(404).send({ message: "Not found!" });
  } else {
    let clientList = clientsGrowBank.map((user) => {
      return { id: user.id, name: user.name, cpf: user.cpf, email: user.email, age: user.age };
    });
    return res.status(201).send({ client: clientList[index] });
  }
};

let editClient = (req: Request, res: Response) => {
  let { name, cpf, email, age } = req.body;
  let id = Number(req.params.id);
  if (!name || !cpf || !email || !age) {
    res.status(418).send({ message: "Inform name, cpf and email" });
  } else {
    let index = clientsGrowBank.findIndex((user) => user.id == id);
    if (index < 0) {
      res.status(404).send({ message: "Not found!" });
    } else {
      clientsGrowBank[index].name = name;
      clientsGrowBank[index].cpf = cpf;
      clientsGrowBank[index].email = email;
      clientsGrowBank[index].age = age;
      res.send({ client: clientsGrowBank[index], message: "User successfully modified!" });
    }
  }
};

let removeClient = (req: Request, res: Response) => {
  let id = Number(req.params.id);
  let index = clientsGrowBank.findIndex((user) => user.id == id);
  if (index < 0) {
    res.status(404).send({ message: "Not found!" });
  } else {
    clientsGrowBank.splice(index, 1);
    res.send({ message: "User  deleted successfully!" });
  }
};
// fim
//functions transactions
let transactionId = 1;
let addTransaction = (req: Request, res: Response) => {
  let usId = Number(req.params.userId);
  let { title, value, type } = req.body;

  if (!title || !value || !type) {
    res.status(418).send({
      message:
        "Correctly enter the title, value and type, a wrong retry will be reported to the FBI.",
    });
  } else {
    let index = clientsGrowBank.findIndex((user) => user.id == usId);
    let newTransaction: Transaction = new Transaction(transactionId, title, value, type);
    clientsGrowBank[index].transactions.push(newTransaction);
    transactionId++;
    res.status(200).send({
      message: "success",
      newTransaction,
      transaction: clientsGrowBank[index].transactions,
      user: clientsGrowBank[index],
    });
  }
};

let readCLientTransactions = (req: Request, res: Response) => {
  let usId = Number(req.params.userId);
  let index = clientsGrowBank.findIndex((user) => user.id === usId);

  if (index < 0) {
    res.status(404).send({ message: "Not found !" });
  } else {
    let motion = clientsGrowBank[index].transactions.find((transaction) => transaction);
    if (motion == null) {
      res.status(404).send({ message: "Not found or there are no transactions!" });
    } else {
      let iValue = clientsGrowBank[index].transactions.map((item) =>
        item.type == "income" ? item.value : 0
      );
      let oValue = clientsGrowBank[index].transactions.map((item) =>
        item.type == "outcome" ? item.value : 0
      );
      let i = iValue.reduce((x, y) => x + y);
      let o = oValue.reduce((x, y) => x + y);
      let t = i - o;

      res.status(200).send({
        nameClient: clientsGrowBank[index].name,
        transactions: clientsGrowBank[index].transactions,
        balance: { income: i, outcome: o, total: t },
      });
    }
  }
};

let customerSpecificTransaction = (req: Request, res: Response) => {
  let usId = Number(req.params.userId);
  let index = clientsGrowBank.findIndex((user) => user.id == usId);
  let transId = Number(req.params.id);

  if (index < 0) {
    res.status(404).send({ message: "Not found!" });
  } else {
    let indexTrans = clientsGrowBank[index].transactions.findIndex(
      (transaction) => transaction.id == transId
    );
    if (indexTrans < 0) {
      res.status(404).send({
        message: `Client ${clientsGrowBank[index].name} this transaction does not exist!`,
      });
    } else {
      res.status(200).send({
        cliente: clientsGrowBank[index].name,
        transaction: clientsGrowBank[index].transactions[indexTrans],
      });
    }
  }
};
let editSpecificTransaction = (req: Request, res: Response) => {
  let usId = Number(req.params.userId);
  let index = clientsGrowBank.findIndex((user) => user.id == usId);
  let transId = Number(req.params.id);

  let { title, value, type } = req.body;

  if (!title || !value || !type) {
    res.status(418).send({
      message:
        "Correctly enter the title, value and type, a wrong retry will be reported to the FBI.",
    });
  } else if (index < 0) {
    res.status(404).send({ message: "Not found!" });
  } else {
    let indexTrans = clientsGrowBank[index].transactions.findIndex(
      (transaction) => transaction.id == transId
    );
    if (indexTrans < 0) {
      res.status(404).send({
        message: `Client ${clientsGrowBank[index].name} this transaction does not exist!`,
      });
    } else {
      clientsGrowBank[index].transactions[indexTrans].title = title;
      clientsGrowBank[index].transactions[indexTrans].value = value;
      clientsGrowBank[index].transactions[indexTrans].type = type;

      res.send({
        client: clientsGrowBank[index].name,
        transaction: clientsGrowBank[index].transactions[indexTrans],
        message: "User successfully modified!",
      });
    }
  }
};
let removeTransactions = (req: Request, res: Response) => {
  let usId = Number(req.params.userId);
  let index = clientsGrowBank.findIndex((user) => user.id == usId);
  let transId = Number(req.params.id);

  if (index < 0) {
    res.status(404).send({ message: "Not found!" });
  } else {
    let indexTrans = clientsGrowBank[index].transactions.findIndex(
      (transaction) => transaction.id == transId
    );
    if (indexTrans < 0) {
      res.status(404).send({
        message: `Client ${clientsGrowBank[index].name} this transaction does not exist!`,
      });
    } else {
      clientsGrowBank[index].transactions.splice(indexTrans, 1);
      res.send({
        message: `${clientsGrowBank[index].name} your transaction was deleted successfully`,
      });
    }
  }
};
//fim
export {
  readEmployees,
  addClients,
  editClient,
  addTransaction,
  readClientList,
  thisClient,
  removeClient,
  readCLientTransactions,
  customerSpecificTransaction,
  editSpecificTransaction,
  removeTransactions,
};
