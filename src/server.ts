import express, {Request, Response} from "express";
import serverStatic from "serve-static";
export default class Server {
    constructor(private port: number) {}

    public start():void{
         const app = express();
         //app.use(serverStatic("public/"));
         app.get('/', (req:Request, res:Response) => {
             res.send("Hello test express Type Script");
         });
         app.listen(this.port, () => {
             console.log("Server started");
         });
    }

    public findAll() {
        const app = express();
        app.get('/books', (req:Request, res:Response) => {
            res.send("Books");
        });
    }
}