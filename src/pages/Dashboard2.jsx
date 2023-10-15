import avaatar from "../assets/Profile_avatar_placeholder_large.png";
import logo from "../assets/newLogo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faRightFromBracket,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { NavLink, Outlet, useParams } from "react-router-dom";
import burger from "../assets/bars-solid.svg";
import { useAuth } from "../Context/AuthContext";
import { useResult } from "../Context/DashBoardContext";
import useLogOut from "../hooks/useLogOut";
import { useEffect, useState } from "react";

function Dashboard2() {
  const { auth } = useAuth();
  const { fetchResults } = useResult();
  const Logout = useLogOut();

  const logOutHandler = async () => {
    const result = await Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });

    if (result.isConfirmed) Logout();
  };
  const params = useParams();
  const id = params.id;
  const course = params.course;
  const [isFakeDark, setIsFakeDark] = useState(false);

  useEffect(() => {
    fetchResults(id, course);
  }, [course, id]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(
    function () {
      document.documentElement.classList.toggle("fake-dark-mode");
    },
    [isFakeDark]
  );
  const sideBarOpener = () => {
    setIsOpen((prev) => !prev); // Use !prev to toggle the state
  };
  const opendropBar = [
    { name: "Home", link: "/course" },
    { name: "Anatomy", link: "results/anatomy" },
    { name: "Physiology", link: "results/physiology" },
    { name: "Biochemistry", link: "results/biochemistry" },
  ];

  return (
    <div>
      <button
        className="btn-fake-dark-mode"
        onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
      >
        {isFakeDark ? (
          <svg
            className="swap-on fill-current w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
        ) : (
          <svg
            className="swap-off fill-current w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        )}
      </button>
      <section>
        <img src={logo} alt="logo" className=" w-24" />
        <div className=" flex justify-between ">
          <button
            onClick={sideBarOpener}
            className=" hover:bg-gray-300 p-2 pl-3"
          >
            <img src={burger} className=" w-8 h-8" />
          </button>
          <h1 className="pt-2">
            {auth?.foundUser?.username}, Welcome to your Dashboard
          </h1>
          <FontAwesomeIcon icon={faUserTie} className=" p-2 rounded-full " />
        </div>

        <div className=" flex justify-between m-0  relative">
          {isOpen && (
            <div className=" absolute" id="homepage">
              {isOpen && (
                <ul className=" pl-4">
                  {opendropBar.map((open) => (
                    <NavLink
                      to={open.link}
                      key={open.name}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-green-700 text-red-800"
                          : "bg-white text-black"
                      }
                    >
                      <li className=" border-gray-400 border-b-2 p-2 font-bold">
                        {open.name}
                      </li>
                    </NavLink>
                  ))}
                  <button
                    onClick={logOutHandler}
                    className=" border-gray-400 border-b-2 p-2 font-bold "
                  >
                    Log Out
                  </button>
                </ul>
              )}
            </div>
          )}
          {!isOpen && (
            <div className=" absolute">
              {!isOpen && (
                <ul className="m-1 pl-2">
                  <li className=" border-gray-400 border-b-2 p-2">
                    <FontAwesomeIcon icon={faHouse} />
                  </li>
                  <li className=" border-gray-400 border-b-2 p-2">A</li>
                  <li className=" border-gray-400 border-b-2 p-2">P</li>
                  <li className=" border-gray-400 border-b-2 p-2">B</li>
                  <li className=" border-gray-400 border-b-2 p-2">
                    <FontAwesomeIcon icon={faRightFromBracket} />
                  </li>
                </ul>
              )}
            </div>
          )}
          <div className="w-full bg-white z-[-1] absolute flex justify-center">
            <Outlet />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard2;
