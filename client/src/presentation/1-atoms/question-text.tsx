import React, { FC } from "react";

interface Props {
  text: string;
}

export const QuestionText: FC<Props> = ({ text }) => {
  return <h1>{text}</h1>;
};
