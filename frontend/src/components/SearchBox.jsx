import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [qurey, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const submitForm = (e) => {
    e.preventDefault();
    const filteredQuestions = questions.filter((question) =>
      question.text.includes(qurey)
    );
    const filterArticles = articles.filter(
      (article) => article.title.includes(qurey) || article.text.includes(qurey)
    );
    return navigate("/search-result", {
      state: { filteredQuestions, filterArticles, qurey },
    });
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/articles");
        const data = await res.json();
        setArticles(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchArticles();
  }, []);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/questions");
        const data = await res.json();
        setQuestions(data);
      } catch (err) {
        console.log("Error fetching data", err);
      }
    };

    fetchQuestions();
  }, []);
  return (
    <section className="pb-20 pt-36 max-w-full flex justify-center ">
      <form
        action=""
        className="mx-auto w-1/2  flex justify-center"
        onSubmit={submitForm}
      >
        <input
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="ابحث في مريد"
          className="font-arabic   py-2 px-4 border border-gray-700 rounded-3xl outline-fuchsia-900  w-2/3"
        />
      </form>
    </section>
  );
};

export default SearchBox;
