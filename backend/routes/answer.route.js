const express = require("express");
const answerRoute = express.Router();
const {
  upvoteAnswer,
  downvoteAnswer,
} = require("../controllers/answer.controller");

answerRoute.post("/:id/upvote", upvoteAnswer);
answerRoute.post("/:id/downvote", downvoteAnswer);

module.exports = answerRoute;
