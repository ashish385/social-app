import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/operations/authAPI";

const profile =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXdkNKzFIPcRF75IkVqQaZqaiH3A1xiPyctyhqJmFHcw&s";

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);

  console.log("navbar", user);

  // const { path } = useParams();

  const logoutUser = () => {
    dispatch(logout(navigate));
  };
  return (
    <>
      <div className="border-b shadow-xl border-gray-200   bg-white">
        <nav className=" max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 relative">
          <Link
            to="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap ">
              Socila App
            </span>
          </Link>
          {/* user */}
          <div className=" relative flex items-center  md:order-2 space-x-3 md:space-x-3 rtl:space-x-reverse">
            <button
              className={` ${
                !token ? "block" : "hidden"
              } font-semibold hover:bg-richblue-700 hover:text-white px-2 py-1 rounded-md  border `}
            >
              <Link to={"/login"}>Login</Link>
            </button>
            <button
              type="button"
              className={`  ${
                token ? "flex" : "hidden"
              }  text-sm bg-gray-800 rounded-full overflow-hidden md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600`}
              onClick={() => setProfileDropdown(!profileDropdown)}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src={profile}
                alt="user profile"
              />
            </button>
            {/* Dropdown menu */}
            <div
              className={`z-50 ${
                profileDropdown ? " block" : " hidden"
              } fixed top-10 right-2 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow border-t  `}
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-blue-500 capitalize">
                  {user?.username}
                </span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                  {user?.email}
                </span>
              </div>
              <ul className="py-2">
                <li>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm hover:bg-gray-50  "
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="#" className="block px-4 py-2 text-sm  ">
                    Settings
                  </Link>
                </li>
                <li>
                  <p
                    onClick={logoutUser}
                    className="block px-4 py-2 text-sm cursor-pointer "
                  >
                    Sign out
                  </p>
                </li>
              </ul>
            </div>

            {/* Toogle */}
            <button
              type="button"
              className=" items-center p-2 hidden w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={() => setOpenDrawer(!openDrawer)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          {/* laptop */}
          <div
            className={`${
              openDrawer ? " fixed top-[55px]  right-0 " : "hidden"
            } items-center justify-between  w-full mx-auto  md:flex md:w-auto md:order-1 shadow-xl md:shadow-none`}
          >
            <ul
              className={`  flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-blue-700 md:bg-white `}
            >
              <li>
                <Link
                  to="#"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-blue-500 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-blue-500 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Services
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-blue-500 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
