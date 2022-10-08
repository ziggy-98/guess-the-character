import { UserDataActionType } from "./actions";

export interface UserDataState {
  uuid: string;
}

export const initialState: UserDataState = {
  uuid:
    typeof window !== "undefined" ? localStorage.getItem("uuid") : undefined,
};

export const UserDataReducer = (
  initialState: UserDataState,
  action: UserDataActionType
): UserDataState => {
  let newState = { ...initialState };
  switch (action.type) {
    case "SET_UUID":
      return {
        ...newState,
        uuid: action.payload,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
