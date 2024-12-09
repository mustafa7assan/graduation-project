import {
  UserCircleIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
const Answer = ({ answer }) => {
  const [upvotes, setUpvotes] = useState(answer.upvotes);
  const [downvotes, setDownvotes] = useState(answer.downvotes);
  const handleUpvote = async () => {
    try {
      const res = await fetch(`/api/answers/${answer._id}/upvote`, {
        method: "Post",
      });
      const data = await res.json();
      setUpvotes(data.upvotes); // Update with new count
    } catch (error) {
      console.error("Error upvoting", error);
    }
  };

  const handleDownvote = async () => {
    try {
      const res = await fetch(`/api/answers/${answer._id}/downvote`, {
        method: "Post",
      });
      const data = await res.json();
      setDownvotes(data.downvotes); // Update with new count
    } catch (error) {
      console.error("Error downvoting", error);
    }
  };
  return (
    <div className="bg-white rounded-md p-5  mt-10 border border-gray-300">
      <div className="flex gap-1 mt-2">
        <UserCircleIcon className="size-6 " />

        <Link
          className="text-fuchsia-500 hover:text-fuchsia-700  decoration-fuchsia-500 hover:decoration-fuchsia-700 font-medium transition-all"
          to={`/profile/${answer.user._id}`}
        >
          {answer.user.name}
        </Link>
      </div>
      <div className="mt-2"> {answer.text}</div>
      <div className="flex gap-8 mt-3">
        <button className="flex  gap-1" onClick={handleUpvote}>
          <span>{upvotes}</span>
          <HandThumbUpIcon className="size-6  cursor-pointer" />
          <span>تأيد</span>
        </button>
        <button className="flex gap-1" onClick={handleDownvote}>
          <span>{downvotes}</span>
          <HandThumbDownIcon className="size-6 cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default Answer;
