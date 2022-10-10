import React, { FC, MouseEvent } from "react";

interface Props {
  text: string;
  action: (e: MouseEvent) => void;
}

export const ContinueButton: FC<Props> = ({ text, action }) => {
  return (
    <button className="continueButton" onClick={(e) => action(e)}>
      {text}
    </button>
  );
};
