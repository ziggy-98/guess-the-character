import React, { FC } from "react";
import { RouterProvider } from "react-router-dom";
import { UserDataProvider } from "./context/context";
import { router } from "./router";

interface Props {
  //
}

export const App: FC<Props> = () => {
  return (
    <React.Fragment>
      <UserDataProvider>
        <RouterProvider router={router} />
      </UserDataProvider>
    </React.Fragment>
  );
};
