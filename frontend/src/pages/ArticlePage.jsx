import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GoBack from "../components/GoBack";
import { useSelector } from "react-redux";
const ArticlePage = ({ deleteArticle }) => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const currentUserId = userInfo?.id;

  const onDeleteClick = (id) => {
    const confirm = window.confirm("هل تريد حذف المقالة؟");
    if (!confirm) return;
    deleteArticle(id);
    toast.success("تم حذف المقالة بنجاح");
    return navigate("/articles");
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/articles/${id}`);
        const data = await res.json();
        setArticle(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, []);

  return (
    <>
      <GoBack text={"الرجوع الى المقالات"} to={"/articles"} />
      <section className="flex flex-grow bg-gray-100 font-arabic">
        <div className="py-10 px-5 rounded-md bg-white m-10 w-[1000px]">
          {loading ? (
            <h1>Loading ...</h1>
          ) : (
            <div>
              <div className="font-bold text-xl text-fuchsia-900">
                {article.title}
              </div>
              <div className="mt-4 text-sm text-gray-600">
                تاريخ النشر{" "}
                <span>
                  {" "}
                  {new Date(article.date).toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <img className="my-5 rounded-md" src={article.image} />
              <div className="leading-10">{article.text}</div>
              <div className="mt-10 text-fuchsia-800 font-bold">
                {" "}
                المؤلف{" "}
                <Link
                  to={`/profile/${article.author._id}`}
                  className=" text-gray-600 font-normal "
                >
                  {article.author.name}
                </Link>
              </div>
              {currentUserId === article.author._id ? (
                <div className="mt-1 ">
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded-md text-sm"
                    onClick={() => {
                      onDeleteClick(article._id);
                    }}
                  >
                    حذف
                  </button>
                  <Link
                    to={`/edit-article/${article._id}`}
                    className="bg-orange-500 text-white py-1 px-2 rounded-md mr-1 text-sm"
                  >
                    تعديل
                  </Link>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ArticlePage;
