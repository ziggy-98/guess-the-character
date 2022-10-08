import React, { FC } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

interface Props {
  //
}

export const App: FC<Props> = () => {
  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
};
