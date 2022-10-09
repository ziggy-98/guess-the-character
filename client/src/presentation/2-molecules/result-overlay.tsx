import React, { MouseEvent } from "react";
import { FC } from "react";
import { ContinueButton } from "../1-atoms/continue-button";

export interface ResultsProps {
  correct: boolean;
  correctAnswer: string;
  nextRound: number;
  onClick: (nextRound: number) => void;
}

export const ResultOverlay: FC<ResultsProps> = ({
  correct,
  correctAnswer,
  nextRound,
  onClick,
}) => {
  const goToNextRound = (e: MouseEvent) => {
    e.preventDefault();
    onClick(nextRound);
  };
  return (
    <div className="resultsOverlay">
      <p>Your answer was...</p>
      <span className={correct ? "correct" : "incorrect"}>
        {correct ? "Right!" : "Wrong!"}
      </span>
      {!correct && <p>The correct answer was: {correctAnswer}</p>}
      <p>
        {correct
          ? "Well done! Press the button below to move on to the next round"
          : "Maybe you'll have better luck on the next round?"}
      </p>
      <ContinueButton text="Next round" action={goToNextRound} />
    </div>
  );
};
