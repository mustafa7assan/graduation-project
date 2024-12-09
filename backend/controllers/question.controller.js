const Question = require("../models/question.model");
const Answer = require("../models/answer.model");

const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find({}).populate("asker", "name");
    res.status(200).json(questions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Question.findById(id)
      .populate("asker", "name")
      .populate({
        path: "answers",
        populate: {
          path: "user",
          select: "name id",
        },
      });
    res.status(200).json(question);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const createQuestion = async (req, res) => {
  const { text, type } = req.body;
  try {
    const question = await Question.create({ text, type, asker: req.user.id });
    res.status(200).json({ message: "questions created suceesfuly" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const updateQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Question.findByIdAndUpdate(
      id,
      { $set: { text: req.body.text } },
      { new: true }
    );
    if (!question) {
      return res.status(404).json({ message: "Questions not found" });
    }
    const updateQuestion = await Question.findById(id);
    res.status(200).json(updateQuestion);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Question.findByIdAndDelete(id);
    if (!question) {
      return res.status(404).json({ message: "Question is not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const addAnswerToQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const userId = req.user.id;
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    const answer = new Answer({
      text,
      question: id,
      user: userId,
    });

    // Save the answer
    await answer.save();

    // Add the answer reference to the question's answers array
    question.answers.push(answer._id);
    await question.save();

    res.status(201).json({
      message: "Answer added successfully",
      answer,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const questionsController = {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestion,
  addAnswerToQuestion,
};

module.exports = questionsController;
