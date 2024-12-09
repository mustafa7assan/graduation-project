import { PlusIcon } from "@heroicons/react/24/solid";
import Question from "../components/Question";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GoBack from "./GoBack";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  const typeChange = (e) => {
    const type = e.target.value;
    const fQuestions = questions.filter((question) => question.type === type);
    setFilteredQuestions(fQuestions);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("/api/questions");
        const data = await res.json();
        setQuestions(data);
        setFilteredQuestions(data);
      } catch (err) {
        console.log("Error fetching data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);
  return (
    <>
      <GoBack to={"/"} text={"الرجوع الى الصفحة الرئسية"} />

      <section className="bg-gray-100 py-10 px-4 font-arabic flex-grow min-h-screen">
        <div className="container">
          <h2 className="text-2xl font-bold text-fuchsia-900  my-10 ">
            اسئلة و اجوبة في ريادة الاعمال
          </h2>
          <div className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center">
            <form action="">
              <label htmlFor="select">ترتيب الاسئلة حسب</label>

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
            <Link
              to="/add-question"
              className="bg-fuchsia-800 text-white font-bold flex px-2 py-1 rounded"
            >
              <PlusIcon className="text-white size-6" />
              اضف سؤال
            </Link>
          </div>
          {loading ? (
            <Spinner loading={loading} />
          ) : (
            <div className="grid grid-cols-1 gap-8 mt-4 mx-auto">
              {filteredQuestions.map((question) => {
                return <Question question={question} key={question._id} />;
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Questions;
