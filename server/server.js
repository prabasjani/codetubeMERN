import express, { json } from "express";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import UserRoutes from "./routes/UserRoutes.js";

const app = express();
configDotenv();
app.use(express.json());
const PORT = process.env.PORT;
mongoose.connect(process.env.MONGO_URI);

app.use("/", UserRoutes);

app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));
