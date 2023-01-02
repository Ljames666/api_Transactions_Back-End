"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let checkRequests = (req, res, next) => {
    console.log(req.ip);
    console.log(req.method);
    console.log(req.url);
    console.log(req.path);
    console.log(req.secure);
    next();
};
exports.default = checkRequests;
