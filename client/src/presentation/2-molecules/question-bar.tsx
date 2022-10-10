import React, { FC } from "react";
import { QuestionText } from "../1-atoms/question-text";
import { UserScore } from "../1-atoms/user-score";

interface Props {
  text: string;
}

export const QuestionBar: FC<Props> = ({ text }) => {
  return (
    <div className="questionBar">
      <div className="container">
        <QuestionText text={text} />
        <UserScore />
      </div>
    </div>
  );
};
