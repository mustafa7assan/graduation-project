import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Question = ({ question }) => {
  return (
    <Link to={`/questions/${question._id}`}>
      <div className="bg-white p-6 rounded-md shadow-md cursor-pointer">
        <div className="flex justify-between text-gray-500">
          <div className="flex gap-1">
            <UserCircleIcon className="size-6 text-fuchsia-600 " />
            <span className="m"> {question.asker.name}</span>
          </div>
          <div className="text-gray-600 rounded-xl  px-2">{question.type}</div>
        </div>
        <div className="my-5">{question.text}</div>
      </div>
    </Link>
  );
};

export default Question;
