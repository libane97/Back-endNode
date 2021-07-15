"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const book_model_1 = __importDefault(require("./model/book.model"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(serveStatic("public"));
/* Actvier CORS*/
app.use(body_parser_1.default.json());
app.use(cors_1.default());
const uri = "mongodb://localhost:27017/biblio";
mongoose_1.default.connect(uri, (error) => {
    if (error)
        console.log(error);
    else
        console.log("connect database mongodb success");
});
app.get('/books', (req, resp) => {
    book_model_1.default.find((err, books) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(books);
        console.log('====================================');
        console.log(books);
        console.log('====================================');
    });
});
app.get('/book/:id', (req, resp) => {
    book_model_1.default.findById(req.params.id, (err, book) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(book);
        console.log('====================================');
        console.log(book);
        console.log('====================================');
    });
});
app.post('/add/book', (req, resp) => {
    let book = new book_model_1.default(req.body);
    book.save(err => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(book);
    });
});
app.put('/update/book/:id', (req, resp) => {
    book_model_1.default.findByIdAndUpdate(req.params.id, req.body, (err, book) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send("Success update of object");
    });
});
app.delete('/delete/book/:id', (req, resp) => {
    book_model_1.default.findByIdAndDelete(req.params.id, (err, book) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send("Success delete of object");
    });
});
// get http://localhost:8085/pbooks?page=1&size=5
app.get('/pbooks', (req, resp) => {
    let p = parseInt(req.query.page || 1);
    let size = parseInt(req.query.size || 5);
    book_model_1.default.paginate({}, { page: p, limit: size }, (err, books) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(books);
        console.log('====================================');
        console.log(books);
        console.log('====================================');
    });
});
// get http://localhost:8085/pbooks-search?page=1&size=5
app.get('/pbooks-search', (req, resp) => {
    let p = parseInt(req.query.page || 1);
    let size = parseInt(req.query.size || 5);
    let q = req.query.q || "";
    book_model_1.default.paginate({ title: { $regex: ".*(?i)" + q + ".*" } }, { page: p, limit: size }, (err, books) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(books);
        console.log('====================================');
        console.log(books);
        console.log('====================================');
    });
});
// const server = new Server(7700);
// server.findAll();
// server.start();
app.get('/', (req, res) => {
    res.send("Hello test express Type Script");
});
app.listen("7700", () => {
    console.log("Server started");
});
