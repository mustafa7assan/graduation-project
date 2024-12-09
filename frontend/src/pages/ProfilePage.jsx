import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const res = await fetch(`/api/users/profile/${id}`);
        const data = await res.json();
        setUserInfo(data.userData);
      } catch (err) {
        console.log(err);
      }
    };
    getUserProfile();
  }, []);

  return (
    <section className="bg-gray-100 font-arabic flex-grow ">
      <div className=" flex flex-col items-center py-5 ">
        <div className="mt-2  flex-col items-center justify-center ">
          <div className="w-[150px] h-[150px] bg-fuchsia-900 flex items-center justify-center rounded-[50%]">
            <span className="font-bold text-white text-6xl">
              {" "}
              {userInfo.name?.slice(0, 1)}
            </span>
          </div>
          <div className="text-2xl font-bold mt-5 text-center">
            {userInfo.name}
          </div>
          <div className="font-bold text-center mt-2 text-gray-600">
            {userInfo.role === "asker" ? "صاحب مشروع" : "مستشار"}
          </div>
          <div className="font-bold text-center mt-2  text-gray-600">
            {userInfo.email}
          </div>
        </div>
        <div className="flex  mt-8">
          {userInfo.role === "asker" ? (
            <div className=" border-l-2 border-r-2 border-gray-500 px-3 text-center ">
              <h3 className="font-bold  text-gray-600">عدد الاسئلة</h3>
              <span className="text-2xl  font-bold">
                {userInfo.questionCounts}
              </span>
            </div>
          ) : (
            <>
              <div className=" border-l-2 border-gray-500 px-3 text-center ">
                <h3 className="font-bold  text-gray-600">عدد المقالات</h3>
                <span className="text-2xl  font-bold">
                  {" "}
                  {userInfo.articlesCount}
                </span>
              </div>
              <div className=" border-l-2 border-gray-500 px-3 text-center">
                <h3 className="font-bold  text-gray-600">عدد الاجوبة</h3>
                <span className="text-2xl  font-bold">
                  {userInfo.answersCount}
                </span>
              </div>
              <div className=" px-3 text-center">
                <h3 className="font-bold  text-gray-600">عدد التأيدات</h3>
                <span className="text-2xl  font-bold">
                  {userInfo.totalUpvotes}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
