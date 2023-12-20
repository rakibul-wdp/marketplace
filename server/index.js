import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import router from "./Routes/routes";

dotenv.config();

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

const port = process.env.PORT;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => console.log(err));

app.listen({ port }, () => {
  console.log(`connected to port ${port}`);
});
