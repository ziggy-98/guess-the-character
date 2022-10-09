import React, { FC } from "react";
import { QuestionText } from "../1-atoms/question-text";

interface Props {
  text: string;
}

export const QuestionBar: FC<Props> = ({ text }) => {
  return (
    <div className="questionBar">
      <QuestionText text={text} />
    </div>
  );
};
