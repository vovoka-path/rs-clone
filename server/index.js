import express from 'express';
import mongoose from 'mongoose';
import ApiRouter from './routes/ApiRouter.js';
import cors from 'cors';

const PORT = 5000;
const DB_URL = "mongodb+srv://pavel:pavel1303@cluster0.ss3deuf.mongodb.net/Photo-agancy?retryWrites=true&w=majority";
const jsonParser = express.json()
const app = express();

app.use(jsonParser);
app.use(cors());
app.use('/api', ApiRouter);


async function startApp() {
    try {
        await mongoose.connect(DB_URL);
        app.listen(PORT, () => {
            console.log('Server started on port: ', PORT);
        });
    } catch (error) {
        console.log(error.message);
    }
}

startApp();