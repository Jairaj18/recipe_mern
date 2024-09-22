import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './routes/user.routes.js';
import recipeRouter from './routes/recipie.routes.js'

const app = express();
const port = 3000;

app.use(express.json());


app.use('/api', userRouter);
app.use('/api', recipeRouter);

mongoose.connect(
    process.env.MONGODB_URI,
  {
    dbName: "MERN_Recipe_yt",
  }
)
.then(() => console.log("MongoDB is connected..!"))
.catch((err) => console.log(err.message));


app.listen(port, () => console.log(`Server is running on port ${port}`));
