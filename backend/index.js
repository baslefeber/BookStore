import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

//Middleware for CORS POLICY
app.use(cors({
    origin: 'https://localhost:5555',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['content-type'],
}));

app.get('/', (req, res) => {
    console.log(req);
    return res.status(200).send('YOOOOOOOO');
});

app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error);
    });
