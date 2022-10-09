import React from "react";
import { FC } from "react";

interface Props {
  text: string;
  correct: boolean;
  answerChosen: boolean;
  onClick: (answer: string) => void;
}

export const AnswerButton: FC<Props> = ({
  text,
  correct,
  answerChosen,
  onClick,
}) => {
  const classes =
    correct && answerChosen !== undefined
      ? "correct active"
      : !correct && answerChosen !== undefined
      ? "incorrect active"
      : "inactive";
  return (
    <button className={classes} onClick={(_e) => onClick(text)}>
      {text}
    </button>
  );
};
