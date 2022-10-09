import { useUserDataState } from "../../context/context";
import React, { useState } from "react";
import { useEffect } from "react";
import { FC } from "react";
import { UserDataApi } from "../../api/user-data";

interface Props {
  //
}

export const UserScore: FC<Props> = () => {
  const [score, setScore] = useState<number>();
  const context = useUserDataState();

  useEffect(() => {
    if (!score && context.uuid) {
      UserDataApi.getCurrentScore(context.uuid)
        .then((res) => {
          setScore(res as number);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [score, context.uuid]);

  return (
    <React.Fragment>
      {score !== undefined ? <span className="score">{score} / 10</span> : ""}
    </React.Fragment>
  );
};
