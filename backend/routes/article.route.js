const express = require("express");
const articleRouter = express.Router();
const articleController = require("../controllers/article.controller");
const { protect } = require("../middleware/auth.middleware");

articleRouter.get("/", articleController.getArticles);
articleRouter.post("/", protect, articleController.createArticle);
articleRouter.get("/:id", articleController.getArticle);
articleRouter.put("/:id", articleController.updateArticle);
articleRouter.delete("/:id", articleController.deleteArticle);

module.exports = articleRouter;
