const Answer = require("../models/answer.model");

const upvoteAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const answer = await Answer.findByIdAndUpdate(
      id,
      { $inc: { upvotes: 1 } },
      { new: true }
    );
    res.status(200).json(answer);
  } catch (error) {
    res.status(500).json({ message: "Error upvoting answer" });
  }
};

const downvoteAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const answer = await Answer.findByIdAndUpdate(
      id,
      { $inc: { downvotes: 1 } },
      { new: true }
    );
    res.status(200).json(answer);
  } catch (error) {
    res.status(500).json({ message: "Error downvoting answer" });
  }
};

module.exports = { upvoteAnswer, downvoteAnswer };
