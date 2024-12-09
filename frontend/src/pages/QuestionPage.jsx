import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import Answer from "../components/Answer";
import { PlusIcon } from "@heroicons/react/24/solid";
import GoBack from "../components/GoBack";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const QuestionPage = ({ deleteQuestion }) => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [answer, setAnswer] = useState();
  const navigate = new useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const currentUserId = userInfo?.id;

  const onButtonClick = () => {
    setShowAnswerForm(!showAnswerForm);
  };

  // Add answer to questioin
  const submitAnswer = async (e) => {
    const newAnswer = {
      text: answer,
    };
    try {
      const res = await fetch(`/api/questions/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAnswer),
      });
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  const onDeleteClick = (id) => {
    const confirm = window.confirm("هل تريد حذف هذا السؤال؟");
    if (!confirm) return;
    deleteQuestion(id);
    toast.success("تم حذف السؤال بنجاح");
    return navigate("/questions");
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/questions/${id}`);
        const data = await res.json();
        setQuestion(data);
      } catch (error) {
        console.log("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, []);

  return (
    <>
      <GoBack text={"الرجوع الى الاسئلة"} to={"/questions"} />
      <section className="bg-gray-100 py-10 px-4 font-arabic flex flex-grow">
        <div className="bg-white rounded py-8 px-4 w-[1000px]">
          {loading ? (
            <Spinner loading={loading} />
          ) : (
            <div>
              <div className="flex gap-1">
                <UserCircleIcon className="size-6" />
                <Link
                  className="text-fuchsia-500 hover:text-fuchsia-700  decoration-fuchsia-500 hover:decoration-fuchsia-700 font-medium transition-all"
                  to={`/profile/${question.asker._id}`}
                >
                  {question.asker.name}
                </Link>
              </div>
              <div className="text-xl font-bold mt-3  text-fuchsia-900">
                {question.text}
              </div>
              {currentUserId === question.asker._id ? (
                <div className="mt-1 ">
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded-md text-sm"
                    onClick={() => {
                      onDeleteClick(question._id);
                    }}
                  >
                    حذف
                  </button>
                  <Link
                    to={`/edit-question/${question._id}`}
                    className="bg-orange-500 text-white py-1 px-2 rounded-md mr-1 text-sm"
                  >
                    تعديل
                  </Link>
                </div>
              ) : (
                ""
              )}

              <div className=" mt-16">
                <div className="flex justify-between items-center">
                  <h2 className="text-1xl font-bold text-fuchsia-800 ">
                    اجابات المشتشارين
                  </h2>
                  {userInfo?.role === "expert" ? (
                    <button
                      onClick={onButtonClick}
                      className="bg-fuchsia-800 text-sm text-white font-bold flex items-center px-2 py-1 rounded"
                    >
                      <PlusIcon className="text-white  size-6" />
                      اضف اجابة
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                <div className={showAnswerForm ? "" : "hidden"}>
                  <form onSubmit={submitAnswer}>
                    <textarea
                      name=""
                      id=""
                      placeholder="اكتب اجابتك ..."
                      className="container border border-gray-200 focus:border-fuchsia-800 rounded-md p-4 resize-none  mt-4 h-[200px] outline-none"
                      required
                      onChange={(e) => setAnswer(e.target.value)}
                    ></textarea>
                    <button className="mt-3 ml-2 px-5 bg-fuchsia-800 hover:bg-fuchsia-900 text-white rounded-md p-2">
                      نشر
                    </button>
                    <button
                      onClick={onButtonClick}
                      type="button"
                      className="mt-3 px-5 bg-gray-500 hover:bg-gray-600 text-white rounded-md p-2"
                    >
                      الغاء
                    </button>
                  </form>
                </div>

                {question.answers.map((answer) => (
                  <Answer key={answer._id} answer={answer} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default QuestionPage;
