import { NavLink } from "react-router-dom";
import useLogOut from "../hooks/useLogOut";
function SideBarWithList() {
  const Logout = useLogOut();
  const logOutHandler = () => {
    Logout();
  };
  return (
    <nav className="navbar bg-black">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <NavLink to="/course">
              <li className=" border-2 w-full border-gray-300 py-2 bg-gradient-to-r from-gray-600 to-gray-500 hover:bg-gray-800 hover:translate-y-[-5px] hover:scale-[1.03] transition-all cursor-pointer pl-4 ">
                Home
              </li>
            </NavLink>
            <NavLink to="results/anatomy">
              <li className=" border-2 border-gray-300 py-2 bg-gradient-to-l from-gray-600 to-gray-500 hover:bg-gray-800 hover:translate-y-[-5px] hover:scale-[1.03] transition-all cursor-pointer pl-4">
                Anatomy
              </li>
            </NavLink>
            <NavLink to="results/physiology">
              <li className=" border-2 border-gray-300 py-2 bg-gradient-to-r from-gray-600 to-gray-500 hover:bg-gray-800 hover:translate-y-[-5px] hover:scale-[1.03] transition-all cursor-pointer pl-4">
                Physiology
              </li>
            </NavLink>
            <NavLink to="results/biochemistry">
              <li className=" border-2 border-gray-300 py-2 bg-gradient-to-l from-gray-600 to-gray-500 hover:bg-gray-800 hover:translate-y-[-5px] hover:scale-[1.03] transition-all cursor-pointer pl-4">
                BioChemistry
              </li>
            </NavLink>
            <NavLink>
              <li
                className=" border-2 border-gray-300 py-2 bg-gradient-to-t from-gray-600 to-gray-500 hover:bg-gray-800 hover:translate-y-[-5px] hover:scale-[1.03] transition-all cursor-pointer pl-4"
                onClick={() => logOutHandler()}
              >
                Log Out
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default SideBarWithList;
