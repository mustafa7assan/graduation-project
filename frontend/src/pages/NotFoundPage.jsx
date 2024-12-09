import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <section className="flex flex-col text-center p-10 font-arabic items-center">
      <ExclamationTriangleIcon className="font-bold size-20 text-yellow-500" />
      <h1 className="font-bold text-4xl">عفوا 404 </h1>
      <p className="mt-2">الصفحة غير موجودة</p>
      <Link className="bg-fuchsia-800 text-white px-2 py-1 rounded mt-3" to="/">
        الرجوع الى الصفحة الرئيسية
      </Link>
    </section>
  );
};

export default NotFoundPage;
