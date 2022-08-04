import React, { useEffect, useState } from "react";

function Questions(props) {
  const answerElements = props.possible_answers.map((answer) => {
    let styles;
    let clickAnswer;

    if (props.isOver) {
      if (props.selectedAnswer === props.correct_answer) {
        styles = {
          backgroundColor:
            props.selectedAnswer === answer ? "#65be25" : "#f9f7f7ef",
        };
      } else if (props.selectedAnswer !== props.correct_answer) {
        styles = {
          backgroundColor:
            props.selectedAnswer === answer
              ? "#F8BCBC"
              : answer === props.correct_answer
              ? "#65be25"
              : "#f9f7f7ef",
        };
      }
    } else {
      styles = {
        backgroundColor:
          props.selectedAnswer === answer ? "#f7f393" : "#f9f7f7ef",
      };
      clickAnswer = () => {
        props.setSelected_answer(props.id, answer);
      };
    }

    return (
      <div
        className="answers"
        style={styles}
        onClick={clickAnswer}
        key={answer}
      >
        {answer}
      </div>
    );
  });

  return (
    <div>
      <div className="question-container">
        <h2 className="question">{props.question}</h2>
        <div className="answers-container">{answerElements}</div>
      </div>
      <hr />
    </div>
  );
}

export default Questions;
