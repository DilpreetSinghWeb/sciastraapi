import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import blogRoutes from "./routes/blogRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes);

app.listen(7000, () => {
  console.log("Server running on port 7000");
});
