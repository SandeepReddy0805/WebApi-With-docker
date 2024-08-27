import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    category: String,
    publish_year: String,
    title_id: String,
    author_id: String,
    cover_url: String,
    book_stats: String,
    descriptions: String,
    reading_stats: String,
});

const Book = mongoose.model('Book', bookSchema);
export default Book;