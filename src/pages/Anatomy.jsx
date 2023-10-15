import { useQuestion } from "../Context/QuestionContext";
import FunFacts from "./FunFacts";
import Options from "./Options";
import finished from "../assets/QL7TEGT-applause-cheering.mp3";
import failed from "../assets/SH5AB7W-medium-crowd-dissapointed.mp3";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../Context/AuthContext";
import { axiosPrivate } from "../api/axios";
import { useNavigate } from "react-router-dom";

function Anatomy() {
  const {
    questions,
    numQuestions,
    index,
    selectedOption,
    dispatch,
    setSelectedOption,
    totalPoints,
    isLoading,
    setIsLoadin,
    nextRef,
  } = useQuestion();
  const { auth } = useAuth();
  const [points, setPoints] = useState(0);
  const [completed, setCompleted] = useState(false);

  const nextQuestionHandler = () => {
    dispatch({
      type: "nextQuestion",
      payload: questions,
      status: "active",
    });

    setSelectedOption(null);
  };
  const currentquestion = index + 1;
  const AnatomyResult = async () => {
    try {
      const result = {
        score: points,
        course: "anatomy",
        user: auth?.foundUser?._id,
      };
      const RESULT_URL = "/results";
      const response = await axiosPrivate.post(
        RESULT_URL,
        JSON.stringify(result),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  //Result Handler
  const resultHandler = () => {
    setCompleted(true);
    AnatomyResult();
  };
  const playCompletedSound = useCallback(() => {
    const sound = new Audio(finished);
    sound.onerror = (error) => {
      console.error("Error playing sound:", error);
    };
    sound.currentTime = -5;

    sound.play();
  }, []);

  const playFailedSound = useCallback(() => {
    const sound = new Audio(failed);
    sound.onerror = (error) => {
      console.error("Error playing sound:", error);
    };
    sound.currentTime = -5;

    sound.play();
  }, []);

  useEffect(() => {
    if (completed && points > 200) {
      playCompletedSound();
    } else if (completed && points < 200) {
      playFailedSound();
    }
  }, [completed, playCompletedSound, points, playFailedSound]);
  const navigate = useNavigate();
  //restart quiz
  const restartQuiz = () => {
    navigate(`/${auth?.foundUser?._id}`);
    setSelectedOption(null);
  };

  useEffect(() => {
    document.title = "Medical Point | Anatomy";
  }, []);

  const currentQuestion = questions?.[index]?.question;
  const currentOption = questions?.[index]?.options;
  const correctOption = questions?.[index]?.correctOption;
  const currentPoints = questions?.[index]?.points;

  const disableButton = typeof selectedOption === "number";
  useEffect(() => {
    setIsLoadin(true);
  }, []);

  return (
    <div>
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
            <p className=" bg-black h-1"></p>
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
            <h4 className=" mb-8 font-semibold  laptop:text-4xl phone:text-[1.2rem]">
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
                {currentquestion < questions?.length && disableButton && (
                  <button
                    ref={nextRef}
                    role="button"
                    className="rounded-[100px] w-28 bg-slate-950 text-white p-2 hover:bg-gray-800 shadow-lg shadow-white hover:shadow-none "
                    onClick={nextQuestionHandler}
                  >
                    Next 👉
                  </button>
                )}
                {currentquestion === questions?.length && disableButton && (
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
        <div>
          <h2 className=" m-40 text-center font-extrabold text-3xl">
            Your Score is {points}/{totalPoints}
          </h2>
          <button
            onClick={restartQuiz}
            className="rounded-[100px] w-28 bg-slate-950 text-white p-2 hover:bg-gray-800 shadow-lg shadow-white hover:shadow-none "
          >
            go back to dashboard
          </button>
        </div>
      )}
      {isLoading && <FunFacts />}
    </div>
  );
}

export default Anatomy;
