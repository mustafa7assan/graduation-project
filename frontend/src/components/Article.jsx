import { CalendarIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Article = ({ article }) => {
  return (
    <Link to={`/articles/${article._id}`}>
      <div className="bg-white rounded p-6 shadow-md cursor-pointer">
        <div>
          <img className="mb-3 rounded-md" src={article.image} alt="" />
        </div>
        <div className="font-bold">{article.title}</div>
        <div className="border border-gray-300 mt-5 mb-2"></div>
        <div className="flex justify-between">
          <div className="flex gap-1">
            <CalendarIcon className="size-6 text-fuchsia-800" />

            {new Date(article.date).toLocaleDateString("ar-EG", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div>{article.type}</div>
        </div>
      </div>
    </Link>
  );
};

export default Article;
