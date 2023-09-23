import avaatar from "../assets/Profile_avatar_placeholder_large.png";
import logo from "../assets/newLogo.jpg";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useResult } from "../Context/DashBoardContext";
import useLogOut from "../hooks/useLogOut";
import { useEffect } from "react";
function Dashboard2() {
  const { auth } = useAuth();
  const { fetchResults } = useResult();
  const Logout = useLogOut();
  const logOutHandler = () => {
    Logout();
  };
  const params = useParams();
  const id = params.id;
  const course = params.course;
  useEffect(() => {
    fetchResults(id, course);
  }, [course, id]);

  return (
    <div className=" laptop:flex laptop:justify-center laptop:m-20 laptop:text-[1rem] phone:text-[0.6rem]  phone:flex phone:justify-center">
      <div className="w-[20%] bg-gray-600 h-[100vh] text-white text">
        <img src={logo} alt="logo" />
        <nav className=" bg-white">
          <ul>
            <NavLink to="/course">
              <li className=" border-2 border-gray-300 py-2 bg-gradient-to-r from-gray-600 to-gray-500 hover:bg-gray-800 hover:translate-y-[-5px] hover:scale-[1.03] transition-all cursor-pointer pl-4 ">
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

            <li
              className=" border-2 border-gray-300 py-2 bg-gradient-to-t from-gray-600 to-gray-500 hover:bg-gray-800 hover:translate-y-[-5px] hover:scale-[1.03] transition-all cursor-pointer pl-4"
              onClick={() => logOutHandler()}
            >
              <NavLink>Log Out</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className=" w-[70%] bg-white h-[100vh]">
        <div className="gap-2 flex justify-end">
          <img
            src={avaatar}
            alt="avatar"
            className="mt-3 w-8 h-8 rounded-full ml-[30%] hover:translate-y-[-5px] hover:scale-[1.03] transition-all phone:ml-3"
          />
          <h1 className="  phone:mt-4">{auth?.foundUser?.username}</h1>
        </div>
        <h1 className=" text-black text-3xl text-center mt-20">
          {auth?.foundUser?.username}, Welcome to your Dashboard
        </h1>
        <NavLink to={`/${params.id}`}>
          <p>&larr; Back</p>
        </NavLink>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard2;
