import React from "react";
import { FC } from "react";
import { RoundStartingNumber } from "../1-atoms/round-starting-number";

interface Props {
  roundStartsIn: number;
  loaded: boolean;
}

export const LoadingRoundOverlay: FC<Props> = ({ roundStartsIn, loaded }) => {
  return (
    <div className="loadingRoundOverlay">
      <div className="container">
        {loaded ? (
          <RoundStartingNumber number={roundStartsIn} />
        ) : (
          <p>Getting your round ready...</p>
        )}
      </div>
    </div>
  );
};
