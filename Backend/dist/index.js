"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config({ path: "./src/config/.env" });
const customer_1 = require("./src/routes/customer");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(customer_1.router);
app.get('/', (req, res) => {
    res.json({ success: true, messsage: "Welcome to backend !" });
});
app.listen(8080, () => {
    console.log('port 8080 is listening');
});
module.exports = app;
