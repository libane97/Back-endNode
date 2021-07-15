import Server from "./server";
import mongoose from "mongoose";
import express, { Request, Response } from "express";
import Book from  "./model/book.model";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
//app.use(serveStatic("public"));
/* Actvier CORS*/
app.use(bodyParser.json());
app.use(cors());

const uri = "mongodb://localhost:27017/biblio";

mongoose.connect(uri, (error) => {
    if (error) console.log(error);
    else console.log("connect database mongodb success");
    
});

app.get('/books', (req: Request, resp: Response) => {
    Book.find((err, books) => {
        if (err) resp.status(500).send(err)
        else resp.send(books)
        console.log('====================================');
        console.log(books);
        console.log('====================================');
     });
    
});

app.get('/book/:id', (req: Request, resp: Response) => {
    Book.findById(req.params.id,(err, book) => {
        if (err) resp.status(500).send(err)
        else resp.send(book)
        console.log('====================================');
        console.log(book);
        console.log('====================================');
     });
    
});

app.post('/add/book', (req: Request, resp: Response) => {
    let book = new Book(req.body);
    book.save(err => {
        if (err) resp.status(500).send(err);
        else resp.send(book);
    })
});

app.put('/update/book/:id', (req: Request, resp: Response) => {
    Book.findByIdAndUpdate(req.params.id, req.body, (err, book) => {
        if (err) resp.status(500).send(err);
        else resp.send("Success update of object");
    })
});

app.delete('/delete/book/:id', (req: Request, resp: Response) => {
    Book.findByIdAndDelete(req.params.id, (err, book) => {
        if (err) resp.status(500).send(err);
        else resp.send("Success delete of object");
    })
});


// get http://localhost:8085/pbooks?page=1&size=5
app.get('/pbooks', (req: Request, resp: Response) => {
    let p: number = parseInt(req.query.page || 1);
    let size: number = parseInt(req.query.size || 5);
    Book.paginate({},{page:p, limit:size}, (err, books) => {
        if (err) resp.status(500).send(err)
        else resp.send(books)
        console.log('====================================');
        console.log(books);
        console.log('====================================');
     });
    
});

// get http://localhost:8085/pbooks-search?page=1&size=5
app.get('/pbooks-search', (req: Request, resp: Response) => {
    let p: number = parseInt(req.query.page || 1);
    let size: number = parseInt(req.query.size || 5);
    let q: string = req.query.q || "";

    Book.paginate({title:{$regex:".*(?i)"+q+".*"}},{page:p, limit:size}, (err, books) => {
        if (err) resp.status(500).send(err)
        else resp.send(books)
        console.log('====================================');
        console.log(books);
        console.log('====================================');
     });
    
});
// const server = new Server(7700);
// server.findAll();
// server.start();
app.get('/', (req:Request, res:Response) => {
    res.send("Hello test express Type Script");
});

app.listen("7700", () => {
    console.log("Server started");
});



