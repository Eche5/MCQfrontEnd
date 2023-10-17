import { useQuestion } from "../Context/QuestionContext";
import { axiosPrivate } from "../api/axios";
import { useAuth } from "../Context/AuthContext";

import Options from "./Options";
import { useEffect, useState } from "react";
import FunFactsPhysiology from "./FunFactsPhysiology";
import { useNavigate } from "react-router-dom";

function Physiology() {
  const {
    questions,
    numQuestions,
    index,
    isLoading,
    selectedOption,
    dispatch,
    setSelectedOption,
    totalPoints,
  } = useQuestion();

  const [points, setPoints] = useState(0);

  const [completed, setCompleted] = useState(false);

  const { auth } = useAuth();

  const nextQuestionHandler = () => {
    dispatch({ type: "nextQuestion", payload: questions, status: "active" });

    setSelectedOption(null);
  };

  const currentquestion = index + 1;

  //Result Handler

  const resultHandler = () => {
    setCompleted(true);

    PhysiologyResult();
  };

  const PhysiologyResult = async () => {
    try {
      const result = {
        score: points,

        course: "physiology",

        user: auth?.foundUser?._id,
      };

      const RESULT_URL = "/results";

      await axiosPrivate.post(RESULT_URL, JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Medical Point | Physiology ";
  }, []);

  //restart quiz
  const navigate = useNavigate();

  const restartQuiz = () => {
    navigate(`/${auth?.foundUser?._id}`);

    setSelectedOption(null);
  };

  const currentQuestion = questions[index]?.question;

  const currentOption = questions[index]?.options;

  const correctOption = questions[index]?.correctOption;

  const currentPoints = questions[index]?.points;

  const disableButton = typeof selectedOption === "number";

  return (
    <div className=" w-full">
      {!completed && currentQuestion && !isLoading && (
        <>
          <div
            style={{
              margin: "4px",
              borderWidth: "2px",
              borderRadius: "12px",
              height: "8px",
              backgroundColor: "white",
              paddingLeft: `calc(100% * ${index} / ${questions.length})`,
            }}
          >
            <p className=" bg-black h-1 w-full"></p>
          </div>
          <div className=" flex justify-between">
            <h3 className=" text-3xl font-bold mt-2">
              Question {index + 1}/{numQuestions}
            </h3>
            <h4 className=" text-3xl font-bold mt-2">
              {points}/{totalPoints}
            </h4>
          </div>

          <div className=" m-8 p-8 rounded-2xl text-black text-center">
            <h4 className=" mb-8 font-semibold laptop:text-4xl phone:text-[1.2rem] ">
              {index + 1}. {currentQuestion}
            </h4>
            <Options
              currentOption={currentOption}
              correctOption={correctOption}
              setPoints={setPoints}
              currentPoints={currentPoints}
            />
            <footer>
              <div className=" flex justify-between">
                {currentquestion < questions.length && disableButton && (
                  <button
                    role="button"
                    className="rounded-[100px] w-28 bg-slate-950 text-white p-2 hover:bg-gray-800 shadow-lg shadow-white hover:shadow-none "
                    onClick={nextQuestionHandler}
                  >
                    Next 👉
                  </button>
                )}
                {currentquestion === questions.length && disableButton && (
                  <button
                    role="button"
                    className="rounded-[100px] w-28 bg-slate-950 text-white p-2 hover:bg-gray-800 shadow-lg shadow-white hover:shadow-none "
                    onClick={resultHandler}
                  >
                    Results
                  </button>
                )}
              </div>
            </footer>
          </div>
        </>
      )}
      {completed && (
        <div className=" flex justify-center mt-28 ">
          <h2 className="  text-center font-extrabold text-3xl">
            Your Score is {points}/{totalPoints}
          </h2>
          <button
            onClick={restartQuiz}
            className="  rounded-[100px] w-28 bg-slate-950 text-white p-2 hover:bg-gray-800 shadow-lg shadow-white hover:shadow-none "
          >
            Go back to dashboard
          </button>
        </div>
      )}
      {isLoading && <FunFactsPhysiology />}
    </div>
  );
}

export default Physiology;
