import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import cors from "cors";
import errorMiddleware from "./middlewares/error.js";
dotenv.config();
console.log("DB URL:", process.env.DATABASE_URL);
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user", userRoutes);
app.use(errorMiddleware);
app.listen(process.env.PORT, () => {
    console.log(`User service is running on http://localhost:${process.env.PORT}`);
});
