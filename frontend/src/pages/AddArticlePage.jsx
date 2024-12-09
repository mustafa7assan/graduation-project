import { Link, useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { toast } from "react-toastify";

const AddArticlePage = ({ addArticle }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("");
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  const submitForm = (e) => {
    e.preventDefault();
    const newArticle = {
      title,
      type,
      text,
      image,
      author,
      date: getCurrentDate(),
    };
    addArticle(newArticle);
    toast.success("تم اضافة المقالة بنجاح");
    navigate("/articles");
  };

  return (
    <>
      <section className="font-arabic ">
        <div className="container m-auto p-6">
          <Link
            to="/articles"
            className="flex items-center text-fuchsia-700 hover:text-fuchsia-900"
          >
            <ArrowRightIcon className="ml-2 size-6" />
            الرجوع الى المقالات
          </Link>
        </div>
      </section>

      <section className="font-arabic flex flex-grow bg-gray-100 ">
        <div className="w-[50%] bg-white rounded-md p-5 mx-auto m-3">
          <h2 className="text-2xl font-bold text-fuchsia-800 text-center">
            اضف مقالة
          </h2>
          <form className="mt-12" onSubmit={submitForm}>
            <div className="mb-2">
              <label htmlFor="title" className=" my-1 ">
                عنوان المقالة
              </label>
              <input
                id="title"
                className=" my-1 p-1 outline-none rounded-md border border-gray-400 container"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <label htmlFor="select"> تصنيف المقالة</label>
            <select
              id="select"
              className="mr-2 p-2"
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="">...</option>
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
            <div className="mt-2">
              <label htmlFor="img" className=" my-1 ">
                ارفق رابط صورة المقالة
              </label>
              <input
                id="img"
                className="my-1 p-1 outline-none rounded-md border border-gray-400 container"
                type="text"
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </div>
            <textarea
              name=""
              id=""
              placeholder=" نص المقالة ..."
              className="container border border-gray-200 focus:border-fuchsia-800 rounded-md p-4 resize-none  mt-4 h-[800px] outline-none"
              onChange={(e) => setText(e.target.value)}
              required
            ></textarea>
            <button className="mt-3 bg-fuchsia-800 text-white w-full rounded-md p-2">
              اضف مقالة
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddArticlePage;
