const express = require("express");
const cors = require("cors");
const questionRouter = require("./routes/question.route");
const articleRouter = require("./routes/article.route");
const userRouter = require("./routes/user.route");
const answerRoute = require("./routes/answer.route");
const { notFound, errorHandler } = require("./middleware/error.middleware");
const { ConnectDB } = require("./config/db");
const cookieParse = require("cookie-parser");
const port = process.env.PORT || 8000;

// Database connections
ConnectDB();
// Middlewire
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(cookieParse());
app.use(express.urlencoded({ extended: true }));
app.use("/api/questions", questionRouter);
app.use("/api/articles", articleRouter);
app.use("/api/users", userRouter);
app.use("/api/answers", answerRoute);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port number ${port}`));
