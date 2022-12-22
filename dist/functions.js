"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTransactions = exports.editSpecificTransaction = exports.customerSpecificTransaction = exports.readCLientTransactions = exports.removeClient = exports.thisClient = exports.readClientList = exports.addTransaction = exports.editClient = exports.addClients = exports.readEmployees = void 0;
const Class_1 = require("./Class");
const arrays_1 = require("./arrays");
let eId = 3;
let readEmployees = (res) => {
    if (arrays_1.employeesGrowBank) {
        res.status(200).send({ employeesGrowBank: arrays_1.employeesGrowBank });
    }
    else {
        res.status(404).send({ message: "Not Found" });
    }
};
exports.readEmployees = readEmployees;
let cliId = 1;
let addClients = (req, res) => {
    let { name, cpf, email, age } = req.body;
    if (!name || !cpf || !email || !age) {
        res.status(418).send({ message: "Inform name, cpf and email" });
    }
    else {
        let verifiedUser = arrays_1.clientsGrowBank.findIndex((item) => item.cpf == cpf || item.email == email);
        if (verifiedUser >= 0) {
            res.status(418).send({ message: "Existing user, create a new one!" });
        }
        else {
            let transArray = [];
            const client = new Class_1.ClientGrowBank(cliId, name, cpf, email, age, transArray);
            cliId++; // increment
            arrays_1.clientsGrowBank.push(client);
            return res.status(200).send({ client, clientsGrowBank: arrays_1.clientsGrowBank });
        }
    }
};
exports.addClients = addClients;
let readClientList = (res) => {
    const list = arrays_1.clientsGrowBank.map((user) => {
        return { id: user.id, name: user.name, cpf: user.cpf, email: user.email, age: user.age };
    });
    res.status(200).send({ list });
};
exports.readClientList = readClientList;
let thisClient = (req, res) => {
    let id = Number(req.params.id);
    let index = arrays_1.clientsGrowBank.findIndex((user) => user.id == id);
    if (index < 0) {
        res.status(404).send({ message: "Not found!" });
    }
    else {
        let clientList = arrays_1.clientsGrowBank.map((user) => {
            return { id: user.id, name: user.name, cpf: user.cpf, email: user.email, age: user.age };
        });
        return res.status(201).send({ client: clientList[index] });
    }
};
exports.thisClient = thisClient;
let editClient = (req, res) => {
    let { name, cpf, email, age } = req.body;
    let id = Number(req.params.id);
    if (!name || !cpf || !email || !age) {
        res.status(418).send({ message: "Inform name, cpf and email" });
    }
    else {
        let index = arrays_1.clientsGrowBank.findIndex((user) => user.id == id);
        if (index < 0) {
            res.status(404).send({ message: "Not found!" });
        }
        else {
            arrays_1.clientsGrowBank[index].name = name;
            arrays_1.clientsGrowBank[index].cpf = cpf;
            arrays_1.clientsGrowBank[index].email = email;
            arrays_1.clientsGrowBank[index].age = age;
            res.send({ client: arrays_1.clientsGrowBank[index], message: "User successfully modified!" });
        }
    }
};
exports.editClient = editClient;
let removeClient = (req, res) => {
    let id = Number(req.params.id);
    let index = arrays_1.clientsGrowBank.findIndex((user) => user.id == id);
    if (index < 0) {
        res.status(404).send({ message: "Not found!" });
    }
    else {
        arrays_1.clientsGrowBank.splice(index, 1);
        res.send({ message: "User  deleted successfully!" });
    }
};
exports.removeClient = removeClient;
// fim
//functions transactions
let transactionId = 1;
let addTransaction = (req, res) => {
    let usId = Number(req.params.userId);
    let { title, value, type } = req.body;
    if (!title || !value || !type) {
        res.status(418).send({
            message: "Correctly enter the title, value and type, a wrong retry will be reported to the FBI.",
        });
    }
    else {
        let index = arrays_1.clientsGrowBank.findIndex((user) => user.id == usId);
        let newTransaction = new Class_1.Transaction(transactionId, title, value, type);
        arrays_1.clientsGrowBank[index].transactions.push(newTransaction);
        transactionId++;
        res.status(200).send({
            message: "success",
            newTransaction,
            transaction: arrays_1.clientsGrowBank[index].transactions,
            user: arrays_1.clientsGrowBank[index],
        });
    }
};
exports.addTransaction = addTransaction;
let readCLientTransactions = (req, res) => {
    let usId = Number(req.params.userId);
    let index = arrays_1.clientsGrowBank.findIndex((user) => user.id === usId);
    if (index < 0) {
        res.status(404).send({ message: "Not found !" });
    }
    else {
        let motion = arrays_1.clientsGrowBank[index].transactions.find((transaction) => transaction);
        if (motion == null) {
            res.status(404).send({ message: "Not found or there are no transactions!" });
        }
        else {
            let iValue = arrays_1.clientsGrowBank[index].transactions.map((item) => item.type == "income" ? item.value : 0);
            let oValue = arrays_1.clientsGrowBank[index].transactions.map((item) => item.type == "outcome" ? item.value : 0);
            let i = iValue.reduce((x, y) => x + y);
            let o = oValue.reduce((x, y) => x + y);
            let t = i - o;
            res.status(200).send({
                nameClient: arrays_1.clientsGrowBank[index].name,
                transactions: arrays_1.clientsGrowBank[index].transactions,
                balance: { income: i, outcome: o, total: t },
            });
        }
    }
};
exports.readCLientTransactions = readCLientTransactions;
let customerSpecificTransaction = (req, res) => {
    let usId = Number(req.params.userId);
    let index = arrays_1.clientsGrowBank.findIndex((user) => user.id == usId);
    let transId = Number(req.params.id);
    if (index < 0) {
        res.status(404).send({ message: "Not found!" });
    }
    else {
        let indexTrans = arrays_1.clientsGrowBank[index].transactions.findIndex((transaction) => transaction.id == transId);
        if (indexTrans < 0) {
            res.status(404).send({
                message: `Client ${arrays_1.clientsGrowBank[index].name} this transaction does not exist!`,
            });
        }
        else {
            res.status(200).send({
                cliente: arrays_1.clientsGrowBank[index].name,
                transaction: arrays_1.clientsGrowBank[index].transactions[indexTrans],
            });
        }
    }
};
exports.customerSpecificTransaction = customerSpecificTransaction;
let editSpecificTransaction = (req, res) => {
    let usId = Number(req.params.userId);
    let index = arrays_1.clientsGrowBank.findIndex((user) => user.id == usId);
    let transId = Number(req.params.id);
    let { title, value, type } = req.body;
    if (!title || !value || !type) {
        res.status(418).send({
            message: "Correctly enter the title, value and type, a wrong retry will be reported to the FBI.",
        });
    }
    else if (index < 0) {
        res.status(404).send({ message: "Not found!" });
    }
    else {
        let indexTrans = arrays_1.clientsGrowBank[index].transactions.findIndex((transaction) => transaction.id == transId);
        if (indexTrans < 0) {
            res.status(404).send({
                message: `Client ${arrays_1.clientsGrowBank[index].name} this transaction does not exist!`,
            });
        }
        else {
            arrays_1.clientsGrowBank[index].transactions[indexTrans].title = title;
            arrays_1.clientsGrowBank[index].transactions[indexTrans].value = value;
            arrays_1.clientsGrowBank[index].transactions[indexTrans].type = type;
            res.send({
                client: arrays_1.clientsGrowBank[index].name,
                transaction: arrays_1.clientsGrowBank[index].transactions[indexTrans],
                message: "User successfully modified!",
            });
        }
    }
};
exports.editSpecificTransaction = editSpecificTransaction;
let removeTransactions = (req, res) => {
    let usId = Number(req.params.userId);
    let index = arrays_1.clientsGrowBank.findIndex((user) => user.id == usId);
    let transId = Number(req.params.id);
    if (index < 0) {
        res.status(404).send({ message: "Not found!" });
    }
    else {
        let indexTrans = arrays_1.clientsGrowBank[index].transactions.findIndex((transaction) => transaction.id == transId);
        if (indexTrans < 0) {
            res.status(404).send({
                message: `Client ${arrays_1.clientsGrowBank[index].name} this transaction does not exist!`,
            });
        }
        else {
            arrays_1.clientsGrowBank[index].transactions.splice(indexTrans, 1);
            res.send({
                message: `${arrays_1.clientsGrowBank[index].name} your transaction was deleted successfully`,
            });
        }
    }
};
exports.removeTransactions = removeTransactions;
