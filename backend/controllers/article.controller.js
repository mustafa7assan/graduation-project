const Article = require("../models/article.model");

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find({});
    res.status(200).json(articles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
const createArticle = async (req, res) => {
  const { title, type, text, image, date } = req.body;
  try {
    await Article.create({
      title,
      type,
      text,
      image,
      date,
      author: req.user.id,
    });
    res.status(200).json({ message: "Article created successfuly." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findById(id).populate("author", "name");
    if (!article) {
      return res.status(404).json({ message: "Article is not found" });
    }
    res.status(200).json(article);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const updateArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findByIdAndUpdate(id, req.body);
    if (!article) {
      return res.status(404).json({ message: "Article is not found" });
    }
    const updateِdArtile = await Article.findById(id);
    res.status(200).json(updateِdArtile);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findByIdAndDelete(id);
    if (!article) {
      return res.status(404).json({ message: "Article is not found" });
    }
    res.status(200).json({ message: "Article is deleted sucessfuly" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
const articleController = {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
};

module.exports = articleController;
