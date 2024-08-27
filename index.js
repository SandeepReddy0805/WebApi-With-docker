import express from "express";
import bookRouter from "./routes/bookRoutes.js";
import connectDb from "./database/database.js";
const app = express();

connectDb().catch(err => console.log(err));
app.use(express.json());
app.use('/api/books',bookRouter);
app.listen(3000,()=>console.log("Listening at localhost:3000"));