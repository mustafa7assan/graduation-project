const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  image: { type: String, required: true },
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
