import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AddQuestionPage = ({ addQuestionSubmit }) => {
  const [type, setType] = useState("");
  const [text, setText] = useState("");
  const { userInfo } = useSelector((state) => state.auth);

  const navigator = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigator("/login");
    }
  }, [userInfo]);

  const submitForm = (e) => {
    e.preventDefault();

    const newQuestion = {
      type,
      text,
      answers: [],
    };

    addQuestionSubmit(newQuestion);
    toast.success("تم اضافة السؤال بنجاح");
    return navigator("/questions");
  };
  return (
    <>
      <section className="font-arabic ">
        <div className="container m-auto p-6">
          <Link
            to="/questions"
            className="flex items-center text-fuchsia-700 hover:text-fuchsia-900"
          >
            <ArrowRightIcon className="ml-2 size-6" />
            الرجوع الى الاسئلة
          </Link>
        </div>
      </section>

      <section className="font-arabic flex flex-grow bg-gray-100">
        <div className="w-[50%] bg-white rounded-md p-5 mx-auto m-3">
          <h2 className="text-2xl font-bold text-fuchsia-800 text-center">
            اضف سؤال
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
              اضف سؤال
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddQuestionPage;
