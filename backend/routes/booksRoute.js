import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route to save a new Book
router.post('/', async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;

        if (!title || !author || !publishYear) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }

        const newBook = {
            title,
            author,
            publishYear,
        };

        const book = await Book.create(newBook);

        return res.status(201).send(book);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Something went wrong',
        });
    }
});

// Route for Get All Books from database
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Something went wrong',
        });
    }
});

// Route for Get All Books from database
router.get('/:id', async (req, res) => {
    try {

        const { id } = req.params;

        const book = await Book.findById(id);

        return res.status(200).json(book);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Something went wrong',
        });
    }
});

// route for Update a Book
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, publishYear } = req.body;

        if (!title ||!author ||!publishYear) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }

        const updatedBook = {
            title,
            author,
            publishYear,
        };

        const book = await Book.findByIdAndUpdate(id, updatedBook, {
            new: true,
        });

        return res.status(200).json(book);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Something went wrong',
        });
    }
});

// Route for Delete a Book
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findByIdAndDelete(id);

        if (!book) {
            return res.status(404).send({
                message: 'Book not found',
            });
        }

        return res.status(200).send({
            message: 'Book deleted successfully',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Something went wrong',
        });
    }
});

export default router;