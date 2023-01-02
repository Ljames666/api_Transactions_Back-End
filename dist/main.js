"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = require("./router");
const app = (0, express_1.default)();
const port = process.env.PORT || 8081;
app.use(express_1.default.json(), (0, cors_1.default)(), router_1.router);
app.listen(port, () => console.log("Starter server..."));
