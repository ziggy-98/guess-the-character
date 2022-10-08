import { createBrowserRouter, Navigate } from "react-router-dom";
import { ResultsScreen } from "./presentation/3-organisms/results-screen";
import { RoundScreen } from "./presentation/3-organisms/round-screen";
import { StartScreen } from "./presentation/3-organisms/start-screen";

export const router = createBrowserRouter([
  {
    path: "/game",
    element: <StartScreen />,
  },
  {
    path: "/game/results",
    element: <ResultsScreen />,
  },
  {
    path: "/game/:round",
    element: <RoundScreen />,
  },
  {
    path: "*",
    element: <Navigate to="/game" />,
  },
]);
