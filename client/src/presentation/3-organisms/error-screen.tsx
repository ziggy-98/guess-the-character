import { UserDataApi } from "../../api/user-data";
import React, { MouseEvent } from "react";
import { FC } from "react";
import { ContinueButton } from "../1-atoms/continue-button";
import { QuestionBar } from "../2-molecules/question-bar";
import { useUserDataDispatch, useUserDataState } from "../../context/context";
import { useNavigate } from "react-router-dom";
import { setUserUuid } from "../../context/actions";
import { useState } from "react";
import { UserGameResponse } from "server";

interface Props {
  //
}

export const ErrorScreen: FC<Props> = () => {
  const context = useUserDataState();
  const userDataDispatch = useUserDataDispatch;
  const navigate = useNavigate();
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const restartGame = (e: MouseEvent) => {
    UserDataApi.resetGame(context.uuid)
      .then((res: UserGameResponse) => {
        setUserUuid(res.uuid, userDataDispatch).then(() => {
          navigate(`/game/${res.round}`);
        });
      })
      .catch((err) => {
        console.log(err);
        setShowSnackbar(true);
      });
  };

  return (
    <React.Fragment>
      <QuestionBar text="Uh oh! There was a problem" />
      <div className="errorBody">
        <p>
          Looks like there was a problem with your game. We're sorry this has
          happened.
        </p>
        <p>If you still want to play, click the button below to start again.</p>
        <ContinueButton text="Reset game" action={restartGame} />
      </div>
    </React.Fragment>
  );
};
