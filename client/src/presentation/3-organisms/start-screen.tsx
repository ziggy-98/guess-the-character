import { UserDataApi } from "../../api/user-data";
import React, { MouseEvent, useEffect } from "react";
import { ContinueButton } from "../1-atoms/continue-button";
import { QuestionBar } from "../2-molecules/question-bar";
import { useUserDataDispatch, useUserDataState } from "../../context/context";
import { useNavigate } from "react-router-dom";
import { setUserUuid } from "../../context/actions";
import { UserGameResponse } from "server";

export const StartScreen = () => {
  const context = useUserDataState();
  const userDataDispatch = useUserDataDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (context.uuid) {
      UserDataApi.startGame(context.uuid)
        .then((res) => {
          navigate(`/game/${(res as UserGameResponse).round + 1}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [context.uuid]);

  const startGame = (e: MouseEvent) => {
    e.preventDefault();
    UserDataApi.startGame().then((res) => {
      let uuid = (res as UserGameResponse).uuid;
      setUserUuid(uuid, userDataDispatch).then(() => {
        navigate(`/game/1`);
      });
    });
  };
  return (
    <div className="startScreen">
      <QuestionBar
        text={"Disney Fanatic? Test your knowledge with this quiz"}
      />
      <div className="container">
        <p>Do you know what film or TV show each character is from?</p>
        <p>Well then, let's get started! Press the start button below</p>
        <ContinueButton text="Start" action={startGame} />
      </div>
    </div>
  );
};
