import { UserDataApi } from "../../api/user-data";
import React, { MouseEvent } from "react";
import { UserScore } from "../1-atoms/user-score";
import { UserGameResponse } from "server";
import { useUserDataDispatch, useUserDataState } from "../../context/context";
import { useNavigate } from "react-router-dom";
import { setUserUuid } from "../../context/actions";
import { ContinueButton } from "../1-atoms/continue-button";
import { QuestionBar } from "../2-molecules/question-bar";
import { useEffect } from "react";

export const ResultsScreen = () => {
  const context = useUserDataState();
  const userDataDispatch = useUserDataDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!context.uuid) {
      navigate("/game");
    }
  }, [context.uuid]);

  const restartGame = (e: MouseEvent) => {
    UserDataApi.resetGame(context.uuid)
      .then((res: UserGameResponse) => {
        setUserUuid(res.uuid, userDataDispatch).then(() => {
          navigate(`/game/${res.round}`);
        });
      })
      .catch((err) => {
        console.log(err);
        navigate("/error");
      });
  };

  return (
    <div className="resultsScreen">
      <div className="container">
        <QuestionBar text="Congratulations on completing the guess the character quiz!" />
        <div className="resultsContentContainer">
          <p>Your final score is...</p>
          <div className="finalScoreContainer">
            <UserScore />
          </div>
          <p>Do you want to play again?</p>
          <ContinueButton text="Reset game" action={restartGame} />
        </div>
      </div>
    </div>
  );
};
