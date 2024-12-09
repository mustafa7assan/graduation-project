import { useLocation } from "react-router-dom";
import Question from "../components/Question";
import Article from "../components/Article";
import GoBack from "../components/GoBack";

const SearchResultPage = () => {
  const location = useLocation();
  const { filteredQuestions, filterArticles, qurey } = location.state || {};

  return (
    <>
      <GoBack text={"الرجوع الى الصفحة الرئيسية"} to={"/"} />
      <section className="bg-gray-100 py-10 px-4 font-arabic flex flex-grow flex-col">
        <h1 className="text-fuchsia-900 font-bold text-2xl">
          نتائج البحث عن {qurey}{" "}
        </h1>
        <div className="mt-3">
          <h1 className="text-2xl font-bold">الاسئلة</h1>
          <div className="grid grid-cols-1 gap-8 mt-4 mx-auto">
            {filteredQuestions.map((question) => {
              return <Question question={question} key={question._id} />;
            })}
          </div>
        </div>
        <div className="mt-3">
          <h1 className="text-2xl font-bold">المقالات</h1>
          <div className="grid grid-cols-3 gap-8 mt-4 mx-auto">
            {filterArticles.map((article) => {
              return <Article key={article._id} article={article} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default SearchResultPage;
