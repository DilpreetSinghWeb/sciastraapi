import db from "../config/db.js";

export const getAllBlogs = (req, res) => {
  const q = "SELECT * FROM blogs";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};

export const getSingleBlog = (req, res) => {
  const id = req.query.id;
  const q = "SELECT * FROM blogs WHERE id = ?";
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data[0]);
  });
};

export const createBlog = (req, res) => {
  const q = "INSERT INTO blogs (`title`,`desc`,`image`,`publish_at`) VALUES (?)";
  const values = [req.body.title, req.body.desc, req.body.image, req.body.publish_at];
  db.query(q, [values], (err) => {
    if (err) return res.status(500).json(err);
    res.json("Blog has been created");
  });
};

export const updateBlog = (req, res) => {
  const id = req.query.id;
  const { title, description, image } = req.body;
  const q = "UPDATE blogs SET title = ?, `desc` = ?, image = ? WHERE id = ?";
  db.query(q, [title, description, image, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Blog post updated successfully" });
  });
};

export const deleteBlog = (req, res) => {
  const id = req.query.id;
  const q = "DELETE FROM blogs WHERE id = ?";
  db.query(q, [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Error deleting blog post", error: err });
    res.json(result.affectedRows > 0 ? { message: "Blog post deleted successfully" } : { message: "Blog post not found" });
  });
};
