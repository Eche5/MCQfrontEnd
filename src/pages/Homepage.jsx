import { NavLink } from "react-router-dom";
import Header from "../components/Header";
import { useEffect } from "react";
function Homepage() {
  useEffect(() => {
    document.title = "Medical Point | Home ";
  }, []);

  return (
    <div className=" flex flex-col items-center text-gray-800 font-extrabold w-full">
      <Header />
      <h2 className=" text-[3.6rem] mb-16" id="homepage">
        MCQs for medical students !
      </h2>
      <h3
        className="text-[2.4rem] font-semibold mb-10 text-center"
        id="coursepage"
      >
        Test your knowledege of Anatomy, Physiology and Biochemistry
      </h3>
      <NavLink to="/Register">
        <button
          className="rounded-[100px] py-4 px-2 bg-slate-950 text-white  hover:bg-gray-800 shadow-lg shadow-red-400 hover:shadow-none phone:mb-8 "
          id="button"
        >
          Start Learning!!!
        </button>
      </NavLink>
    </div>
  );
}

export default Homepage;
