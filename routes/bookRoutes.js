import express from "express";
import Book from "../schemas/book.js";

const bookRouter = new express.Router();

// Get
bookRouter.get("/", async (req,res)=>{
    var {page,limit,sort,query}  = req.query;
    var sortingOrder = 1;

    if(sort.charAt(0) === '-'){
        sortingOrder = -1;
        sort = sort.slice(1,sort.length);
    }
    var sortArg = {};
    sortArg[sort] = sortingOrder;
    const data = await Book.find().limit(limit).skip(page).sort(sortArg);
    console.log(page , limit, sort,query)
    res.send(data);
});

// Get one book by id
bookRouter.get("/id/:id", async (req,res)=>{
    const id = req.params.id;
    const data = await Book.findById(id);
    res.send(data);
});

// Search for book by filter
bookRouter.get("/filter", async (req,res)=>{
    const query = req.query;
    console.log(query);
    const data = await Book.find(query);
    res.send(data);
});

// Create new Book Record
bookRouter.post("/", async (req,res)=>{
    const newBook = new Book(req.body);
    await newBook.save();
    res.send(newBook);
});

// Search for book by filter
bookRouter.get("/filter", async (req,res)=>{
    const query = req.query;
    console.log(query);
    const data = await Book.find(query);
    res.send(data);
});



export default bookRouter;