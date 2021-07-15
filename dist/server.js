"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class Server {
    constructor(port) {
        this.port = port;
    }
    start() {
        const app = express_1.default();
        //app.use(serverStatic("public/"));
        app.get('/', (req, res) => {
            res.send("Hello test express Type Script");
        });
        app.listen(this.port, () => {
            console.log("Server started");
        });
    }
    findAll() {
        const app = express_1.default();
        app.get('/books', (req, res) => {
            res.send("Books");
        });
    }
}
exports.default = Server;
