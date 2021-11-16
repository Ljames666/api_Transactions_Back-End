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
import checkRequests from "./middlewares";
let router = Router();
router.use(checkRequests);
router.get("/", (req: Request, res: Response) => {
  readEmployees(req, res);
});
// inicio a operação de clientes
router.post("/clients", (req: Request, res: Response) => {
  addClients(req, res);
});

router.get("/clients", (req: Request, res: Response) => {
  readClientList(res);
});

router.get("/clients/:id", (req: Request, res: Response) => {
  thisClient(req, res);
});

router.put("/clients/:id", (req: Request, res: Response) => {
  editClient(req, res);
});

router.delete("/clients/:id", (req: Request, res: Response) => {
  removeClient(req, res);
});
// fim

// inicio das transações

router.post("/clients/:userId/transactions", (req: Request, res: Response) => {
  addTransaction(req, res);
});

router.get("/clients/:userId/transactions", (req: Request, res: Response) => {
  readCLientTransactions(req, res);
});

router.get("/clients/:userId/transactions/:id", (req: Request, res: Response) => {
  customerSpecificTransaction(req, res);
});

router.put("/clients/:userId/transactions/:id", (req: Request, res: Response) => {
  editSpecificTransaction(req, res);
});

router.delete("/clients/:userId/transactions/:id", (req: Request, res: Response) => {
  removeTransactions(req, res);
});
//fim
export { router };
