import express from "express";
import { getAllBlogs, getSingleBlog, createBlog, updateBlog, deleteBlog } from "../controllers/blogController.js";

const router = express.Router();
router.get("/", getAllBlogs);
router.get("/single-blog", getSingleBlog);
router.post("/create-blog", createBlog);
router.put("/edit-blog", updateBlog);
router.delete("/delete-blog", deleteBlog);

export default router;
