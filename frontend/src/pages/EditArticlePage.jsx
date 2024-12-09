import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditArticlePage = ({ updateArtilce }) => {
  const { id } = useParams();
  const [article, setArticle] = useState({});
  const [title, setTitle] = useState(article.title || "");
  const [image, setImage] = useState(article.image || "");
  const [type, setType] = useState(article.type || "");
  const [text, setText] = useState(article.text || "");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/articles/${id}`);
        const data = await res.json();
        setArticle(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchArticle();
  }, []);

  useEffect(() => {
    if (article) {
      setType(article.type || "");
      setTitle(article.title || "");
      setText(article.text || "");
      setImage(article.image || "");
    }
  }, [article]);

  const submitForm = (e) => {
    e.preventDefault();

    const upArtilce = {
      id,
      type,
      text,
      title,
      image,
    };

    updateArtilce(upArtilce);
    toast.success("تم تعديل المقالة بنجاح");
    return navigate(`/articles/${id}`);
  };

  return (
    <section className="font-arabic flex flex-grow bg-gray-100">
      <div className="w-[50%] bg-white rounded-md p-5 mx-auto m-3">
        <h2 className="text-2xl font-bold text-fuchsia-800 text-center">
          تعديل مقالة
        </h2>
        <form className="mt-12" onSubmit={submitForm}>
          <div className="mb-2">
            <label htmlFor="title" className=" my-1 ">
              عنوان المقالة
            </label>
            <input
              value={title}
              id="title"
              className=" my-1 p-1 outline-none rounded-md border border-gray-400 container"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <label htmlFor="select"> تصنيف المقالة</label>
          <select
            value={type}
            id="select"
            className="mr-2 p-2"
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
          <div className="mt-2">
            <label htmlFor="img" className=" my-1 ">
              ارفق صورة للمقالة
            </label>
            <input
              value={image}
              id="img"
              className="my-1 p-1 outline-none rounded-md border border-gray-400 container"
              type="text"
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>
          <textarea
            value={text}
            name=""
            id=""
            placeholder=" نص المقالة ..."
            className="container border border-gray-200 focus:border-fuchsia-800 rounded-md p-4 resize-none  mt-4 h-[800px] outline-none"
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
          <button className="mt-3 bg-fuchsia-800 text-white w-full rounded-md p-2">
            تعديل مقالة
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditArticlePage;
