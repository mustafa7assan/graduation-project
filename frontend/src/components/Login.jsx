import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/userSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("تم تسجيل الدخول بنجاح");
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <section className="bg-fuchsia-100 py-10 px-4 font-arabic flex-grow min-h-screen">
      <div className="text-center container">
        <h2 className="text-2xl font-bold text-fuchsia-900  my-10 ">
          تسجيل الدخول
        </h2>
        <form
          className="mx-auto flex flex-col w-96 gap-4"
          onSubmit={submitForm}
        >
          <input
            className="px-5 py-2 outline-fuchsia-800 rounded-md border border-gray-400"
            type="email"
            name=""
            id=""
            value={email}
            placeholder="البريد الالكتروني"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="px-5 py-2 outline-fuchsia-800 rounded-md border border-gray-400"
            type="password"
            value={password}
            placeholder="كلمة المرور"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-fuchsia-800 px-5 py-2 rounded-md text-white hover:bg-fuchsia-900    "
            type="submit"
          >
            تسجيل الدخول
          </button>
        </form>
        <div className="mt-4 text-left  w-96 mx-auto text-sm">
          ليس لديك حساب على مريد ؟{" "}
          <Link to="/register" className="text-fuchsia-800">
            انضم الآن
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
