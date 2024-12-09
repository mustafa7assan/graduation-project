import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useRegisterMutation } from "../slices/userSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [register] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const submitForm = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("كلمة المرور غير متطابقة");
    } else {
      try {
        const res = await register({
          name,
          email,
          password,
          role,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <section className="bg-fuchsia-100 py-10 px-4 font-arabic flex-grow min-h-screen">
      <div className="text-center container">
        <h2 className="text-2xl font-bold text-fuchsia-900  my-5 ">
          تسجيل مستخدم جديد
        </h2>
        <form
          className="mx-auto flex flex-col w-[600px] gap-4"
          onSubmit={submitForm}
        >
          <input
            className="px-5 py-2 rounded-md border border-gray-400 outline-none"
            type="text"
            name=""
            value={name}
            placeholder="الاسم "
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <input
            className="px-5 py-2 outline-none rounded-md border border-gray-400"
            type="email"
            name=""
            value={email}
            placeholder="البريد الالكتروني"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="px-5 py-2 outline-none rounded-md border border-gray-400"
            type="password"
            value={password}
            placeholder="كلمة المرور"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <input
            className="px-5 py-2 outline-none rounded-md border border-gray-400"
            type="password"
            value={confirmPassword}
            placeholder="تاكيد كلمة المرور"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />

          <div className="text-right flex flex-col">
            <label htmlFor="asker">
              <input
                className="ml-1"
                type="radio"
                name="b-or-e"
                id="asker"
                value="asker"
                onChange={(e) => setRole(e.target.value)}
                checked={role === "asker"}
              />
              صاحب مشروع
            </label>
            <label htmlFor="expert">
              <input
                className="ml-1"
                type="radio"
                name="b-or-e"
                id="expert"
                value="expert"
                onChange={(e) => setRole(e.target.value)}
                checked={role === "expert"}
              />
              مستشار
            </label>
          </div>
          <button
            className="bg-fuchsia-800 px-5 py-2 rounded-md text-white hover:bg-fuchsia-900    "
            type="submit"
          >
            تسجيل
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
