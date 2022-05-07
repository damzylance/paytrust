const express = require("express");

const { register, login } = require("../controllers/authentication");
const userAccess = require("../middleware/authentication");
const { home } = require("../controllers/home");
const { createInvoice, viewInvoices } = require("../controllers/invoice");

const authRoute = express.Router();

authRoute.post("/register", register);
authRoute.post("/login", login);
authRoute.get("/dashboard", userAccess, home);
authRoute.get("/dashboard/invoice", userAccess, viewInvoices);
authRoute.post("/dashboard/invoice/create", userAccess, createInvoice);

module.exports = authRoute;
