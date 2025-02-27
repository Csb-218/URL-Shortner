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

app.use("/", indexRouter);
app.use("/api", URLRouter);

const PORT = process.env.PORT || 3000;

const uri = process.env.DB_URI as string;
const clientOptions = { serverApi: { version: '1' as const, strict: true, deprecationErrors: true } };
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    if (mongoose.connection.db) {
      await mongoose.connection.db.admin().command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");

      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });

    } else {
      throw new Error("Database connection is undefined");
    }
    
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}

run().catch(console.dir);
