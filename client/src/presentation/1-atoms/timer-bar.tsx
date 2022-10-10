import React from "react";
import { FC } from "react";

interface Props {
  timeLeft: number;
  answerChosen: boolean;
}

export const TimerBar: FC<Props> = ({ timeLeft, answerChosen }) => {
  const barSize = timeLeft / 100 + "%";
  const classes = answerChosen
    ? "inactive"
    : timeLeft > 5000
    ? "active"
    : timeLeft <= 5000 && timeLeft > 3000
    ? "active losingTime"
    : timeLeft <= 3000
    ? "active losingTime urgent"
    : "";
  return (
    <div className="timerBarContainer">
      {!answerChosen && <div className="timerBarPulse"></div>}
      <div className={"timerBar " + classes} style={{ width: barSize }}></div>
    </div>
  );
};
