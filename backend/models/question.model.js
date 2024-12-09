const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AnswerSchema = require("./answer.model");
const QuestionSchema = new Schema(
  {
    type: { type: String, required: true },
    text: { type: String, required: true },
    asker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: Date, default: Date.now },
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }],
  },

  { timestamps: true }
);

const Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;
