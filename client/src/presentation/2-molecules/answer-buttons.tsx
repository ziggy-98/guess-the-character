import React from "react";
import { FC } from "react";
import { AnswerButton } from "../1-atoms/answer-button";

interface Props {
  answers: string[];
  correctAnswer: string;
  answerChosen: boolean;
  onClick: (answer: string) => void;
}

export const AnswerButtons: FC<Props> = ({
  answers,
  correctAnswer,
  answerChosen,
  onClick,
}) => {
  return (
    <div className="answerButtonContainer">
      {answers.map((answer) => (
        <AnswerButton
          text={answer}
          answerChosen={answerChosen}
          correct={answer === correctAnswer}
          onClick={onClick}
        />
      ))}
    </div>
  );
};
