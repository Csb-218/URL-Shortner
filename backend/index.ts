import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import {URLRouter} from "./src/routes/urls"
import indexRouter from "./src/routes"

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

console.log(process.env.DB_URI)

mongoose.connect(process.env.DB_URI as string)

app.use("/", indexRouter);
app.use("/api", URLRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});