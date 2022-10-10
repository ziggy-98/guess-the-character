import React from "react";
import { FC } from "react";

interface Props {
  number: number;
}

export const RoundStartingNumber: FC<Props> = ({ number }) => {
  return (
    <React.Fragment>
      {number > 0 && <p>Round starting in...</p>}
      <span className="roundStartingNumber">{number > 0 ? number : "Go!"}</span>
    </React.Fragment>
  );
};
