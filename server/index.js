import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";
import cors from "cors";

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

const port = process.env.PORT;

app.get("/", (request, response) => {
    response.send("Server is working");
});

app.use("/uploads", express.static("uploads"));

import userRoutes from "./routes/user.js";
import courseRoutes from "./routes/course.js";
import adminRoutes from "./routes/admin.js";

app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", adminRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    connectDb();
});