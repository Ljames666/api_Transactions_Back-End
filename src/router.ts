import { Router, Request, Response } from "express";
import {
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
} from "./functions";

let router = Router();

router.get("/index", (req: Request, res: Response) => {
  readEmployees(req, res);
});
// inicio a operação de clientes
router.post("/users", (req: Request, res: Response) => {
  addClients(req, res);
});

router.get("/users", (req: Request, res: Response) => {
  readClientList(res);
});

router.get("/users/:id", (req: Request, res: Response) => {
  thisClient(req, res);
});

router.put("/users/:id", (req: Request, res: Response) => {
  editClient(req, res);
});

router.delete("/users/:id", (req: Request, res: Response) => {
  removeClient(req, res);
});
// fim

// inicio das transações

router.post("/users/:userId/transactions", (req: Request, res: Response) => {
  addTransaction(req, res);
});

router.get("/users/:userId/transactions", (req: Request, res: Response) => {
  readCLientTransactions(req, res);
});

router.get("/users/:userId/transactions/:id", (req: Request, res: Response) => {
  customerSpecificTransaction(req, res);
});

router.put("/users/:userId/transactions/:id", (req: Request, res: Response) => {
  editSpecificTransaction(req, res);
});

router.delete("/users/:userId/transactions/:id", (req: Request, res: Response) => {
  removeTransactions(req, res);
});
//fim
export { router };
