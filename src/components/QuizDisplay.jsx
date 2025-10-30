// frontend/src/components/QuizDisplay.jsx
import React, { useState, useEffect } from "react";

function QuizQuestion({ questionData, index, handleAnswer, darkMode }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleClick = (option) => {
    if (!showAnswer) {
      setSelectedOption(option);
      setShowAnswer(true);
      handleAnswer(option === questionData.answer);
    }
  };

  return (
    <div
      className={`p-4 sm:p-5 md:p-6 mb-6 rounded-xl shadow-lg transition-transform duration-500 ${
        darkMode
          ? "bg-gray-800 border border-gray-700 text-gray-100"
          : "bg-white border border-gray-200 text-gray-800"
      } ${showAnswer ? "scale-[1.02]" : ""}`}
    >
      <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-3">
        {index + 1}. {questionData.question}
      </h4>

      <div className="space-y-2 mb-4">
        {questionData.options.map((option, optIndex) => {
          const isCorrect = option === questionData.answer;
          const isSelected = option === selectedOption;
          return (
            <p
              key={optIndex}
              onClick={() => handleClick(option)}
              className={`p-2 rounded-md cursor-pointer font-medium transition-colors duration-300 ${
                showAnswer
                  ? isCorrect
                    ? "bg-green-200 border-l-4 border-green-500 text-green-800 dark:bg-green-800 dark:text-green-100"
                    : isSelected
                    ? "bg-red-200 border-l-4 border-red-500 text-red-800 dark:bg-red-800 dark:text-red-100 line-through"
                    : darkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-50 text-gray-500"
                  : darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-100"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700"
              }`}
            >
              {option}
            </p>
          );
        })}
      </div>

      <button
        onClick={() => setShowAnswer(!showAnswer)}
        className={`text-sm font-medium ${
          darkMode
            ? "text-blue-400 hover:text-blue-300"
            : "text-blue-600 hover:text-blue-800"
        }`}
      >
        {showAnswer ? "Hide Answer/Explanation" : "Show Answer & Explanation"}
      </button>

      {showAnswer && (
        <div
          className={`mt-3 p-3 border-t rounded-b-lg text-sm ${
            darkMode
              ? "border-blue-800 bg-blue-900 text-gray-200"
              : "border-blue-200 bg-blue-50 text-gray-700"
          }`}
        >
          <p>
            <strong>Correct Answer:</strong>{" "}
            <span className="text-green-500">{questionData.answer}</span>
          </p>
          <p>
            <strong>Difficulty:</strong>{" "}
            <span className="capitalize font-semibold">
              {questionData.difficulty}
            </span>
          </p>
          <p>
            <strong>Explanation:</strong> {questionData.explanation}
          </p>
        </div>
      )}
    </div>
  );
}

export default function QuizDisplay({ quizData }) {
  const [score, setScore] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  if (!quizData || !quizData.quiz || quizData.quiz.length === 0) {
    if (quizData) {
      return (
        <div className="p-4 bg-yellow-100 text-yellow-800 rounded-lg mt-6 text-center">
          <p>
            Quiz metadata was generated, but no questions were produced. Try a
            different article.
          </p>
        </div>
      );
    }
    return null;
  }

  const { title, summary, key_entities, quiz, related_topics } = quizData;
  const quizList = quiz.slice(0, 10);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore((prev) => prev + 1);
  };

  return (
    <div
      className={`min-h-screen px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-48 py-6 transition-colors duration-700 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Header */}
      <header
        className={`relative p-5 sm:p-6 md:p-8 rounded-lg shadow-xl border-t-4 mb-8 ${
          darkMode
            ? "bg-gray-800 border-indigo-600"
            : "bg-white border-indigo-500"
        }`}
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-3 leading-tight">
          {title}
        </h1>
        <p className="italic text-sm sm:text-base md:text-lg border-b pb-3 mb-4">
          <strong>Summary:</strong> {summary}
        </p>
        <div className="text-right font-semibold text-base sm:text-lg">
          Score:{" "}
          <span className="text-indigo-500 font-bold">{score}</span> /{" "}
          {quizList.length}
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-5 right-5 p-2 rounded-full border border-gray-400 hover:scale-110 transition"
          aria-label="Toggle theme"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </header>

      {/* Main Grid Layout */}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Questions (2/3 width on large) */}
        <section
          className={`lg:col-span-2 p-4 sm:p-6 rounded-lg shadow-lg ${
            darkMode ? "bg-gray-800" : "bg-gray-50"
          }`}
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-4">
            Questions ({quizList.length})
          </h2>
          <div className="space-y-5">
            {quizList.map((question, index) => (
              <QuizQuestion
                key={index}
                questionData={question}
                index={index}
                handleAnswer={handleAnswer}
                darkMode={darkMode}
              />
            ))}
          </div>
        </section>

        {/* Metadata (1/3 width on large) */}
        <aside className="space-y-6">
          <div
            className={`p-4 sm:p-6 rounded-lg shadow ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3 className="text-lg sm:text-xl font-bold mb-2">Key Entities</h3>
            <div className="text-sm sm:text-base space-y-1">
              <p>
                <strong>People:</strong>{" "}
                {key_entities.people.join(", ") || "N/A"}
              </p>
              <p>
                <strong>Organizations:</strong>{" "}
                {key_entities.organizations.join(", ") || "N/A"}
              </p>
              <p>
                <strong>Locations:</strong>{" "}
                {key_entities.locations.join(", ") || "N/A"}
              </p>
            </div>
          </div>

          <div
            className={`p-4 sm:p-6 rounded-lg shadow ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3 className="text-lg sm:text-xl font-bold mb-2">
              Related Topics
            </h3>
            <ul className="text-sm sm:text-base list-disc list-inside space-y-1">
              {related_topics.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))}
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}
