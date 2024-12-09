import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
const GoBack = ({ to, text }) => {
  return (
    <section className="font-arabic">
      <div className="container m-auto p-6">
        <Link
          to={to}
          className="flex items-center text-fuchsia-700 hover:text-fuchsia-900"
        >
          <ArrowRightIcon className="ml-2 size-6" />
          {text}
        </Link>
      </div>
    </section>
  );
};

export default GoBack;
