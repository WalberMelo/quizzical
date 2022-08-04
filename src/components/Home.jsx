import React from "react";

function Home(props) {
  return (
    <div>
      <h1>QUIZZICAL</h1>
      <p className="home--description">
        Click "Start Quiz" to get random questions about Science &amp; Nature
        🐱!
      </p>
      <button className="home--btn" onClick={props.getQuiz}>
        Start Quizz
      </button>
    </div>
  );
}

export default Home;
