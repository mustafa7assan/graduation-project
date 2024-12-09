const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");
const Answer = require("../models/answer.model");
const Article = require("../models/article.model");
const Question = require("../models/question.model");

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(401);
    throw new Error("البريد او كلمة المرور غير صحيح");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExits = await User.findOne({ email });
  if (userExits) {
    res.status(400);
    throw new Error("هذا البريد مسجل مسبقا!");
  }

  const user = await User.create({ name, email, password, role });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout user" });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  try {
    let userData;
    if (user.role === "expert") {
      const answerCount = await Answer.countDocuments({ user: user._id });
      const articleCount = await Article.countDocuments({
        author: user._id,
      });
      const upvotesResult = await Answer.aggregate([
        { $match: { user: user._id } },
        { $group: { _id: null, totalUpvotes: { $sum: "$upvotes" } } },
      ]);

      const totalUpvotes =
        upvotesResult.length > 0 ? upvotesResult[0].totalUpvotes : 0;
      userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        answersCount: answerCount,
        articlesCount: articleCount,
        totalUpvotes,
      };
    } else {
      const questionCount = await Question.countDocuments({
        asker: user._id,
      });
      userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        questionCounts: questionCount,
      };
    }

    res.status(200).json({ userData });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to fetch user profile", error: err.message });
  }
});
const userController = { authUser, registerUser, logoutUser, getUserProfile };

module.exports = userController;
