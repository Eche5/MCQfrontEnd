import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faRightFromBracket,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import burger from "../assets/bars-solid.svg";
import { NavLink, Outlet } from "react-router-dom";
function Dock() {
  const [isOpen, setIsOpen] = useState(false);
  const sideBarOpener = () => {
    setIsOpen((prev) => !prev); // Use !prev to toggle the state
  };
  const opendropBar = [
    { name: "Home", link: "/course" },
    { name: "Anatomy", link: "/results/anatomy" },
    { name: "Physiology", link: "/results/anatomy" },
    { name: "Biochemistry", link: "/results/anatomy" },
    { name: "Log Out", link: "/results/anatomy" },
  ];
  return (
    <section>
      <div className=" flex justify-between ">
        <button onClick={sideBarOpener} className=" hover:bg-gray-700 p-2 pl-3">
          <img src={burger} className=" w-8 h-8" />
        </button>
        <h1 className="pt-2">Echefula, Welcome to your Dashboard</h1>
        <FontAwesomeIcon
          icon={faUserTie}
          className=" p-2 rounded-full bg-slate-500"
        />
      </div>

      <div className=" flex justify-between m-0 bg-slate-600">
        {isOpen && (
          <div className=" w-[10rem] bg-slate-600 h-screen" id="homepage">
            {isOpen && (
              <ul className=" pl-4">
                {opendropBar.map((open) => (
                  <NavLink
                    to="/course"
                    className=" border-gray-400 border-b-2 p-2 font-bold"
                    key={open.name}
                  >
                    {open.name}
                  </NavLink>
                ))}
              </ul>
            )}
          </div>
        )}
        {!isOpen && (
          <div>
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
        <Outlet />
      </div>
    </section>
  );
}

export default Dock;
