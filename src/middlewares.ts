import { Request, Response, NextFunction } from "express";

var letters = /[a-zA-Z]/g;
var simbols = /(?=.*[@!#$%^&*_()])/;
let checkRequests = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.ip);
  console.log(req.method);
  console.log(req.url);
  console.log(req.route);
  next();
};

let checkParams = (req: Request, res: Response, next: NextFunction) => {
  let params = req.params.id;
  if (params.match(simbols) || params.match(letters)) {
    res.status(404).send({ message: "Data entered incorrectly, recheck parameters!" });
  }
  next();
};
export { checkRequests, checkParams };
