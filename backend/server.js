//Loading Environmental Variables
import dotenv from "dotenv";
dotenv.config();

//importing packages
import express from "express";
import cors from "cors";

//importing databases and routes
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import credentialRoutes from "./routes/credential.routes.js"
import { errorHandler } from "./middleware/error.middleware.js";

//creating express app
const app = express();

//database connection
connectDB();

//middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
//parsing json requests and url encoded form data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/credentials", credentialRoutes);
app.use(errorHandler);

app.get("/", (req,res)=>{
  res.json({
    success: true,
    message: "Passroom Backend running",
  });
});

//starting the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
});