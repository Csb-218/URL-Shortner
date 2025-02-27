import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { URLRouter } from "./src/routes/urls"
import indexRouter from "./src/routes"

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", indexRouter);
app.use("/api", URLRouter);

const PORT = process.env.PORT || 3000;


// mongo connection
import { connectMongoDb} from './src/lib/dbConnect';
connectMongoDb();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


