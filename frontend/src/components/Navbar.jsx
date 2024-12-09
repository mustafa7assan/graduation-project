import { UserIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import UserDropdown from "./UserDropdown";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <nav className="bg-fuchsia-800 border-b border-fuchsia-600 pb-2">
      <div className="max-w-7xl m-auto px-3 py-2 flex items-center justify-between">
        <div className="flex gap-16 items-center">
          <Link to="/" className="text-4xl font-bold text-white font-arabic">
            مريد
          </Link>
          <div className="mt-3 flex gap-4">
            <Link to="/" className="text-1xl text-white font-arabic">
              الرئسية
            </Link>{" "}
            <Link to="/questions" className="text-1xl text-white font-arabic">
              الاسئلة
            </Link>{" "}
            <Link to="/articles" className="text-1xl text-white font-arabic">
              المقالات
            </Link>
          </div>
        </div>

        <div className="flex  gap-1 items-center ml-5">
          {userInfo ? (
            <UserDropdown userInfo={userInfo} />
          ) : (
            <Link
              to="/login"
              className="text-white text-x font-arabic flex items-center gap-1"
            >
              تسجيل الدخول
              <UserIcon className="size-6 text-white" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
