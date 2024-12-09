import { Link } from "react-router-dom";
import Card from "./Card";
const HomeCards = () => {
  return (
    <section className="px-20 py-10 grid grid-cols-2  gap-5 font-arabic mb-20">
      <Card>
        <h2 className="text-xl font-bold">الاسئلة و الاجوبة</h2>
        <p className="my-3">
          تصفح مجموعة من الاسئلة و الاجوبة عن ريادة الاعمال
        </p>
        <Link
          to="/questions"
          className="text-white bg-black py-2 px-4 rounded-md hover:bg-gray-500"
        >
          تصفح الاسئلة
        </Link>
      </Card>
      <Card bg="bg-fuchsia-100">
        <h2 className="text-xl font-bold"> المقالات </h2>
        <p className="my-3">
          مجموعة من المقالات عن ريادة الاعمال كتبت بواسطة خبراء ريادة الاعمال
        </p>
        <Link
          to="/articles"
          className="text-white bg-fuchsia-900 py-2 px-4 rounded-md  hover:bg-fuchsia-900"
        >
          تصفح المقالات
        </Link>
      </Card>
    </section>
  );
};

export default HomeCards;
