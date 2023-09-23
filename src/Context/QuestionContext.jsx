import {
  createContext,
  createRef,
  useContext,
  useReducer,
  useState,
} from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import PropTypes from "prop-types";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  TimeRemaining: 10,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return { ...state, status: "failed" };
    case "questionsReady":
      return { ...state, status: "active" };
    case "nextQuestion":
      return { ...state, index: state.index + 1 };
    case "restart":
      return { ...state, questions: action.payload };
    default:
      throw new Error("Action is unknown");
  }
};
const QuestionContext = createContext();

function QuestionProvider({ children }) {
  const [{ questions, status, index }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const [selectedOption, setSelectedOption] = useState(null);
  const totalPoints = questions?.reduce((a, b) => {
    return a + b.points;
  }, 0);
  const numQuestions = questions?.length;

  const [isLoading, setIsLoadin] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const nextRef = createRef(null);

  const fetchQuestions = async () => {
    try {
      setIsLoadin(true);
      const response = await axiosPrivate.get("/anatomy", {
        withCredentials: true,
      });

      const data = response.data;
      dispatch({ type: "dataReceived", payload: data.data });
      if (response.status === 200) setIsLoadin(false);
    } catch (error) {
      dispatch({ type: "dataFailed" });
    }
  };
  const fetchPhyQuestions = async () => {
    try {
      setIsLoadin(true);
      const response = await axiosPrivate.get("/physiology", {
        withCredentials: true,
      });
      const data = response.data;
      dispatch({ type: "dataReceived", payload: data.data });
      if (response.statusText === "OK") setIsLoadin(false);
    } catch (error) {
      dispatch({ type: "dataFailed" });
    }
  };
  const fetchBiochemQuestions = async () => {
    try {
      setIsLoadin(true);
      const response = await axiosPrivate.get("/biochemistry", {
        withCredentials: true,
      });
      const data = response.data;
      dispatch({ type: "dataReceived", payload: data.data });
      if (response.statusText === "OK") setIsLoadin(false);
    } catch (error) {
      dispatch({ type: "dataFailed" });
    }
  };
  return (
    <QuestionContext.Provider
      value={{
        fetchQuestions,
        questions,
        index,
        numQuestions,
        totalPoints,
        selectedOption,
        setSelectedOption,
        status,
        dispatch,
        fetchPhyQuestions,
        fetchBiochemQuestions,
        isLoading,
        setIsLoadin,
        nextRef,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}
QuestionProvider.propTypes = {
  children: PropTypes.element,
};
const useQuestion = () => {
  const context = useContext(QuestionContext);
  return context;
};

export { useQuestion, QuestionProvider };
