import { useQuestion } from "../Context/QuestionContext";
import ClickSound from "../assets/mixkit-correct-answer-tone-2870.wav";
import Failed from "../assets/mixkit-funny-fail-low-tone-2876.wav";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function shuffleArray(array) {
  // Fisher-Yates shuffle algorithm

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function Options({ currentOption, correctOption, setPoints, currentPoints }) {
  const alphabet = "ABCDEFGH";

  const { selectedOption, setSelectedOption } = useQuestion();

  const [shuffledIndexes, setShuffledIndexes] = useState([]);

  useEffect(() => {
    // Create an array of indexes and shuffle them
    const indexes = Array.from(
      { length: currentOption.length },

      (_, index) => index
    );

    const shuffled = shuffleArray(indexes);

    setShuffledIndexes(shuffled);
  }, [currentOption]);

  const playSound = () => {
    const sound = new Audio(ClickSound);

    sound.onerror = (error) => {
      console.error("Error playing sound:", error);
    };

    sound.currentTime = 0;

    sound.play();
  };

  const playFailedSound = () => {
    const sound = new Audio(Failed);

    sound.onerror = (error) => {
      console.error("Error playing sound:", error);
    };

    sound.currentTime = 0;

    sound.play();
  };

  const selectedAnswer = (index) => {
    setSelectedOption(index);

    if (correctOption === shuffledIndexes[index]) {
      playSound();

      setPoints((points) => points + currentPoints);

      // nextRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      playFailedSound();
    }
  };

  const isWrong =
    selectedOption !== null &&
    correctOption !== shuffledIndexes[selectedOption];

  return (
    <ul className="flex flex-col gap-5 mb-14">
      {shuffledIndexes.map((shuffledIndex, index) => (
        <button
          onClick={() => selectedAnswer(index)}
          key={shuffledIndex}
          disabled={selectedOption !== null}
          className={`option ${
            selectedOption !== null
              ? index === selectedOption
                ? correctOption === shuffledIndex
                  ? "correct"
                  : "wrong"
                : ""
              : ""
          } ${
            isWrong && correctOption === shuffledIndex ? "bg-green-500" : ""
          } ${selectedOption !== null ? "answered" : "notanswered"}`}
        >
          {alphabet[index]}. {currentOption[shuffledIndex]}
        </button>
      ))}
    </ul>
  );
}

Options.propTypes = {
  currentOption: PropTypes.array,
  correctOption: PropTypes.number,
  setPoints: PropTypes.func,
  currentPoints: PropTypes.number,
};

export default Options;
