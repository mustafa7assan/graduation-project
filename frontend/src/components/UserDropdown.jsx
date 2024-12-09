import {
  UserCircleIcon,
  ArrowLeftEndOnRectangleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";

import { Link } from "react-router-dom";

import { useLogoutMutation } from "../slices/userSlice";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
const UserDropdown = ({ userInfo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoutUser] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const onLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block  font-arabic" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className=" text-white p-2 rounded-md focus:outline-none flex items-center"
      >
        <ChevronDownIcon className="size-4 font-bold text-white" />
        {userInfo.name}
      </button>

      {isOpen && (
        <div className="absolute bg-fuchsia-800  text-right mt-2 w-48 rounded-md  py-2 z-20 shadow-lg">
          <Link
            to={`/profile/${userInfo.id}`}
            className=" px-4 py-2 text-white hover:bg-fuchsia-900 flex gap-1 items-center "
          >
            <UserCircleIcon className="size-6 text-white" />
            الصفحة الشخصية
          </Link>
          <button
            onClick={onLogout}
            className="w-full  text-right px-4 py-2 text-white hover:bg-fuchsia-900 flex gap-1 items-center "
          >
            <ArrowLeftEndOnRectangleIcon className="size-6 text-white" />
            تسجيل خروج
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
