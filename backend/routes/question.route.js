const exporess = require("express");
const questionRouter = exporess.Router();
const questionsController = require("../controllers/question.controller");
const { protect } = require("../middleware/auth.middleware");

questionRouter.get("/", questionsController.getQuestions);
questionRouter.post("/", protect, questionsController.createQuestion);
questionRouter.post("/:id", protect, questionsController.addAnswerToQuestion);
questionRouter.get("/:id", questionsController.getQuestion);
questionRouter.put("/:id", protect, questionsController.updateQuestion);
questionRouter.delete("/:id", protect, questionsController.deleteQuestion);

module.exports = questionRouter;
