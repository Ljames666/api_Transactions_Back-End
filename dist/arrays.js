"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeesGrowBank = exports.clientsGrowBank = void 0;
const Class_1 = require("./Class");
const clientsGrowBank = [];
exports.clientsGrowBank = clientsGrowBank;
const employeesGrowBank = [
    {
        id: 1,
        username: "admin",
        password: "admin",
    },
    {
        id: 2,
        username: "Paulo",
        password: "1234",
    },
];
exports.employeesGrowBank = employeesGrowBank;
let eId = 3;
let addEmployees = (username, password) => {
    const employee = new Class_1.EmployeeGrowBank(eId, username, password);
    eId++;
    employeesGrowBank.push(employee);
};
addEmployees("Jamerson", "Jam123");
