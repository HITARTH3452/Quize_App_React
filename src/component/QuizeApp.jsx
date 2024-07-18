import { useEffect } from "react";
import { useState } from "react";

const questions = [
  {
    question: "What is the capital of the USA?",
    options: ["New York", "Washington D.C.", "Los Angeles", "Chicago"],
    answer: "Washington D.C.",
  },
  {
    question: "Which year did the USA gain independence?",
    options: ["1776", "1804", "1492", "1945"],
    answer: "1776",
  },
  {
    question: "Who was the first President of the USA?",
    options: [
      "George Washington",
      "Thomas Jefferson",
      "Abraham Lincoln",
      "John Adams",
    ],
    answer: "George Washington",
  },
  {
    question: "Which state is known as the 'Sunshine State'?",
    options: ["California", "Florida", "Texas", "Arizona"],
    answer: "Florida",
  },
  {
    question: "What is the largest state in the USA by area?",
    options: ["California", "Texas", "Alaska", "Montana"],
    answer: "Alaska",
  },
  {
    question: "Which city is known as the 'Big Apple'?",
    options: ["Los Angeles", "Chicago", "San Francisco", "New York"],
    answer: "New York",
  },
  {
    question: "Who wrote the Declaration of Independence?",
    options: [
      "George Washington",
      "Thomas Jefferson",
      "Benjamin Franklin",
      "John Adams",
    ],
    answer: "Thomas Jefferson",
  },
  {
    question:
      "Which war was fought between the North and South regions in the USA?",
    options: [
      "World War I",
      "World War II",
      "The Civil War",
      "The Revolutionary War",
    ],
    answer: "The Civil War",
  },
  {
    question: "What is the national bird of the USA?",
    options: [
      "Bald Eagle",
      "Golden Eagle",
      "Peregrine Falcon",
      "American Robin",
    ],
    answer: "Bald Eagle",
  },
  {
    question: "Which river is the longest in the USA?",
    options: [
      "Mississippi River",
      "Missouri River",
      "Colorado River",
      "Ohio River",
    ],
    answer: "Missouri River",
  },
];

const QuizeApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    shuffleQuestions();
  }, []);

  const shuffleQuestions = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  };

  const handleReset = () => {
    setScore(0);
    setCurrentQuestion(0);
    shuffleQuestions();
    setAnswers([]);
    setIsDisabled(false);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    const isCorrect = option === shuffledQuestions[currentQuestion].answer;
    if (isCorrect) {
      setScore(score + 1);
    }

    setAnswers([
      ...answers,
      {
        question: shuffledQuestions[currentQuestion].question,
        selected: option,
        correct: shuffledQuestions[currentQuestion].answer,
      },
    ]);

    setIsDisabled(true);

    setTimeout(() => {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsDisabled(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-6">USA Quiz App</h1>
      <div className="text-lg font-medium mb-4">Current Score: {score}</div>
      {currentQuestion < shuffledQuestions.length ? (
        <div>
          <h2 className="text-2xl mb-4">
            {shuffledQuestions[currentQuestion].question}
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {shuffledQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                disabled={isDisabled}
                className={`p-4 text-center rounded-md border ${
                  selectedOption
                    ? option === shuffledQuestions[currentQuestion].answer
                      ? "bg-green-500 text-white"
                      : option === selectedOption
                      ? "bg-red-500 text-white"
                      : "bg-gray-200"
                    : "bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 p-6 rounded-md shadow-md">
          <h2 className="text-2xl mb-4">Quiz Complete</h2>
          <p className="text-lg font-medium mb-4">Your Score: {score}/{shuffledQuestions?.length}</p>
          <button
            onClick={handleReset}
            className="p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Reset Quiz
          </button>
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Results</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 text-center" style={{ width: "30%" }}>
                    Question
                  </th>
                  <th className="py-2 px-4 text-center" style={{ width: "30%" }}>
                    Your Answer
                  </th>
                  <th className="py-2 px-4 text-center" style={{ width: "30%" }}>
                    Correct Answer
                  </th>
                </tr>
              </thead>
              <tbody>
                {answers.map((answer, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      answer.selected === answer.correct
                        ? "bg-green-100"
                        : "bg-red-100"
                    }`}
                  >
                    <td className="py-2 px-4">{answer.question}</td>
                    <td className="py-2 px-4">{answer.selected}</td>
                    <td className="py-2 px-4">{answer.correct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizeApp;
