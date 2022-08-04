import React, { useState, useEffect } from "react";
import "./App.css";
import { nanoid } from "nanoid";
import Home from "./components/Home";
import Questions from "./components/Questions";

function App() {
  const [quizData, setQuizData] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [endGame, setEndGame] = useState(false);

  //**** Get Quizz data *****//
  const getQuizData = () => {
    fetch(
      "https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple"
    )
      .then((res) => res.json())
      .then((data) =>
        setQuizData(
          data.results.map((result) => {
            return {
              id: nanoid(),
              question: result.question
                .replace(/&quot;/g, '"')
                .replace(/&amp;/g, "&")
                .replace(/&#039;/g, "'")
                .replace(/&rsquo;/g, "''")
                .replace(/&ouml;/g, "ö"),
              correct_answer: result.correct_answer,
              possible_answers: shuffleArray([
                ...result.incorrect_answers,
                result.correct_answer,
              ]),
              selected_answer: "",
            };
          })
        )
      );
  };

  //**** Shuffle possibles answers *****//
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * arr.length);
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  //**** Set selected answer  *****//
  const setSelectAnswer = (id, answer) => {
    setQuizData((prevQuizdata) => {
      return prevQuizdata.map((question) => {
        return question.id === id
          ? { ...question, selected_answer: answer }
          : question;
      });
    });
  };

  //**** Generate Score to correct answers  *****//
  useEffect(() => {
    if (endGame) {
      const num = quizData.reduce((prevVal, curVal) => {
        return curVal.correct_answer === curVal.selected_answer
          ? prevVal + 1
          : prevVal;
      }, 0);
      setCorrectAnswers(num);
    }
  });

  //**** Create Questions component  *****//
  const questionElements = quizData.map((data) => {
    return (
      <Questions
        key={data.id}
        id={data.id}
        question={data.question}
        correct_answer={data.correct_answer}
        possible_answers={data.possible_answers}
        setSelected_answer={setSelectAnswer}
        selectedAnswer={data.selected_answer}
        isOver={endGame}
      />
    );
  });

  //**** End of Game control  *****//
  const gameEnd = () => {
    setEndGame(true);
  };

  return (
    <main>
      {quizData.length > 0 ? (
        <div className="questions-and-btn">
          <div className="questions-container">{questionElements}</div>
          {endGame ? (
            <footer className="footer">
              <h2 className="score">
                You scored {correctAnswers}/10 correct answers
              </h2>
              <button
                className="play-again"
                onClick={() => {
                  setEndGame(false);
                  getQuizData();
                }}
              >
                Play Again
              </button>
            </footer>
          ) : (
            <footer>
              <button className="answer-btn" onClick={gameEnd}>
                Check answers
              </button>
            </footer>
          )}
        </div>
      ) : (
        <div className="home-container">
          <Home getQuiz={getQuizData} />
        </div>
      )}
    </main>
  );
}

export default App;
