import express from "express";
import Book from "../schemas/book.js";

const bookRouter = new express.Router();

// Get
bookRouter.get("/", async (req,res)=>{
    var page = 1;
    var limit = 20;
    var sort = "title";
    if(req.query.page) page = req.query.page;
    if(req.query.limit) limit = req.query.limit;
    if(req.query.sort) sort = req.query.sort;
    if(limit >= 100) limit = 100;
    var sortingOrder = 1;

    if(sort && sort.charAt(0) === '-'){
        sortingOrder = -1;
        sort = sort.slice(1,sort.length);
    }
    var sortArg = {};
    sortArg[sort] = sortingOrder;
    const data = await Book.find().limit(limit).skip(page).sort(sortArg);
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
    const data = await Book.find(query);
    res.send(data);
});

// Update Book using PUT
bookRouter.put("/:id",async (req,res)=>{
    const id = req.params.id;
    await Book.findByIdAndDelete(id);
    const newRecord = new Book(req.body);
    await newRecord.save();
    res.send(newRecord.toJSON());
});

// Update Book using PATCH
bookRouter.patch("/:id",async (req,res)=>{
    const id = req.params.id;
    const updateRes = await Book.findByIdAndUpdate(id,req.body);
    res.send(updateRes);
});

// Delete Book by id using DELETE
bookRouter.delete("/:id",async (req,res)=>{
    const id = req.params.id;
    const updateRes = await Book.findByIdAndDelete(id);
    res.send(updateRes);
});



export default bookRouter;