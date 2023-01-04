import express from 'express';
import mongoose from 'mongoose';
import AuthRouter from './routes/AuthRouter.js'
import ApiRouter from './routes/ApiRouter.js';
import MailRouter from './routes/MailRouter.js';
import cors from 'cors';

const PORT = process.env.PORT || 80;
const jsonParser = express.json()
const app = express();

app.use(jsonParser);
app.use(cors({
  origin: process.env.ORIGIN
}));
app.use('/auth', AuthRouter);
app.use('/api', ApiRouter);
app.use('/mail', MailRouter);


async function startApp() {
    try {
        await mongoose.connect(process.env.DB_URL);
        app.listen(PORT, () => {
            console.log('Server started on port: ', PORT);
        });
    } catch (error) {
        console.log(error.message);
    }
}

startApp();