import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import QuestionsPage from "./pages/QuestionsPage";
import ArticlesPage from "./pages/ArticlesPage";
import NotFoundPage from "./pages/NotFoundPage";
import QuestionPage from "./pages/QuestionPage";
import AddQuestionPage from "./pages/AddQuestionPage";
import ArticlePage from "./pages/ArticlePage";
import AddArticlePage from "./pages/AddArticlePage";
import EditQuestionPage from "./pages/EditQuestionPage";
import EditArticlePage from "./pages/EditArticlePage";
import SearchResultPage from "./pages/SearchResultPage";
import ProfilePage from "./pages/ProfilePage";
import MainLayout from "./layouts/Main.layout";

const App = () => {
  // Add Questions
  const addQuestion = async (newQuestion) => {
    const res = await fetch(`/api/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    });
    return;
  };
  // Delete Question
  const deleteQuestion = async (id) => {
    const res = await fetch(`/api/questions/${id}`, {
      method: "DELETE",
    });
    return;
  };
  // UpdateQuestion
  const updateQuestion = async (question) => {
    const res = await fetch(`/api/questions/${question.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    });
    return;
  };
  //--------------------------------------------------------
  // Add Article
  const addArticle = async (newArticle) => {
    const res = await fetch(`/api/articles/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newArticle),
    });
    return;
  };

  // Delete Article
  const deleteArticle = async (id) => {
    const res = await fetch(`/api/articles/${id}`, {
      method: "DELETE",
    });
    return;
  };

  // UpdateArtilce
  const updateArtilce = async (article) => {
    const res = await fetch(`/api/articles/${article.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
    });
    return;
  };

  //---------------------------------
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route path="/" index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route
          path="/questions/:id"
          element={<QuestionPage deleteQuestion={deleteQuestion} />}
        />
        <Route
          path="/add-question"
          element={<AddQuestionPage addQuestionSubmit={addQuestion} />}
        />
        <Route
          path="/edit-question/:id"
          element={<EditQuestionPage updateQuestion={updateQuestion} />}
        />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route
          path="/articles/:id"
          element={<ArticlePage deleteArticle={deleteArticle} />}
        />
        <Route
          path="/add-article"
          element={<AddArticlePage addArticle={addArticle} />}
        />
        <Route
          path="/edit-article/:id"
          element={<EditArticlePage updateArtilce={updateArtilce} />}
        />
        <Route path="/search-result" element={<SearchResultPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return (
    <div className="min-h-screen flex flex-col">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default App;
