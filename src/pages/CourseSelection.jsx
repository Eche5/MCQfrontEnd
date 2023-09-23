import { NavLink } from "react-router-dom";
import anatomy from "../assets/Anatomy.jpg";
import physiology from "../assets/Physiology.png";
import biochemistry from "../assets/biochemistry.jpg";
import Header from "../components/Header";
import { useAuth } from "../Context/AuthContext";
import { useQuestion } from "../Context/QuestionContext";
import { useEffect, useState } from "react";
function CourseSelection() {
  const [isFakeDark, setIsFakeDark] = useState(false);
  const { auth } = useAuth();

  const {
    fetchQuestions,
    fetchPhyQuestions,
    fetchBiochemQuestions,
  } = useQuestion();
  // const username = user?.username;

  useEffect(() => {
    document.title = "Medical Point | Course Selection ";
  }, []);

  useEffect(
    function() {
      document.documentElement.classList.toggle("fake-dark-mode");
    },
    [isFakeDark]
  );

  const onHandleAnatomy = () => {
    setTimeout(() => {
      fetchQuestions();
    }, 6000);
  };
  return (
    <>
      <Header />
      <button
        onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
        className="btn-fake-dark-mode"
      >
        {isFakeDark ? "☀️" : "🌙"}
      </button>
      <h1 className=" text-3xl text-center mb-8 transition duration-150">
        Welcome,
        <span className=" first-letter:uppercase font-bold uppercase">
          &nbsp; {auth?.foundUser?.username}
        </span>
      </h1>
      <p className=" text-center text-2xl m-4">
        Please choose your course to start trial
      </p>
      <section className=" laptop:flex laptop:justify-around phone:grid phone:grid-cols-1 phone:m-20 phone:gap-10 iphone:m-20 iphone:gap-20">
        <div>
          <NavLink
            to="anatomy"
            onClick={() => onHandleAnatomy()}
            className=" sm:inset-0"
          >
            <img
              src={anatomy}
              alt="anatomy"
              className="hover:transform sm:mx-auto hover:translate-y-[-15px] hover:scale-[1.03] transition-all "
            />
            <h1 className=" text-center text-2xl text-gray-700">Anatomy</h1>
          </NavLink>
        </div>
        <div>
          <NavLink to="physiology" onClick={() => fetchPhyQuestions()}>
            <img
              src={physiology}
              alt="physiology"
              className=" w-56 h-[30vh] hover:transform hover:translate-y-[-15px] hover:scale-[1.03] transition-all"
            />
            <h1 className=" text-center text-2xl text-gray-700">Physiology</h1>
          </NavLink>
        </div>
        <div>
          <NavLink to="biochemistry" onClick={() => fetchBiochemQuestions()}>
            <img
              src={biochemistry}
              alt="biochemistry"
              className=" w-56 h-[30vh] hover:transform hover:translate-y-[-15px] hover:scale-[1.03] transition-all"
            />
            <h1 className=" text-center text-2xl text-gray-700">
              Biochemistry
            </h1>
          </NavLink>
        </div>
      </section>
    </>
  );
}

export default CourseSelection;
