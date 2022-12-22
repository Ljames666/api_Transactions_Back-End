"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const functions_1 = require("./functions");
const middlewares_1 = __importDefault(require("./middlewares"));
let router = (0, express_1.Router)();
exports.router = router;
router.use(middlewares_1.default);
router.get("/", (req, res) => {
    (0, functions_1.readEmployees)(res);
});
// inicio a operação de clientes
router.post("/clients", (req, res) => {
    (0, functions_1.addClients)(req, res);
});
router.get("/clients", (req, res) => {
    (0, functions_1.readClientList)(res);
});
router.get("/clients/:id", (req, res) => {
    (0, functions_1.thisClient)(req, res);
});
router.put("/clients/:id", (req, res) => {
    (0, functions_1.editClient)(req, res);
});
router.delete("/clients/:id", (req, res) => {
    (0, functions_1.removeClient)(req, res);
});
// fim
// inicio das transações
router.post("/clients/:userId/transactions", (req, res) => {
    (0, functions_1.addTransaction)(req, res);
});
router.get("/clients/:userId/transactions", (req, res) => {
    (0, functions_1.readCLientTransactions)(req, res);
});
router.get("/clients/:userId/transactions/:id", (req, res) => {
    (0, functions_1.customerSpecificTransaction)(req, res);
});
router.put("/clients/:userId/transactions/:id", (req, res) => {
    (0, functions_1.editSpecificTransaction)(req, res);
});
router.delete("/clients/:userId/transactions/:id", (req, res) => {
    (0, functions_1.removeTransactions)(req, res);
});
