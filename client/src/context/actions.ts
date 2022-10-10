import { Dispatch } from "react";

export type UserDataActionType = {
  type: "SET_UUID";
  payload: string;
};

export const setUserUuid = (
  uuid: string,
  dispatch: Dispatch<UserDataActionType>
): Promise<void> => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: "SET_UUID",
      payload: uuid,
    });
    resolve();
  });
};
