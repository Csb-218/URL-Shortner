require("dotenv").config()
const mongoose = require('mongoose');
const uri = process.env.DB_URI as string;
const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
};

let mongoInstance;

export async function connectMongoDb() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    mongoInstance = await mongoose.connect(uri, clientOptions);
    mongoInstance.connection.db.admin().command({ ping: 1 });

    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  }catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } 
}
