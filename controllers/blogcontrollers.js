import Blog from "../models/Blog";

export const createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageUrl = req.file.path;

    const newBlog = new Blog({ title, description, imageUrl });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
