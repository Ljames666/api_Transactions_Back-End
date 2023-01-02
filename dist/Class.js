"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeGrowBank = exports.ClientGrowBank = exports.Transaction = void 0;
class Transaction {
    constructor(id, title, value, type) {
        this.id = id;
        this.title = title;
        this.value = value;
        this.type = type;
    }
}
exports.Transaction = Transaction;
class ClientGrowBank {
    constructor(id, name, cpf, email, age, transactions) {
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        this.age = age;
        this.transactions = transactions;
    }
}
exports.ClientGrowBank = ClientGrowBank;
class EmployeeGrowBank {
    constructor(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
}
exports.EmployeeGrowBank = EmployeeGrowBank;
