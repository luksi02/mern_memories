import express from "express";
import * as dotenv from 'dotenv'
import bodyparser from "body-parser";
import mongoose from 'mongoose';
import cors from "cors";
import bodyParser from "body-parser";

import connectDB from './mongodb/connect.js'
import postRoutes from './routes/posts.js'

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

app.get('/', async (req, res) => {
    res.send('Oh hi there!')
})

app.use('/posts', postRoutes)

// const PORT = process.env.PORT || 5000;

const MONGODB_URL=process.env.MONGODB_CLUSTER_URL

const startServer = async () => {
    try {

        // mongoose.connect(MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        // app.listen(8080, () => console.log("Server started on port http://localhost:8080"));
        // connectDB(MONGODB_URL);
        connectDB(process.env.MONGODB_CLUSTER_URL);
        app.listen(8080, () => console.log("Server started on port http://localhost:8080"));
    } catch (error) {
        console.log("SERVER NOT STARTED", error)
        console.log(MONGODB_URL)
    }
}

startServer();
