import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { UserDataActionType } from "./actions";
import { UserDataReducer, UserDataState, initialState } from "./reducer";

export const UserDataContext = createContext<UserDataState | null>(null);
export const UserDataDispatchContext =
  createContext<Dispatch<UserDataActionType> | null>(null);

export const useUserDataState = (): UserDataState => {
  const context = useContext(UserDataContext);
  if (context === null) {
    throw new Error("useUserDataState must be used within a UserDataProvider");
  }
  return context;
};

export const useUserDataDispatch = (): Dispatch<UserDataActionType> => {
  const context = useContext(UserDataDispatchContext);
  if (context === null) {
    throw new Error(
      "useUserDataDispatch must be used within a UserDataProvider"
    );
  }
  return context;
};

interface UserDataProviderProps {
  children: ReactNode;
}

export const UserDataProvider = ({ children }: UserDataProviderProps) => {
  const [UserData, dispatch] = useReducer(UserDataReducer, initialState);
  return (
    <UserDataContext.Provider value={UserData}>
      <UserDataDispatchContext.Provider value={dispatch}>
        {children}
      </UserDataDispatchContext.Provider>
    </UserDataContext.Provider>
  );
};
