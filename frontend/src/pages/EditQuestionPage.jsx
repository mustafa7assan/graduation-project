import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditQuestionPage = ({ updateQuestion }) => {
  const { id } = useParams();
  const [question, setQuestion] = useState({});
  const [type, setType] = useState(question.type);
  const [text, setText] = useState(question.text);
  const navigator = useNavigate();
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/questions/${id}`);
        const data = await res.json();
        setQuestion(data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    fetchQuestion();
  }, []);

  useEffect(() => {
    if (question) {
      setType(question.type || "");
      setText(question.text || "");
    }
  }, [question]);

  const submitForm = (e) => {
    e.preventDefault();

    const upQuestion = {
      id,
      type,
      text,
      user: "مصطفى حسن",
      answers: [],
    };

    updateQuestion(upQuestion);
    toast.success("تم تعديل السؤال بنجاح");
    return navigator(`/questions/${id}`);
  };

  return (
    <section className="font-arabic flex flex-grow bg-gray-100">
      <div className="w-[50%] bg-white rounded-md p-5 mx-auto m-3">
        <h2 className="text-2xl font-bold text-fuchsia-800 text-center">
          تعديل السؤال
        </h2>
        <form className="mt-12" onSubmit={submitForm}>
          <label htmlFor="select"> تصنيف السؤال</label>
          <select
            id="select"
            className="mr-2 p-2"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">...</option>
            <option value="تأسيس الشركات الناشئة">تأسيس الشركات الناشئة</option>
            <option value="تطوير المنتجات">تطوير المنتجات</option>
            <option value="التخطيط الاستراتيجي">التخطيط الاستراتيجي</option>
            <option value="التمويل والاستثمار">التمويل والاستثمار</option>
            <option value="التسويق الرقمي">التسويق الرقمي</option>
            <option value="الإدارة والقيادة">الإدارة والقيادة</option>
            <option value="الابتكار والتكنولوجي">الابتكار والتكنولوجيا</option>
            <option value="النمو والتوسع">النمو والتوسع</option>
            <option value="العلاقات العامة والشبكات">
              العلاقات العامة والشبكات
            </option>
            <option value="إدارة المخاطر">إدارة المخاطر</option>
          </select>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            name=""
            id=""
            placeholder="ابدا سؤالك بماذا,كيف ,لماذا ..."
            className="container border border-gray-200 focus:border-fuchsia-800 rounded-md p-4 resize-none  mt-4 h-[200px] outline-none"
            required
          ></textarea>
          <button className="mt-3 bg-fuchsia-800 text-white w-full rounded-md p-2">
            تعديل
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditQuestionPage;
