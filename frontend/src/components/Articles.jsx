import { PlusIcon } from "@heroicons/react/24/solid";
import Article from "./Article";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";
import GoBack from "./GoBack";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredArtilces, setFilteredArticles] = useState([]);

  const { userInfo } = useSelector((satate) => satate.auth);

  const typeChange = (e) => {
    const type = e.target.value;
    const fArtilces = articles.filter((article) => article.type === type);
    setFilteredArticles(fArtilces);
  };
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/articles");
        const data = await res.json();
        setArticles(data);
        setFilteredArticles(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);
  return (
    <>
      <GoBack to={"/"} text={"الرجوع الى الصفحة الرئسية"} />
      <section className="bg-gray-100 py-10 px-4 font-arabic flex-grow min-h-screen">
        <div className="container">
          <h2 className="text-2xl font-bold text-fuchsia-900  my-10 ">
            مقالات في ريادة الاعمال
          </h2>
          <div className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center mb-6">
            <form action="">
              <label htmlFor="select">ترتيب المقالات حسب</label>

              <select id="select" className="mr-2 p-2" onChange={typeChange}>
                <option value="">...</option>
                <option value="تأسيس الشركات الناشئة">
                  تأسيس الشركات الناشئة
                </option>
                <option value="تطوير المنتجات">تطوير المنتجات</option>
                <option value="التخطيط الاستراتيجي">التخطيط الاستراتيجي</option>
                <option value="التمويل والاستثمار">التمويل والاستثمار</option>
                <option value="التسويق الرقمي">التسويق الرقمي</option>
                <option value="الإدارة والقيادة">الإدارة والقيادة</option>
                <option value="الابتكار والتكنولوجي">
                  الابتكار والتكنولوجيا
                </option>
                <option value="النمو والتوسع">النمو والتوسع</option>
                <option value="العلاقات العامة والشبكات">
                  العلاقات العامة والشبكات
                </option>
                <option value="إدارة المخاطر">إدارة المخاطر</option>
              </select>
            </form>
            {userInfo?.role === "expert" ? (
              <Link
                to="/add-article"
                className="bg-fuchsia-800 text-white font-bold flex px-2 py-1 rounded"
              >
                <PlusIcon className="text-white size-6" />
                اضف مقالة
              </Link>
            ) : (
              ""
            )}
          </div>
          {loading ? (
            <Spinner loading={loading} />
          ) : (
            <div className="grid grid-cols-3 gap-8 mt-4 mx-auto">
              {filteredArtilces.map((article) => {
                return <Article key={article._id} article={article} />;
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Articles;
